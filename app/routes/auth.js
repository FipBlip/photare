module.exports = function(System){

	// Models
	var mongoose = require('mongoose');
	var User = mongoose.model('User');

	// Passport
	var passport = require('../lib/passport.js')(System.app, User);
	var expressSession = require('express-session');
	// Router
	var authRouter = System.express.Router();

	// Auth Middleware
	System.app.use(expressSession({secret: 'photare kitty'}));
	System.app.use(passport.initialize());
	System.app.use(passport.session());

	// Middleware for routes
	authRouter.use(function(req, res, next){
		console.log('New AUTH request');
		next();
	});

	// Initial route
	authRouter.get('/', function(req, res){
		res.json({message: 'Please login or register to continue'});
	});

	authRouter.post('/login',
		passport.authenticate('login', {
			successRedirect: '/successLogin',
			failureRedirect: '/failureLogin'
		})
	);

	authRouter.post('/register', 
		passport.authenticate('register', {
			successRedirect: '/successRegister',
			failureRedirect: '/failureRegister'
		})
	);

	authRouter.get('/logout', function(req, res){
		if(req.user){
			req.logout();
			res.send({message: "User logged out"});
		} else{
			res.send({message: "User not logged in!"});
		}
	});

	authRouter.get('/checkUserStatus', function(req, res){
		res.send(req.user);
	});

	return authRouter;
};
