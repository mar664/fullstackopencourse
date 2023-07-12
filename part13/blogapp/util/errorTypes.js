class BlogNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "BlogNotFoundError";
  }
}

class BlogRequestMalformed extends Error {
  constructor(message) {
    super(message);
    this.name = "BlogRequestMalformedError";
  }
}

module.exports = { BlogNotFound, BlogRequestMalformed };
