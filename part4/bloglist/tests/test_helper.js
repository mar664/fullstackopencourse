const Blog = require('../models/blog')
const { blogsData } = require('./data/blogs')

const initialBlogs = blogsData.map(b => {
  return b.deleteAll([ '_id', '__v' ])
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}