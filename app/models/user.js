var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	local: {
		username: 		String,
		email: 			String,
		password: 		String
	}
});

module.exports = mongoose.model('User', UserSchema);
