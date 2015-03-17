module.exports = function(app, User){

	// Requires
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	
	// Auth Middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Login middleware
	passport.use('login', new LocalStrategy({
			passReqToCallback : true,
			usernameField: 'email',
			passwordField: 'password'
		},
		function(req, email, password, done) {
			User.findOne({ 'local.email': email }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.isPasswordValid(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				// Session
				req.login(user, function(err){
					if (err) {
						return next(err);
					}
					console.log('User logged in with email:' + req.user.local.email);
				});

				return done(null, user);
			});
		}
	));

	// Register middleware
	passport.use('register', new LocalStrategy({
			passReqToCallback : true,
			usernameField: 'email',
			passwordField: 'password'
		},
		function(req, email, password, done) {
			// find a user in Mongo with provided username
			User.findOne({'local.email': email},function(err, user) {
				// In case of any error return
				if (err){
					console.log('Error in SignUp: '+err);
					return done(err);
				}
				// already exists
				if (user) {
					console.log('User already exists');
					return done(null, false, {message: 'User already exists'});
						// req.flash('message', 'User Already Exists'));
				} else {
					// if there is no user with that email
					// create the user
					var newUser = new User();
					// set the user's local credentials
					newUser.local.username = req.param('username');
					newUser.local.password = password;
					newUser.local.email = email;

					// save the user
					newUser.save(function(err) {
						if (err){
							console.log('Error in Saving user: '+err);	
							throw err;	
						}
						console.log('User Registration succesful');	
						return done(null, newUser);
					});
				}
			});
		})
	);

	// User serialization & deserialization for reading
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	return passport;
};

