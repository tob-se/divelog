/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inaturalist-open-data.s3.amazonaws.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "static.inaturalist.org",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "www.inaturalist.org",
        port: "",
        pathname: "/attachment_defaults/local_photos/**",
      },
    ],
  },
};

export default nextConfig;
