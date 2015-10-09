var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
	//Connected to the MongoDB instance using the db property of your configuration object
	var db = mongoose.connect(config.db);

	//includes the User model
	require('../app/models/user.server.model');

	return db;
};