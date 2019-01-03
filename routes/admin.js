let express = require('express');

const shortid = require('shortid');

let db = require('../db/db');

let Book = require('../data/models/books');

let router = express.Router();

router.get('/', function(req, res) {
	let perPage = 8;
	let page = parseInt(req.query.page - 1) || 0;
	// Book.find({})
	// 	.skip(perPage * page)
	// 	.limit(perPage).exec(function(err, books) {
	// 	res.render('admin', {title: 'Dashboard', books});
	// });
	let books = db.get('books').value();
	// console.log(books);
	res.render('admin', {title: 'Dashboard', books});
});

router.get('/addbook', function(req, res) {
	res.render('addbook');
});

router.post('/addbook', function(req, res, next) {
	req.body.price = parseInt(req.body.price);
	let book = req.body;
	// Book.create(book, function(err) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// })
	db
	.get('books')
	.push({id: shortid.generate(), ...book})
	.write();
	res.redirect('/admin');
});

module.exports = router;