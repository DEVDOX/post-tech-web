<template>
  <div class="all-wrapper modal-active">
    <Header :isSignIn="false" />
    <div class="px-1 md:px-8 lg:px-32 xl:px-64">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class DefaultLayout extends Vue {
  mounted() {
    const _this = this

    this.$root.$on('loginWithGithub', async function() {
      await _this.loginWithGithub()
    })
  }

  async loginWithGithub() {
    await this.$auth.loginWith('github')
  }

}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.all-wrapper {
  min-height: 100vh;
  background-color: #f9fafa;
}
</style>
