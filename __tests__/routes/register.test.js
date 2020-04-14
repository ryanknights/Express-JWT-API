const supertest = require('supertest');
const app = require('../../server');

// POST - api/register
describe('POST - api/register', () => {
  it('checks the register endpoint creates a new user', async (done) => {
    const request = supertest(app);
    const response = await request
      .post('/api/register')
      .send({
        username: 'newuser',
        email: 'new@user.com',
        password: 'password',
      });
    expect(response.status).toBe(200);
    done();
  });

  it('checks the register endpoint cannot create a duplicate user', async (done) => {
    const request = supertest(app);
    const response = await request
      .post('/api/register')
      .send({
        username: 'duplicate',
        email: 'duplicate@test.com',
        password: 'password',
      });
    expect(response.status).toBe(400);
    expect(response.text).toBe('A user with these details already exist.');
    done();
  });

  it('checks the register endpoint cannot create a user without required details', async (done) => {
    const request = supertest(app);
    const response = await request
      .post('/api/register')
      .send({
        username: 'duplicate',
        email: 'duplicate@test.com',
      });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Please enter a username, password and email address.');
    done();
  });
});
