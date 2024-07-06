import { Place } from "@/types/place";
import { useRef, useState, type KeyboardEvent } from "react";
import { CommandInput } from "../../ui/command";
import CommandWithLabel from "../../ui/command-with-label";
import AutocompleteList from "./autocomplete-list";

type Props = {
  options: Place[];
  value: string;
  showList: boolean;
  setValue: (value: string) => void;
  selected?: Place;
  setSelected: (s: Place) => void;
  isLoading?: boolean;
  placeholder?: string;
};

export const AutocompleteInput = ({
  options,
  placeholder,
  value,
  showList,
  setValue,
  selected,
  setSelected,
  isLoading = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setOpen(true);
    }

    // This is not a default behaviour of the <input /> field
    if (event.key === "Enter" && input.value !== "") {
      const optionToSelect = options.find(
        (option) => option.main_text === input.value,
      );
      if (optionToSelect) {
        setSelected(optionToSelect);
        setValue(input.value);
      }
    }

    if (event.key === "Escape") {
      input.blur();
    }
  };

  const handleBlur = () => {
    setOpen(false);
    setValue(selected?.main_text || "");
  };

  const handleSelectOption = (selectedOption: Place) => {
    setValue(selectedOption.main_text);
    setSelected(selectedOption);

    // This is a hack to prevent the input from being focused after the user selects an option
    // We can call this hack: "The next tick"
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 0);
  };

  return (
    <CommandWithLabel
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      label="Dive Center/Location"
    >
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={isLoading ? undefined : setValue}
        onBlur={handleBlur}
        onFocus={() => {
          setOpen(true);

          // in case of default value, fetch options via setValue
          if (value && options.length === 0) {
            setValue(value);
          }
        }}
        placeholder={placeholder}
        data-testid="auto-complete-input"
        required
      />
      <div className="relative">
        {isOpen && showList && (
          <AutocompleteList
            options={options}
            handleSelectOption={handleSelectOption}
            isLoading={isLoading}
            selected={selected}
          />
        )}
      </div>
    </CommandWithLabel>
  );
};
