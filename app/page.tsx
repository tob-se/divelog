import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import TextTuple from "@/app/_components/ui/text-tuple";
import { BookOpen, FishSymbol, List, Plus } from "lucide-react";
import { Suspense } from "react";
import {
  LastDiveInformationFallback,
  LastDiveInformation,
} from "./_components/home/last-dive-information";
import {
  LastObservedSpecieFallback,
  LastObservedSpecie,
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
      <CardFooter className="flex-wrap justify-between">
        <NavigationButton
          testId="new-dive-button"
          href="/new-dive"
          name="New Dive"
        >
          <Plus size={30} />
        </NavigationButton>
        <NavigationButton href="/dives" name="Logbook">
          <BookOpen size={30} />
        </NavigationButton>
        <NavigationButton name="Life List" href="/">
          <List size={30} />
        </NavigationButton>
      </CardFooter>
    </Card>
  );
}

export default Home;
