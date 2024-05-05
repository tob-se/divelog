import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Suggestion } from "use-places-autocomplete";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Skeleton } from "./skeleton";

type AutoCompleteProps = {
  options: Suggestion[];
  emptyMessage: string;
  value: string;
  setValue: (value: string) => void;
  selected?: Suggestion;
  setSelected: (s: Suggestion) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  setValue,
  disabled,
  selected,
  setSelected,
  isLoading = false,
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
        (option) => option.structured_formatting.main_text === input.value
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
    setValue(selected?.structured_formatting.main_text || "");
  };

  const handleSelectOption = (selectedOption: Suggestion) => {
    setValue(selectedOption.structured_formatting.main_text);
    setSelected(selectedOption);

    // This is a hack to prevent the input from being focused after the user selects an option
    // We can call this hack: "The next tick"
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 0);
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={isLoading ? undefined : setValue}
        onBlur={handleBlur}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className="relative mt-1">
        {isOpen && options.length > 0 ? (
          <div className="animate-in fade-in-0 zoom-in-95 absolute top-1 z-10 w-full rounded-xl bg-stone-50 outline-none">
            <CommandList className="rounded-md ring-1 ring-slate-200">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selected?.place_id === option.place_id;

                    return (
                      <CommandItem
                        key={option.place_id}
                        value={option.structured_formatting.main_text}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={"grid grid-cols-[24px_auto] w-full "}
                      >
                        {isSelected ? <Check className="w-4" /> : <div />}
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium leading-none">
                            {option.structured_formatting.main_text}
                          </span>
                          <span className="text-muted-foreground">
                            {option.structured_formatting.secondary_text}
                          </span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  );
};
