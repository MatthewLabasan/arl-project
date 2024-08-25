const fsPromises = require('fs').promises
const path = require('path')

/**
* Tests whether or not your CSS selectors are choosing the correct links by creating a links.txt file. 
* See documentation for more details.
*  @param {*} arrayOfLinks Array of link arrays that come from the webscraper
*/
const selectorTest = async(arrayOfLinks) => {
    const links = arrayOfLinks.flat().join('\n') // turn into single string
    try {
        // create a new file everytime
        await fsPromises.writeFile(path.join(__dirname, '..', 'files', 'links.txt'), links) 
    } catch (err) {
        console.log(err)
    }
    console.log("Selector Test Complete. Please check /server/services/webscraiper/files/links.txt.")
}

module.exports = { selectorTest }