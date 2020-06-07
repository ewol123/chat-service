const version = 1;
const env = process.env.NODE_ENV || "development";

const config = {
  api: {
    version,
  },
  port: 3001,
  database: {
    development: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test",
      database: "chat-dev",
      entities: ["src/models/*.ts"],
      synchronize: true
    },
    production: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test",
      database: "chat-prod",
      entities: ["src/models/*.ts"],
      synchronize: false
    },
    staging: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test",
      database: "chat-staging",
      entities: ["src/models/*.ts"],
      synchronize: false
    }
  }
};

export default {
  api: config.api,
  port: config.port,
  database: config.database[env]
}
