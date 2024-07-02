import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
  ssl: false,
});

export const db = drizzle(pool, { schema });
