const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { User, Session } = require("../models");

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
    case "ReadingNotFoundError":
      return response.status(400).send({ error: error.message });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.token = authorization.substring(7);
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
    const user = await User.findByPk(request.decodedToken.id, {
      include: [
        {
          model: Session,
        },
      ],
    });
    if (!user) return response.status(401).json({ error: "invalid user" });
    if (user.disabled)
      return response.status(501).json({ error: "user diabled" });
    if (user.session) {
      if (user.session.token !== request.token) {
        return response.status(501).json({ error: "session invalid" });
      }
    } else {
      return response.status(501).json({ error: "session invalid" });
    }
    request.user = user;
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
