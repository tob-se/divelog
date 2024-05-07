import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Home() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Dive Log</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5">
        <Link href="/new-dive">
          <Button className="w-full">Log New Dive</Button>
        </Link>
        <Button>Dive Log</Button>
        <Button>Marine Life List</Button>
      </CardContent>
    </Card>
  );
}

export default Home;
