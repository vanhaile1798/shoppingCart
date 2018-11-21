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

router.get('/delete/:id', function(req, res) {
	Book.findByIdAndRemove(req.params.id, function(err, book) {
		if (err) {
			next(err);
		}
		console.log('Removed successfully!');
		res.redirect('/admin');
	});
});

module.exports = router;