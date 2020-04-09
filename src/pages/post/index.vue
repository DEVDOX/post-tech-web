<template>
  <p>Redirecting...</p>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PostIndex extends Vue {
  fetch({ redirect }) {
    redirect(301, '/')
  }
}
</script>