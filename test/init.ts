import { Connection, createConnection } from "typeorm";
// global test init file
// init connection to db

let connection: Connection;
beforeEach(async () => {
  connection = await createConnection(
    Object.assign({}, require("./../ormconfig.json"), {
      database: "pickle-user-test",
      dropSchema: true,
      port: 5433,
      entities: ["src/entity/**/*.ts"]
    })
  );
});

afterEach(async () => {
  await connection.close();
});
