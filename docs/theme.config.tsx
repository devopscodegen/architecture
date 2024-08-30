import React from 'react';
import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span>
      <img
        src="/architecture/logo.png"
        alt="Architecture | Generated with Stable Diffusion XL"
        width="48"
        style={{ display: 'inline-block' }}
      />
      <span style={{ paddingLeft: '12px' }}>Architecture</span>
    </span>
  ),
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    if (asPath === '/') {
      return {
        titleTemplate: 'Architecture',
      };
    }
    return {
      titleTemplate: '%s | Architecture',
    };
  },
  project: {
    link: 'https://github.com/devopscodegen/architecture',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase:
    'https://github.com/devopscodegen/architecture/tree/main/docs',
  footer: {
    text: (
      <span>
        Architecture | Built with ❤️ by <a href="/">Sagar Velankar</a>
      </span>
    ),
  },
};

export default config;
