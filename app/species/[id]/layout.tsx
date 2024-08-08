import { Card } from "@/app/_components/ui/card";
import Header from "@/app/_components/ui/header";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header href="/species" name="Specie" />
      <Card className="flex flex-col overflow-hidden">{children}</Card>
    </>
  );
}

export default Layout;
