<template>
  <div>
    <div class="universal-page-wrapper">
      <Header :currentUser="currentUser" />
      <div class="flex-1 px-0 md:px-8 lg:px-32 xl:px-64 mt-16 lg:mt-28">
        <nuxt class="mx-0 lg:px-3" />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

@Component({
  components: {
    Header,
    Footer
  }
})
export default class DefaultLayout extends Vue {
  get currentUser() {
    return this.$store.getters.getAuthUser
  }

  mounted() {
    const _this = this

    this.$root.$on('loginWithGithub', async function() {
      await _this.loginWithGithub()
    })
  }

  loginWithGithub() {
    this.$auth.loginWith('github')
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: #f9fafa;
}

.universal-page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Footer height + Footer top margin */
}
</style>
