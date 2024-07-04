import { cn } from "@/lib/utils";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";

const TimeIcon = ({ hour }: { hour: number }) => {
  if (hour === 6) {
    return <Sunrise data-testid="sunrise-icon" className="h-[1em] w-[1em]" />;
  }
  if (hour === 10) {
    return <Sun data-testid="sun-icon" className="h-[1em] w-[1em]" />;
  }
  if (hour === 14) {
    return <Sunset data-testid="sunset-icon" className="h-[1em] w-[1em]" />;
  }
  if (hour === 18) {
    return <Moon data-testid="moon-icon" className="h-[1em] w-[1em]" />;
  }
};

function DateAndTime({ date, className }: { date: Date; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
      data-testid="date-and-time"
    >
      <span>{date.toLocaleDateString()}</span>
      <TimeIcon hour={date.getUTCHours()} />
    </div>
  );
}

export default DateAndTime;
