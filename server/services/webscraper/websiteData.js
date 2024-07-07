/**
 * Holds the website link and CSS selector that will be used for the webscraper. 
 * Ensure that the CSS selector ends in the 'a' element. Ex: "div.summary-list__items > div:nth-child(n) > a"
 * Note: Link and CSS selector are consecutive indexes. The CSS selector must be common to ensure all desired links are scraped. The website link must not end in '/'
 * @return An array with website links and CSS selectors.
 */

const websiteData = new Array()

websiteData.push('https://www.wired.com')
websiteData.push('div.summary-list__items > div:nth-child(n) > div.SummaryItemAssetContainer-gwhFFH.ogpYq.summary-item__asset-container > a')
websiteData.push('https://www.theverge.com/tech')
websiteData.push('ol > div:nth-child(n) > li > a')

// add new websites here

module.exports = {
    websiteData 
}