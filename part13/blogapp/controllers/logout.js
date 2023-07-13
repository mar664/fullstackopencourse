const router = require("express").Router();

const { Session } = require("../models");

router.delete("/", async (request, response) => {
  await Session.destroy({ where: { userId: request.user.id } });
  response.status(204).end();
});

module.exports = router;
