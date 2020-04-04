<template>
  <div>
    <p>ログアウトしました。</p>
    <p>リダイレクト中...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types';

@Component
export default class Header extends Vue {
  asyncData({ redirect }: Context) {
    redirect('/')
  }
}
</script>