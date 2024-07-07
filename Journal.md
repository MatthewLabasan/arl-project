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