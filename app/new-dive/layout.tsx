import Header from "@/app/_components/ui/header";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header href="/" name="Log new dive" />
      {children}
    </>
  );
}

export default Layout;
