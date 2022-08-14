// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EOS Yield+',
  tagline: 'Yield+ is a reward program to attract DeFi dApps that have their own tokenomics for generating yield for their dApp\'s users.',
  url: 'https://yield-docs-seven.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/EOS-Nation/eosio.yield-docs/tree/main/docs',
        },
          blog: false,/**{
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/EOS-Nation/eosio.yield-docs/tree/main/docs',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'EOS Yield+ Docs',
        logo: {
          alt: 'EOS Yield+',
          src: 'img/logo.png',
        },
        items: [
          /**{
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },*/
          /**{
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },*/
          {
            href: 'https://github.com/EOS-Nation/eosio.yield-contracts',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          /**{
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Bluepaper',
                to: '/docs/bluepaper',
              },
              {
                label: 'Contracts',
                to: '/docs/category/contracts',
              },
            ],
          },*/
          {
            title: 'Community',
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/eos-network',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/EOSNetworkFoundation',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/EosNFoundation',
              },
            ],
          },
          {
            title: 'More',
            items: [
              /**{
                label: 'Blog',
                to: '/blog',
              },*/
              {
                label: 'GitHub',
                href: 'https://github.com/EOS-Nation/eosio.yield-contracts',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://eosn.foundation/">EOS Network Foundation</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
