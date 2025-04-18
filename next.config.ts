import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
const nextConfig = {
  output: "export",  // Enables static exports - required for GitHub Pages
  basePath: "/studio", // Replace with your GitHub repository name
  images: {
    unoptimized: true, // Required for GitHub Pages static deployment
  },
};

export default nextConfig;
