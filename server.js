/**
 * Base setup
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

// Mongoose
var mongoose = require('mongoose');
// Models
var models = require('./app/models/index.js');
// Routes
var apiRouter = require('./app/routes/api.js')(app, express);
var authRouter = require('./app/routes/auth.js')(app, express);

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Mongo DB Connection
mongoose.connect('mongodb://localhost/photare'); // connect to our database
mongoose.connection.on("open", function(){
	console.log("Connected to Photare database");
});
mongoose.connection.on("error", function(){
	console.log("Failed to connect to Photare database");
});


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
app.get('/successLogin', function(req, res){
	res.json({message: "success after login"});
});
app.get('/failureLogin', function(req, res){
	res.json({message: "failure after login"});
});


// Start the server

app.listen(port);
console.log("Listening on port " + port);
