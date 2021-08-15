
// Setup Server
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//specifies the folder named 'website' to be the folder that includes client side js,css & HTML files
app.use(express.static('website'));

//The port which the localhost would run on 
const port = 8000;

const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`)
});

//JS object to act as endpoint
let projectData = {};


//simple get route that returns back the projectData
app.get('/getData',  (req, res)=> {
    res.send(projectData);
});




app.post('/postData', addData);
//Initializes the projectData with the parsed data
function addData(req,res){  
    let data = req.body;

    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["feel"] = data.feeling;

    res.send(projectData);
}



