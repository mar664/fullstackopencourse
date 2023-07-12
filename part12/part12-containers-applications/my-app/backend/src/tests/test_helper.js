const Blog = require('../models/blog');
const User = require('../models/user');
const { blogsData } = require('./data/blogs');
const bcrypt = require('bcrypt');
const { usersData } = require('./data/users');

const initialBlogs = blogsData.map((b) => {
  return b.deleteAll(['_id', '__v']);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const loadBlogsInDB = async (usersInDB) => {
  const blogObjects = initialBlogs.toJS().map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => {
    blog.user = getNthKeyFromMap(usersInDB, getRandomInt(usersInDB.size));
    return blog.save();
  });
  const blogs = await Promise.all(promiseArray);
  return new Map(blogs.map((obj) => [obj.id, obj]));
};

const getNthFromMap = (myMap, n) => {
  const mapIter = myMap.values();
  let value = mapIter.next().value;
  for (let i = 0; i < n; i++) {
    value = mapIter.next().value;
  }
  return value;
};

const getNthKeyFromMap = (myMap, n) => {
  const mapIter = myMap.keys();
  let value = mapIter.next().value;
  for (let i = 0; i < n; i++) {
    value = mapIter.next().value;
  }
  return value;
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const loadUsersInDB = async () => {
  const promiseArray = usersData.toJS().map((user) => createUser(user));
  const users = await Promise.all(promiseArray);
  return new Map(users.map((obj) => [obj.id, obj]));
};

const createUser = async ({ username, name, password }) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  savedUser.__password__ = password;

  return savedUser;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  createUser,
  loadBlogsInDB,
  loadUsersInDB,
  getNthFromMap,
};
