
module.exports = function(app, express){

	// Models
	var User = require('../models/user.js');
	// Passport
	var passport = require('../lib/passport.js')(app, User);
	var expressSession = require('express-session');
	// Router
	var authRouter = express.Router();

	// Auth Middleware
	app.use(expressSession({secret: 'photare kitty'}));
	app.use(passport.initialize());
	app.use(passport.session());

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

	return authRouter;
}