const router = require("express").Router();
const { Op } = require("sequelize");

const { Blog, User } = require("../models");
const {
  BlogNotFound,
  BlogRequestMalformed,
  UnauthorizedError,
} = require("../util/errorTypes");
const { tokenExtractor, userExtractor } = require("../util/middleware");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    throw new BlogNotFound(`Blog id '${req.params.id}' not found`);
  }
  next();
};

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`,
    };
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username", "id"],
    },
    where,
  });
  res.json(blogs);
});

router.post("/", userExtractor, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.user.id,
    });
    res.json(blog);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

router.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.delete("/:id", userExtractor, blogFinder, async (req, res) => {
  if (req.blog.userId === req.user.id) {
    await req.blog.destroy();
    return res.status(204).end();
  }
  throw new UnauthorizedError("Only user who created can delete blog");
});

router.put("/:id", blogFinder, async (req, res) => {
  const { likes } = req.body;
  if (likes) {
    req.blog.likes = likes;
    await req.blog.save();
  } else {
    throw new BlogRequestMalformed("Updating blog like request was malformed");
  }
  res.status(200).end();
});

module.exports = router;
