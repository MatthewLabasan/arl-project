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

    // get SPECIFIC handle (best for reuse)
    const infoHandles = await page.$$(".blog-post-card section div h1")
    console.log(infoHandles)
    
    for(const infoHandle of infoHandles) { // for of loop (uses elements)
        const title = await page.evaluate(element => element.textContent, infoHandle)
        console.log(title)
    }

    // better and more concise loop above, though has to combine a sychr with asyncr
    // promise.all returns a promise. fulfills once all iterable promises within it are fulfilled.
    // once map is done, it will return an array of promises that still need to be solved?
    const titles = await Promise.all(infoHandles.map(async handle => await page.evaluate(el => el.textContent, handle)))
    console.log(titles)



    // get SPECIFIC text 
    const infoHandles2 = await page.$$eval(".blog-post-card", elements => {
        return elements.map(handle => handle.querySelector("section > div > h1 > a").textContent) // map note: need to return result that is returned or assign to new variable
    }) // page function (2nd param) is passed in array from first param selector
    console.log(infoHandles2)

    // alternatively, we can get reusable handles, then get text
    // the for loop is better for larger datasets as map creates a new array. though, to store, will need an array anyways. therefore, map better => concise
    const articleHandles = await page.$$(".blog-post-card") // returns elements on page that match "blog-post-card". can have excess. // why can't i just use the class name?

    // to evaluate each element with this class title, use page.evaluate
    for(const articleHandle of articleHandles) { 

        // pass the single handle below
        const title = await page.evaluate(element => element.querySelector("section > div > h1 > a").textContent, articleHandle) // articleHandle passed in, copied to element
        // notice method, element. can use element accessors in the method if inside page.method()
        // innertext: retrieves all innertext all the way to child.
        console.log(title)
    }
}

// for checking purposes... is there another way?
module.exports = {
    webscrape
}