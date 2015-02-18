// Models
var Photo = require('../models/photo.js');
var express = require('express');
var authRouter = express.Router();

// Middleware for routes
authRouter.use(function(req, res, next){
	console.log("New AUTH request");
	next();
});

// First route
authRouter.get('/', function(req, res){
	res.json({message: 'Please login or register to continue'});
});

module.exports = authRouter;