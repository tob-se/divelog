import { Place } from "@/types/place";
import { Command as CommandPrimitive } from "cmdk";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { CommandGroup, CommandItem, CommandList } from "../../ui/command";

type Props = {
  options: Place[];
  handleSelectOption: (s: Place) => void;
  isLoading?: boolean;
};

function ListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative animate-in fade-in-0 zoom-in-95">
      <CommandList className="absolute z-50 h-auto w-full rounded-md border bg-background shadow-md">
        <CommandGroup>
          {children}
          <CommandItem className="justify-end py-1 text-xs" disabled={true}>
            powered by Google
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </div>
  );
}

function AutocompleteList({ isLoading, options, handleSelectOption }: Props) {
  if (isLoading) {
    return (
      <ListLayout>
        <div className="flex h-12 items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      </ListLayout>
    );
  }

  if (options.length > 0) {
    return (
      <ListLayout>
        {options.map((option) => {
          const { id, main_text, secondary_text } = option;

          return (
            <CommandPrimitive.Item
              key={id}
              value={main_text + secondary_text}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onSelect={() => handleSelectOption(option)}
              className="flex h-max cursor-pointer select-text flex-col items-start gap-0.5 rounded-md p-2 px-3 hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
              data-testid="auto-complete-item"
            >
              <div className="flex flex-col gap-0.5 text-sm">
                <span className="font-medium leading-none">{main_text}</span>
                <span className="text-muted-foreground">{secondary_text}</span>
              </div>
            </CommandPrimitive.Item>
          );
        })}
      </ListLayout>
    );
  }

  return <CommandPrimitive.List />;
}

export default AutocompleteList;
