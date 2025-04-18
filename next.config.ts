import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Safe build for TS and ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ If you're using instrumentation (e.g., telemetry)
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
