import { Permission } from "../src/entity/Permission";
import { Role } from "../src/entity/Role";
import { RolePermission } from "../src/entity/RolePermission";
import { User } from "../src/entity/User";
import { UserRole } from "../src/entity/UserRole";

export const email = "email";
export const password = "password";
export const roleName = "roleName";
export const permissionName = "permissionName";

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createUser() {
  const user = new User();
  user.email = email;
  user.password = password;
  return await user.save();
}

export async function createRole() {
  const role = new Role();
  role.name = roleName;
  return await role.save();
}

export async function createPermission() {
  const permission = new Permission();
  permission.name = permissionName;
  return await permission.save();
}

export async function createUserRole() {
  const userRole = new UserRole();
  userRole.user = await createUser();
  userRole.role = await createRole();
  return await userRole.save();
}

export async function createRolePermission() {
  const rolePermission = new RolePermission();
  rolePermission.role = await createRole();
  rolePermission.permission = await createPermission();
  return await rolePermission.save();
}
