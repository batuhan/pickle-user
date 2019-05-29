import argon2 from "argon2";
import { Permission } from "../src/entity/Permission";
import { Role } from "../src/entity/Role";
import { RolePermission } from "../src/entity/RolePermission";
import { User } from "../src/entity/User";
import { UserRole } from "../src/entity/UserRole";
import {
  createPermission,
  createRole,
  createRolePermission,
  createUser,
  createUserRole,
  delay,
  email,
  password,
  permissionName,
  roleName
} from "./helpers";
import "./init";

describe("typeorm test", () => {
  it("should create user", async function() {
    const user = await createUser();
    expect(user.id).toBeTruthy();
  });

  it("should fail while creating user because of empty email", async function() {
    expect.assertions(1);
    try {
      const user = new User();
      user.password = password;
      await user.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "email" violates not-null constraint'
      );
    }
  });

  it("should fail while creating user because of empty password", async function() {
    expect.assertions(1);
    try {
      const user = new User();
      user.email = email;
      await user.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "password" violates not-null constraint'
      );
    }
  });

  it("should fail while creating user because of duplicate email", async function() {
    expect.assertions(1);
    try {
      await createUser();
      await createUser();
    } catch (e) {
      expect(e.message).toMatch(
        "duplicate key value violates unique constraint"
      );
    }
  });

  it("should have an update and creation timestamp with the same value", async function() {
    const user = new User();
    user.email = email + "equalTimestamp";
    user.password = password;
    await user.save();
    expect(user.createdAt).toBeTruthy();
    expect(user.updatedAt).toBeTruthy();
    expect(user.createdAt).toEqual(user.updatedAt);
  });

  it("should have different creation and update timestamps after update", async function() {
    const user = new User();
    user.email = email + "differentTimestamp";
    user.password = password;
    await user.save();
    await delay(3000);
    user.password = password + "differentTimestamp";
    await user.save();
    expect(user.updatedAt).not.toEqual(user.createdAt);
  });

  it("should create role", async function() {
    const role = new Role();
    role.name = roleName;
    await role.save();
    expect(role.id).toBeTruthy();
  });

  it("should fail creating role because of empty name", async function() {
    expect.assertions(1);
    try {
      const role = new Role();
      await role.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "name" violates not-null constraint'
      );
    }
  });

  it("should fail creating role because of duplicate name", async function() {
    expect.assertions(1);
    try {
      await createRole();
      await createRole();
    } catch (e) {
      expect(e.message).toMatch(
        "duplicate key value violates unique constraint"
      );
    }
  });

  it("should create permission", async function() {
    const permission = new Permission();
    permission.name = permissionName;
    await permission.save();
    expect(permission.id).toBeTruthy();
  });

  it("should fail creating permission because of empty name", async function() {
    expect.assertions(1);
    try {
      const permission = new Permission();
      await permission.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "name" violates not-null constraint'
      );
    }
  });

  it("should fail creating permission because of duplicate name", async function() {
    expect.assertions(1);
    try {
      await createPermission();
      await createPermission();
    } catch (e) {
      expect(e.message).toMatch(
        "duplicate key value violates unique constraint"
      );
    }
  });

  it("should create UserRole", async function() {
    const userRole = await createUserRole();
    expect(userRole.id).toBeTruthy();
  });

  it("should fail to create UserRole because of empty user", async function() {
    expect.assertions(1);
    try {
      const userRole = new UserRole();
      const roles = await Role.find();
      userRole.role = roles[0];
      await userRole.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "userId" violates not-null constraint'
      );
    }
  });

  it("should fail to create UserRole because of empty role", async function() {
    expect.assertions(1);
    try {
      const userRole = new UserRole();
      userRole.user = await createUser();
      await userRole.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "roleId" violates not-null constraint'
      );
    }
  });

  it("should get users and roles with join from UserRole", async function() {
    await createUserRole();
    const userRoles = await UserRole.findAll();
    expect(userRoles[0].role && userRoles[0].user).toBeTruthy();
  });

  // TODO, same goes for RolePermission
  // it("should fail with duplicate requests on UserRole", async function() {
  //   const userRole = new UserRole();
  //   const users = await User.find();
  //   const roles = await Role.find();
  //   userRole.user = users[0];
  //   userRole.role = roles[0];
  //   await userRole.save();
  //   expect(userRole.id).toBeFalsy();
  // });

  it("should hash user password", async function() {
    const user = await createUser();
    expect(await argon2.verify(user.password, password)).toEqual(true);
  });

  it("should hash user password after update", async function() {
    const arg = "hashedPasswordAfterUpdate";
    const user = await createUser();
    user.password = password + arg;
    await user.save();
    expect(await argon2.verify(user.password, password + arg)).toEqual(true);
  });

  // TODO reimplement in apollo layer
  // it("should fail to create user with 7 length password", async function() {
  //   expect.assertions(1);
  //   try {
  //     const arg = "passwor";
  //     const user = new User();
  //     user.email = email + arg;
  //     user.password = arg;
  //     await user.save();
  //   } catch (e) {
  //     expect(e.message).toEqual(
  //       "Password must be between 8 and 160 characters"
  //     );
  //   }
  // });
  //
  // it("should create user with 8 length password", async function() {
  //   const arg = password;
  //   expect(password.length).toEqual(8);
  //   const user = new User();
  //   user.email = email + arg;
  //   user.password = arg;
  //   await user.save();
  //   expect(user.id).toBeTruthy();
  // });
  //
  // it("should fail to create user with 161 length password", async function() {
  //   expect.assertions(2);
  //   const arg = password.repeat(20) + "p";
  //   expect(arg.length).toEqual(161);
  //   try {
  //     const user = new User();
  //     user.email = email + arg;
  //     user.password = arg;
  //     await user.save();
  //   } catch (e) {
  //     expect(e.message).toEqual(
  //       "Password must be between 8 and 160 characters"
  //     );
  //   }
  // });
  //
  // it("should create user with 160 length password", async function() {
  //   const arg = password.repeat(20);
  //   expect(arg.length).toEqual(160);
  //   const user = new User();
  //   user.email = email + arg;
  //   user.password = arg;
  //   await user.save();
  //   expect(user.id).toBeTruthy();
  // });

  it("should create RolePermission", async function() {
    const rolePermission = await createRolePermission();
    expect(rolePermission.id).toBeTruthy();
  });

  it("should fail to create RolePermission because of empty permission", async function() {
    expect.assertions(1);
    try {
      const rolePermission = new RolePermission();
      rolePermission.role = await createRole();
      await rolePermission.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "permissionId" violates not-null constraint'
      );
    }
  });

  it("should fail to create RolePermission because of empty role", async function() {
    expect.assertions(1);
    try {
      const rolePermission = new RolePermission();
      rolePermission.permission = await createPermission();
      await rolePermission.save();
    } catch (e) {
      expect(e.message).toEqual(
        'null value in column "roleId" violates not-null constraint'
      );
    }
  });

  it("should get permissions and roles with join from RolePermission", async function() {
    await createRolePermission();
    const rolePermissions = await RolePermission.findAll();
    expect(
      rolePermissions[0].role && rolePermissions[0].permission
    ).toBeTruthy();
  });
});
