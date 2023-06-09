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

  const blogObjects = initialBlogs.toJS()
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(async () => {
  await close_connection()
})

describe('blog testing', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.size)
  })

  test('blog is saved', async () => {
    const blogsBeforeTest = await Blog.find().count()
    const blog = initialBlogs.get(0).toJS()

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.id).toBeDefined()

    const blogsAfterTest = await Blog.find().count()

    expect(blogsAfterTest).toEqual(blogsBeforeTest + 1)

    const savedBlog = await Blog.findById(response.body.id)

    expect(savedBlog.title).toEqual(blog.title)
    expect(savedBlog.author).toEqual(blog.author)
    expect(savedBlog.url).toEqual(blog.url)
    expect(savedBlog.likes).toEqual(blog.likes)
  })

  test('blog is saved without a likes property, defaults to zero', async () => {
    console.log(initialBlogs)
    const blog = initialBlogs.get(0).toJS()
    delete blog.likes
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toEqual(0)
  })

  test('blog is saved without a title or url yields 400 Bad Request', async () => {
    const blogNoURL = initialBlogs.get(0).toJS()
    delete blogNoURL.url
    await api
      .post('/api/blogs')
      .send(blogNoURL)
      .expect(400)

    const blogNoTitle = initialBlogs.get(1).toJS()
    delete blogNoTitle.title

    await api
      .post('/api/blogs')
      .send(blogNoTitle)
      .expect(400)
  })
})