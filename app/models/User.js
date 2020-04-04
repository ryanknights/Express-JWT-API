const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/secret');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: false,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (genErr, salt) => {
    if (genErr) {
      return next(genErr);
    }

    return bcrypt.hash(this.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      this.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    return callback(isMatch);
  });
};

userSchema.methods.createAccessToken = function () {
  return jwt.sign(
    { userid: this._id, isAdmin: this.isAdmin },
    jwtSecret.secret,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_DURATION },
  );
};

userSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    { userid: this._id, isAdmin: this.isAdmin },
    jwtSecret.secret,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_DURATION },
  );
};

module.exports = mongoose.model('User', userSchema);
