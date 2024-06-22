import "server-only";

import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";

export const deleteDive = async (id: string) => {
  await db.delete(DiveTable).where(eq(DiveTable.id, id));
};
