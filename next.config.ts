// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Vercel のビルド中は ESLint 無視させる
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
