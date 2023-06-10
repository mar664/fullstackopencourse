const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../../models/blog')
const { initialBlogs, loadBlogsInDB, loadUsersInDB, getNthFromMap } = require('../test_helper')
const { connect, close_connection } = require('../../db')
const User = require('../../models/user')
const api = supertest(app)
let blogsInDb = null
let usersInDb = null

beforeAll(async () => {
  await connect()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  usersInDb = await loadUsersInDB()
  blogsInDb = await loadBlogsInDB(usersInDb)
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

    const blogsList = response.body

    for(let b of blogsList){
      const bInDB = blogsInDb.get(b.id)

      expect(b).toHaveProperty('author', bInDB.author)
      expect(b).toHaveProperty('title', bInDB.title)
      expect(b).toHaveProperty('url', bInDB.url)
      expect(b).toHaveProperty('likes', bInDB.likes)
      expect(b).toHaveProperty('user')
    }
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

  test('blog is deleted', async () => {
    const { id } = getNthFromMap(blogsInDb, 0)

    // Check blog exists in db
    await expect(Blog.findById(id)).resolves.toHaveProperty('id', id)

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    // Check blog has been deleted from db
    await expect(Blog.findById(id)).resolves.toBeNull()
  })


  test('blog is updated', async () => {
    const blog = getNthFromMap(blogsInDb, 2)

    const { id } = blog

    const author = 'New Name'
    const title = 'New Title'
    const url = 'http://example.com/newurl'
    const likes = 10

    await api
      .put(`/api/blogs/${id}`)
      .send({ author, title, url, likes })
      .expect(200)

    const blogData = await Blog.findById(id)

    expect(blogData).toHaveProperty('author', author)
    expect(blogData).toHaveProperty('title', title)
    expect(blogData).toHaveProperty('url', url)
    expect(blogData).toHaveProperty('likes', likes)
  })

})