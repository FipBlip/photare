/**
 * Base setup
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Mongo DB Connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/photare'); // connect to our database
mongoose.connection.on("open", function(){
	console.log("Connected to Photare database");
});

/**
 * Routes
 */
var router = express.Router();

router.get('/', function(req, res){
	res.json({message: 'Welcome to Photare'});
});


// Define api endpoint

app.use('/api', router);

/**
 * Start the server
 * */

app.listen(port);
console.log("Listening...");