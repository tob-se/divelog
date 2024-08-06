import * as schema from "./schema";
import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import postgres from "postgres";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";

const createDB = () => {
  const queryClient = postgres(process.env.POSTGRES_URL!);
  return drizzlePostgres(queryClient, { schema });
};

export const db = process.env.VERCEL_ENV
  ? drizzleVercel(sql, { schema })
  : createDB();
