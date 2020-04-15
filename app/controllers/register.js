const User = require('../models/User');

exports.register = (req, res, next) => {
  const username = req.body.username || '';
  const email = req.body.email || '';
  const password = req.body.password || '';

  if (username === '' || password === '' || email === '') {
    return res.status(400).send('Please enter a username, password and email address.');
  }

  return User.findOne({ email }, (err, user) => {
    if (err) {
      return res.send(500, 'There was a problem finding the user.');
    }

    if (user) {
      return res.send(400, 'A user with these details already exist.');
    }

    const newUser = new User({ username, email, password });

    return newUser.save((saveErr) => {
      if (saveErr) {
        return res.send(500, 'There was a problem saving the user.');
      }

      return res.json({ success: false });
    });
  });
};
