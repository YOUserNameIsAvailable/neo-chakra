/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_APP_API_KEY: 'OYGvNPxqCHmwRQKZWw4oq4x2RoaYgDmV',
    NEXT_APP_ACCESS_TOKEN: 'TrchKDjt3EgsrYIhM0fUFMMcaFMFssoS',
  },
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
