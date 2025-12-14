const repoBase = process.env.BASE_PATH ?? "/dg-steam-scratch";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: repoBase,
  assetPrefix: repoBase,
  trailingSlash: true,
  typedRoutes: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

