const router = require("express").Router();
const { Op } = require("sequelize");

const { eadingList, ReadingListItem } = require("../models");
const {
  BlogNotFound,
  BlogRequestMalformed,
  UnauthorizedError,
  ReadingNotFound,
} = require("../util/errorTypes");
const Reading = require("../models/reading");
const { userExtractor, tokenExtractor } = require("../util/middleware");

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

router.put("/:id", tokenExtractor, userExtractor, async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  try {
    const reading = await Reading.update(
      { isRead: read },
      {
        where: {
          id,
          userId: req.user.id,
        },
      }
    );
    if (reading[0] === 0)
      throw new ReadingNotFound(
        "Reading not found or available for user to change"
      );
    res.json(reading);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
