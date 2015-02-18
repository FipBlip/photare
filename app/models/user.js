var mongoose = requre('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	local: {
		email: 		String,
		password: 	String
	}
});

module.exports = mongoose.model('User', UserSchema);
