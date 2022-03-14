import ClassComponent from './ClassComponent.vue';

export default {
  title: 'Example/ClassComponent',
  component: ClassComponent,
};

const Template = (args, { argTypes }) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ClassComponent },
  props: Object.keys(argTypes),
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<class-component v-bind="$props" />',
});

export const Primary = Template.bind({});
