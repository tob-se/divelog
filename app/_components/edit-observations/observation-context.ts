import { Observation } from "@/types/observation";
import { createContext, useContext } from "react";

type ContextType = {
  observations?: Observation[];
  editObservation: (o: Observation) => void;
  deleteObservation: (specieId: number) => void;
  findObservation: (specieId: number) => Observation | undefined;
  setObservations: (o: Observation[]) => void;
};

export const ObservationContext = createContext<ContextType | null>(null);

export const useObservationContext = () => {
  const context = useContext(ObservationContext);

  if (!context) {
    throw new Error(
      "useObservationContext has to be used within <ObservationContext.Provider>",
    );
  }

  return context;
};
