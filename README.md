# SciByte: Personalized Research Delivered to Your Inbox
This README.md is under construction!

# Table of Contents
1. [Introduction](#introduction)

# Introduction
This project was developed to enhance research surveys. <br>
_ARL Internship Project_: Application designed to automatically send emails once a week that are curated to a specific topic.

## Installation
__Pre-Requistes__: Python, Node.js and npm, SendGrid API account
__Installation__: From the terminal, run `npm install`. 
* _Note:_ This program utilizes Python libraries, so ensure that you select the Python interpreter that `pip` installs to. To do this in VS Code, click the search bar at the top, and type `>Python: Select Interpreter`
- NLTK requires Python versions 3.7, 3.8, 3.9, 3.10 or 3.11. Also requires below:
    - $ brew install libxml2 libxslt

    - $ brew install libtiff libjpeg webp little-cms2

    - $ pip3 install newspaper3k

    - $ curl https://raw.githubusercontent.com/codelucas/newspaper/master/download_corpora.py | python3 

    - use the curl to download necessary data for nlp (nltk) model

    - scipy and numpy versions that are compatible
- SendGrid subscription and setup
# Adding New Sources
To add new sources to scrape from, these sources must be websites that have a blogpost / news style, such as https://www.theverge.com/. Follow the directions below for guidance:
1. Navigate to server/server.js and comment out the following lines of code:
```

```

# Notes
__Logs__: webscraperLog.log will indicate problems that may be occurring with your links, webscraper temp. files, or JSON file creation. 
- Newspaper will continue to run on whatever JSON file is available, even if there was an error with Puppetter. Need to monitor logs to ensure puppeteer ran correctly, else reschedule and fix errors so that puppeteer can update JSON.