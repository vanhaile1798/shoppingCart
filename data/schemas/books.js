let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let books = new Schema({
	title: String,
	author: String,
	price: Number,
	description: String,
	category: String
});

module.exports = books;