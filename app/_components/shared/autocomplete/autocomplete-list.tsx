import { Place } from "@/types/place";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { CommandGroup, CommandItem, CommandList } from "../../ui/command";
import { Skeleton } from "../../ui/skeleton";

type Props = {
  options: Place[];
  selected?: Place;
  handleSelectOption: (s: Place) => void;
  isLoading?: boolean;
};

function AutocompleteList({
  isLoading,
  options,
  selected,
  handleSelectOption,
}: Props) {
  if (isLoading) {
    return (
      <CommandList>
        <CommandPrimitive.Loading>
          <div className="p-1">
            <Skeleton className="h-12 w-full" />
          </div>
        </CommandPrimitive.Loading>
      </CommandList>
    );
  }

  if (options.length > 0) {
    return (
      <CommandList>
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
                data-testid="auto-complete-item"
              >
                {isSelected ? <Check className="w-4" /> : <div />}
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium leading-none">{main_text}</span>
                  <span className="text-muted-foreground">
                    {secondary_text}
                  </span>
                </div>
              </CommandItem>
            );
          })}
          <CommandItem className="justify-end py-1 text-xs" disabled={true}>
            powered by Google
          </CommandItem>
        </CommandGroup>
      </CommandList>
    );
  }

  return null;
}

export default AutocompleteList;
