import { AutoComplete } from "@/app/_components/ui/autocomplete";
import { Place } from "@/domain/place";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";

const libraries: Libraries = ["places"];

type Props = {
  selected?: Place;
  setSelected: (s: Place) => void;
};

function PlacesAutocomplete({ selected, setSelected }: Props) {
  const {
    value,
    suggestions: { loading, status, data },
    setValue,
    init,
    ready,
  } = usePlacesAutocomplete({
    debounce: 500,
    initOnMount: false,
    defaultValue: selected?.main_text,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
  });

  const isDisabled = !isLoaded || !ready;

  if (isLoaded && !ready) {
    init();
  }

  const options: Place[] = data.map((suggestion) => ({
    id: suggestion.place_id,
    main_text: suggestion.structured_formatting.main_text,
    secondary_text: suggestion.structured_formatting.secondary_text,
  }));

  return (
    <AutoComplete
      disabled={isDisabled}
      options={options}
      placeholder={isDisabled ? "Loading..." : "Scuba Junkie"}
      isLoading={loading}
      setValue={setValue}
      selected={selected}
      setSelected={setSelected}
      value={value}
      showDropdown={status === "OK"}
    />
  );
}

export default PlacesAutocomplete;
