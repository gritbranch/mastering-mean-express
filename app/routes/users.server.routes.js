var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
	app.route('/users')
		.post(users.create) //Use an HTTP POST request
		.get(users.list);	//Use HTTP GET request
	
	//Colon before a substring in a route definition means that this substring will be handled as a request parameter	
	app.route('/users/:userId')
     	.get(users.read)		//select route
		.put(users.update)		//update route
		.delete(users.delete);	//delete route

	//users.userById() method will be executed before any other middleware registered with the userId parameter (e.g. users.read)
  	app.param('userId', users.userByID);
};

