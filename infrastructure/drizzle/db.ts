import { loadEnvConfig } from "@next/env";
import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const queryClient = process.env.POSTGRES_URL
  ? postgres(process.env.POSTGRES_URL)
  : postgres({
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      ssl: false,
    });

export const db = drizzle(queryClient, { schema });
