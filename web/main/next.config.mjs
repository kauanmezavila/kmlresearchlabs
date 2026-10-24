/** @type {import('next').NextConfig} */
const nextConfig = {
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
