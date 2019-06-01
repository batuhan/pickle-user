import { Column, Entity } from "typeorm";
import PickleUserBaseEntity from "./PickleUserBaseEntity";

@Entity()
export default class Permission extends PickleUserBaseEntity {
  @Column({ unique: true })
  public name!: string;
}
