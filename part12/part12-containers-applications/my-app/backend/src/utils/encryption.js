const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

const decodeToken = (request) => {
  return jwt.verify(request.token, process.env.SECRET);
};

const encryptPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const generateToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  return token;
};
module.exports = { getTokenFrom, decodeToken, generateToken, encryptPassword };
