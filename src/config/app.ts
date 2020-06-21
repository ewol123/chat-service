const version = 1;
const env = process.env.NODE_ENV || "development";

const config = {
  api: {
    version
  },
  port: 3001,
  redis: {
    development: {
      redisHost: "localhost",
      redisPort: 6379
    },
    production: {
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT
    },
    staging: {
      redisHost: process.env.STG_REDIS_HOST || "localhost",
      redisPort: process.env.STG_REDIS_PORT || 6379
    }
  },
  database: {
    development: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test",
      database: "chat-dev",
      entities: ["src/models/*.ts"],
      synchronize: false,
      migrations: ["src/migration/*.ts"],
      cli: {
        migrationsDir: "src/migration"
      }
    },
    production: {
      type: "postgres",
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PW,
      database: process.env.PG_DB,
      entities: ["src/models/*.ts"],
      synchronize: false,
      migrations: ["src/migration/*.ts"],
      cli: {
        migrationsDir: "src/migration"
      }
    },
    staging: {
      type: "postgres",
      host: process.env.STG_HOST || "localhost",
      port: process.env.STG_PORT || 5432,
      username: process.env.STG_USER || "postgres",
      password: process.env.STG_PW || "test",
      database: process.env.STG_DB || "chat-staging",
      entities: ["src/models/*.ts"],
      synchronize: false,
      migrations: ["src/migration/*.ts"],
      cli: {
        migrationsDir: "src/migration"
      }
    }
  }
};

export default {
  api: config.api,
  port: config.port,
  database: config.database[env],
  redis: config.redis[env]
};
