const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { setAsync, getAsync } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({
    text,
    done: false,
  });
  let added_todos = await getAsync("added_todos");
  added_todos = added_todos !== null ? Number(added_todos) + 1 : 1;

  await setAsync("added_todos", added_todos);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  res.send(todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { text, done, _id } = req.body;
  console.log(req.todo.id);

  const updatedItem = await Todo.findByIdAndUpdate(
    req.todo.id,
    {
      text,
      done,
    },
    { new: true }
  );
  res.status(204).send(updatedItem);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
