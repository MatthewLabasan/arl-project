const puppeteer = require('puppeteer')
const { selectorTest } = require('./selectorTest')

/** 
 * Webscrapes specific websites for new article links. If a new website is to be scraped, add it to websiteData.js
 * @return an array of arrays containing article links
*/
const webscrape = async(websiteData) => { 
    // array of link arrays
    const linkStack = new Array()

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: `./tmp` // data directory for website to remember actions
    });
    const page = await browser.newPage()
    console.log('Web Scraper started successfully.')

    for(i = 0; i < websiteData.length; i=i+3) {
        try {
            await page.goto(websiteData[i], {waitUntil: 'load', timeout: 0}); // waitUntil prevents need to load all resources
        } catch(err) {
            console.log(`Website <${websiteData[i]}> could not be loaded. \n${err}`)
            continue
        }
        // article handles
        const handles = await page.$$(websiteData[i+2])
        console.log(handles)
        // create array of links
        const links = await Promise.all(handles.map(async handle => websiteData[i+1] + await (page.evaluate(el => el.getAttribute('href'), handle))))
        // add array to linkStack
        linkStack.push(links)
    }
    console.log(`\n`)
    // check to ensure css selector works correctly 
    selectorTest(linkStack) 
    console.log(linkStack)

    return linkStack
}

const webscraper = async(websiteData) => {
    var data = null
    try {
        data = await webscrape(websiteData)
    } catch(err) {
        console.log(`Webscraper failed. ${err}`)
    }
    // send to python
    return data
}

module.exports = {
    webscraper
}


/* data flow:
    - websiteData holds main website link and css selector in an array
    - server calls websraper(websiteData)
    - webscraper iterates through websiteData in a for loop O(n), adding new articles links to linkStack. calls selectorTest(linkStack) to print out
        a test that ensures all links are correctly obtained, essentially checking CSS selectors. Returns linkStack to server, for passing to Python script & Newspaper.
*/