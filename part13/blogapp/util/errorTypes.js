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

class UserRequestMalformed extends Error {
  constructor(message) {
    super(message);
    this.name = "UserRequestMalformedError";
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

module.exports = {
  UnauthorizedError,
  BlogNotFound,
  BlogRequestMalformed,
  UserRequestMalformed,
};
