"use strict";

const User      = require('../models/User'),
	  jwt       = require('jsonwebtoken'),
	  jwtSecret = require('../config/secret');

exports.authenticate = (req, res, next) =>
{
	if (!req.user)
	{
		return res.send(401);
	}

	User.findOne({_id: req.user.userid}, (err, user) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem finding the user');
		}

		if (!user)
		{
			return res.send(401, 'No user could be found');
		}

		return res.json({user : {username : user.username, userid : user._id, isAdmin : user.isAdmin}});
	});	
}

exports.refreshToken = (req, res, next) =>
{	
	let refreshToken = req.body.token;

	if (!refreshToken) // No refresh token supplied
	{
		return res.send(401);
	}

	jwt.verify(refreshToken, jwtSecret.secret, (err, decoded) =>
	{
		User.findOne({refreshToken: refreshToken}, (err, user) => // Find a user with the supplied refresh token
		{
			if (err || !user) // Error finding user or no user exists with the supplied refresh token
			{
				return res.send(401);
			}

			let accessToken = jwt.sign({userid: user._id, isAdmin: user.isAdmin}, jwtSecret.secret, {expiresIn : '10s'}); // Create new access token

			return res.json({token : {access: accessToken, refresh: refreshToken}}); // Send back both tokens
		});
	});
}

exports.revokeRefreshToken = (req, res, next) =>
{
	let refreshToken = req.body.token;

	if (!refreshToken)
	{
		return res.send(401);
	}

	jwt.verify(refreshToken, jwtSecret, (err, decoded) =>
	{
		User.update({refreshToken : refreshToken}, {$set: {refreshToken: false}}, (err, result) =>
		{
			if (err || !result)
			{
				return res.send(500, 'There was a problem revoking the refresh token');
			}

			return res.json({success: true});
		});
	});
}

