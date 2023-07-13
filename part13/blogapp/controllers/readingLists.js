const router = require("express").Router();
const { Op } = require("sequelize");

const { eadingList, ReadingListItem } = require("../models");
const {
  BlogNotFound,
  BlogRequestMalformed,
  UnauthorizedError,
} = require("../util/errorTypes");
const Reading = require("../models/reading");

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  try {
    const reading = await Reading.create({
      blogId,
      userId,
    });
    res.json(reading);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
