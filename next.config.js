const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    _next_intl_trailing_slash: 'never'
  },
  images: {
    domains: ['localhost'],
  },
};
 
module.exports = withNextIntl(nextConfig);