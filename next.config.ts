import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname:'img.clerk.com',
                protocol:'https',
            }
        ]
    },
};

export default nextConfig;
