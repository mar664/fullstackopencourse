const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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
    allBooks: (root, args) => {
      let filteredBooks = [...books];
      if (args.author)
        filteredBooks = filteredBooks.filter((b) => b.author === args.author);
      if (args.genre)
        filteredBooks = filteredBooks.filter(
          (b) => b.genres.indexOf(args.genre) !== -1
        );
      return filteredBooks;
    },
    allAuthors: () =>
      authors.map((author) => {
        return {
          ...author,
          bookCount: books.filter((b) => b.author === author.name).length,
        };
      }),
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      const author = await Author.findOne({ name: args.author });
      if (author) {
        book.author = author;
      } else {
        const newAuthor = Author({ name: args.author });
        await newAuthor.save();
        book.author = newAuthor;
      }
      return book.save();
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (author) {
        const updatedAuthor = { ...author, born: args.setBornTo };
        authors = authors.map((a) =>
          a.name === args.name ? updatedAuthor : a
        );
        return updatedAuthor;
      }
      return null;
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
