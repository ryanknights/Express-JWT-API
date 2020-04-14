const supertest = require('supertest');
const app = require('../../server');
const fetchToken = require('../modules/fetchToken');

let adminToken = null;
let userToken = null;
beforeAll(async (done) => {
  adminToken = await fetchToken('admin');
  userToken = await fetchToken('user');
  done();
});

// GET - api/users
describe('GET - api/users', () => {
  it('checks the users endpoint is not accessible without a token', async (done) => {
    const request = supertest(app);
    const response = await request.get('/api/users');
    expect(response.status).toBe(401);
    done();
  });

  // GET - api/users
  it('checks the users endpoint is not accessible to a non-admin', async (done) => {
    const request = supertest(app);
    request
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  // GET - api/users
  it('checks the users endpoint returns users', async (done) => {
    const request = supertest(app);
    request
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.users.length).toBeGreaterThan(0);
        done();
      });
  });
});


// DELETE - api/users/:ID
describe('DELETE - api/users/:id', () => {
  it('checks the delete users endpoint removes a user', async (done) => {
    const request = supertest(app);
    request
      .delete(`/api/users/${process.env.userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        done();
      });
  });
});
