const supertest = require('supertest')
const app = require('../../app')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { connect, close_connection } = require('../../db')
const { createUser } = require('../test_helper')
const { usersData, usersSampleData } = require('../data/users')
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
    const user = usersSampleData(1)[0]

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

  test('get all users', async () => {
    // Create users and map to object by id
    const promiseArray = usersData.toJS()
      .map(user => createUser(user))
    const users = await Promise.all(promiseArray)
    const usersMap = new Map(users.map((obj) => [obj.id, obj]))

    const response = await api
      .get('/api/users')
      .expect(200)

    expect(response.body.length).toEqual(users.length)

    for(let u of response.body){
      expect(usersMap.has(u.id)).toEqual(true)
      const dbUser = usersMap.get(u.id)
      expect(dbUser).toHaveProperty('username', u.username)
      expect(dbUser).toHaveProperty('name', u.name)
    }
  })
})