import { Card, CardContent } from "@/app/_components/ui/card";
import Header from "@/app/_components/ui/header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header href={"/"} name="Logbook" />
      <Card className="overflow-hidden">
        <CardContent className="flex h-full flex-col gap-3">
          {children}
        </CardContent>
      </Card>
    </>
  );
}

export default Layout;
