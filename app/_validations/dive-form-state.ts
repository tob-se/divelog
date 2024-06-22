export type DiveFormState = {
  message?: string;
  errors?: {
    id?: string[];
    comment?: string[];
    date?: string[];
    dive_site?: string[];
    highlight?: string[];
    place?: string[];
  };
};
