<template>
  <div class="all-wrapper modal-active">
    <Header :isSignIn="false" />
    <div class="px-1 md:px-8 lg:px-32 xl:px-64">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/Header.vue';

export default Vue.extend({
  components: {
    Header
  }
})
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
