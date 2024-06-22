"use client";

import { Observation } from "@/domain/observation";
import { useCallback, useMemo, useState } from "react";
import { ObservationContext } from "../../../_components/edit-observations/observation-context";
import { Toaster } from "@/app/_components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [observations, setObservations] = useState<Observation[]>();

  const editObservation = useCallback(
    (observation: Observation) => {
      if (observations) {
        const containsSpecie = observations.some(
          (o) => o.specie.id === observation.specie.id,
        );

        if (containsSpecie) {
          const newObservations = observations.map((o, i) =>
            o.specie.id === observation.specie.id ? observation : o,
          );
          setObservations(newObservations);
        } else {
          setObservations([...observations, observation]);
        }
      } else {
        setObservations([observation]);
      }
    },
    [observations],
  );

  const deleteObservation = useCallback(
    (specieId: number) => {
      const filtered = observations?.filter((o) => o.specie.id !== specieId);
      setObservations(filtered);
    },
    [observations],
  );

  const value = useMemo(
    () => ({
      observations,
      editObservation,
      deleteObservation,
      setObservations,
    }),
    [observations, editObservation, deleteObservation],
  );

  return (
    <ObservationContext.Provider value={value}>
      {children}
      <Toaster />
    </ObservationContext.Provider>
  );
}
