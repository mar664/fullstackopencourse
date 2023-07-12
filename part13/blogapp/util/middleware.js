const errorHandler = (error, request, response, next) => {
  console.error(error.name);

  switch (error.name) {
    case "BlogNotFoundError":
      return response.status(404).send({ error: "blog not found" });
    case "BlogRequestMalformedError":
      return response.status(400).send({ error: "blog request malformed" });
  }
  next(error);
};

module.exports = { errorHandler };
