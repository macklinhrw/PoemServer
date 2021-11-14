import "./utils/withMongoose";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PoemResolver } from "./resolvers/PoemResolver";
import morgan from "morgan";

const main = async () => {
  const app = express();

  app.use(morgan("common"));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PoemResolver],
    }),
  });

  // process.env.CORS_ORIGIN
  //const corsOptions = {
  //  origin: true,
  //  credentials: true,
  //  optionSuccessStatus: 200,
  //}

  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  })
};
main();
