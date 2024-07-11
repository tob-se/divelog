import { cn } from "@/lib/utils";
import { DiveTime } from "@/types/dive-time";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";

const TimeIcon = ({ time }: { time: DiveTime }) => {
  if (time === "morning") {
    return <Sunrise data-testid="sunrise-icon" className="h-[1em] w-[1em]" />;
  }
  if (time === "noon") {
    return <Sun data-testid="sun-icon" className="h-[1em] w-[1em]" />;
  }
  if (time === "afternoon") {
    return <Sunset data-testid="sunset-icon" className="h-[1em] w-[1em]" />;
  }
  if (time === "night") {
    return <Moon data-testid="moon-icon" className="h-[1em] w-[1em]" />;
  }
};

const formatDate = (date: string) => date.split("-").reverse().join("/");

function DateAndTime({
  date,
  time,
  className,
}: {
  date: string;
  time: DiveTime;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
      data-testid="date-and-time"
    >
      <span>{formatDate(date)}</span>
      <TimeIcon time={time} />
    </div>
  );
}

export default DateAndTime;
