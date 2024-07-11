import { Place } from "@/types/place";
import { useRef, useState, type KeyboardEvent } from "react";
import { Command as CommandPrimitive } from "cmdk";
import CommandWithLabel from "../../ui/command-with-label";
import AutocompleteList from "./autocomplete-list";

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
    <CommandWithLabel
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      label="Dive Center/Location"
    >
      <div className="flex w-full items-center justify-between rounded-lg border bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <CommandPrimitive.Input
          ref={inputRef}
          value={value}
          onValueChange={isLoading ? undefined : setValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          data-testid="auto-complete-input"
          className="h-10 w-full rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          required
        />
      </div>
      {isOpen ? (
        <AutocompleteList
          options={options}
          handleSelectOption={handleSelectOption}
          isLoading={isLoading}
        />
      ) : (
        <CommandPrimitive.List />
      )}
    </CommandWithLabel>
  );
};
