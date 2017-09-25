"use strict";

const User = require('../models/User');

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
