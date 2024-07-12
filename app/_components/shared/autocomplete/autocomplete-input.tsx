import { Place } from "@/types/place";
import { useRef, useState, type KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import AutocompleteList from "./autocomplete-list";
import { Command, CommandInput } from "../../ui/command";

type Props = {
  options: Place[];
  value: string;
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
    <Command shouldFilter={false} label="Dive Center/Location">
      <CommandInput
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        onValueChange={isLoading ? undefined : setValue}
        onBlur={handleBlur}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        data-testid="auto-complete-input"
        required
      />
      {isOpen ? (
        <AutocompleteList
          options={options}
          handleSelectOption={handleSelectOption}
          isLoading={isLoading}
        />
      ) : (
        <CommandPrimitive.List />
      )}
    </Command>
  );
};
