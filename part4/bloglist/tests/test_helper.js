const Blog = require('../models/blog')
const { blogsDeepCopy } = require('./data/blogs')

const initialBlogs = blogsDeepCopy().map(b => {
  delete b['_id']
  delete b['_v']
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}