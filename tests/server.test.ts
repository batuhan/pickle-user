import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server";
import app from "../src/app";
import Role from "../src/entity/Role";
import User from "../src/entity/User";
import {
  createRole,
  createUser,
  generateRandomString,
  populateRoles,
  populateUsers,
} from "./helpers";
import "./init";

const { query, mutate } = createTestClient(app);

describe("apollo tests", (): void => {
  it("should get all users", async (): Promise<void> => {
    const amount = 10;
    await Promise.all(populateUsers(amount));
    const result = await query({
      query: gql`
        query {
          users {
            id
          }
        }
      `,
    });
    expect(result.data && result.data.users.length).toEqual(amount);
  });

  it("should not get password while getting all users", async (): Promise<
    void
  > => {
    const amount = 10;
    expect.assertions(amount);
    await Promise.all(populateUsers(amount));
    const result = await query({
      query: gql`
        query {
          users {
            id
            password
          }
        }
      `,
    });
    if (result.data) {
      result.data.users.forEach(
        (user: User): void => {
          expect(user.password).toBeFalsy();
        },
      );
    }
  });

  it("should get the user by id", async (): Promise<void> => {
    const user = await createUser();
    const result = await query({
      query: gql`
        query($id: ID) {
          user(id: $id) {
            id
          }
        }
      `,
      variables: { id: user.id },
    });
    expect(result.data && result.data.user.id).toEqual(user.id);
  });

  it("shouldn't get the user", async (): Promise<void> => {
    expect.assertions(1);
    const result = await query({
      query: gql`
        query {
          user(email: "12345") {
            id
          }
        }
      `,
    });
    if (result.data) {
      expect(result.data.user).toBeFalsy();
    }
  });

  it("should not get password", async (): Promise<void> => {
    expect.assertions(1);
    const user = await createUser();
    const result = await query({
      query: gql`
        query($id: ID) {
          user(id: $id) {
            id
            password
          }
        }
      `,
      variables: {
        id: user.id,
      },
    });
    if (result.data) {
      expect(result.data.user.password).toBeFalsy();
    }
  });

  it("should get the user by email", async (): Promise<void> => {
    const user = await createUser();
    const result = await query({
      query: gql`
        query($email: String) {
          user(email: $email) {
            id
          }
        }
      `,
      variables: { email: user.email },
    });
    expect(result.data && result.data.user.id).toEqual(user.id);
  });

  it("should create user", async (): Promise<void> => {
    const result = await mutate({
      mutation: gql`
        mutation($email: String!, $password: String!) {
          signup(email: $email, password: $password)
        }
      `,
      variables: {
        email: generateRandomString(5),
        password: generateRandomString(5),
      },
    });
    expect(
      await User.find({ id: result.data && result.data.user.id }),
    ).toBeTruthy();
  });

  it("should get all roles", async (): Promise<void> => {
    const amount = 10;
    await Promise.all(populateRoles(amount));
    const result = await query({
      query: gql`
        query {
          roles {
            id
          }
        }
      `,
    });
    expect(result.data && result.data.roles.length).toEqual(amount);
  });

  it("should create role", async (): Promise<void> => {
    const result = await mutate({
      mutation: gql`
        mutation($name: String!) {
          role(name: $name) {
            id
          }
        }
      `,
      variables: {
        name: generateRandomString(5),
      },
    });
    expect(
      await Role.find({ id: result.data && result.data.role.id }),
    ).toBeTruthy();
  });

  it("should find role by name", async (): Promise<void> => {
    const role = await createRole();
    const result = await query({
      query: gql`
        query($name: String!) {
          role(name: $name) {
            id
          }
        }
      `,
      variables: { name: role.name },
    });
    expect(result.data && result.data.role.id).toEqual(role.id);
  });
});
