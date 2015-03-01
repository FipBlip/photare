// Models
var Photo = require('../models/photo.js');
var User = require('../models/user.js');
var express = require('express');
var authRouter = express.Router();
var passport = require('../lib/passport.js');
var app = express();

// Middleware for routes
authRouter.use(function(req, res, next){
	console.log('New AUTH request');
	next();
});

// First route
authRouter.get('/', function(req, res){
	res.json({message: 'Please login or register to continue'});
});

authRouter.post('/login',
	passport.authenticate('local', {
		successRedirect: '/successLogin',
		failureRedirect: '/failureLogin'
	})
);

authRouter.post('/register', passport.authenticate('register', {
	successRedirect: '/successRegister',
	failureRedirect: '/failureRegister'
}));

authRouter.get('/checkUserStatus', function(req, res){
	res.send(req.user);
});


authRouter.get('/logout', function(req, res){
	if(req.user){
		req.logout();
		res.send({message: "User logged out"});
	} else{
		res.send({message: "User not logged in!"});
	}
});

module.exports = authRouter;
