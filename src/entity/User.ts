import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { PickleUserBaseEntity } from "./PickleUserBaseEntity";
import argon2, { argon2id } from "argon2";

@Entity()
export class User extends PickleUserBaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async userHooks() {
    this.password = await hash(this.password);
  }
}

async function hash(password: string) {
  if (password) {
    return await argon2.hash(password, { type: argon2id });
  } else {
    return password;
  }
}
