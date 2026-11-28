/** Plain JS on purpose: the cPanel server cannot run SWC (old glibc),
 *  and Next.js must transpile a next.config.ts at every server start. */


const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*.trycloudflare.com',
    'localhost:3000',
    '127.0.0.1:3000',
  ],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    const internalApiUrl =
      process.env.API_INTERNAL_URL ||
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://apperp.yecindia.com/api'
        : 'http://localhost:3001');

    const apiTarget = internalApiUrl
      .replace(/\/api\/v1\/?$/, '')
      .replace(/\/api\/?$/, '')
      .replace(/\/+$/, '');

    // In production on apperp.yecindia.com, the API is mounted under /api
    const apiBasePath = apiTarget.includes('apperp.yecindia.com') ? `${apiTarget}/api` : apiTarget;

    return [
      {
        source: '/api-proxy/:path*',
        destination: `${apiBasePath}/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${apiBasePath}/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${apiBasePath}/auth/:path*`,
      },
      {
        source: '/projects/:path*',
        destination: `${apiBasePath}/projects/:path*`,
      },
      {
        source: '/submissions/:path*',
        destination: `${apiBasePath}/submissions/:path*`,
      },
      {
        source: '/activities/:path*',
        destination: `${apiBasePath}/activities/:path*`,
      },
      {
        source: '/attendance/:path*',
        destination: `${apiBasePath}/attendance/:path*`,
      },
      {
        source: '/users/:path*',
        destination: `${apiBasePath}/users/:path*`,
      },
      {
        source: '/dprs/:path*',
        destination: `${apiBasePath}/dprs/:path*`,
      },
      {
        source: '/audit/:path*',
        destination: `${apiBasePath}/audit/:path*`,
      },
    ];
  },
};

export default nextConfig;
