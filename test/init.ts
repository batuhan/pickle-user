// global test init file

// init connection to db
import { Connection, createConnection } from "typeorm";

let connection: Connection;
beforeAll(async () => {
  connection = await createConnection(
    Object.assign({}, require("./../ormconfig.json"), {
      database: "pickle-user-test",
      dropSchema: true,
      port: 5433,
      entities: ["src/entity/**/*.ts"]
    })
  );
});

afterAll(async () => {
  await connection.close();
});
