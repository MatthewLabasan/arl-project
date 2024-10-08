const { logEvents } = require("../../middleware/logger")
const { scrapePuppeteer } = require("./jsScraper/scrapePuppeteer")
const { websiteData } = require("./websiteData") // file is evaluated on import, variable is populated
const schedule = require("node-schedule") // node cron-like scheduler
const path = require('path')
const util = require('node:util');
const execFile = util.promisify(require('node:child_process').execFile); // promise version of child_process

let message = ''
let pythonPath = path.join(__dirname, "pyScraper/scrapeNewspaper.py")

/** 
* Calls child process to execute scrapeNewspaper.py for the Newspaper3k webscraper.
* @return {string} Result of the process to be logged.
*/
const newspaperAsync = async() => { 
    let newspaperMessage = "[Newspaper] Internal Log: " // move to python
    try { 
        const { stdout } = await execFile('python', [pythonPath]) // allows us to await process to finish. using python 3.11.5
        newspaperMessage += stdout.toString('utf8')
    } catch(err) {
        newspaperMessage += ('[newspaperAsync] ' + err) // other errors
    }
    return newspaperMessage
}

/** 
* Handles calling both the Puppeteer and Newspaper3k webscrapers.
* Logs down webscraping process information in webscrapeLog.log
*/
const webscraper = async() => { 
    console.log("Webscraper running...")
    try {
        // run puppeteer
        message = await scrapePuppeteer(websiteData)
    
        // run newpaper
        message += await newspaperAsync()

        // log event
        message += '=================================================================================================================================='
        await logEvents(message, 'webscrapeLog.log')
        console.log(message)
    } catch(err) {
        message = ('[Unknown Error] ' + err) 
        await logEvents(message, 'webscrapeLog.log') 
    } 
}

/** 
* Schedules webscraper. Timing can be adjusted in the .env file.
*/
const scheduleScrape = () => { 
    // I believe this runs on call stack, but we are calling async events. Once called, will leave.
    const job = schedule.scheduleJob(process.env.WEBSCRAPER_TIME, async function(){
        await webscraper()
    })
}

module.exports = {
    scheduleScrape
}