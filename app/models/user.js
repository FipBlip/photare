var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	local: {
		username: 		String,
		email: 			String,
		password: 		String
	}
});

UserSchema.methods.isPasswordValid = function (password) {
	return bCrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', UserSchema);
