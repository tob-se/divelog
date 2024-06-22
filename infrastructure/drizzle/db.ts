import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { loadEnvConfig } from "@next/env";
import * as schema from "./schema";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const db = drizzle(sql, { schema });
