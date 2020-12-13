const express = require('express');
const bodyParser = require('body-parser');
// const login =require('./model/login')
var cors = require('cors');


// create express app
const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
const { mongoose } = require("./db.js");
// listen for requests
// var x="192.168.0.107"
var x="192.168.43.89"
app.listen(5000,x,() => {
    console.log("Server is listening on port 5000");
});
// app.listen(5000,"192.168.1.8",() => {
//     console.log("Server is listening on port 3000");
// });
app.use('/user',require('./modules/Profile'));
