//Folder Structure
//	- app folder is where you keep your Express application logic
//		- controllers folder is where you keep your Express application controllers
//		- models folder is where you keep your Express application models
//		- routes folder is where you keep your Express application routing middleware
//		- views folder is where you keep your Express application views
//	- config folder is where you keep your Express application configuration files
//		- env folder is where you'll keep your Express application environment configuration files
//		- config.js file is where you'll configure your Express application
//		- express.js file is where you'll initialize your Express application
//	- public folder is where you keep your static client-side files
//		- css folder is where you keep your CSS files
//		- img folder is where you keep your image files
//		- js folder is where you keep your JavaScript files

//process.env is a global variable that allows you to access predefined environment variables, and the most common one is the NODE_ENV environment variable which is often used for environment-specific configurations
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Requires express module and creates a new Express application object.
var express = require('./config/express');

var app = express();

/* Before the horizontal folder structure
//Mounts the middleware function with a specific path ('/').
app.use('/', function(req, res) {
	//This is an Express wrapper which basically set the content type based on the resonse object type and sends the resonse using the res.end() method.
  	res.send('Hello World');
});
*/

//Tells the Express application to listen to port 3000.
app.listen(3000);

//Returns the Express application object.
module.exports = app;

console.log('Server running at http://localhost:3000/');