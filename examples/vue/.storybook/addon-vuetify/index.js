// Imports
import Vue from 'vue';
import Vuetify from 'vuetify';
import { makeDecorator } from '@storybook/addons';

// Vuetify
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export const withVuetify = makeDecorator({
  name: 'withVuetify',
  parameterName: 'vuetify',
  wrapper: (storyFn, context, { parameters = {} }) => {
    const vuetify = new Vuetify(parameters);

    return Vue.extend({
      vuetify,
      components: { Story: storyFn(context) },
      template: `
        <v-app>
          <v-container fluid>
            <story />
          </v-container>
        </v-app>
      `,
    });
  },
});
