"use strict";

const User      = require('../models/User'),
	  jwt       = require('jsonwebtoken'),
	  jwtSecret = require('../config/secret');

exports.login = (req, res, next) =>
{
	let username = req.body.username || '',
		password = req.body.password || '';

	if (username === '' || password === '')
	{
		return res.send(400, 'Please enter a username and password');
	}

	User.findOne({username : username}, (err, user) =>
	{	
		console.log(err);
		if (err)
		{
			return res.send(500, 'There was a problem finding the user');
		}

		console.log(user);
		if (!user)
		{
			return res.send(401);
		}

		user.comparePassword(password, (isMatch) =>
		{
			console.log(isMatch);
			if (!isMatch)
			{
				return res.send(401);
			}

			let token = jwt.sign({userid: user._id, isAdmin: user.isAdmin}, jwtSecret.secret, {expiresIn : '10m'}),
				refreshToken;

			if (user.refreshToken === "false") // If user does not have a refresh token assigned
			{
				refreshToken = jwt.sign({userid: user._id, isAdmin: user.isAdmin}, jwtSecret.secret, {expiresIn : '365d'});
				user.refreshToken = refreshToken;
			}
			else // User has a refresh token so try and verify it and renew if expired
			{
				jwt.verify(user.refreshToken, jwtSecret.secret, (err, decoded) =>
				{
					if (err && err.name === 'TokenExpiredError')
					{
						refreshToken = jwt.sign({userid: user._id, isAdmin: user.isAdmin}, jwtSecret.secret, {expiresIn : '365d'});
						user.refreshToken = refreshToken;						
					}
				});
			}

			user.save().then((err) => // Update refresh token if applicable and send back user data and tokens
			{
				return res.json({user : {username : user.username, userid : user._id, isAdmin : user.isAdmin}, token : {access: token, refresh: user.refreshToken}});
			});
		});
	});
}