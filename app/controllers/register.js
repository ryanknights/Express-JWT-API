"use strict";

const User = require('../models/User');

exports.register = (req, res, next) =>
{
	let username = req.body.username || '',
		email    = req.body.email || '',
		password = req.body.password || '';

	if (username === '' || password === '' || email === '')
	{
		return res.status(400).send('Please enter a username, password and email address.');
	}

	User.findOne({email : email}, (err, user) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem finding the user.');
		}

		if (user)
		{
			return res.send(400, 'A user with these details already exist.');
		}

		let newUser = new User({username : username, email : email, password : password});

		newUser.save((err) =>
		{
			if (err)
			{
				return res.send(500, 'There was a problem saving the user.');
			}

			return res.json({success : true});
		});
	});
}