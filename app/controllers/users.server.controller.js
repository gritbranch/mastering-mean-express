var User = require('mongoose').model('User'); //uses the Mongoose module to call the model method that will return the User model you previously defined

exports.create = function(req, res, next) {
	var user = new User(req.body);	//Creates a new model instance, which is populated using the request body

	//Either saves the user and outputs the user object, or fail, passing the error to the next middleware
	user.save(function(err) {
    	if (err) {
    		return next(err);
    	} else {
    		res.json(user);
    	}
  	});
	  
};

exports.list = function(req, res, next) {
	//list() method uses the find() method to retrieve an array of all the documents in the users collection
 	User.find({}, function(err, users) {
    	if (err) {
      		return next(err);
    	} else {
      		res.json(users);
    	}
  	});
};

//read() is just responding with a JSON representation of the req.user object
exports.read = function(req, res) {
  	res.json(req.user);
};

//userById() method is the one responsible for populating the req.user object
exports.userByID = function(req, res, next, id) {
	User.findOne({
    	_id: id
  	}, function(err, user) {
    	if (err) {
      		return next(err);
    	} else {
      		req.user = user;
      		next();
    	}
  	});
};

exports.update = function(req, res, next) {
	//Mongoose method on update (other options: update() and findOneAndUpdate()). 
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
    		return next(err);
    	} else {
      		res.json(user);
    	}
  	});
};

exports.delete = function(req, res, next) {
	//Mongoose method on delete (other options: findOneAndRemove() and findByIdAndRemove())
	req.user.remove(function(err) {
    	if (err) {
    		return next(err);
    	} else {
      		res.json(req.user);
    	}
  	})
};