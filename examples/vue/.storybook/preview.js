import { withVuetify } from './addon-vuetify';
import Vue from 'vue';
import CompositionAPI from '@vue/composition-api';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withVuetify];

Vue.use(CompositionAPI);
