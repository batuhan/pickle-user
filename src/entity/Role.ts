import { Entity, Column } from "typeorm";
import PickleUserBaseEntity from "./PickleUserBaseEntity";

@Entity()
export default class Role extends PickleUserBaseEntity {
  @Column({ unique: true })
  public name!: string;
}
