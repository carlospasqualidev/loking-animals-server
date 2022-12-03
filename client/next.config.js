/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s2.glbimg.com", "m.sorisomail.com"],
  },
};

module.exports = nextConfig;
