let express = require('express');

let Book = require('../data/models/books');

let db = require('../db/db');

let router = express.Router();

router.get('/', function(req, res) {
	// console.log(req.session.cart);
	res.render('cart');
});

router.get('/api', function(req, res) {
	res.json(req.session.cart);
});
router.get('/:id', function(req, res, next) {

	function Cart(oldCart) {
		this.items = oldCart.items || {};
		this.totalQty = oldCart.totalQty || 0;
		this.totalAmount = oldCart.totalAmount || 0;

		this.add = function(item, id) {
			
			if (!this.items[id]) {
				this.items[id] = {item: item, qty: 0, price: 0}; 
			}

			this.items[id].qty++;
			this.items[id].price = this.items[id].qty * this.items[id].item.price;
			this.totalQty++;
			this.totalAmount += this.items[id].item.price;
		}
	}


	// Book.findById(req.params.id, function(err, book) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	let book = db
				.get('books')
				.find({id: req.params.id})
				.value();

	let cart = new Cart(req.session.cart ? req.session.cart : {});

	
	if (!cart.items[book.id]) {
		cart.add(book, book.id);
		req.session.cart = cart;
		res.redirect('/cart');
	} else
		if (cart.items[book.id].qty < 10) {
		cart.add(book, book.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/cart');
	} else {
		console.log('Cannot add more books');
		res.render('book', {error: 'Cannot add more than 10 books at the moment', book});
	}
			
		// console.log(cart);	
		
		
		
	// });
	
});

router.post('/update', function(req, res, next) {
	let data = req.body;
	let items = req.session.cart.items;
	
	for (let index in items) {
		if (index == data.id) {
			
			items[index].price = items[index].price / items[index].qty * data.qty;
			items[index].qty = data.qty;
		}
	}
	req.session.cart.items = items;
	req.session.cart.totalQty = data.totalQty;
	req.session.cart.totalAmount = data.totalAmount;


	res.redirect('/cart');
});
module.exports = router;