/**
 * Base setup
 */
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressSession({secret: 'photare kitty'}));
app.use(passport.initialize());
app.use(passport.session());


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
var apiRouter = require('./app/routes/api.js');
var authRouter = require('./app/routes/auth.js');

// Define api endpoint
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// ToDo: Refactor & Move into auth
app.get('/successRegister', function(req, res){
	res.json({message: "success after Register"});
});
app.get('/failureRegister', function(req, res){
	res.json({message: "failure after Register"});
});


/**
 * Start the server
 */

app.listen(port);
console.log("Listening on port " + port);
