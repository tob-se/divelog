import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import SubmitButton from "@/app/_components/ui/submit-button";
import { Textarea } from "@/app/_components/ui/textarea";
import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import { Dive } from "@/types/dive";
import { Place } from "@/types/place";
import { cn, createUTCDate } from "@/lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { format } from "date-fns";
import { CalendarIcon, Star } from "lucide-react";
import Link from "next/link";
import FormErrors from "../ui/form-errors";
import PlacesAutocomplete from "./places-autocomplete";
import TimeToggleGroup from "./time-toggle-group";

type Props = {
  dive?: Dive;
  date: Date;
  place?: Place;
  setPlace: (p: Place) => void;
  setDate: (d: Date) => void;
  diveNumber: number;
  formState: DiveFormState;
};

export default function DiveFormCard({
  dive,
  date,
  setDate,
  place,
  setPlace,
  diveNumber,
  formState,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between space-y-0">
        <CardTitle>Dive #{diveNumber}</CardTitle>
        <Switch.Root
          defaultChecked={dive?.highlight}
          name="highlight"
          data-testid="highlight-switch"
        >
          <Switch.Thumb asChild>
            <Star className="data-[state=checked]:fill-yellow-300" />
          </Switch.Thumb>
        </Switch.Root>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
                id="date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onDayClick={(d) => {
                  const newDate = createUTCDate(d, date.getUTCHours());
                  setDate(newDate);
                }}
                required
              />
            </PopoverContent>
          </Popover>
          <FormErrors errors={formState.errors?.date} />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <TimeToggleGroup date={date} setDate={setDate} />
        </div>
        <div className="space-y-2">
          <PlacesAutocomplete selected={place} setSelected={setPlace} />
          <FormErrors errors={formState.errors?.place} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dive_site">Dive Site</Label>
          <Input
            id="dive_site"
            name="dive_site"
            placeholder="Barracuda Point"
            defaultValue={dive?.dive_site}
            data-testid="dive-site-input"
            required
          />
          <FormErrors errors={formState.errors?.dive_site} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            name="comment"
            id="comment"
            placeholder="Best dive ever"
            className="min-h-[60px]"
            defaultValue={dive?.comment}
            data-testid="comment"
          />
          <FormErrors errors={formState.errors?.comment} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={dive ? `/dives/${dive.id}` : "/"}>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </Link>
        <SubmitButton />
      </CardFooter>
    </Card>
  );
}
