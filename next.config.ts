import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal config to avoid Windows SWC issues
  experimental: {
    // Disable SWC features that cause Windows DLL issues
    forceSwcTransforms: false,
    swcTraceProfiling: false,
  },
  // Use standard webpack compilation
  webpack: (config, { dev, isServer }) => {
    // Ensure compatibility with Windows
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
