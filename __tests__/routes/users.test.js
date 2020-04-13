const supertest = require('supertest');
const app = require('../../server');

// GET - api/users
it('gets the users endpoint', async (done) => {
  const request = supertest(app);
  const response = await request.get('/api/users');
  expect(response.status).toBe(200);
  done();
});
