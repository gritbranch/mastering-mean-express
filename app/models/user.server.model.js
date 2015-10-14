var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Defines your UserSchema object using the Schema constructor, and then you used the schema instance to define your User model.
var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
    	type: String,
    	//Index property could optimize these queries by creating an e-mail secondary index.
		index: true,
    	//Match property varifies that the field matches the given regex expression.
		match: /.+\@.+\..+/
  	},
	username: {
    	type: String,
    	//A modifier can either change the field's value before saving the document or represent it differently at query time.
		//Trim is modifier a leading and trailing whitespace.
		trim: true,
    	//Validates the uniqueness of a document field across a collection.
		unique: true,
    	//Required property verifies the existence of the field before saving.
		//If a validation error occurs, save is aborted and error is passed to callback.
		required: true
  	},
	password: {
    	type: String,
		//Custom validator is done using the validate property.
    	//Validate property value should be an array consisting of a validation function and an error message.
		validate: [
      		function(password) {
        		return password.length >= 6;
      		}, 'Password should be longer'
		]
  	},
	role: {
    	type: String,
    	//This property limits the value to the given set of strings.
		enum: ['Admin', 'Owner', 'User']
  	},
	created: {
    	type: Date,
    	//Setting a default value
		default: Date.now
  	},
  	website: {
    	type: String,
		//Custom Getter Modifier which adds prefix to website.
    	get: function(url) {
      		if (!url) {
        		return url;
      		} else {
        		if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          			url = 'http://' + url;
        		}	
				return url;
			}
    	}
	}
});

//Virtual attributes are dynamically calculated properties which are not really presented in the document.
UserSchema.virtual('fullName')
	.get(function() {
  		return this.firstName + ' ' + this.lastName;
	})
	//Virtual attributes can also have setters (e.g. break full name to first name and last name).
	.set(function(fullName) {
  		var splitName = fullName.split(' '); 
  		this.firstName = splitName[0] || ''; 
  		this.lastName = splitName[1] || ''; 
	});

//This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the output of documents using res.json() to include the getter's behavior.
UserSchema.set('toJSON', { getters: true, virtuals: true });

//Custom static methods give you the liberty to perform model-level operations. 
//Needs to be declared in the statics property of the Schema.
//Using the new findOneByUsername() method would be similar to using a standard static method by calling it directly from the User model (i.e. User.findOneByUsername('username', function(err, user){...});).
UserSchema.statics.findOneByUsername = function (username, callback) {
  	this.findOne({ username: new RegExp(username, 'i') }, callback);
};

//Custom instance methods are methods that perform instance operations.
//Need to be declared as a member of your schema's methods property.
//This allows authenticate method to be called from any User model instance (i.e. user.authenticate('password');).
UserSchema.methods.authenticate = function(password) {
	return this.password === password;
};

mongoose.model('User', UserSchema);