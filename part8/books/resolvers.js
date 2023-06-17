const Book = require("./models/book");
const User = require("./models/user");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }
      let filters = [];
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
      }
      if (args.genre) filters.push({ genres: args.genre });
      if (filters.length == 2)
        return Book.find({ $and: filters }).populate("author");
      return Book.find(filters[0]).populate("author");
    },
    allAuthors: async () => Author.find(),
    me: (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const books = await Book.find();
      const genresArray = books.map((b) => b.genres);
      return lodash.uniq(lodash.flatten(genresArray));
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        } catch (error) {
          if (error.name === "ValidationError") {
            throw new GraphQLError(error.message, {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          } else {
            throw new GraphQLError("Saving author failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                error,
              },
            });
          }
        }
      }

      const book = new Book({ ...args, author: author });

      try {
        await book.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "BAD_USER_INPUT",
              error,
            },
          });
        } else {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              error,
            },
          });
        }
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return author.save();
      } else return null;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments();
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
