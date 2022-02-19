const { plugins } = require('storybook-builder-vite-svelte');

module.exports = {
  framework: '@storybook/svelte',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, options) {
    config.plugins = config.plugins.concat(await plugins(options));
    config.resolve.dedupe = ['@storybook/client-api', 'react'];
    // customize the Vite config here
    return config;
  },
};
