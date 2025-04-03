/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        pathname: "/apod/image/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvw5kbnsi/*",
      },
    ],
  },
};

export default nextConfig;
