const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

module.exports = mongoose.model('User', userSchema);
