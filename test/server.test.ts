import { createTestClient } from "apollo-server-testing";
import server from "../src/app";
import { Role } from "../src/entity/Role";
import { User } from "../src/entity/User";
import {
  createRole,
  createUser,
  generate_random_string,
  populateRoles,
  populateUsers
} from "./helpers";
import "./init";

const { query, mutate } = createTestClient(server);

describe("apollo tests", () => {
  it("should get all users", async function() {
    const amount = 10;
    await populateUsers(amount);
    const result = await query({
      query: `
query {
  users {
    id
  }
}
`
    });
    expect(result.data!.users.length).toEqual(amount);
  });

  it("should not get password while getting all users", async function() {
    const amount = 10;
    await populateUsers(amount);
    const result = await query({
      query: `
query {
  users {
    id
    password
  }
}
`
    });
    result.data!.users.forEach((user: User) => {
      expect(user.password).toEqual("");
    });
  });

  it("should get the user by id", async function() {
    const user = await createUser();
    const result = await query({
      query: `
query {
  user(id: "${user.id}") {
    id
  }
}
`
    });
    expect(result.data!.user.id).toEqual(user.id);
  });

  it("should not get password", async function() {
    const user = await createUser();
    const result = await query({
      query: `
query {
  user(id: "${user.id}") {
    id
    password
  }
}
`
    });
    expect(result.data!.user.password).toEqual("");
  });

  it("should get the user by email", async function() {
    const user = await createUser();
    const result = await query({
      query: `
query {
  user(email: "${user.email}") {
    id
  }
}
`
    });
    expect(result.data!.user.id).toEqual(user.id);
  });

  it("should create user", async function() {
    const result = await mutate({
      mutation: `
      mutation {
  user(email: "${generate_random_string(
    5
  )}", password: "${generate_random_string(5)}") {
    id
  }
}
`
    });
    expect(await User.find({ id: result.data!.user.id })).toBeTruthy();
  });

  it("should get all roles", async function() {
    const amount = 10;
    await populateRoles(amount);
    const result = await query({
      query: `
query {
  roles {
    id
  }
}
`
    });
    expect(result.data!.roles.length).toEqual(amount);
  });

  it("should create role", async function() {
    const result = await mutate({
      mutation: `
      mutation {
  role(name: "${generate_random_string(5)}") {
    id
  }
}
`
    });
    expect(await Role.find({ id: result.data!.role.id })).toBeTruthy();
  });

  it("should find role by name", async function() {
    const role = await createRole();
    const result = await query({
      query: `
query {
  role(name: "${role.name}") {
    id
  }
}
`
    });
    expect(result.data!.role.id).toEqual(role.id);
  });
});
