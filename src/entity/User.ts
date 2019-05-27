import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { PickleUserBaseEntity } from "./PickleUserBaseEntity";
import argon2, { argon2id } from "argon2";
import config from "../../config.json";

@Entity()
export class User extends PickleUserBaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  async bI() {
    this.password = await hash(this.password);
  }

  @BeforeUpdate()
  async bU() {
    this.password = await hash(this.password);
  }
}

async function hash(password: string) {
  if (password) {
    if (
      password.length < config.password.minLength ||
      password.length > config.password.maxLength
    ) {
      throw new Error(
        `Password must be between ${config.password.minLength} and ${
          config.password.maxLength
        } characters`
      );
    } else {
      return await argon2.hash(password, { type: argon2id });
    }
  } else {
    return password;
  }
}
