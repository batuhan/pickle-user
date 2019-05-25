import { Entity, ManyToOne } from "typeorm";
import { PickleUserBaseEntity } from "./PickleUserBaseEntity";
import { Role } from "./Role";
import { User } from "./User";

@Entity()
export class UserRole extends PickleUserBaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => Role, { nullable: false })
  role!: Role;

  static findAll() {
    return this.createQueryBuilder("userRole")
      .leftJoinAndSelect("userRole.user", "user")
      .leftJoinAndSelect("userRole.role", "role")
      .getMany();
  }
}
