const supertest = require('supertest');
const app = require('../../server');

module.exports = async (user) => {
  const request = supertest(app);
  const data = { username: user, password: 'password' };
  return request
    .post('/api/login')
    .send(data)
    .then((response) => response.body.token.access);
};
