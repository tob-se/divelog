import { Place } from "@/domain/place";

export type EditDiveFormData = {
  date: Date;
  place?: Place;
  id: string;
};
