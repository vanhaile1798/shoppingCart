function authentication(req, res, next) {

	if (req.session.user) {
		if (req.session.user.username != 'admin') {
		res.status(401).send('Unauthorized');

	} else {
		next();
	}
	} else {
		res.status(401).send('Unauthorized');
	}
	
	
	
}

module.exports = authentication;