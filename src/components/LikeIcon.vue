<template>
  <i :class="addClass()" class="mdi text-red-600"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface iconType {
  [name: string]: boolean
}

@Component
export default class LikeIcon extends Vue {
  @Prop({required: true}) isLiked!: boolean
  @Prop() className!: string

  iconType: iconType = {
    'mdi-heart': this.isLiked,
    'mdi-heart-outline': !this.isLiked,
  }

  addClass(): iconType {
    if (this.className != null) { this.iconType[this.className] = true }
    return this.iconType
  }
}
</script>