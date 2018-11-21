function cartNum(req, res, next) {
	res.locals.cart = req.session.cart;
	res.locals.session = req.session;
	next();
}

module.exports = cartNum;