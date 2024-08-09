import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable } from "@/infrastructure/drizzle/schema";

export const deleteObservations = async () => {
  await db.delete(ObservationTable);
};
