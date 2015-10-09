var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Defines your UserSchema object using the Schema constructor, and then you used the schema instance to define your User model
var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String
});

mongoose.model('User', UserSchema);