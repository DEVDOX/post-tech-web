<template>
  <div>
    <div class="border border-gray-400 bg-white rounded p-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
      >
        <span>{{ tag.value }}</span>
      </span>

      <!-- Added tags -->
      <!-- <input
        type="text"
        v-model="hiddenInput"
        disabled
      > -->

      <!-- Add tag input -->
      <input
        v-show="hiddenInput"
        type="text"
        v-model="input"
        :placeholder="placeholder"
        @keydown.enter.prevent="addTag"
      >
    </div>
    <p class="my-1">Input: {{ input }}</p>
    <p class="my-1">HiddenInput: {{ hiddenInput }}</p>
    <p class="my-1">Tags: {{ tags }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class TagsInputComplete extends Vue {
  @Prop({default: 'Add a tag'}) placeholder!: string
  @Prop() state!: boolean

  tags: {}[] = []
  input: string = ''
  oldInput: string = ''
  hiddenInput: string = 'DATA'

  @Watch('input')
  takeData() {
    this.state = false
    this.$emit('inputChanged', this.input)
  }

  addTag() {
    if (this.state === true) {
      this.tags.push({value: this.input})
      this.input = ''
    } else {
      console.log('state is not true')
    }
  }

  /* getTags() {
    this.
  } */
}
</script>