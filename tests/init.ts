import { Connection, createConnection, getConnectionOptions } from "typeorm";
// global test init file
// init connection to db

let connection: Connection;
beforeEach(
  async (): Promise<void> => {
    const options = await getConnectionOptions();
    connection = await createConnection(
      Object.assign({}, options, {
        database: "pickle-user-test",
        dropSchema: true,
        port: 5433,
        entities: ["src/entity/**/*.ts"],
      }),
    );
  },
);

afterEach(
  async (): Promise<void> => {
    await connection.close();
  },
);
