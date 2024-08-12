/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['utfs.io', 'another-domain.com'],
      remotePatterns: [
        
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com'
          },
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
          },
      ]
  }
};

export default nextConfig;
