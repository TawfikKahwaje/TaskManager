var jwt = require('jwt-simple');

module.exports = {
	errorLogger: function(error, req, res, next){
		console.log(error.stack);
		next(error);
	},

	errorHandler: function(error, req, res, next){
		res.send(500, {error: error});
	},

	decode: function(req, res, next){
		var token = req.headers['x-access-token'];
		console.log(token)
		var user;

		if(!token){ 
			res.status(409).send('No token provided.');
			return;
		}
		else{
			try{
				console.log('asdas')

				user = jwt.decode(token, 'souq');
				console.log('user, ', user)
				req.user = user.userId
				next();
			} catch(error) {
				res.status(409).send('Invalid x-access-token');
			}
		}
		
	},
	repsonseHandler: function(error, req, res, body, next) {
		if (error) {
			next(error, req, res);
		} else {
			res.status(body.status).send(body.returnObj);
		}
	}
};