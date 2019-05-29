import { gql } from "apollo-server";
import Role from "../entity/Role";

// GET /roles
function getRoles(): Promise<Role[]> {
  return Role.find();
}

// GET /role
function getRole(args: Role): Promise<Role | undefined> {
  return Role.findOne(args);
}

// POST /role
function postRole(args: Role): Promise<Role> {
  return Role.create(args).save();
}

export const typeDefs = gql`
  extend type Query {
    roles: [Role]
    role(name: String!): Role
  }

  extend type Mutation {
    role(name: String!): Role
  }

  type Role {
    id: ID!
    name: String!
  }
`;

export const resolvers = {
  Query: {
    roles(): Promise<Role[]> {
      return getRoles();
    },
    role(_parent: void, args: Role): Promise<Role | undefined> {
      return getRole(args);
    },
  },
  Mutation: {
    role(_parent: void, args: Role): Promise<Role> {
      return postRole(args);
    },
  },
};
