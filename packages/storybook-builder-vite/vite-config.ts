import * as path from 'path';
import { Plugin } from 'vite';
import { allowedEnvPrefix as envPrefix } from './envs';
import { mockCoreJs } from './mock-core-js';
import { codeGeneratorPlugin } from './code-generator-plugin';
import { injectExportOrderPlugin } from './inject-export-order-plugin';
import { mdxPlugin } from './mdx-plugin';
import { sourceLoaderPlugin } from './source-loader-plugin';

import type { UserConfig } from 'vite';
import type { ExtendedOptions } from './types';

export type PluginConfigType = 'build' | 'development';

// Vite config that is common to development and production mode
export async function commonConfig(
  options: ExtendedOptions,
  _type: PluginConfigType
): Promise<UserConfig & { configFile: false; root: string }> {
  return {
    configFile: false,
    root: path.resolve(options.configDir, '..'),
    cacheDir: 'node_modules/.vite-storybook',
    envPrefix,
    define: {},
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm.js',
      },
    },
    plugins: await pluginConfig(options, _type),
  };
}

export async function pluginConfig(options: ExtendedOptions, _type: PluginConfigType) {
  const plugins = [
    codeGeneratorPlugin(options),
    mockCoreJs(),
    sourceLoaderPlugin(),
    mdxPlugin(),
    injectExportOrderPlugin,
  ] as Plugin[];

  try {
    const { createVuePlugin } = require('vite-plugin-vue2');
    plugins.push(createVuePlugin());
    const { vueDocgen } = await import('./plugins/vue-docgen');
    plugins.push(vueDocgen());
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') {
      throw new Error(
        'storybook-builder-vite-vue2 requires vite-plugin-vue2 to be installed.' +
          '  Please install it and start storybook again.'
      );
    }
    throw err;
  }

  return plugins;
}
