import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Dive } from "@/types/dive";

function TimeRadioGroup({ time }: { time?: Dive["dive_time"] }) {
  return (
    <RadioGroup required name="dive_time" defaultValue={time}>
      <RadioGroupItem
        icon={<Sunrise className="h-4 w-4" />}
        value="morning"
        aria-label="Morning"
      />
      <RadioGroupItem
        icon={<Sun className="h-4 w-4" />}
        value="noon"
        aria-label="Noon"
        data-testid="noon-radio-item"
      />
      <RadioGroupItem
        icon={<Sunset className="h-4 w-4" />}
        value="afternoon"
        aria-label="Afternoon"
      />
      <RadioGroupItem
        icon={<Moon className="h-4 w-4" />}
        value="night"
        aria-label="Night"
      />
    </RadioGroup>
  );
}

export default TimeRadioGroup;
