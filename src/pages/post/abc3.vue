<template>
  <div class="w-full border border-gray-400 bg-white rounded p-5">
    <div v-if="markdownIt" v-html="markdownIt.render('# markdown-it rulezz!')"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import mavonEditor from 'mavon-editor'

@Component
export default class Article extends Vue {
  markdownIt = null

  mounted() {
    this.markdownIt = mavonEditor.mavonEditor.getMarkdownIt()

    if (this.markdownIt) {
      this.markdownIt.set({ breaks: false })
    }
  }
}
</script>