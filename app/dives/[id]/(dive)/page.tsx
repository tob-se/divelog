import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import DateAndTime from "@/app/_components/ui/date-and-time";
import GenericTuple from "@/app/_components/ui/generic-tuple";
import { ListSeparator, Separator } from "@/app/_components/ui/separator";
import TextTuple from "@/app/_components/ui/text-tuple";
import { findDiveById } from "@/infrastructure/data-access/find-dive-by-id";
import { findObservationsByDiveId } from "@/infrastructure/data-access/find-observations-by-id";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import SpecieListItem from "../../../_components/shared/specie-list-item";

async function Dive({ params }: { params: { id: string } }) {
  const diveData = findDiveById(params.id);
  const observationsData = findObservationsByDiveId(params.id);
  const [dive, observations] = await Promise.all([diveData, observationsData]);

  if (!dive) {
    notFound();
  }

  const { comment, date, highlight, place, dive_site } = dive;

  return (
    <>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Dive #{dive.number}</CardTitle>
          <Star fill={highlight ? "gold" : "white"} />
        </div>
        <DateAndTime date={date} />
      </CardHeader>
      <CardContent className="overflow-auto text-sm">
        <div className="grid grid-cols-2 gap-3">
          <TextTuple title="Location">
            <address className="grid gap-0.5 not-italic">
              <span>{place.main_text}</span>
              <span>{place.secondary_text}</span>
            </address>
          </TextTuple>
          <TextTuple title="Dive Site">{dive_site}</TextTuple>
        </div>
        {comment && (
          <>
            <Separator className="my-2" />
            <TextTuple title="Comment">{comment}</TextTuple>
          </>
        )}
        {observations.length > 0 && (
          <>
            <Separator className="my-2" />
            <GenericTuple title="Obervations">
              <ul className="flex flex-col">
                {observations.map((o, i) => {
                  return (
                    <Fragment key={o.specie.id}>
                      <SpecieListItem specie={o.specie}>
                        <div className="ml-auto inline-flex h-8 w-8 items-center justify-center whitespace-nowrap rounded-md border bg-background p-1.5 text-muted-foreground">
                          {o.amount}
                        </div>
                      </SpecieListItem>
                      <ListSeparator
                        className="ml-auto w-[calc(100%-55px)]"
                        index={i}
                        length={observations.length}
                      />
                    </Fragment>
                  );
                })}
              </ul>
            </GenericTuple>
          </>
        )}
      </CardContent>
    </>
  );
}

export default Dive;
