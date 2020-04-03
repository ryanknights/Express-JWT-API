const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = require('../config/secret');

exports.authenticate = (req, res, next) => {
  if (!req.user) {
    return res.send(401);
  }

  return User.findOne({ _id: req.user.userid }, (err, user) => {
    if (err) {
      return res.send(500, 'There was a problem finding the user');
    }

    if (!user) {
      return res.send(401, 'No user could be found');
    }

    return res.json({ user: { username: user.username, userid: user._id, isAdmin: user.isAdmin } });
  });
};

exports.refreshToken = (req, res, next) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.send(401);
  }

  return jwt.verify(refreshToken, jwtSecret.secret, () => {
    User.findOne({ refreshToken }, (err, user) => {
      if (err || !user) {
        return res.send(401);
      }
      const accessToken = user.createAccessToken();
      return res.json(
        { token: { access: accessToken, refresh: refreshToken } },
      );
    });
  });
};

exports.revokeRefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.send(401);
  }

  return jwt.verify(refreshToken, jwtSecret, () => {
    User.update({ refreshToken }, { $set: { refreshToken: false } }, (err, result) => {
      if (err || !result) {
        return res.send(500, 'There was a problem revoking the refresh token');
      }

      return res.json({ success: true });
    });
  });
};
