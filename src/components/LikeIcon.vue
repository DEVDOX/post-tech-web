<template>
  <i :class="addClass" class="mdi text-red-600"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'nuxt-property-decorator'

interface iconType {
  [name: string]: boolean
}

@Component
export default class LikeIcon extends Vue {
  @PropSync('liked', {required: true}) isLiked!: boolean
  @Prop() className!: string

  get addClass(): iconType {
    let iconType: iconType = {
      'mdi-heart': this.isLiked,
      'mdi-heart-outline': !this.isLiked,
    }
    
    if (this.className != null) { iconType[this.className] = true }
    return iconType
  }
}
</script>