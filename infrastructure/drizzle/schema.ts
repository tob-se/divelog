// import "server-only";

import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";

export const SpecieTable = pgTable("specie", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  common_name: text("common_name"),
  observations: integer("observations").notNull(),
  square_url: text("square_url"),
  medium_url: text("medium_url"),
  wikipedia_url: text("wikipedia_url"),
});

export const diveTimeEnum = pgEnum("dive_time", [
  "morning",
  "noon",
  "afternoon",
  "night",
]);

export const DiveTable = pgTable("dive", {
  id: uuid("id").primaryKey(),
  date: date("date").notNull(),
  place_id: text("place_id").notNull(),
  place_main_text: text("place_main_text").notNull(),
  place_secondary_text: text("place_secondary_text"),
  dive_site: text("dive_site").notNull(),
  comment: text("comment").notNull(),
  highlight: boolean("highlight").notNull(),
  dive_time: diveTimeEnum("dive_time").notNull(),
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
