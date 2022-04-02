module.exports = {
  framework: '@storybook/vue',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite-vue2',
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here

    // https://github.com/storybookjs/storybook/issues/10887#issuecomment-901109891
    config.resolve.dedupe = ['@storybook/client-api'];

    return config;
  },
};
