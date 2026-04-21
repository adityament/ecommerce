/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['vm-80l1lg0t9mqof0tbdut7yrbk.vusercontent.net'],
}

export default nextConfig
