const supertest = require('supertest');
const app = require('../../server');
const fetchToken = require('../modules/fetchToken');
const secureRequest = require('../modules/secureRequest');

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

  it('checks the users endpoint is not accessible to a non-admin', async (done) => {
    const request = secureRequest('get', '/api/users', userToken);
    request
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  it('checks the users endpoint returns users', async (done) => {
    const request = secureRequest('get', '/api/users', adminToken);
    request
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
  const route = `/api/users/${process.env.userId}`;

  it('checks the delete user endpoint is not accessible without a token', async (done) => {
    const request = supertest(app);
    const response = await request.delete(route);
    expect(response.status).toBe(401);
    done();
  });

  it('checks the users endpoint is not accessible to a non-admin', async (done) => {
    const request = secureRequest('delete', route, userToken);
    request
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  it('checks the delete user endpoint removes a user', async (done) => {
    const request = secureRequest('delete', route, adminToken);
    request
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        done();
      });
  });
});
