import "server-only";

import { InferSelectModel } from "drizzle-orm";
import { SpecieTable } from "./drizzle/schema";

export type SpecieDAO = InferSelectModel<typeof SpecieTable>;
