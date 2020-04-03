<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="btn btn-white border col-span-1 relative">
      <span>Test</span>
      <i v-if="isOpen" class="mdi mdi-chevron-right"/>
      <i v-if="!isOpen" class="mdi mdi-chevron-down"/>
    </button>
    <div v-if="isOpen" class="absolute border rounded bg-white py-3 mt-1">
      <ul>
        <li class="hover:bg-gray-100 cursor-pointer py-2 px-5">Test</li>
        <li class="hover:bg-gray-100 cursor-pointer py-2 px-5">Test</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Settings extends Vue {
  @Prop() selections!: []
  isOpen: boolean = false
}
</script>