const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");

// const schema = require("./all.js");
// const schema = require("./jlearn/1-simple-query.js");
// const schema = require("./jlearn/2-advanced-query.js");
// const schema = require("./jlearn/3-advanced-query.js");
const schema = require("./jlearn/4-simple-mutations.js");

const expressGraphqlMiddleWare = expressGraphQL({
  schema: schema,
  graphiql: true
});

app.use("/graphql", expressGraphqlMiddleWare);
app.listen(8080, () => console.log("Server Running"));
