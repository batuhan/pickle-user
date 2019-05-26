import { Entity, ManyToOne } from "typeorm";
import { Permission } from "./Permission";
import { PickleUserBaseEntity } from "./PickleUserBaseEntity";
import { Role } from "./Role";

@Entity()
export class RolePermission extends PickleUserBaseEntity {
  @ManyToOne(() => Role, { nullable: false })
  role!: Role;

  @ManyToOne(() => Permission, { nullable: false })
  permission!: Permission;

  static findAll() {
    return this.createQueryBuilder("rolePermission")
      .leftJoinAndSelect("rolePermission.permission", "permission")
      .leftJoinAndSelect("rolePermission.role", "role")
      .getMany();
  }
}
