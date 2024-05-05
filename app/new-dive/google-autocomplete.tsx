import { AutoComplete } from "@/components/ui/autocomplete";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";

const libraries: Libraries = ["places"];

type Props = {
  selected?: Suggestion;
  setSelected: (s: Suggestion) => void;
};

function GoogleAutocomplete({ selected, setSelected }: Props) {
  const {
    value,
    suggestions: { loading, data },
    setValue,
    init,
    ready,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    debounce: 500,
    initOnMount: false,
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

  return (
    <AutoComplete
      disabled={isDisabled}
      options={data}
      emptyMessage="No results"
      placeholder={isDisabled ? "Loading..." : "Scuba Junkie"}
      isLoading={loading}
      setValue={setValue}
      selected={selected}
      setSelected={setSelected}
      value={value}
    />
  );
}

export default GoogleAutocomplete;
