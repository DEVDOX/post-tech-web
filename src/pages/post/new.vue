<template>
  <div>
    <div class="w-full bg-white shadow-md rounded mb-8">
      <div class="p-5">
        <label class="block text-gray-700 text-base font-semibold mb-2" for="title">
          {{ $t('title') }}
        </label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500" id="title" type="text" placeholder="Example text">
      </div>

      <div class="p-5">
        <label class="block text-gray-700 text-base font-semibold mb-2" for="title">
          {{ $t('tags') }}
        </label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500" id="title" type="text" placeholder="Example text">
      </div>
    </div>

    <client-only>
      <mavon-editor
        :toolbars="markdownOption"
        language="ja"
        v-model="content"
        class="mavonEditor mb-32"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class NewPost extends Vue {
  // user.language?をゲットして、mavonEditorに適用する
  content = ''
  markdownOption = {
    bold: true,
    italic: true,
    header: true,
    underline: true,
    strikethrough: true,
    mark: true,
    superscript: true,
    subscript: true,
    quote: true,
    ol: true,
    ul: true,
    link: true,
    imagelink: true,
    code: true,
    table: true,
    help: true,
    alignleft: true,
    aligncenter: true,
    alignright: true,
    subfield: true,
    preview: true,
    undo: true,
    redo: true,
    fullscreen: true,
    readmodel: false,
    htmlcode: false,
    trash: true,
    save: false,
    navigation: true,
  }
}
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  max-height: 500px;
  height: 500px;
}
</style>