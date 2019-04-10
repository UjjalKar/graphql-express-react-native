import express from "express";

import constants from "./config/constants";
import middleWare from "./config/middleware";
import "./config/db";

const app = express();
middleWare(app);

app.listen({ port: constants.PORT }, () =>
  console.log(`Server ready at localhost:${constants.PORT}`)
);
