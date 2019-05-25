import { Entity, Column } from "typeorm";
import { PickleUserBaseEntity } from "./PickleUserBaseEntity";

@Entity()
export class Permission extends PickleUserBaseEntity {
  @Column({ unique: true })
  name!: string;
}
