function cartNum(req, res, next) {
	res.locals.cart = req.session.cart;
	next();
}

module.exports = cartNum;