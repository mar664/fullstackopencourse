const router = require("express").Router();

const { User, Blog } = require("../models");
const { UserRequestMalformed } = require("../util/errorTypes");
const { tokenExtractor, userExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", tokenExtractor, userExtractor, async (req, res) => {
  const { username } = req.body;
  if (username) {
    req.user.username = username;
    await req.user.save();
  } else {
    throw new UserRequestMalformed("User update request malformed");
  }
  res.status(200).end();
});

module.exports = router;
