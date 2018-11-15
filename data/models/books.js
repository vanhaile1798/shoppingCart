let mongoose = require('mongoose');

let BookSchema = require('../schemas/books');

let book = mongoose.model('Book', BookSchema);

module.exports = book;