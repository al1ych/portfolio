// boilerplate

// import express
const express = require('express');


// create express app
const app = express();

// set port
const port = 8000;

// static files
app.use(express.static(__dirname + '/public'));


// listen on port 8000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
