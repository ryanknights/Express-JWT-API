const supertest = require('supertest');
const app = require('../../server');
const secureRequest = require('../modules/secureRequest');

// GET - api/authenticate
describe('GET - api/authenticate', () => {
  it('checks the authenticate endpoint is successful with correct token', async (done) => {
    const loginRequest = supertest(app);
    const loginResponse = await loginRequest
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'password',
      });
    const authRequest = secureRequest('get', '/api/authenticate', loginResponse.body.token.access);
    authRequest
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('user');
        done();
      });
  });

  it('checks the authenticate endpoint is unsuccessful with no token', async (done) => {
    const request = supertest(app);
    const response = await request.get('/api/authenticate');
    expect(response.status).toBe(401);
    done();
  });

  it('checks the authenticate endpoint is unsuccessful with malformed token', async (done) => {
    const request = supertest(app);
    const response = await request
      .get('/api/authenticate')
      .set('Authorization', 'Bearer ABC123');
    expect(response.status).toBe(401);
    done();
  });
});
