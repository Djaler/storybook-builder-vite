<template>
  <button type='button' :class='classes' @click='onClick' :style='style'>
    {{ label }}
  </button>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

import './button.css';
import { Size } from './types';

@Component
export default class Button extends Vue {
  /**
   * The label of the button
   */
  @Prop({ type: String, required: true })
  label!: string;

  /**
   * Whether the button is primary
   */
  @Prop({ type: Boolean, default: false })
  primary!: boolean;

  /**
   * The size of the button
   */
  @Prop({
    type: String,
    validator(value: any): boolean {
      return Object.values(Size).includes(value);
    }
  })
  size!: Size;

  /**
   * The background colour of the button
   */
  @Prop({ type: String, default: null })
  backgroundColor!: string | null;

  get classes() {
    return {
      'storybook-button': true,
      'storybook-button--primary': this.primary,
      'storybook-button--secondary': !this.primary,
      [`storybook-button--${this.size || 'medium'}`]: true,
    };
  }

  get style() {
    return {
      backgroundColor: this.backgroundColor,
    };
  }

  onClick() {
    this.$emit('click');
  }
}
</script>
