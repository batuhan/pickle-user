import crypto from "crypto";
import Permission from "../src/entity/Permission";
import Role from "../src/entity/Role";
import RolePermission from "../src/entity/RolePermission";
import User from "../src/entity/User";
import UserRole from "../src/entity/UserRole";

export const email = "email";
export const password = "password";
export const roleName = "roleName";
export const permissionName = "permissionName";

export function delay(ms: number): Promise<void> {
  return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, ms));
}

export function generateRandomString(bytes: number): string {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function createUser(): Promise<User> {
  const user = new User();
  user.email = email;
  user.password = password;
  return user.save();
}

export function populateUsers(amount: number): Promise<User>[] {
  const promises = [];
  for (let i = 0; i < amount; i += 1) {
    const user = new User();
    user.email = generateRandomString(5);
    user.password = password;
    promises.push(user.save());
  }
  return promises;
}

export async function createRole(): Promise<Role> {
  const role = new Role();
  role.name = roleName;
  return role.save();
}

export function populateRoles(amount: number): Promise<Role>[] {
  const promises = [];
  for (let i = 0; i < amount; i += 1) {
    const role = new Role();
    role.name = generateRandomString(5);
    promises.push(role.save());
  }
  return promises;
}

export async function createPermission(): Promise<Permission> {
  const permission = new Permission();
  permission.name = permissionName;
  return permission.save();
}

export async function createUserRole(): Promise<UserRole> {
  const userRole = new UserRole();
  userRole.user = await createUser();
  userRole.role = await createRole();
  return userRole.save();
}

export async function createRolePermission(): Promise<RolePermission> {
  const rolePermission = new RolePermission();
  rolePermission.role = await createRole();
  rolePermission.permission = await createPermission();
  return rolePermission.save();
}
