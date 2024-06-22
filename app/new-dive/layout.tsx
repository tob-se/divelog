import Header from "@/app/_components/ui/header";
import { Toaster } from "../_components/ui/toaster";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header href="/" name="Log new dive" />
      {children}
      <Toaster />
    </>
  );
}

export default Layout;
