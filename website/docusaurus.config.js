// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Local Language Support',
  tagline: 'Conversational Commerce',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/local-language-support-logo.png',
  organizationName: 'Local Language Support Team', 
  projectName: 'Local Language Support Team', 
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {

          sidebarCollapsible: true,

          sidebarPath: require.resolve('./sidebars.js'),
        },
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
        title: 'Local Language Support',
        logo: {
          alt: 'My Site Logo',
          src: 'img/local-language-support-logo.png',
        },
        items: [
          {
            to: 'docs/getting-started/Local Setup',
            label: 'Get Started',
            position: 'left',
            className: 'navbar__link',
          },
          {
            to: 'docs/Overview',
            label: 'Docs',
            position: 'left',
            className: 'navbar__link',
          },
          {
            to: 'https://github.com/Local-Language-Support-Team/Local-Language-Support-Team',
            label: 'Github',
            position: 'left',
            className: 'navbar__link',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/Overview',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Local-Language-Support-Team/Local-Language-Support-Team',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
