const express = require("express");
require("express-async-errors");
const app = express();
const {
  errorHandler,
  userExtractor,
  tokenExtractor,
} = require("./util/middleware");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readingLists");

app.use(express.json());

app.use("/api/authors", tokenExtractor, userExtractor, authorsRouter);
app.use("/api/blogs", tokenExtractor, userExtractor, blogsRouter);
app.use("/api/readingLists", tokenExtractor, userExtractor, readingListsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", tokenExtractor, userExtractor, logoutRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
