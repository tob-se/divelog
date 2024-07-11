import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable } from "@/infrastructure/drizzle/schema";
import { ObservationDAO } from "@/infrastructure/observation-dao";

export const insertObservationsDAO = async (observations: ObservationDAO[]) => {
  await db.insert(ObservationTable).values(observations);
};
