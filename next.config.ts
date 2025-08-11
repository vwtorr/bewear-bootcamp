import type { NextConfig } from "next";
import { hostname } from "os";  

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
      },  
    ],
  },
};

export default nextConfig;
