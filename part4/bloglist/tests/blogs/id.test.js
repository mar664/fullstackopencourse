const { initialBlogs } = require('../test_helper')

const Blog = require('../../models/blog')

test('blog contains id property', async () => {
  const blog = new Blog(initialBlogs.toJS()[0])
  expect(blog.id).toBeDefined()
})