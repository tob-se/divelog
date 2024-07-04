import "@/infrastructure/drizzle/db";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./infrastructure/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
    ssl: !!process.env.VERCEL,
  },
});
