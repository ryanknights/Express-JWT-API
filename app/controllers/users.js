"use strict";

const User      = require('../models/User'),
	  userUtils = require('./user-utils');

exports.retrieveUsers = (req, res, next) =>
{
	User.find({}, {password: 0}, (err, users) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem retrieving the users');
		}
		
		return res.json({users: users});
	});
}

exports.retrieveUser = (req, res, next) =>
{
	User.findOne({_id : req.params.id}, {password: 0}, (err, user) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem retrieving the user');
		}

		if (!user)
		{
			return res.send(404, 'No user found');
		}

		return res.json({user: user});
	});
}

exports.deleteUser = (req, res, next) =>
{
	User.remove({_id : req.params.id}, (err, results) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem deleting the user');
		}

		if (!results)
		{
			return res.send(404, 'No user deleted');
		}

		return res.json({success: true});
	})
}

exports.editUser = (req, res, next) =>
{
	let promises = [];

	if (!req.body.email || !req.body.username)
	{
		return res.send(400, 'Please enter an email address and username');
	}

	User.findOne({_id: req.params.id}, (err, user) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem finding the user');
		}

		if (!user)
		{
			return res.send(404, 'No user found');
		}

		if (req.body.username !== user.username)
		{
			promises.push(userUtils.usernameIsUnique(req.body.username));
		}

		if (req.body.email !== user.email)
		{
			promises.push(userUtils.emailIsUnique(req.body.email));
		}

		Promise.all(promises).then((results) =>
		{
			let updateData =
			{
				username : req.body.username,
				email    : req.body.email,
				created  : req.body.created
			};

			User.update({_id : user._id}, {$set: updateData}, (err, result) =>
			{
				if (err || !result)
				{	
					return res.send(500, 'There was a problem updating the user');
				}

				return res.json({success: true});
			});

		}, (error) =>
		{
			return res.send(400, error);
		});
	});
}

exports.updatePassword = (req, res, next) =>
{
	const newPassword = req.body.newPassword;

	if (newPassword === undefined || newPassword === '')
	{
		return res.send(400, 'Please enter a new password');
	}

	User.findOne({_id: req.params.id}, (err, user) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem finding the user');
		}

		if (!user)
		{
			return res.send(404, 'No user found');
		}

		user.password = newPassword

		user.save((err) =>
		{
			if (err)
			{
				return res.send(500, 'There was a problem updating the password');
			}

			return res.json({success: true});
		});
	});
}