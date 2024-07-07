const puppeteer = require('puppeteer')
const { selectorTest } = require('./selectorTest')

/** 
 * Webscrapes specific websites for new article links. If a new website is to be scraped, add it to websiteData.js
 * @return an array of arrays containing article links
*/

async function webscrape(websiteData) { 
    // array of link arrays
    const linkStack = new Array()

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        userDataDir: `./tmp` // data directory for website to remember actions
    });
    const page = await browser.newPage();
    console.log('Web Scraper started successfully.')

    for(i = 0; i < websiteData.length; i++) {
        console.log(i)
        await page.goto(websiteData[i]);

        // blogpost cards (modify for each website)
        const handles = await page.$$(websiteData[++i])
        console.log(i)

        // create array of links
        const links = await Promise.all(handles.map(async handle => websiteData[i] + await (page.evaluate(el => el.getAttribute('href'), handle))))

        // add array to linkStack
        linkStack.push(links)
        console.log(i)

        // NEED TO FIX i
    }

    // check to ensure css selector works correctly 
    selectorTest(linkStack) 
    console.log(linkStack)

    // send to python
    return linkStack
}

module.exports = {
    webscrape
}


/* data flow:
    - websiteData holds main website link and css selector in an array
    - server calls websraper(websiteData)
    - webscraper iterates through websiteData in a for loop O(n), adding new articles links to linkStack. calls selectorTest(linkStack) to print out
        a test that ensures all links are correctly obtained, essentially checking CSS selectors. Returns linkStack to server, for passing to Python script & Newspaper.
*/