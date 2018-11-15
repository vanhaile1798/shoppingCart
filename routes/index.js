let app = require('express');

let User = require('../data/models/users');

let Book = require('../data/models/books');

let router = app.Router();

router.get('/', function(req, res) {

	let perPage = 8;
	let page = parseInt(req.query.page - 1) || 0;
	Book.find({})
		.skip(perPage * page)
		.limit(perPage).exec(function(err, books) {
		res.render('index', {title: 'BookStore', books});
	});
	
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.post('/login', function(req, res) {
	res.redirect('/');
});

router.get('/signup', function(req, res) {
	res.render('signup');
});

router.post('/signup', function(req, res, next) {
	let user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});



module.exports = router;
