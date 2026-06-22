/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Static export for *.obliko.org wildcard hosting (S3 + CloudFront host-router).
  // host-router serves Next export with trailingSlash; /api/lead is handled by
  // the shared lead-proxy Lambda behavior on CloudFront, not by this build.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
