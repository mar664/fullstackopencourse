const Blog = require('../models/blog');

const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = request.user;

  const blog = new Blog(request.body);

  blog.user = user._id;
  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result.populate('user', { blogs: 0 }));
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (blog) {
    if (user.id === blog.user.toString()) {
      await Blog.findByIdAndDelete(blog.id);
    } else {
      return response.status(400).json({ error: 'wrong user' });
    }
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'invalid blog' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { author, title, likes, url } = request.body;

  const blog = { author, title, likes, url };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', { blogs: 0 });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
