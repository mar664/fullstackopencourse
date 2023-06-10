const Blog = require('../models/blog')
const User = require('../models/user')
const { blogsData } = require('./data/blogs')
const bcrypt = require('bcrypt')

const initialBlogs = blogsData.map(b => {
  return b.deleteAll([ '_id', '__v' ])
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const createUser = async ({ username, name, password } ) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  savedUser.__password__ = password

  return savedUser
}

module.exports = {
  initialBlogs, blogsInDb, createUser
}