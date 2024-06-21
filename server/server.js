const fs = require('fs').promises // file system module. need promises if using async calls

// create express application
const express = require('express');
const app = express();

// handle requests: express routing
app.get('/', async (request, response) => {
    try {
        response.send(await fs.readFile('../client/src/home.html', 'utf-8')) // read file async for display
    } catch (err) {
        response.status(500).send('Error reading file.');
    }
})

const PORT = process.env.PORT || 3000; // our env variable or default 
app.listen(PORT, () => {
    console.log("Website is running on port: " + PORT + "; Link: http://localhost:3000")
});