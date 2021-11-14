import "./utils/withMongoose";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PoemResolver } from "./resolvers/PoemResolver";
import morgan from "morgan";
// import {
//   ApolloServerPluginLandingPageGraphQLPlayground,
//   ApolloServerPluginLandingPageDisabled,
// } from "apollo-server-core";

const main = async () => {
  const app = express();

  app.use(morgan("common"));

  // process.env.CORS_ORIGIN
  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  }

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PoemResolver],
    }),
  });

  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });

  app.listen(process.env.PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  })
};
main();
