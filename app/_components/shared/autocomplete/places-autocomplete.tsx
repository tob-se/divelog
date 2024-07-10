import { usePlaces } from "@/app/_hooks/usePlaces";
import { Place } from "@/types/place";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { AutocompleteInput } from "./autocomplete-input";

type Props = {
  selected?: Place;
  setSelected: (s: Place) => void;
};

function PlacesAutocomplete({ setSelected, selected }: Props) {
  const [searchTerm, setSearchTerm] = useState(selected?.main_text || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { data, isLoading } = usePlaces(debouncedSearchTerm);

  return (
    <AutocompleteInput
      options={data || []}
      setSelected={setSelected}
      selected={selected}
      placeholder="Search for a place"
      isLoading={isLoading}
      value={searchTerm}
      setValue={setSearchTerm}
    />
  );
}

export default PlacesAutocomplete;
