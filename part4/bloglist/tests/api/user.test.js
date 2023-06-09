const supertest = require('supertest')
const app = require('../../app')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { connect, close_connection } = require('../../db')
const api = supertest(app)

beforeAll(async () => {
  await connect()
})

beforeEach(async () => {
  await User.deleteMany({})

})

afterAll(async () => {
  await close_connection()
})

describe('user testing', () => {
  test('create new user', async () => {
    const user = {
      username: 'Johny',
      password:'mypassword',
      name:'Johnny Sayer'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('username', user.username)
    expect(response.body).toHaveProperty('name', user.name)

    // Check to ensure these are never returned
    expect(response.body.password).toBeUndefined()
    expect(response.body.passwordHash).toBeUndefined()

    const { id } = response.body

    const savedUser = await User.findById(id)

    expect(savedUser).toHaveProperty('username', user.username)
    expect(savedUser).toHaveProperty('name', user.name)
    expect(savedUser.passwordHash).toBeDefined()

    // Check password hash is saved correctly
    expect(bcrypt.compare(user.password, savedUser.passwordHash)).resolves.toBe(true)
  })
})