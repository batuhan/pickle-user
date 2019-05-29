import { Entity, ManyToOne, ObjectType } from "typeorm";
import PickleUserBaseEntity from "./PickleUserBaseEntity";
import Role from "./Role";
import User from "./User";

@Entity()
export default class UserRole extends PickleUserBaseEntity {
  @ManyToOne((): ObjectType<User> => User, { nullable: false })
  public user!: User;

  @ManyToOne((): ObjectType<Role> => Role, { nullable: false })
  public role!: Role;

  public static findAll(): Promise<UserRole[]> {
    return this.createQueryBuilder("userRole")
      .leftJoinAndSelect("userRole.user", "user")
      .leftJoinAndSelect("userRole.role", "role")
      .getMany();
  }
}
