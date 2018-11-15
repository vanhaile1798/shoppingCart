let express = require('express');

let Book = require('../data/models/books');

let router = express.Router();

router.get('/', function(req, res) {
	res.render('admin');
});

router.get('/addbook', function(req, res) {
	res.render('addbook');
});

router.post('/addbook', function(req, res, next) {
	req.body.price = parseInt(req.body.price);
	let book = req.body;
	Book.create(book, function(err) {
		if (err) {
			return next(err);
		}
	})
	res.redirect('/admin');
});

module.exports = router;