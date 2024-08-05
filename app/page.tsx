import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import TextTuple from "@/app/_components/ui/text-tuple";
import { BookOpen, Construction, Fish, FishSymbol, Plus } from "lucide-react";
import { Suspense } from "react";
import {
  LastDiveInformation,
  LastDiveInformationFallback,
} from "./_components/home/last-dive-information";
import {
  LastObservedSpecie,
  LastObservedSpecieFallback,
} from "./_components/home/last-observed-specie";
import NavigationButton from "./_components/home/navigation-button";

function Home() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle data-testid="title" className="flex flex-row gap-2">
          <FishSymbol />
          Dive Log
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Suspense fallback={<LastObservedSpecieFallback />}>
          <LastObservedSpecie />
        </Suspense>
        <Suspense fallback={<LastDiveInformationFallback />}>
          <LastDiveInformation />
        </Suspense>
        <TextTuple title="Dive Insurance">123123123</TextTuple>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <NavigationButton
          testId="new-dive-button"
          href="/new-dive"
          name="New Dive"
        >
          <Plus />
        </NavigationButton>
        <NavigationButton href="/dives" name="Logbook">
          <BookOpen />
        </NavigationButton>
        <NavigationButton name="Species" href="/species">
          <Fish />
        </NavigationButton>
        <NavigationButton name="Settings" href="/">
          <Construction />
        </NavigationButton>
      </CardFooter>
    </Card>
  );
}

export default Home;
