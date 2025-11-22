import type { NextConfig } from 'next'
import path from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add alias for parent directory src files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': path.resolve(__dirname, '../src'),
    }
    return config
  },

  // Configure Turbopack aliases
  turbopack: {
    resolveAlias: {
      '@src': '../src',
    },
  },

  // Disable strict mode temporarily for debugging
  reactStrictMode: false,
}

export default withNextIntl(nextConfig)
