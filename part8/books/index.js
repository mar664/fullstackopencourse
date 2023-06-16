const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const lodash = require("lodash");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
    type Author {
        name: String!,
        born: Int,
        bookCount: Int,
        id: ID!
    }
    type Book {
        title: String!,
        author: Author!,
        published: Int!,
        genres: [String!]!,
        id: ID!
    }
    type Query {
        bookCount: Int,
        authorCount: Int,
        allBooks(author: String, genre: String): [Book!]!,
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(
            name: String!, 
            setBornTo: Int!
        ): Author
    }
`;

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
  },
  Mutation: {
    addBook: async (root, args) => {
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
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return author.save();
      } else return null;
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4003 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
