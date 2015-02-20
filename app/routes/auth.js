// Models
var Photo = require('../models/photo.js');
var User = require('../models/user.js');
var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var app = express();
require('../lib/passport.js');

// Middleware for routes
authRouter.use(function(req, res, next){
	console.log("New AUTH request");
	next();
});

// First route
authRouter.get('/', function(req, res){
	res.json({message: 'Please login or register to continue'});
});

authRouter.post('/login',
	passport.authenticate('local', { 
		successRedirect: '/success',
		failureRedirect: '/failure'
	})
);

authRouter.post('/register',
	function(req, res){
		var user = new User();
		user.local.username = "theunexpected1";
		user.local.email = "rahul.vagadiya@gmail.com";
		user.local.password = "123.com";
		user.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: "user created!"});
		});
	}
);

module.exports = authRouter;