<template>
  <div>{{ innerValue }} {{ length }}</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ClassComponent extends Vue {
  @Prop({ type: String, default: 'asd' })
  test!: string;

  innerValue = this.test;

  @Watch('test')
  onTestChanged() {
    this.innerValue = this.test;
  }

  get length() {
    return this.innerValue.length;
  }
}
</script>
