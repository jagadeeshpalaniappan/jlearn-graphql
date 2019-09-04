const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

/******************************* (Dummy) Data ************************************/

const books = [
  { id: 1, name: "Book1", authorId: 101 },
  { id: 2, name: "Book2", authorId: 102 },
  { id: 3, name: "Book3", authorId: 103 }
];

/******************************* (Modal) Type ************************************/

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "A single book obj",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) }
  }
});

/******************************* Query ************************************/

const getAllBooks = {
  type: new GraphQLList(BookType),
  description: "List of All Books",
  resolve: () => books
};

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query desc",
  fields: () => ({
    books: getAllBooks
  })
});

/******************************* Schema ************************************/
const schema = new GraphQLSchema({ query: RootQueryType });
module.exports = schema;
