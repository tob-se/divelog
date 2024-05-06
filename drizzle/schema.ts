import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const SpeciesTable = pgTable("species", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  common_name: text("common_name"),
  observations: integer("observations").notNull(),
  square_url: text("square_url"),
  medium_url: text("medium_url"),
});

export type Specie = InferSelectModel<typeof SpeciesTable>;
