// Models
var Photo = require('../models/photo.js');
var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
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
	passport.authenticate('local', { successRedirect: '/success',
		failureRedirect: '/failure'})
);

module.exports = authRouter;