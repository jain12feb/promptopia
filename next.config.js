/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   topLevelAwait: true,
  //   serverComponentsExternalPackages: ["mongoose"], // <-- and this
  // },
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  // and the following to enable top-level await support for Webpack
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;
