import { fetchSpecieDescription } from "@/app/_fetching/fetch-specie-description";
import { findSpecieById } from "@/infrastructure/data-access/find-specie-by-id";
import { notFound } from "next/navigation";
import SpecieImage from "../../_components/shared/specie-image";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card";
import TextTuple from "../../_components/ui/text-tuple";
import Link from "next/link";
import { WikipediaIcon } from "@/app/_components/species/wikipedia-icon";

export default async function Page({ params }: { params: { id: number } }) {
  const specie = await findSpecieById(params.id);

  if (!specie) {
    notFound();
  }

  const description = specie.wikipedia_url
    ? await fetchSpecieDescription(specie.wikipedia_url)
    : undefined;

  return (
    <>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{specie.common_name}</CardTitle>
          {specie.wikipedia_url && (
            <Link target="_blank" href={specie.wikipedia_url}>
              <WikipediaIcon />
            </Link>
          )}
        </div>
        <CardDescription>{specie.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3 overflow-hidden">
        <div className="relative aspect-[4/3]">
          <SpecieImage imageUrl={specie.medium_url} />
        </div>
        <TextTuple className="overflow-auto" title="Description">
          {description ?? "No descroption available"}
        </TextTuple>
      </CardContent>
    </>
  );
}
