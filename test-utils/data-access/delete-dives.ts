import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";

export const deleteDives = async () => {
  await db.delete(DiveTable);
};
