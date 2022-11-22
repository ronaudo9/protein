/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/api/items',
        destination: 'http://localhost:8000/items',
      },
      {
        source: '/api/items/:slug',
        destination: 'http://localhost:8000/items/:slug',
      },

      {
        source: '/api/users',
        destination: 'http://localhost:8000/users',
      },
      {
        source: '/api/users/:slug',
        destination: 'http://localhost:8000/users/:slug',
      },

      {
        source: '/api/purchaseHistories',
        destination: 'http://localhost:8000/purchaseHistories',
      },
      {
        source: '/api/purchaseHistories/:slug',
        destination: 'http://localhost:8000/purchaseHistories/:slug',
      },

      {
        source: '/api/favorites',
        destination: 'http://localhost:8000/favorites',
      },
      {
        source: '/api/favorites/:slug',
        destination: 'http://localhost:8000/favorites/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
