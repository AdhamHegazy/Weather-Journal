/* Global Variables */
//Consts will be utilized  to fetch the api from openweathermap
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=761dfe7b234f4866e1eec0faf2f6c95a&units=metric'; //Celcius



//variables that will be changed according to user input
let zipCode;
let feelings;


let apiData; //global variable that will hold the fetched data from openworldmap api


let tempDate; //records the exact time the api is fetched at, 
//which will be displayed in the most recent entry

let d = new Date(); //Date will be displayed in the header
document.getElementsByClassName("holder headline")[0].innerHTML+=" <br> " + d;

//object to hold data that will be posted to the server side
let dataPost = {
    temp: '',
    date: '',
    feeling:''
  };

//basic post function that takes url and an object 
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}

//basic get request to fetch data from the server side
const getData = async ()=>{ 
    const res = await fetch('/getData')
    try {
       let displayData = await res.json();
        return displayData;
    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


/*example: api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key} */
const getAPI = async (baseURL, zip, key)=>{
    //fetches data based on zip in metric units
    let fixed = baseURL+zip+key; 
    const res = await fetch(fixed);
    try {
        apiData = await res.json();           
        let g = new Date();
        tempDate = g.getMonth()+1+'.'+ g.getDate()+'.'+ g.getFullYear(); //snapchots the date
        return apiData;
    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}



const updateUI = async()=>{
    const res = await fetch('/getData') //fetches the data stored on the server side
    try {
        displayData = await res.json();
        //displays the latest entry
        document.getElementById('date').innerHTML="Date:"+displayData.date; 
        document.getElementById('temp').innerHTML="Temperature:"+displayData.temp;
        document.getElementById('content').innerHTML="Feeling:" +displayData.feel;
        return displayData;
    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }

};



const button = document.getElementById('generate'); //adds an event listener to the button generate
button.addEventListener('click', updateButton);

//function gets called when generate button is clicked
function updateButton(){

    zipCode = document.getElementById('zip');
    feelings = document.getElementById('feelings');

    //calls the getAPI function based on the user input
    getAPI(baseURL, zipCode.value, apiKey)
    .then(()=>{ //chains a postData function to store data in the server side
        
        dataPost.temp=apiData.main.temp+ ' C°';
        dataPost.feeling=feelings.value;
        dataPost.date=tempDate; 
        postData('/postData', dataPost);

    }).then(()=>{ //last function on the chain is to updateUI
        updateUI();
    })

}
