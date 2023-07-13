const express = require("express");
require("express-async-errors");
const app = express();
const { errorHandler, tokenExtractor } = require("./util/middleware");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readingLists");

app.use(express.json());

app.use("/api/authors", tokenExtractor, authorsRouter);
app.use("/api/blogs", tokenExtractor, blogsRouter);
app.use("/api/readingLists", readingListsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
