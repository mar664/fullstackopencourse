const supertest = require('supertest')
const app = require('../../app')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { connect, close_connection } = require('../../db')
const { loadUsersInDB, loadBlogsInDB } = require('../test_helper')
const { usersSampleData } = require('../data/users')
const Blog = require('../../models/blog')
const api = supertest(app)
let usersInDb = null
let blogsInDb = null

beforeAll(async () => {
  await connect()
})

beforeEach(async () => {
  await Blog.deleteMany({})
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
    usersInDb = await loadUsersInDB()
    blogsInDb = await loadBlogsInDB(usersInDb)

    const response = await api
      .get('/api/users')
      .expect(200)

    expect(response.body.length).toEqual(usersInDb.size)

    for(let u of response.body){
      expect(usersInDb.has(u.id)).toEqual(true)
      const dbUser = usersInDb.get(u.id)
      expect(dbUser).toHaveProperty('username', u.username)
      expect(dbUser).toHaveProperty('name', u.name)
      expect(dbUser).toHaveProperty('blogs')
    }
  })

  describe('attempt to create invalid user fails', () => {
    test('missing fields', async () => {
      const missingAllFieldsResponse = await api
        .post('/api/users')
        .send({})
        .expect(400)

      expect(missingAllFieldsResponse.body.error).toEqual('username, name or password missing')

      const userMissingName = usersSampleData(1)[0]
      delete userMissingName.name
      const missingNameResponse = await api
        .post('/api/users')
        .send(userMissingName)
        .expect(400)

      expect(missingNameResponse.body.error).toEqual('username, name or password missing')

      const userMissingUsername = usersSampleData(1)[0]
      delete userMissingUsername.username

      const missingUsernameResponse = await api
        .post('/api/users')
        .send(userMissingUsername)
        .expect(400)

      expect(missingUsernameResponse.body.error).toEqual('username, name or password missing')

      const userMissingPassword = usersSampleData(1)[0]
      delete userMissingPassword.password

      const missingPasswordResponse = await api
        .post('/api/users')
        .send(userMissingPassword)
        .expect(400)

      expect(missingPasswordResponse.body.error).toEqual('username, name or password missing')
    })

    test('fields too short', async () => {
      const userPasswordTooShort = usersSampleData(1)[0]
      userPasswordTooShort.password = userPasswordTooShort.password.slice(0, 2)

      expect(userPasswordTooShort.password.length).toBeLessThanOrEqual(2)

      const passwordTooShortResponse = await api
        .post('/api/users')
        .send(userPasswordTooShort)
        .expect(400)

      expect(passwordTooShortResponse.body.error).toEqual('username and password must be 3 or more characters long')

      const userUsernameTooShort = usersSampleData(1)[0]
      userUsernameTooShort.username = userUsernameTooShort.username.slice(0, 2)

      expect(userUsernameTooShort.username.length).toBeLessThanOrEqual(2)

      const usernameTooShortResponse = await api
        .post('/api/users')
        .send(userUsernameTooShort)
        .expect(400)

      expect(usernameTooShortResponse.body.error).toEqual('username and password must be 3 or more characters long')
    })
  })

})