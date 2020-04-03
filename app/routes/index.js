const users = require('./users');
const posts = require('./posts');
const auth = require('./authenticate');
const register = require('./register');
const login = require('./login');

module.exports = (app) => {
  app.use('/api/users', users);
  app.use('/api/posts', posts);
  app.use('/api/authenticate', auth);
  app.use('/api/register', register);
  app.use('/api/login', login);
};
