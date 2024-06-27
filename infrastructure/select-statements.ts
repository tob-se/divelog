import { getTableColumns, sql } from "drizzle-orm";
import { DiveTable, SpecieTable } from "./drizzle/schema";

const { place_id, place_main_text, place_secondary_text, ...restDive } =
  getTableColumns(DiveTable);

export const SelectDive = {
  ...restDive,
  place: {
    id: DiveTable.place_id,
    main_text: DiveTable.place_main_text,
    secondary_text: DiveTable.place_secondary_text,
  },
  number: sql<number>`ROW_NUMBER() OVER (ORDER BY ${DiveTable.date})`
    .mapWith(Number)
    .as("number"),
};

const { observations, ...restSpecie } = { ...getTableColumns(SpecieTable) };

export const SelectSpecie = restSpecie;
