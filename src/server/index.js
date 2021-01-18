const dotenv = require('dotenv');
dotenv.config();

projectData = {}

// APIs

var path = require('path')
const fetch = require("node-fetch");

const express = require('express')
const app = express()

app.use(express.static('dist'))

console.log(__dirname)

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// ~~~~~~ Routes ~~~~~~

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// ( GET )
app.get('/data', async (req, res) => {
    res.send(projectData);
});

// ( POST )  
app.post('/data', async (req, res) => {
    data = req.body ;
    projectData.push(data)
    res.send(projectData);
});