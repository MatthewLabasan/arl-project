# Specific Topic Email Generator
_ARL Internship Project_: Application designed to automatically send emails throughout the week curated to a specific topic inputted when signing up.

Below are notes as I continue to work on this readme.
## Installation
__Pre-Requistes__: Python, Node.js and npm
__Installation__: From the terminal, run `npm install`. 
* _Note:_ This program utilizes Python libraries, so ensure that you select the Python interpreter that `pip` installs to. To do this in VS Code, click the search bar at the top, and type `>Python: Select Interpreter`
- NLTK requires Python versions 3.7, 3.8, 3.9, 3.10 or 3.11. Also requires below:
    - $ brew install libxml2 libxslt

    - $ brew install libtiff libjpeg webp little-cms2

    - $ pip3 install newspaper3k

    - $ curl https://raw.githubusercontent.com/codelucas/newspaper/master/download_corpora.py | python3 

    - use the curl to download necessary data for nlp (nltk) model
# Notes
__Logs__: webscraperLog.log will indicate problems that may be occurring with your links, webscraper temp. files, or JSON file creation. 