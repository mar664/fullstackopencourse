const Blog = require('../models/blog')
const { blogsData } = require('./data/blogs')

const initialBlogs = blogsData().map(b => {
  delete b['_id']
  delete b['__v']
  return b
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}