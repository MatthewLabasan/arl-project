const puppeteer = require('puppeteer')

// simple web scrape for one page
async function webscrape() { // this explicitly runs it.
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        userDataDir: `./tmp` // data directory for website to remember actions. ex. filling out captcha on the pop up, will remmeber.
    });
    const page = await browser.newPage();
    await page.goto('https://blog.platformatic.dev/?source=top_nav_blog_home');
    console.log('Web Scraper started successfully.')

    // blogpost cards
    const infoHandles = await page.$$(".blog-post-card section div h1")
    console.log(infoHandles)

    // return array of titles
    const titles = await Promise.all(infoHandles.map(async handle => await page.evaluate(el => el.textContent, handle)))
    console.log(titles)

    
}

module.exports = {
    webscrape
}