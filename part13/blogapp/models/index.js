const Blog = require("./blog");
const Reading = require("./reading");
const User = require("./user");
const Session = require("./session");

Blog.belongsTo(User);
User.hasMany(Blog);
User.hasOne(Session);

User.belongsToMany(Blog, { through: Reading, as: "readings" });
Blog.belongsToMany(User, { through: Reading });

module.exports = {
  Blog,
  User,
  Reading,
  Session,
};
