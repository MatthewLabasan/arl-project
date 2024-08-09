/**
 * Holds the website link and CSS selector that will be used for the webscraper. 
 * To see if CSS selector works, run webscraper.js and check ./files/links.txt for the desired links at the bottom.
 * Notes: Ensure that the CSS selector ends in the 'a' element. Ex: "div.summary-list__items > div:nth-child(n) > a"
 *        The CSS selector must be common to ensure all desired links are scraped. 
 *        Currently, only website's with <a> href's that are directories and not full links are supported.
 *        Be careful with scraping from side bars, the webscraper may not be able to find it.
 * @return An array with website links and CSS selectors.
 */

const websiteData = new Array()

// tech
websiteData.push('https://www.wired.com') // desired page
websiteData.push('https://www.wired.com') // website HOME page
websiteData.push('div.summary-list__items > div:nth-child(n) > div.SummaryItemAssetContainer-gwhFFH.ogpYq.summary-item__asset-container > a') // css selector for link href

// tech
websiteData.push('https://www.theverge.com/tech') 
websiteData.push('https://www.theverge.com') 
websiteData.push('div.duet--layout--river > div > div:nth-child(n) > div.flex.items-center > div > h2 > a, div.duet--layout--river > div > div:nth-child(n) > a')

// ai
websiteData.push('https://www.theverge.com/ai-artificial-intelligence')
websiteData.push('https://www.theverge.com') 
websiteData.push('div.duet--layout--river > div > div:nth-child(n) > div.flex.items-center > div > h2 > a, div.duet--layout--river > div > div:nth-child(n) > a')

// sensors
websiteData.push('https://www.azosensors.com/news-index.aspx')
websiteData.push('https://www.azosensors.com')
websiteData.push('#ctl00_cphBody_latestNewsItems_posts .col-xs-9 > h3 > a') 

// robots: something is wrong here
websiteData.push('https://www.sciencedaily.com/news/computers_math/robotics/')
websiteData.push('https://www.sciencedaily.com')
websiteData.push('#featured_blurbs > div:nth-child(n) > div > a')

// add new websites here

// broken link test
// websiteData.push('https://www.kasjkdsadasdjsadskjkscjkxajj.com/')
// websiteData.push('https://www.kasjkdsadasdjsadskjkscjkxajj.com/')
// websiteData.push('#featured_blurbs > div:nth-child(n) > div > a')

module.exports = {
    websiteData 
}

// would it be better to make this a static document? 
// how can we handle websites where the css selector wil grab links to the home page? this creates excess data we don't need
// how can we handle websites where the a attribute holds the entire link, rather than a directory? work around right now: don't
// when we parse links into python, we will only check dates for each first, and stop if it is older than the last email/web scrape run.