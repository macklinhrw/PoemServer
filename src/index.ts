import "./utils/withMongoose";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PoemResolver } from "./resolvers/PoemResolver";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import morgan from "morgan";
import cors from "cors"
// import {
//   ApolloServerPluginLandingPageGraphQLPlayground,
//   ApolloServerPluginLandingPageDisabled,
// } from "apollo-server-core";

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PoemResolver],
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // plugins: [
    //   process.env.NODE_ENV === "production"
    //     ? ApolloServerPluginLandingPageDisabled()
    //     : ApolloServerPluginLandingPageGraphQLPlayground(),
    // ],
  });

  app.use(morgan("common"));
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  // process.env.CORS_ORIGIN

  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  }

  app.use(cors(corsOptions))

  app.all('*', (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
  })

  await new Promise((resolve) =>
    //@ts-ignore types on the listen function seem to not accept the resolve object
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};
main();
