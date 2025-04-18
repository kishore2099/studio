import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Required for GitHub Pages static export
  output: "export",
  
  // Set this to your repository name (e.g., "/studio")
  basePath: "/studio",
  
  // Disable image optimization (required for static exports)
  images: {
    unoptimized: true,
  },
  
  // Keep your existing configurations
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
