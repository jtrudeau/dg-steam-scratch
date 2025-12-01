const repoBase = process.env.BASE_PATH ?? "/dg-steam-scratch";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: repoBase,
  assetPrefix: repoBase,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;

