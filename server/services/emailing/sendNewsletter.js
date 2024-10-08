const { sendEmail } = require("./sendgrid")
const { logEvents } = require("../../middleware/logger")
const schedule = require("node-schedule") // node cron-like scheduler
const path = require('path')

let message = ''

/** 
 * Function that handles 'sendEmail' from 'sendGrid.js' execution.
 * Logs 'sendEmail' function's process in the newsletterLog.log file.
*/
const sendNewsletter = async() => { 
    console.log("Newsletter emailing process has begun. ")
    try {
        message = await sendEmail()
        // log event
        message += `\n==================================================================================================================================`
        await logEvents(message, 'newsletterLog.log')
        console.log(message)
    } catch(err) {
        message = ('[Unknown Error] ' + err) 
        await logEvents(message, 'newsletterLog.log') 
    } 
}

/** 
* Scheduling function for the sendNewsletter function.
* Time of scheduling can be modified in the .env file.
*/
const scheduleNewsletter = () => { 
    // I believe this runs on call stack, but we are calling async events. Once called, will leave.
    const job = schedule.scheduleJob(process.env.EMAILER_TIME, async function(){
        await sendNewsletter()
    })
}

module.exports = {
    scheduleNewsletter
}