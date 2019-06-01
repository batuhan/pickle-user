import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import argon2, { argon2id } from "argon2";
import PickleUserBaseEntity from "./PickleUserBaseEntity";

async function hash(password: string): Promise<string> {
  if (password) {
    return argon2.hash(password, { type: argon2id });
  }
  return password;
}

@Entity()
export default class User extends PickleUserBaseEntity {
  @Column({ unique: true })
  public email!: string;

  @Column()
  public password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  public async userHooks(): Promise<void> {
    this.password = await hash(this.password);
  }
}
