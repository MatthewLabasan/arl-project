const { logEvents } = require("../../middleware/logger")
const { scrapePuppeteer } = require("./scrapePuppeteer")
const schedule = require("node-schedule") // node cron-like scheduler
const { websiteData } = require("./websiteData") // file is evaluated on import, variable is populated


// want to put webscraper crons in here, call this async ??
// where should crons go, in here then call it at start ofapp perhaps.

// schedule coupled tasks:
//  webscrape1 RENAME TO scrapePuppeteer, awaiting it.
//  once webscrape1 is fulfilled, run webscrape2 RENAME TO scrapeNewspaper // HOW DOES ASYNC WORK HERE? will it wait?. just use await to wait.
// then, read the new json file. proabably need to make sure webscrape1 was fulfilled. handle errors/send an event? idk
// then upload to database.
var message = String

const webscraper = async() => { // the await just controls the flow, but essentially the entire function is not blocking the call stack
    try {
        message = await scrapePuppeteer(websiteData) // runs puppeteer and obtains log message
        await logEvents(message, "webscrapeLog.log")
        console.log(message)

        // CHANGE TO CHILD PROCESS
        // message = "[Newspaper] "
        // message += await scrapeNewspaper.py // runs newspaper and obtains log messageHOW CAN WE PUSH A MESSAGE FROM HERE? Want message to be "[Python] Ran success"
        // await logEvents(message, "webscrapeLog.log")
    } catch(err) {  // already caught all errors in puppeteer. though, we may encounter errors running python script
        message = ("[Child Process] Error running process: " + err) 
        await logEvents(message, "webscrapeLog.log") 
    } 
}

const scheduleScrape = () => { 
    // I believe this runs on call stack, but we are calling async events. Once called, will leave.
    const job = schedule.scheduleJob('50 * * * * *', async function(){
        await webscraper()
    })
}

module.exports = {
    scheduleScrape
}