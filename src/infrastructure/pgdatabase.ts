import { createConnection, Connection } from "typeorm";

import log from "../utils/logger";

import config from "./app";

export async function dbConnect(migrate: boolean): Promise<Connection> {
  // handle database connection errors, retry as long as there is no connection, every 1 second.
  let success = false;
  let dbConnection;
  while (!success) {
    try {
      const connection = await createConnection({
        type: config.database.type,
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        entities: config.database.entities,
        synchronize: config.database.synchronize,
        dropSchema: config.database.dropSchema,
        migrations: config.database.migrations,
        cli: {
          migrationsDir: config.database.migrationsDir
        },
        migrationsRun: true,
        logging: false,
        ssl: config.database.ssl,
        extra: config.database.extra
    });
      const res = await connection.query('select 1+1 as result');
      if (res) {
        success = true;
        dbConnection = connection
      }
    } catch (err) {
      log.error(err);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return dbConnection;

};