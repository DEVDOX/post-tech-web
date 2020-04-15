<template>
 <div class="w-full mx-auto">
    <div v-if="error.statusCode === 404">
      <h1 class="text-6xl font-bold">404<span class="text-2xl font-normal ml-3">Not found</span></h1>
      <h2 class="text-lg">{{ $t('error.404') }}</h2>
    </div>
    <h1 v-else>エラーが発生しました</h1>
    <div class="mt-12">
      <nuxt-link to="/" class="hover:underline text-gray-700">ホームに戻る</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Error extends Vue {
  @Prop({default: null}) error!: object
}
</script>