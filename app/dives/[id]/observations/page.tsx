import ListItemFallback from "@/app/_components/shared/list-item-fallback";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import Header from "@/app/_components/ui/header";
import { Suspense } from "react";
import Observations from "../../../_components/edit-observations/observations";
import Species from "../../../_components/edit-observations/species";
import SubmitObservationForm from "../../../_components/edit-observations/submit-observation-form";
import Search from "@/app/_components/ui/search";

export default function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
  };
  params: { id: string };
}) {
  const query = searchParams?.query || "";

  return (
    <>
      <Header href={`/dives/${params.id}`} name="Observations" />
      <Card className="flex grow flex-col overflow-hidden">
        <CardContent className="flex grow flex-col overflow-hidden">
          <div className="flex h-full flex-col gap-3">
            <Search
              query={query}
              placeholder="Add new observations"
              key={query ? 1 : 0}
              autoFocus
            />
            {query ? (
              <Suspense key={query} fallback={<ListItemFallback />}>
                <Species query={query} />
              </Suspense>
            ) : (
              <Suspense key={params.id} fallback={<ListItemFallback />}>
                <Observations diveId={params.id} />
              </Suspense>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitObservationForm />
        </CardFooter>
      </Card>
    </>
  );
}
