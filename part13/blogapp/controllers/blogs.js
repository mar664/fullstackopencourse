const router = require("express").Router();

const { Blog } = require("../models");
const { BlogNotFound, BlogRequestMalformed } = require("../util/errorTypes");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    throw new BlogNotFound(`Blog id '${req.params.id}' not found`);
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
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
