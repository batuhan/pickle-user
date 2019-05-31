import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { resolvers, typeDefs } from "./graphql/root";

dotenv.config();

/* init db connection from ormconfig.json
   we'll ignore the following line from coverage since
   we init a database connection each time we run the tests */
/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") {
  createConnection().then();
}

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
