function authentication(req, res, next) {
	res.status(401).send('Unauthorized');
	next();
}

module.exports = authentication;