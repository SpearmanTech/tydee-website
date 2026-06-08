import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,

  async rewrites() {
    // Look up variables INSIDE the function so they are guaranteed to be loaded
    const CUSTOMER_APP_URL = process.env.CUSTOMER_APP_INTERNAL_URL;
    const PRO_APP_URL = process.env.PRO_APP_INTERNAL_URL;

    if (!CUSTOMER_APP_URL || !PRO_APP_URL) {
      console.warn(
        "[next.config] Proxy rewrites disabled. Missing env vars in process.env."
      );
      return [];
    }

    return [
      // Customer app proxy
      {
        source: "/app",
        destination: `${CUSTOMER_APP_URL}`,
      },
      {
        source: "/app/:path*",
        destination: `${CUSTOMER_APP_URL}/:path*`,
      },
      // Pro app proxy
      {
        source: "/pro",
        destination: `${PRO_APP_URL}`,
      },
      {
        source: "/pro/:path*",
        destination: `${PRO_APP_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;