const { sendEmail } = require("./sendGrid")
const { logEvents } = require("../../middleware/logger")
const schedule = require("node-schedule") // node cron-like scheduler
const path = require('path')

let message = ''

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

const scheduleNewsletter = () => { 
    // I believe this runs on call stack, but we are calling async events. Once called, will leave.
    const job = schedule.scheduleJob('0 37 * * * *', async function(){
        await sendNewsletter()
    })
}

module.exports = {
    scheduleNewsletter
}