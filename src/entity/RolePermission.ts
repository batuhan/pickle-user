import { Entity, ManyToOne, ObjectType } from "typeorm";
import Permission from "./Permission";
import PickleUserBaseEntity from "./PickleUserBaseEntity";
import Role from "./Role";

@Entity()
export default class RolePermission extends PickleUserBaseEntity {
  @ManyToOne((): ObjectType<Role> => Role, { nullable: false })
  public role!: Role;

  @ManyToOne((): ObjectType<Permission> => Permission, { nullable: false })
  public permission!: Permission;

  public static findAll(): Promise<RolePermission[]> {
    return this.createQueryBuilder("rolePermission")
      .leftJoinAndSelect("rolePermission.permission", "permission")
      .leftJoinAndSelect("rolePermission.role", "role")
      .getMany();
  }
}
