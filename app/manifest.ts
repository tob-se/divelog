import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    display: "standalone",
  };
}
