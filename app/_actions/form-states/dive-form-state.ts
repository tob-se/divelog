import { GenericFormState } from "./generic-form-state";

export type DiveFormState = GenericFormState & {
  errors?: {
    id?: string[];
    comment?: string[];
    date?: string[];
    dive_site?: string[];
    highlight?: string[];
    place?: string[];
    dive_time?: string[];
  };
};
