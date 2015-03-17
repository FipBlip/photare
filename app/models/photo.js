var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');

var PhotoSchema = Schema({
	title: String,
	image: String,
	url: String,
	shortUrl: String,
	user: {
		type: Schema.ObjectId,
		required: false,
		ref: 'User'
	}
});

mongoose.model('Photo', PhotoSchema);