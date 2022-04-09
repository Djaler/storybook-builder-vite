# Storybook builder for Vite and Vue 2

Build your stories with [vite](https://vitejs.dev/) for fast startup times and near-instant HMR.

### Installation

Requirements:

- Vite 2.5 or newer
- Storybook 6.4.0 or newer

```bash
npm install storybook-builder-vite-vue2 --save-dev
```

or

```bash
yarn add --dev storybook-builder-vite-vue2
```

or

```bash
pnpm add --save-dev storybook-builder-vite-vue2
```

Note: when using `pnpm`, you may need to enable [shamefully-hoist](https://pnpm.io/npmrc#shamefully-hoist), until https://github.com/storybookjs/builder-vite/issues/55 can be fixed.

### Usage

In your `main.js` configuration file,
set `core: { builder: "storybook-builder-vite-vue2" }`.

> For autoreload of react stories to work, they need to have a `.stories.tsx` or `.stories.jsx` file suffix.
> See also [#53](https://github.com/storybookjs/builder-vite/pull/53)

The builder supports both development mode in Storybook, and building a static production version.

### Customize Vite config

The builder will _not_ read your `vite.config.js` file by default.

In `.storybook/main.js` (or whatever your Storybook config file is named)
you can override the Vite config:

```javascript
// use `mergeConfig` to recursively merge Vite options
const { mergeConfig } = require('vite');

module.exports = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: { foo: 'bar' },
      },
    });
  },
  // ... other options here
};
```

The `viteFinal` function will give you `config` which is
the builder's own Vite config. You can tweak this as you want,
for example to set up aliases, add new plugins etc.

The `configType` variable will be either `"DEVELOPMENT"` or `"PRODUCTION"`.

The function should return the updated Vite configuration.

## Note about working directory

The builder will by default enable Vite's [server.fs.strict](https://vitejs.dev/config/#server-fs-strict)
option, for increased security. The default project `root` is set to the parent directory of the
storybook configuration directory. This can be overridden in viteFinal.

### Getting started with Vue2 Vite project

```
npx sb@next init --builder storybook-builder-vite-vue2 && npm run storybook
```

## Known issues

- HMR: saving a story file does not hot-module-reload, a full reload happens instead. HMR works correctly when saving component files.
- Prebundling: Vite restarts if it detects new dependencies which it did not know about and needs to pre-bundle. This breaks within storybook, with confusing error messages. If you see a message in your terminal like `[vite] new dependencies found:`, please add those dependencies to your `optimizeDeps.include` in `viteFinal`. E.g. `config.optimizeDeps.include = [...(config.optimizeDeps?.include ?? []), "storybook-dark-mode"],`. Vite 2.9.0 may improve this behavior.

## Contributing

The Vite builder cannot build itself.
Are you willing to contribute?

https://github.com/storybookjs/builder-vite/issues/11

Have a look at the GitHub issues for known bugs. If you find any new bugs,
feel free to create an issue or send a pull request!

Please read the [How to contribute](/CONTRIBUTING.md) guide.

### About this codebase

The code is a monorepo with the core `storybook-builder-vite` package,
and examples (`examples/vue`) to test the builder implementation with.

Similar to the main storybook monorepo, you need yarn to develop this builder, because the project is organized as yarn workspaces.
This lets you write new code in the core builder package, and instantly use them from
the example packages.
