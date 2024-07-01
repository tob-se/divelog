import * as actualDB from "@/infrastructure/drizzle/db";
import { mockDb } from "./mock-db";

vi.mock("server-only", () => ({}));
vi.spyOn(actualDB, "db", "get").mockReturnValue(mockDb);
