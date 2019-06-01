import { gql } from "apollo-server";
import User from "../entity/User";
import { sign } from "../helpers/jwt";
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

// POST /signup
async function postSignup(args: User): Promise<string> {
  const user = await User.create(args).save();
  return sign(user.id);
}

export const typeDefs = gql`
  extend type Query {
    users: [User]
    user(id: ID, email: String): User
    login(email: String!, password: String!): String
  }

  extend type Mutation {
    signup(email: String!, password: String!): String
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
    signup(_parent: void, args: User): Promise<string> {
      return postSignup(args);
    },
  },
};
