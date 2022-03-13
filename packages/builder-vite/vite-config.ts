import * as path from 'path';
import fs from 'fs';
import { Plugin } from 'vite';
import viteReact from '@vitejs/plugin-react';

import { allowedEnvPrefix as envPrefix } from './envs';
import { mockCoreJs } from './mock-core-js';
import { codeGeneratorPlugin } from './code-generator-plugin';
import { injectExportOrderPlugin } from './inject-export-order-plugin';
import { mdxPlugin } from './plugins/mdx-plugin';
import { noFouc } from './plugins/no-fouc';
import { sourceLoaderPlugin } from './source-loader-plugin';

import type { UserConfig } from 'vite';
import type { ExtendedOptions } from './types';

export type PluginConfigType = 'build' | 'development';

export function readPackageJson(): Record<string, any> | false {
  const packageJsonPath = path.resolve('package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(jsonContent);
}

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
    sourceLoaderPlugin(options),
    mdxPlugin(options),
    noFouc(),
    injectExportOrderPlugin,
    // We need the react plugin here to support MDX.
    viteReact({
      // Do not treat story files as HMR boundaries, storybook itself needs to handle them.
      exclude: [/\.stories\.([tj])sx?$/, /node_modules/].concat(framework === 'react' ? [] : [/\.([tj])sx?$/]),
    }),
    {
      name: 'vite-plugin-storybook-allow',
      enforce: 'post',
      config(config) {
        // if there is no allow list then Vite allows anything in the root directory
        // if there is an allow list then Vite allows anything in the listed directories
        // add the .storybook directory only if there's an allow list so that we don't end up
        // disallowing the root directory unless it's already disallowed
        if (config?.server?.fs?.allow) {
          config.server.fs.allow.push('.storybook');
        }
      },
    },
  ] as Plugin[];

    try {
      const { createVuePlugin } = require('vite-plugin-vue2');
      plugins.push(createVuePlugin());
      const { vueDocgen } = await import('./plugins/vue-docgen');
      plugins.push(vueDocgen());
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        throw new Error(
          'storybook-builder-vite-vue2 requires vite-plugin-vue2 to be installed.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }

  return plugins;
}
