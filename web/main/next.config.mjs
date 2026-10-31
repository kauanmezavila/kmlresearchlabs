/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neal.fun",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/gitcard/github-card.js",
        destination:
          "https://raw.githubusercontent.com/kauanmezavila/gitcard/main/github-card.js",
      },
    ];
  },
};

export default nextConfig;
