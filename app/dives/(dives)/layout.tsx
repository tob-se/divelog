import Header from "@/app/_components/ui/header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header href={"/"} name="Logbook" />
      {children}
    </>
  );
}

export default Layout;
