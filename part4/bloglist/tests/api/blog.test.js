const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../../models/blog')
const { initialBlogs } = require('../test_helper')
const { connect, close_connection } = require('../../db')
const api = supertest(app)

beforeAll(async () => {
  await connect()
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(async () => {
  await close_connection()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

