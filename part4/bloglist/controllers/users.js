const usersRouter = require('express').Router();
const User = require('../models/user');
const { encryptPassword } = require('../utils/encryption');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!(username && name && password)) {
    return response
      .status(400)
      .json({ error: 'username, name or password missing' });
  }
  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({
        error: 'username and password must be 3 or more characters long',
      });
  }

  const passwordHash = await encryptPassword(password);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

module.exports = usersRouter;
