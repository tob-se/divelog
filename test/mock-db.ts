import * as schema from "@/infrastructure/drizzle/schema";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import path from "path";

const sqlite = new PGlite();
export const mockDb = drizzle(sqlite, { schema });

const migrationPath = path.join(process.cwd(), "/migrations");

export const initMockDb = async () => {
  await migrate(mockDb, { migrationsFolder: migrationPath });
};
