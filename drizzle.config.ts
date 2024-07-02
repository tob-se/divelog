import "@/infrastructure/drizzle/db";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./infrastructure/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    user: "postgres",
    password: "postgres",
    database: "postgres",
    port: 5432,
    ssl: false,
  },
});
