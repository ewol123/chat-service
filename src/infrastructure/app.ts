const version = 1;
const env = process.env.NODE_ENV || "development";

const config = {
  api: {
    version
  },
  port: 3001,
  redis: {
    development: {
      redisHost: process.env.REDIS_HOST || "localhost",
      redisPort: process.env.REDIS_PORT || 6379
    },
    production: {
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT
    },
    staging: {
      redisHost: process.env.REDIS_HOST || "localhost",
      redisPort: process.env.REDIS_PORT || 6379
    }
  },
  database: {
    development: {
      type: "postgres",
      host: process.env.PG_HOST || "localhost",
      port: process.env.PG_PORT || 5432,
      username: process.env.PG_USER || "postgres",
      password: process.env.PG_PW || "test",
      database: process.env.PG_DB || "chat-dev",
      entities: ["src/infrastructure/repository/message/Message.ts", "src/infrastructure/repository/room/Room.ts", "src/infrastructure/repository/user/User.ts"],
      synchronize: false,
      dropSchema: false,
      migrations: ["src/infrastructure/migration/*.ts"],
      cli: {
        migrationsDir: "src/infrastructure/migration"
      }
    },
    production: {
      type: "postgres",
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PW,
      database: process.env.PG_DB,
      entities: ["src/infrastructure/repository/message/Message.ts", "src/infrastructure/repository/room/Room.ts", "src/infrastructure/repository/user/User.ts"],
      synchronize: false,
      dropSchema: false,
      migrations: ["src/infrastructure/migration/*.ts"],
      cli: {
        migrationsDir: "src/infrastructure/migration"
      }
    },
    staging: {
      type: "postgres",
      host: process.env.PG_HOST || "localhost",
      port: process.env.PG_PORT || 5432,
      username: process.env.PG_USER || "postgres",
      password: process.env.PG_PW || "test",
      database: process.env.PG_DB || "chat-staging",
      entities: ["src/infrastructure/repository/message/Message.ts", "src/infrastructure/repository/room/Room.ts", "src/infrastructure/repository/user/User.ts"],
      synchronize: false,
      dropSchema: true,
      migrations: ["src/infrastructure/migration/*.ts"],
      cli: {
        migrationsDir: "src/infrastructure/migration"
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
