import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

function TimeToggleGroup({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={date.getUTCHours().toString()}
      onValueChange={(value) => {
        if (value) {
          const newDate = new Date(date);
          newDate.setUTCHours(parseInt(value));
          setDate(newDate);
        }
      }}
      size="sm"
    >
      <ToggleGroupItem data-testid="morning-toggle" variant="outline" value="6">
        <Sunrise className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem data-testid="noon-toggle" variant="outline" value="10">
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        data-testid="afternoon-toggle"
        variant="outline"
        value="14"
      >
        <Sunset className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem data-testid="night-toggle" variant="outline" value="18">
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default TimeToggleGroup;
