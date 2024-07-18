import { DiveTime } from "@/types/dive-time";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function TimeRadioGroup({ time }: { time?: DiveTime }) {
  return (
    <RadioGroup required name="dive_time" defaultValue={time}>
      <RadioGroupItem
        icon={<Sunrise className="h-4 w-4" />}
        value="morning"
        aria-label="Morning"
        data-testid="morning-radio-item"
        title="Morning"
      />
      <RadioGroupItem
        icon={<Sun className="h-4 w-4" />}
        value="noon"
        aria-label="Noon"
        data-testid="noon-radio-item"
        title="Noon"
      />
      <RadioGroupItem
        icon={<Sunset className="h-4 w-4" />}
        value="afternoon"
        aria-label="Afternoon"
        data-testid="afternoon-radio-item"
        title="Afternoon"
      />
      <RadioGroupItem
        icon={<Moon className="h-4 w-4" />}
        value="night"
        aria-label="Night"
        title="Night"
      />
    </RadioGroup>
  );
}

export default TimeRadioGroup;
