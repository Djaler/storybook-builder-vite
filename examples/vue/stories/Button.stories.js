import MyButton from './Button.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Example/Button',
  component: MyButton,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
};

function createEventListeners(argTypes) {
  return Object.entries(argTypes)
    .filter(([, value]) => value.table.category === 'events')
    .reduce((acc, [key]) => {
      acc[key] = action(key);
      return acc;
    }, {});
}

const Template = (args, { argTypes }) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyButton },
  props: Object.keys(argTypes),
  eventListeners: createEventListeners(argTypes),
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-button v-bind="$props" v-on="$options.eventListeners"/>',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

// not args-based story
export const Secondary = () => ({
  components: { MyButton },
  template: '<my-button label="asd" />',
});

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
