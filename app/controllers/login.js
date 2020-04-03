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

      const token = jwt.sign(
        { userid: user._id, isAdmin: user.isAdmin },
        jwtSecret.secret,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_DURATION },
      );
      let refreshToken;

      if (user.refreshToken === 'false') {
        refreshToken = jwt.sign(
          { userid: user._id, isAdmin: user.isAdmin },
          jwtSecret.secret,
          { expiresIn: process.env.JWT_REFRESH_TOKEN_DURATION },
        );
        user.refreshToken = refreshToken;
      } else {
        jwt.verify(user.refreshToken, jwtSecret.secret, () => {
          if (err && err.name === 'TokenExpiredError') {
            refreshToken = jwt.sign(
              { userid: user._id, isAdmin: user.isAdmin },
              jwtSecret.secret,
              { expiresIn: process.env.JWT_REFRESH_TOKEN_DURATION },
            );
            user.refreshToken = refreshToken;
          }
        });
      }

      return user.save()
        .then(() => {
          res.json({
            user: { username: user.username, userid: user._id, isAdmin: user.isAdmin },
            token: { access: token, refresh: user.refreshToken },
          });
        });
    });
  });
};
