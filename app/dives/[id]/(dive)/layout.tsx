import { Button } from "@/app/_components/ui/button";
import { Card, CardFooter } from "@/app/_components/ui/card";
import Header from "@/app/_components/ui/header";
import Link from "next/link";
import DeleteDiveForm from "../../../_components/dive/delete-dive-form";
import { Toaster } from "@/app/_components/ui/toaster";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

function Layout({ params, children }: Props) {
  return (
    <>
      <Header href={"/dives"} name="Dive" />
      <Card className="flex grow flex-col overflow-hidden">
        {children}
        <CardFooter className="flex flex-row items-center justify-between gap-2 border-t bg-muted/50 px-3 py-3">
          <DeleteDiveForm id={params.id} />
          <div className="flex gap-2">
            <Link href={`/dives/${params.id}/edit`}>
              <Button size="sm" variant="outline" className="h-8">
                Edit
              </Button>
            </Link>
            <Link href={`/dives/${params.id}/observations`}>
              <Button size="sm" variant="outline" className="h-8">
                Edit Observations
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </>
  );
}

export default Layout;
