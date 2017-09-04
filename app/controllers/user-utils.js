"use strict";

const User = require('../models/User');

exports.usernameIsUnique = (username) =>
{	
	return new Promise((resolve, reject) =>
	{
		User.findOne({username: username}, (err, user) =>
		{
			if (err)
			{
				return reject('There was an error finding the user');
			}

			if (user)
			{
				return reject('A user with this username already exists');
			}

			return resolve('Username is unique');
		});
	});
}

exports.emailIsUnique = (email) =>
{
	return new Promise((resolve, reject) =>
	{
		User.findOne({email: email}, (err, user) =>
		{
			if (err)
			{
				return reject('There was an error finding the user');
			}

			if (user)
			{
				return reject('A user with this email already exists');
			}

			return resolve('Email is unique');
		});
	});
}