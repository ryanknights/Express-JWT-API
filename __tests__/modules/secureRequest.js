const supertest = require('supertest');
const app = require('../../server');

module.exports = (method, route, token) => {
  const request = supertest(app);
  return request[method](route).set('Authorization', `Bearer ${token}`);
};
