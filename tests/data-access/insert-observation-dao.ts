import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable } from "@/infrastructure/drizzle/schema";
import { ObservationDAO } from "@/infrastructure/observation-dao";

export const insertObservationDAO = async (observation: ObservationDAO) => {
  await db.insert(ObservationTable).values(observation);
};
