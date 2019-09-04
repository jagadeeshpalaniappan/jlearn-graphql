const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

/******************************* (Dummy) Data ************************************/
const authors = [
  { id: 101, name: "Author1", age: 10 },
  { id: 102, name: "Author2", age: 20 },
  { id: 103, name: "Author3", age: 30 },
  { id: 104, name: "Author4", age: 40 }
];

const books = [
  { id: 1, name: "Book1", authorId: 101 },
  { id: 2, name: "Book2", authorId: 102 },
  { id: 3, name: "Book3", authorId: 103 }
];

/******************************* (Modal) Type ************************************/

// ########### JNOTES:
// Now 'author' can return with 'books' obj embeded
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents a author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: author => {
        return books.filter(book => book.authorId === author.id);
      }
    }
  })
});

// ########### JNOTES:
// Now 'book' can return with 'author' obj embeded
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "A single book obj",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: book => {
        return authors.find(author => author.id === book.authorId);
      }
    }
  }
});

/******************************* Query ************************************/
const getBookById = {
  type: BookType,
  description: "Get a single Book by book id",
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args) => {
    // console.log(args);   // { id: 2 }
    return books.find(book => book.id === args.id);
  }
};

const getAllBooks = {
  type: new GraphQLList(BookType),
  description: "List of All Books",
  resolve: () => books
};

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query desc",
  fields: () => ({
    books: getAllBooks,
    book: getBookById
  })
});

/******************************* Mutation ************************************/

const addBook = {
  type: BookType,
  description: "Add a Book",
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve: (parent, args) => {
    const generatedBookId = books.length + 1;
    const book = { id: generatedBookId, name: args.name, authorId: args.authorId };
    books.push(book);
    return book;
  }
};
const addAuthor = {
  type: AuthorType,
  description: "Add an author",
  args: {
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args) => {
    const author = { id: authors.length + 1, name: args.name };
    authors.push(author);
    return author;
  }
};

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation desc",
  fields: () => ({
    addBook,
    addAuthor
  })
});

/******************************* Schema ************************************/
const schema = new GraphQLSchema({ query: RootQueryType, mutation: RootMutationType });
module.exports = schema;
