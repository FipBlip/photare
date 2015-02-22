var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	local: {
		username: 		String,
		email: 			String,
		password: 		String
	}
});

UserSchema.methods.isPasswordValid = function (password) {
	return this.local.password == password;
};


module.exports = mongoose.model('User', UserSchema);
