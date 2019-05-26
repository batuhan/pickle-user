import { Entity, Column } from "typeorm";
import { PickleUserBaseEntity } from "./PickleUserBaseEntity";

@Entity()
export class Role extends PickleUserBaseEntity {
  @Column({ unique: true })
  name!: string;
}
