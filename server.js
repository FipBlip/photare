/**
 * Base setup
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Mongo DB Connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/photare'); // connect to our database
mongoose.connection.on("open", function(){
	console.log("Connected to Photare database");
});
mongoose.connection.on("error", function(){
	console.log("Failed to connect to Photare database");
});

/**
 * Routes
 */
var router = require('./app/routes.js');
// Define api endpoint
app.use('/api', router);

/**
 * Start the server
 */

app.listen(port);
console.log("Listening on port " + port);
