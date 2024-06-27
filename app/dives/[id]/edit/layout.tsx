import Header from "@/app/_components/ui/header";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

function Layout({ children, params }: Props) {
  return (
    <>
      <Header href={`/dives/${params.id}`} name="Edit Dive" />
      {children}
    </>
  );
}

export default Layout;
