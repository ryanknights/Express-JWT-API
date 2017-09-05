"use strict";

const mongoose = require('mongoose'),
	  bcrypt   = require('bcrypt');

const userSchema = mongoose.Schema(
{
	username :
	{
		type     : String,
		required : true,
		unique   : true
	},
	email :
	{
		type     : String,
		required : true,
		unique   : true,
	},
	password :
	{
		type     : String,
		required : true
	},
	created :
	{
		type    : Date,
		default : Date.now
	},
	isAdmin :
	{
		type    : Boolean,
		default : false
	},
	refreshToken :
	{
		type    : String,
		default : false
	}
});

userSchema.pre('save', function (next)
{
	if (!this.isModified('password'))
	{
		return next();
	}

	bcrypt.genSalt(10, (err, salt) =>
	{
		if (err)
		{
			return next(err);
		}

		bcrypt.hash(this.password, salt, (err, hash) =>
		{
			if (err)
			{
				return next(err);
			}

			this.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (password, callback)
{
	bcrypt.compare(password, this.password, function (err, isMatch)
	{
		console.log(err);
		
		if (err)
		{
			return callback(err);
		}

		callback(isMatch);
	});
}

module.exports = mongoose.model('User', userSchema);