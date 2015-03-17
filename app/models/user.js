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

// Generates hash using bCrypt before save action
UserSchema.pre('save', function(next){
	this.local.password = bCrypt.hashSync(this.local.password, bCrypt.genSaltSync(10), null);
	next();
});

mongoose.model('User', UserSchema);
