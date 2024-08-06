import "@/infrastructure/drizzle/db";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./infrastructure/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.POSTGRES_URL! },
});
