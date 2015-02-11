var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = Schema({
	title: String,
	image: String,
	url: String/*,
	meta: {
		views: Number,
		downloads: Number
	}*/
});

module.exports = mongoose.model('Photo', PhotoSchema);