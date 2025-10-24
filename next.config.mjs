/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';
const isGitpod = !!process.env.GITPOD_ENVIRONMENT_ID;

const csp = [
  "default-src 'self'",
  "script-src 'self'" + (isDev ? " 'unsafe-eval' 'unsafe-inline'" : ''),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'" + (isGitpod ? " wss://*.gitpod.dev" : ''),
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Relax COOP/CORP for Gitpod compatibility
  { key: 'Cross-Origin-Opener-Policy', value: isGitpod ? 'unsafe-none' : 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: isGitpod ? 'cross-origin' : 'same-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Avoid standalone copy errors with segment group
  output: undefined,
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
    ];
  },
};

export default nextConfig;
