import { gql } from "apollo-server";
import User from "../entity/User";

// GET /users
async function getUsers(): Promise<User[]> {
  const users = await User.find();
  for (let i = 0; i < users.length; i += 1) {
    delete users[i].password;
  }
  return users;
}

// GET /user
async function getUser(args: User): Promise<User | undefined> {
  const user = await User.findOne(args);
  if (user) {
    delete user.password;
  }
  return user;
}

// POST /user
function postUser(args: User): Promise<User> {
  return User.create(args).save();
}

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
    password: String
  }
`;

export const resolvers = {
  Query: {
    users(): Promise<User[]> {
      return getUsers();
    },
    user(_parent: void, args: User): Promise<User | undefined> {
      return getUser(args);
    },
  },
  Mutation: {
    user(_parent: void, args: User): Promise<User> {
      return postUser(args);
    },
  },
};
