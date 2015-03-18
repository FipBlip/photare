var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');

var PhotoSchema = Schema({
	title: String,
	image: {
		type: String,
		required: true
	},
	url: String,
	shortUrl: String,
	user: {
		type: Schema.ObjectId,
		required: false,
		ref: 'User'
	}
});

mongoose.model('Photo', PhotoSchema);