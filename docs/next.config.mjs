import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true
});

export default withNextra({
  basePath: '/architecture',
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  redirects: () => [
    {
      source: '/',
      destination: '/docs',
      permanent: true
    },
    {
      source: '/architecture',
      destination: '/architecture/docs',
      permanent: true
    }
  ]
})
