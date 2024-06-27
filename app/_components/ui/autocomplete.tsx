import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import CommandWithLabel from "./command-with-label";
import { Skeleton } from "./skeleton";
import { Place } from "@/types/place";

type AutoCompleteProps = {
  options: Place[];
  value: string;
  setValue: (value: string) => void;
  selected?: Place;
  setSelected: (s: Place) => void;
  isLoading?: boolean;
  showDropdown?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = ({
  options,
  placeholder,
  value,
  setValue,
  disabled,
  selected,
  setSelected,
  isLoading = false,
  showDropdown = true,
}: AutoCompleteProps) => {
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
    <CommandWithLabel onKeyDown={handleKeyDown} label="Dive Center/Location">
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
        disabled={disabled}
        required
      />
      <div className="relative">
        {isOpen && showDropdown ? (
          <CommandList className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : (
              <CommandGroup>
                {options.map((option) => {
                  const { id, main_text, secondary_text } = option;
                  const isSelected = selected?.id === id;

                  return (
                    <CommandItem
                      key={id}
                      value={main_text + secondary_text}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={"grid w-full grid-cols-[24px_auto]"}
                    >
                      {isSelected ? <Check className="w-4" /> : <div />}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium leading-none">
                          {main_text}
                        </span>
                        <span className="text-muted-foreground">
                          {secondary_text}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        ) : null}
      </div>
    </CommandWithLabel>
  );
};
