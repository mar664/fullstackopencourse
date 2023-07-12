const router = require("express").Router();
const { fn, col } = require("sequelize");
const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [fn("COUNT", col("author")), "articles"],
      [fn("SUM", col("likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  });
  res.json(authors);
});

module.exports = router;
