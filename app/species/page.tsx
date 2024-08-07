import { Suspense } from "react";
import ListItemFallback from "../_components/shared/list-item-fallback";
import { Card, CardContent } from "../_components/ui/card";
import Header from "../_components/ui/header";
import Search from "../_components/ui/search";
import SpecieList from "../_components/species/specie-list";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <>
      <Header href="/" name="Explore Species" />
      <Card className="flex flex-col overflow-hidden">
        <CardContent className="flex flex-col overflow-hidden">
          <div className="flex h-full flex-col gap-3">
            <Search query={query} placeholder="Search species" />
            <Suspense key={query} fallback={<ListItemFallback />}>
              <SpecieList query={query} />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Page;
