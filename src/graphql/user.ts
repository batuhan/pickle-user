import { User } from "../entity/User";
import { gql } from "apollo-server";

export const typeDefs = gql`
  extend type Query {
    users: [User]
    user(id: ID, email: String): User
  }

  extend type Mutation {
    user(email: String!, password: String!): User
  }

  type User {
    id: ID!
    email: String!
    password: String!
  }
`;

export const resolvers = {
  Query: {
    users() {
      return getUsers();
    },
    user(_parent: any, args: any) {
      return getUser(args);
    }
  },
  Mutation: {
    user(_parent: any, args: any) {
      return postUser(args);
    }
  }
};

// GET /users
async function getUsers() {
  const users = await User.find();
  users.forEach(user => {
    user.password = "";
  });
  return users;
}

// GET /user
async function getUser(args: any) {
  const user = await User.findOne(args);
  user!.password = "";
  return user;
}

// POST /user
function postUser(args: any) {
  return User.create(args).save();
}
