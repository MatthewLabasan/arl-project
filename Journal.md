# arl-project
ARL Internship Project

## 6/20/24
Today I finished setting up my environment and got my first node.js server set up with Express.js.
It consists of a basic html file. In my JS file, I set up a get method and allowed my app to listen to requests on port 3000. Today, I also experimented a lot with git
and learned more about coding in javascript. Tomorrow, I want to explore the web scraping side, learn how I can structure my project and backend algorithms, and learn about deployment to a public link.

## 6/21/24
Instead of starting on web scraping exploration, I decided to go into more depth on setting up my node.js server and understanding the connections between the 
backend and frontned. I learned a lot about middlewear, error handling, and how the server is able to retrieve files. I also learned about cors policy and how to handle that, and the implementation of logs. I'm watching a MERN app tutorial, and am following along on another repo. Chatgpt has been really helpful in explaining concepts that aren't fully touched in the video, but I've also been double checking the documentation alongside it. This weekend, I hope to continue this and go into databases (specifically mongo), and some frontend react stuff. By next week, I should be ready to start looking into web scraping and beginning that process on a server that I build myself. Below is a rough timeline I hope to follow:
    - 6/26: Begin web scrapping exploration
    - 7/3: Finish up web scrapping, work on auto emailing / pdf creation of scrapped data,
    - 7/10: Work on database search functionality 
    - 7/17: Work on frontend/fix bugs
    - 7/24: Work on paper and presentation

## 6/26/24
Today, I continued with my tutorials and implemented my MongoDB database into my test project, which was super exciting, and not as bad as I thought it would be! I read a couple chapters on MongoDB design choices, and learned about embedded vs normalized data methods (in both relational and document based), and how we can implement a form of either in MongoDB based on our accessing/writing needs. I am not sure what I would like to do with my web scraping data yet, since I am unsure of the format it will be in. Alongside this, I also learned about controllers and how they work alongside routers and the database, and solidified a general understanding of the MVC framework for the backend of a project. I’m pretty happy with where I am at right now of in terms of understanding! Tomorrow, I will finish up the small portion I have left on Controllers. After that, I think I will have enough knowledge to move onto webscrapers and I will delve into the other misc. backend and front end things after I learn how to use puppeteer first. 

## 6/27/24
Today, I finished up the controllers part of my tutorial and learned some Puppeteer basics. I also worked on a software architecture diagram that shows the connections and framework of my application. Tomorrow, I will continue looking into Puppeteer and hopefully get into modifying the data that I receive for storage in my database. After this, I plan to learn about some frontend basics as I am unclear on how the backend and frontend servers connect.

## 6/28/24
Today, I implemented a simple web scraper into my project and sharpened my knowledge of JavaScript, specifically on promises, function vs. =>, and callbacks. Over the weekend or next week, I want to continue working on manipulating the data the web scraper obtains and figure out how I am going to modify it for transport to the database. Over the weekend, I also hope to code my own version of the MVC framework that I have in my test project into this repository, so that I can practice my backend skills that I learned in the tutorial and modify the tutorial project to my project's needs. This is a priority this weekend so that I can have visible code on this repo for review, and will push the further web scrapping to next Wednesday if I have to. So far I am on track with the schedule I set for myself on 6/21, so looking forward to what's ahead!

## 7/3/24
Today, I continued exploring the webscraper and trying to optimize the elements I grab/how I access specific pieces of text. I'm still working on figuring out how I want to store this data from a sample website, and will continue to work on this tomorrow. Hopefully by Friday, I can add a couple more websites to diversify my project example. Wondering how this can be extended to find things automatically with website links itself rather than having ot individually select elements that I know will have the information I want? Today, I also finished up reimplementing my database, so it is ready to go once I am ready with my webscraper. I think I'm a little behind on my schedule because of the MiSo side project, so hopefully I can use tomorrow and the weekend to catch up a bit.

## 7/5/24
Today, I worked on optimizing my webscraper by exploring different methods to webscrape without having to hard code every single website I would like to scrape. Ideally, a web crawler would be best for this project, but for the sake of time and resources, I will be scraping only 10-15 tech news websites for specific keywords. To assist in this, I will now be using a combination of Puppeteer and Newspaper (python). Today, I was able to draw out a new diagram and reassess where data will be flowing in the database, as well as rework my mongoDB schemas. I also worked on the Misos, so didn't have much time to work on my project. This weekend, I will try to implement Newspaper and attempt to run python scripts from my JS server.

## 7/10/24
### Problems encountered and may need solving:
#### Data Cleaning
- Links that don't lead to articles
- Websites that already have concatenated links. 
- See personal notes on how to handle and if we want to implement them
#### Other Things to Solve Later
- Whether sql or nosql is best, given that a table would be useful for keyword search

Today, I worked on fixing some webscraping bugs and am ready to move onto Newspaper. I thought about my database more and might more to a relational database since I want to grab data based on key words, and a table might be better for this. Not sure yet though! Tomorrow, I will move onto Newspaper and implementing that python file into my server.js file. Here is my updated timeline:
    - 7/10: Finish webscraping with Newspaper, begin trying to put data into database
        - ongoing on the side before 7/18: CV program for Kai
    - 7/17: Work on database functionality and webscrape automation
    - 7/24: Work on user input of keywords/email, and mild front end work
    - 7/31: Continue, and write up report
    - 8/7: Work on report and presentataion

# 7/11/24
Today, I began implementing a python file with Newspaper into my project, and did a bunch of random research on the side to learn more about how these files can be run through Node. I've considered a bunch of different options, such as using a child process (a bit slow, but fine for the purpose of my project), creating a backend formed on python (probably the most efficient, but not sure if I have time atp. will see if I can try this to futher my research on backend technologies), or using something like AWS Lambda (I don't really want to go down a whole cloud computing thing right now tho...), so I will just probably do the child processes in node.js. Tomorrow, I will continue working on this and try to integrate a new database as I don't think Mongo suits my needs anymore. Maybe ElasticSearch would be great, as I talked with Kayla about it. I will also work on the CV project so that we have a working program before next Thurs.

# 7/12/24
Today, I implemented a webscraper error log and a scheduler. The error log is important in making sure the scheduler is running correctly and describing what errors are occurring within my webscraper. Next, I will implement a child process and implement the Newspaper library (which shouldn't be too difficult). I am planning on switching databases, so I will attempt at doing that next week (this will be the hard part for me!). Then, I'll be done with most of the backend / have covered the topics I wanted to cover in my project! The rest of the time will be spent fixing bugs / frontend and user input.
    - 7/13: 
        - Work on CV program for Kai until 7/17 or until ready
        - Implement Newspaper and child function
    - 7/17: 
        - Continue with Newspaper 
        - Work on database integration and data normalization/relationships/schemas
    - 7/24: 
        - Work on user input of keywords/email, and mild front end work
        - Work on email automation, and if time, making the emails look nice. 
    - 7/31: 
        - Continue above
        - write up report and draft slides
    - 8/7: Present!

# 7/23/24
Last week, I worked on the CV project. Today, I planned out the data flow from my Python webscrapper to my database, and started researching the best way to implement and normalize my documents. I decided to stick with MongoDB as learning SQL and PostgreSQL might take too long and I really need to get on my front end.
Updated timeline:
     - 7/24: 
        - Finish implementing database
        - Work on user input of keywords/email, and mild front end work
        - Work on email automation, and if time, making the emails look nice. 
    - 7/31: 
        - Continue above
        - write up report and draft slides
    - 8/7: Present!

# 7/24/24
Today, I continued working on my project's database, finishing up creating the MVC for the main part of my application (not including users yet). Still need to finish up the article section and implementing writes to the database from python. Right now, I had planned to create articles out of an API call to my server from my Python child process, though this may not be the most efficient due to all of the overhead requests and latency that may occur. I might just need to implement pymongo and directly modify the database for specifically the keyword array appendages and article creations more efficiently. However, API calls that I implemented for the keywords are fine as is as they will be needed in the front end (not all of them tho, mostly the post and get). Will try to implement this tonight!

After doing some research, it is probably best to utilize pymongo to connect and manipulate the database. it will reduce the multiple http calls I would have to make to my server, which would then make a mongoose call to my database anyways, so it would just be better to go straight to the http calls.
Having this done in the child process should have little to no impact, as would have been done using the same resources anyways.
Though, I still need to optimize how I will access this data to prevent n+1 queries that I have planned.
PyMongo does not create schemas like mongoose, so we will need to hard code it into our file.

# 7/25/24
- Decided to switch from pymongo to MongoEngine. Would be better to create the articles from a schema I define here, rather than in JS
- It allows me to use OOP style queries and saves that are similar to mongoose

Today, I finished implementing MongoEngine in my Python file area. I had to create a duplicate schema as my models, and refactored my webscraper files to include a pyscraper folder, holding these models and my newspaper scraper. I had to learn and experiement a bit with python modules, because I forgot how to utilize the module system. I learned a lot about querying using MongoEngine, how its built on pymongo and has a lot of extra features, chaining queries/constructing them, etc. I made it as efficient as I possibly could, only utilizing two queries to the database everytime it is run.

I'm doing some testing now to make sure things are running right (like basic looking at logs, testing websites, no unit tests). Then I will work on my routing and front end for user input and email functionality. Might need to work on users schema and email stuff first.

Notes: 
- Log messages don't print to console as quick as I want, waits for everything...
- Something is wrong with the database... not adding all articles like before? need to delete the articles too...
    - was running every minute so would overlap and mess up

# 7/26/24
Today was my last day in the office! I worked a bit on my users model and did some planning for the next stage, which is the frontend, login, and email integration. I hope to finish a simple frontend over the weekend.

# 7/30/24
Today, I learned more React basics and began planning my frontend. It will be a simple two buttons to handle the user input for now, and in the future, I will put a user management page and handle auth. I learned specifics about props and componenets and how to implement buttons and state handlers.