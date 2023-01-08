/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  output: 'standalone',
  // webpack: config => {
  //   config.watchOptions = {
  //     aggregateTimeout: 600,
  //     ignored: /node_modules/, 
  //     poll: 600,
  //   }
  //   return config
  // },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=()'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self';script-src: 'self';style-src: 'self';font-src: 'self';"
          }
        ],
      }
    ]
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

// module.exports = nextConfig
module.exports = withBundleAnalyzer(nextConfig)
