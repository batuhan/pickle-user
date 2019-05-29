import { Role } from "../entity/Role";
import { gql } from "apollo-server";

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
    roles() {
      return getRoles();
    },
    async role(_parent: any, args: any) {
      return getRole(args);
    }
  },
  Mutation: {
    role(_parent: any, args: any) {
      return postRole(args);
    }
  }
};

// GET /roles
function getRoles() {
  return Role.find();
}

// GET /role
function getRole(args: any) {
  return Role.findOne(args);
}

// POST /role
function postRole(args: any) {
  return Role.create(args).save();
}
