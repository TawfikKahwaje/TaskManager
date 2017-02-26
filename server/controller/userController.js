var models  = require('../models');
var jwt = require('jwt-simple');
var repsonseHandler = require('../config/helpers.js').repsonseHandler;


module.exports = {

	signup : function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;

		models.User.findOne({ where: {username: username} })
		.then(function(user) {
			if(user !== null){
				console.log('User already exist')
				res.status(409).send('User already exist');
			}
			else{
				models.User.create({
				  username: username,
				  password: password
				  }).then(function(newUser) {
				  	// newUser.generateHash(password)
				  	var token = jwt.encode({userId : newUser.userid}, 'souq');
					// res.setHeader('x-access-token',token);
					repsonseHandler(null, req, res, {status: 200, returnObj: {token : token}}, next);
				  })
			}	
		})
		.catch(function (err) {
			res.send(err);
		})
	},

	signin: function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;
		models.User.findOne({ where: {username: username} })
			.then(function (user) {
					
				if (!user) {
					res.status(404).send('Invalid User Name')
					// repsonseHandler('User does not exist', req, res, {status: 404, returnObj:{}}, next);
				} 
				else {
					console.log('sadasd')
					if(!user.validPassword(password)){
						res.status(500).send('Wrong Password');
					} 
					else {
						var token = jwt.encode({userId : user.userid}, 'souq');
						// res.setHeader('x-access-token',token);
						repsonseHandler(null, req, res, {status: 200, returnObj: {token : token}}, next);
					}
				}
			})
			.catch(function (err) {
				console.log('err', err)

				res.status(500).send(err);
			})

	}
}
