import express from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import constants from "./config/constants";

import "./config/db";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mocks from "./mocks";

const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();

mocks().then(() => {
  server.applyMiddleware({
    app,
    bodyParser
  });
  // app.use(bodyParser.json());
});
app.listen({ port: constants.PORT }, () =>
  console.log(
    `Server ready at localhost:${constants.PORT}${server.graphqlPath}`
  )
);
