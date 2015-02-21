var passport = require('passport');
var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;


passport.use('local', new LocalStrategy(
	function(username, password, done) {
		User.findOne({ "local.username": username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			// if (!user.validPassword(password)) {
			// 	return done(null, false, { message: 'Incorrect password.' });
			// }
			return done(null, user);
		});
	}
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = passport;