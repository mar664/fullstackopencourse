const Blog = require('../models/blog')
const User = require('../models/user')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const user = await User.findOne()
  blog.user = user._id
  const result = await blog.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { author, title, likes, url } = request.body

  const blog = { author, title, likes, url }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query'  })

  response.json(updatedBlog)
})

module.exports = blogsRouter