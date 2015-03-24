/**
 * Base setup
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var oknow = require('oknow');
var mongoose = require('mongoose');
var config = require('./app/config/index.js');
var models = require('./app/models/index.js');
var flash = require('connect-flash');

var app = express();
var port = process.env.PORT || 8080;
var System = {
	app: app,
	express: express,
	config: config,
	oknow: oknow
};
var apiRouter = require('./app/routes/api.js')(System);
var authRouter = require('./app/routes/auth.js')(System);

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({ dest: config.uploadsDir}));
app.use(flash());

// Mongo DB Connection
mongoose.connect('mongodb://localhost/photare'); // connect to our database
mongoose.connection.on("open", function(){
	console.log("Connected to Photare database");
});
mongoose.connection.on("error", function(){
	console.log("Failed to connect to Photare database");
});


// Routes - Server - Define auth & api endpoint
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Routes - Server - auth
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
    console.log(req.flash('error'));
	res.json({message: "failure after login"});
});

// Routes - Client - Set /public as our static content dir
app.use('/', express.static(__dirname + '/public/'));
app.get('*', function(req, res){
	res.setHeader('Content-Type', 'text/html');
	res.sendfile('./app/public/views/index.html');
});


// Start the server
app.listen(port);
console.log("Listening on port " + port);