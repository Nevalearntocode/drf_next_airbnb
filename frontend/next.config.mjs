/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "www.djangoairbnbapi.xyz",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "localhost",
        pathname: "/**",
      },
      {
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        hostname: "pub-49c7c8349a754c4aa547de3054e978b3.r2.dev",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
