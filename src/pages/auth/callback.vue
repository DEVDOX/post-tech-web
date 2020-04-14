<template>
  <p>{{ $t('redirecting') }}</p>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LoginCallback extends Vue {
}
</script>
