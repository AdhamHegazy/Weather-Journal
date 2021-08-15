# Weather Journal App
In this project, the main aim was to use asyncrounous APIs to fetch data from openweathermap, and to update the the UI using the fetched data and user input data. 
##  Server Side

 - The server side of this web app was created using node.js and express. 
 - Also both 'body-parser' and 'cors' are required for the following functions:
			 - body-parser: parses incoming requests using 				.body (acts as middle-ware)
			 - cors: to allow for cross origin resource sharing
 - I specified the port to be 8000. This port would be the port the server will listen on. 
 - I created an empty object named projectData, which acts as the endpoint
 - First route I specified was a simple .get, on the path '/getData', which simply returns the project data as response. 
 - Second route was a post, on the path '/postData', which parses the received data using .body, takes the temperature, date, and userResponse values and initializes the projectData object with the incoming data. 

## Client Side
-  First I created the baseURL and apiKey consts to hold the values which will be used to fetch the API from openweathermap. I also specified the units to be metric.
- I declared a new Date object and displayed it beneath the header
- I created an async postData function that takes a url and a data object and utilizes JS's fetch function to try and post the given object to the specified path.
- The second async function was a simple getData, which fetches an object from the path 'getData' (specified in the server side).
- The getAPI async function is the function responsible for fetching the data using the openweathermap API
		-The fetch takes a constructed variable name fixed, which takes the baseURL, zip, along with the api key given to me in order to fetch the data properly.
		- Also I create a new date variable to record the exact time when the API was called.
- The last async function is the updateUI, which fetches the data from the server side using the '/getData' path. Then it displays the last entry's date, temperature, and user feelings (response).
- Finally, I added an EventListener to the generate button which calls the update function which does the following:
		- It gets the user input zip and feelings values, then passes the zip as argument along with the baseURL and apiKey to the getAPI async function.
		- Afterwords using the .then, it chains a postData function to store data in the server side, taking the dataPost object which holds the temperature, feelings, and date of the latest fetched data entry.
		- Finally the last chained async function is the updateUI, which updates the UI dynamically based on the fetched last entry.

