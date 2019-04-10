import { ApolloServer } from "apollo-server-express";

import bodyParser from "body-parser";
import mocks from "../mocks";

import typeDefs from "../graphql/schema";
import resolvers from "../graphql/resolvers";
import { decodeToke } from "../services/Auth";

async function auth(req, res, next) {
  try {
    const token = await req.headers.authorization;

    if (token != null) {
      const user = await decodeToke(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

// time part 4 16:00
export default app => {
  app.use(auth);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user
    })
  });

  mocks().then(() => {
    server.applyMiddleware({
      app,
      bodyParser
    });
    // app.use(bodyParser.json());
  });
};
