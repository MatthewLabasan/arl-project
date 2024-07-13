const fsPromises = require('fs').promises
const path = require('path')

// NEED TO MODIFY FOR EASY USE
/**
 * Tests whether or not your CSS selectors are choosing the correct
 *      links by creating a links.txt file. Alternatively, print your link array to console.
 *  @param {*} arrayOfLinks Array of link arrays that come from the webscraper
 */
const selectorTest = async(arrayOfLinks) => {
    const links = arrayOfLinks.flat().join('\n') // turn into single string
    try {
        // create a new file everytime
        await fsPromises.writeFile(path.join(__dirname, 'files', 'links.txt'), links) 
    } catch (err) {
        console.log(err)
    }
}

module.exports = { selectorTest }