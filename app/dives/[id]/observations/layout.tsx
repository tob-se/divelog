import ObservationProvider from "@/app/_components/edit-observations/observation-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ObservationProvider>{children}</ObservationProvider>;
}
