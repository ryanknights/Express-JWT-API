const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = require('../config/secret');

exports.login = (req, res, next) => {
  const username = req.body.username || '';
  const password = req.body.password || '';

  if (username === '' || password === '') {
    return res.send(400, 'Please enter a username and password');
  }

  return User.findOne({ username }, (err, user) => {
    if (err) {
      return res.send(500, 'There was a problem finding the user');
    }

    if (!user) {
      return res.send(401);
    }

    return user.comparePassword(password, (isMatch) => {
      if (!isMatch) {
        return res.send(401);
      }

      if (user.refreshToken === 'false') {
        user.refreshToken = user.createRefreshToken();
      } else {
        jwt.verify(user.refreshToken, jwtSecret.secret, () => {
          if (err && err.name === 'TokenExpiredError') {
            user.refreshToken = user.createRefreshToken();
          }
        });
      }

      const accessToken = user.createAccessToken();

      return user.save()
        .then(() => {
          res.json({
            user: { username: user.username, userid: user._id, isAdmin: user.isAdmin },
            token: { access: accessToken, refresh: user.refreshToken },
            test: { jenkinsbuild: true },
          });
        });
    });
  });
};
