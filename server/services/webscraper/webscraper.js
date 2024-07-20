const { logEvents } = require("../../middleware/logger")
const { scrapePuppeteer } = require("./scrapePuppeteer")
const { websiteData } = require("./websiteData") // file is evaluated on import, variable is populated
const schedule = require("node-schedule") // node cron-like scheduler
const cp = require('child_process')

const webscraper = async() => { // the await just controls the flow, but essentially the entire function is not blocking the call stack
    let message
    try {
        message = await scrapePuppeteer(websiteData) // runs puppeteer and obtains log message
        await logEvents(message, 'webscrapeLog.log')
        console.log(message)

        // child process: prints once terminated
        var newspaper1 = cp.spawn('python', ['./scrapeNewspaper.py'])  // why not working
        newspaper1.stdout.on("data", (data) => {
            console.log(data.toString())
        })

        // var newspaper = cp.execFile("scrapeNewspaper.py", (error, stdout, stderr) => {
        //     console.log('Python' + stdout.toString()) // why not printing???
        // })

        // message = "[Newspaper] "
        // message += await scrapeNewspaper.py // runs newspaper and obtains log messageHOW CAN WE PUSH A MESSAGE FROM HERE? Want message to be "[Python] Ran success"
        // await logEvents(message, "webscrapeLog.log")
    } catch(err) {  // already caught all errors in puppeteer. though, we may encounter errors running python script
        message = ('[Child Process] Error running process: ' + err) 
        await logEvents(message, 'webscrapeLog.log') 
    } 
}

const scheduleScrape = () => { 
    // I believe this runs on call stack, but we are calling async events. Once called, will leave.
    const job = schedule.scheduleJob('15 * * * * *', async function(){
        await webscraper()
    })
}

module.exports = {
    scheduleScrape
}