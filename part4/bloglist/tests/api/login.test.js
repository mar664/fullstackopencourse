const supertest = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const { connect, close_connection } = require('../../db');
const { loadUsersInDB } = require('../test_helper');
const { usersSampleData } = require('../data/users');
const api = supertest(app);

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await User.deleteMany({});
  await loadUsersInDB();
});

afterAll(async () => {
  await close_connection();
});

describe('user testing', () => {
  test('successful login', async () => {
    const user = usersSampleData(1)[0];

    await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
      .expect(200);
  });

  test('unsuccessful login by username', async () => {
    const user = usersSampleData(1)[0];
    expect(user.username.slice(0, 4)).not.toEqual(user.username);

    await api
      .post('/api/login')
      .send({ username: user.username.slice(0, 4), password: user.password })
      .expect(401);
  });

  test('unsuccessful login by password', async () => {
    const user = usersSampleData(1)[0];

    expect(user.password.slice(0, 4)).not.toEqual(user.password);

    await api
      .post('/api/login')
      .send({ username: user.username, password: user.password.slice(0, 4) })
      .expect(401);
  });
});
