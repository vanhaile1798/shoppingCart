let app = require('express');

let User = require('../data/models/users');

let Book = require('../data/models/books');

let db = require('../db/db');

let shortid = require('shortid');

let checkLoggedIn = require('./checkLoggedIn');
let notLoggedIn = require('./notLoggedIn');

let router = app.Router();

router.get('/', function(req, res) {

	let perPage = 8;
	let page = parseInt(req.query.page - 1) || 0;
	// Book.find({})
	// 	.skip(perPage * page)
	// 	.limit(perPage).exec(function(err, books) {
	// 	res.render('index', {title: 'BookStore', books});
	// });
	let books = db
				.get('books')
				.value();
	res.render('index', {title: 'BookStore', books});
	
});

router.get('/login', checkLoggedIn, function(req, res) {
	res.render('login');
});

router.post('/login', checkLoggedIn,function(req, res, next) {
	let data = req.body;
	// User.findOne({username: data.username, password: data.password}, function(err, user) {
	// 	if (err) {
	// 		next(err);
	// 	}
	// 	if (user) {
	// 		req.session.user = user;
	// 		console.log(req.session.user.username);
	// 		res.redirect('/');
	// 	} else {
	// 		res.render('login', {err: 'Wrong username/password'});
	// 	}
	// });
	
	let user = db.get('users')
		.find({username: data.username, password: data.password})
		.value();
	if (user) {
		req.session.user = user;
		console.log(req.session.user.username);
		res.redirect('/');
	} else {
		res.render('login', {err: 'Wrong username/password'});
	}
});

router.get('/signup', checkLoggedIn, function(req, res) {
	res.render('signup');
});

router.post('/signup', checkLoggedIn,function(req, res, next) {
	// let user = new User(req.body);
	// user.save(function(err) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	res.redirect('/');
	// });

	db.get('users')
		.push({id: shortid.generate(), ...req.body})
		.write();
	res.redirect('/');

});

router.get('/logout', function(req, res) {
	req.session.destroy();
	console.log(req.session);	
	res.redirect('/');
});

router.get('/checkout', notLoggedIn, function(req, res) {
	res.redirect('/');
});


module.exports = router;
