// import "server-only";

import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const SpecieTable = pgTable("specie", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  common_name: text("common_name"),
  observations: integer("observations").notNull(),
  square_url: text("square_url"),
  medium_url: text("medium_url"),
  wikipedia_url: text("wikipedia_url"),
});

export const DiveTable = pgTable("dive", {
  id: uuid("id").primaryKey(),
  date: timestamp("date", { mode: "date" }).notNull(),
  place_id: text("place_id").notNull(),
  place_main_text: text("place_main_text").notNull(),
  place_secondary_text: text("place_secondary_text"),
  dive_site: text("dive_site").notNull(),
  comment: text("comment").notNull(),
  highlight: boolean("highlight").notNull(),
});

export const ObservationTable = pgTable(
  "observation",
  {
    dive_id: uuid("dive_id")
      .notNull()
      .references(() => DiveTable.id, { onDelete: "cascade" }),
    specie_id: integer("specie_id")
      .notNull()
      .references(() => SpecieTable.id),
    amount: integer("amount").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.dive_id, table.specie_id] }),
    };
  },
);

export const insertSpecieSchema = createInsertSchema(SpecieTable);

export const insertObservationSchema = createInsertSchema(ObservationTable, {
  amount: (schema) => schema.amount.positive(),
});

export const insertDiveSchema = createInsertSchema(DiveTable);
