const puppeteer = require('puppeteer')
const fsPromises = require('fs').promises
const path = require('path')
const { selectorTest } = require('./selectorTest')

/** 
* Webscrapes specific websites for new article links.
* Creates JSON file for scrapeNewspaper.py
* @param {Array} websiteData - Array containing website links and respective CSS selectors.
* @returns {string} Message log string
*/
const scrapeLinks = async(websiteData) => { 
    let message = "Webscraper log below:\n[Puppeteer] Internal Log: "

    // array of link arrays
    const linkStack = new Array()

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        userDataDir: `./tmp` // data directory for website to remember actions
    });
    const page = await browser.newPage()
    console.log('Puppeteer started successfully.')

    for(i = 0; i < websiteData.length; i=i+3) {
        try {
            await page.goto(websiteData[i], {waitUntil: 'domcontentloaded', timeout: 60000}); // waitUntil prevents need to load all resources
        } catch(err) {
            message += `Website <${websiteData[i]}> could not be loaded and is excluded from JSON file. \n\t${err}\n `
            continue
        }
        // article handles
        const handles = await page.$$(websiteData[i+2])

        // create array of links
        const links = await Promise.all(handles.map(async handle => websiteData[i+1] + await (page.evaluate(el => el.getAttribute('href'), handle))))

        // add array to linkStack
        linkStack.push(links)
    }

    // check to ensure css selector works correctly 
    selectorTest(linkStack) 
  
    // create json file for scrapeNewspaper.py
    try {
        await fsPromises.writeFile(path.join(__dirname, '..', 'files', 'links.json'), JSON.stringify(linkStack)) 
        message += `JSON file created and ready for Python parsing. `
    } catch (err) {
        message += `JSON file creation failed. ${err} `
        return message += '| '
    }

    message += "| "
    return message
}

/** 
* Handles scrapeLinks and add's additional formatting for log information.
* @param {Array} websiteData - Array containing website links and respective CSS selectors.
* @returns {string} Further processed message log string.
*/
const scrapePuppeteer = async(websiteData) => { 
    let message
    try {
        message = await scrapeLinks(websiteData)
    } catch(err) {
        message = `Webscraper log below: \n[Puppeteer] Internal Log: ${err}`
        return message += `Unsuccessful Puppeteer: Please fix error and rerun schedule for latest updates.\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n`
    }
    message += `Puppeteer finished running sucessfully.\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n` 
    return message
}

module.exports = {
    scrapePuppeteer
}


/* data flow:
    - websiteData holds main website link and css selector in an array
    - server calls websraper(websiteData)
    - webscraper iterates through websiteData in a for loop O(n), adding new articles links to linkStack. calls selectorTest(linkStack) to print out
        a test that ensures all links are correctly obtained, essentially checking CSS selectors. Pushes linkstack to json file, for passing to Python script & Newspaper.
*/