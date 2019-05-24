import { ApolloServer, gql, ServerInfo } from "apollo-server";
import { createConnection } from "typeorm";

// init db connection from ormconfig.json
createConnection();

const books = [
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Chamber of Secrets"
  },
  {
    author: "Michael Crichton",
    title: "Jurassic Park"
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then((serverInfo: ServerInfo) => {
  console.log(`Server ready at ${serverInfo.url}`);
});

export default server;
