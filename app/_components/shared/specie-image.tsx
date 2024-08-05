import { Fish } from "lucide-react";
import Image from "next/image";

export default function SpecieImage({
  imageUrl,
}: {
  imageUrl?: string | null;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        fill
        style={{
          objectFit: "cover",
        }}
        alt="Specie Image"
        className="rounded-lg"
      />
    );
  }

  return (
    <Fish color="dimgray" height={80} width={80} className="m-auto h-full" />
  );
}
