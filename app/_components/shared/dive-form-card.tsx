import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";
import { Dive } from "@/types/dive";
import { Place } from "@/types/place";
import FormErrors from "../ui/form-errors";
import PlacesAutocomplete from "./autocomplete/places-autocomplete";
import TimeRadioGroup from "./time-radio-group";
import { Star } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import Link from "next/link";
import { Button } from "../ui/button";
import SubmitButton from "../ui/submit-button";

type Props = {
  dive?: Dive;
  place?: Place;
  setPlace: (p: Place) => void;
  diveNumber: number;
  formState: DiveFormState;
  nextDiveTime?: Dive["dive_time"];
};

const getInitialDate = (date = new Date()) => {
  return date.toISOString().substring(0, 10);
};

export default function DiveFormCard({
  dive,
  place,
  setPlace,
  diveNumber,
  formState,
  nextDiveTime,
}: Props) {
  const initialDate = getInitialDate(dive?.date);

  return (
    <Card>
      <CardHeader className="flex-row justify-between space-y-0">
        <CardTitle data-testid="dive-title">Dive #{diveNumber}</CardTitle>
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
        <div className="flex flex-row justify-between gap-3">
          <div className="w-full space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={initialDate}
            />
            <FormErrors errors={formState.errors?.date} />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium leading-none">Time</span>
            <TimeRadioGroup time={dive?.dive_time || nextDiveTime} />
            <FormErrors errors={formState.errors?.dive_time} />
          </div>
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
