if (
  (process.env.DATABASE_URL =
    "postgres://postgres:docker@localhost:5432/postgres")
) {
  module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
      entitiesDir: "src/entities",
    },
  };
} else {
  module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrations: ["dist/database/migrations/*.js"],
    entities: ["dist/entities/*.js"],
    ssl: {
      rejectUnauthorized: false,
    },
    cli: {
      migrationsDir: "src/database/migrations",
      entitiesDir: "src/entities",
    },
  };
}
