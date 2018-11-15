let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	email: {
		type: String,
		unique: true
	}
});


module.exports = userSchema;