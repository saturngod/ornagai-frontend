/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_HOST: "http://localhost:3000/api",
    APP_ID: "23321321",
    APP_KEY: "69722703123"
  },
}

module.exports = nextConfig
