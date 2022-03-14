<template>
  <v-btn @click="onClick"
         :color="primary ? 'primary' : ''"
         :small="size === 'small'"
         :large="size === 'large'"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'my-button',

  props: {
    /**
     * The label of the button
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * Whether the button is primary
     */
    primary: {
      type: Boolean,
      default: false,
    },

    /**
     * The size of the button
     */
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
