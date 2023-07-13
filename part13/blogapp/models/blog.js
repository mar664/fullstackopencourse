const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(50),
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        validateYear(year) {
          if (year <= 1991 || year > new Date().getFullYear())
            throw new Error(
              `Year must be from 1991 to ${new Date().getFullYear()}`
            );
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "blog",
  }
);

module.exports = Blog;
