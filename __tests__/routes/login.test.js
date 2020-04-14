const supertest = require('supertest');
const app = require('../../server');

// POST - api/login
describe('POST - api/login', () => {
  it('checks the login endpoint is successful with correct credentials', async (done) => {
    const request = supertest(app);
    const response = await request
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'password',
      });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    done();
  });

  it('checks the login endpoint is unsuccessful with incorrect credentials', async (done) => {
    const request = supertest(app);
    const response = await request
      .post('/api/login')
      .send({
        username: 'hacker',
        password: 'secretpassword',
      });
    expect(response.status).toBe(401);
    done();
  });

  it('checks the login endpoint is unsuccessful with missing credentials', async (done) => {
    const request = supertest(app);
    const response = await request
      .post('/api/login')
      .send({
        username: 'hacker',
      });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Please enter a username and password');
    done();
  });
});
