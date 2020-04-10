<template>
  <p>{{ $t('redirecting') }}</p>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PostIndex extends Vue {
  // @ts-ignore
  fetch({ redirect }) {
    redirect(301, '/')
  }
}
</script>