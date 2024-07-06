import { Place, toPlaceFromPrediction } from "@/types/place";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { AutocompleteInput } from "./autocomplete-input";

type Props = {
  selected?: Place;
  setSelected: (s: Place) => void;
};

const Autocomplete = ({ selected, setSelected }: Props) => {
  const places = useMapsLibrary("places");

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [predictionResults, setPredictionResults] = useState<Array<Place>>([]);

  const [searchTerm, setSearchTerm] = useState(selected?.main_text || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!places) return;

    setAutocompleteService(new places.AutocompleteService());
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [places]);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!autocompleteService || !debouncedSearchTerm) {
        setPredictionResults([]);
        return;
      }

      setIsSearching(true);

      const request = { input: debouncedSearchTerm, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response.predictions.map(toPlaceFromPrediction));

      setIsSearching(false);
    };

    fetchPredictions();
  }, [autocompleteService, debouncedSearchTerm, sessionToken]);

  return (
    <AutocompleteInput
      options={predictionResults}
      setSelected={setSelected}
      selected={selected}
      placeholder="Search for a place"
      isLoading={isSearching}
      showList={!!debouncedSearchTerm}
      value={searchTerm}
      setValue={setSearchTerm}
    />
  );
};

function PlacesAutocomplete(props: Props) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <Autocomplete {...props} />
    </APIProvider>
  );
}

export default PlacesAutocomplete;
