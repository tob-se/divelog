import { PGlite } from "@electric-sql/pglite";
import "@testing-library/jest-dom/vitest";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import path from "path";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import * as actualDB from "./infrastructure/drizzle/db";
import * as schema from "./infrastructure/drizzle/schema";
import { server } from "./mocks/node";

// Mock Database
const client = new PGlite();
export const mockDb = drizzle(client, { schema });
const migrationPath = path.join(process.cwd(), "/migrations");
// @ts-ignore
vi.spyOn(actualDB, "db", "get").mockReturnValue(mockDb);

vi.mock("server-only", () => ({}));

beforeAll(async () => {
  await migrate(mockDb, { migrationsFolder: migrationPath });
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
