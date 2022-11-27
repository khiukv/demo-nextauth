/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    APP_ENV: process.env.NEXT_APP_ENV,
    API_URL: process.env.NEXT_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}

module.exports = nextConfig
