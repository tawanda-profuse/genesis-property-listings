/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fsboafrica.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
