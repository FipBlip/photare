/**
 * Base setup
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/**
 * Mongo DB Connection
 */
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/photare'); // connect to our database
mongoose.connection.on("open", function(){
	console.log("Connected to Photare database");
});

/**
 * Router
 */
var router = express.Router();
var port = process.env.PORT || 8080;

router.get('/', function(req, res){
	res.json({message: 'Welcome to Photare'});
});

/**
 * Define api endpoint
 */
app.use('/api', router);

/**
 * Start listening
 */
app.listen(port);
console.log("Listening...");