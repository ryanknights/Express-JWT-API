const supertest = require('supertest');
const app = require('../../server');

// GET - api/test
it('gets the test endpoint', async (done) => {
  const request = supertest(app);
  const response = await request.get('/api/test');
  expect(response.status).toBe(200);
  done();
});
