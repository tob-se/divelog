import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

function EditDiveFallback() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-24 bg-muted-foreground/10" />
          <Skeleton className="h-6 w-6 rounded-full bg-muted-foreground/10" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
      </CardContent>
      <CardFooter className="flex h-[61px] justify-between">
        <Button size="sm" variant="outline" disabled={true}>
          Cancel
        </Button>
        <Button size="sm" type="submit" disabled={true}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditDiveFallback;
