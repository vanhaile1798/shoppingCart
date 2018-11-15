let express = require('express');

let Book = require('../data/models/books');

let router = express.Router();

router.get('/:id', function(req, res) {
	let bookId = req.params.id;

	Book.findById(bookId, function(err, book) {
		if (err) {
			return next(err);
		}

		res.render('book', {book});
	});

});

module.exports = router;