const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { User } = require("../models");

const errorHandler = (error, request, response, next) => {
  console.error(error.name);

  switch (error.name) {
    case "BlogNotFoundError":
      return response.status(404).send({ error: "blog not found" });
    case "BlogRequestMalformedError":
      return response.status(400).send({ error: "blog request malformed" });
    case "SequelizeValidationError":
      return response.status(400).send({ error: error.message });
    case "ValidationError":
      return response.status(400).send({ error: error.message });
    case "UnauthorizedError":
      return response.status(400).send({ error: error.message });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.decodedToken) {
    const user = await User.findByPk(request.decodedToken.id);
    if (!user) return response.status(401).json({ error: "invalid user" });
    request.user = user;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
