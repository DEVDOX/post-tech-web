<template>
  <div>
    <div class="w-full bg-white shadow-md rounded mb-8">
      <div class="p-5">
        <label class="block text-gray-700 text-base font-semibold mb-2" for="title">
          {{ $t('title') }}
        </label>
        <input
          v-model="post.title"
          id="title"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
          type="text"
          placeholder="Example text"
        />
      </div>

      <div class="p-5">
        <label class="block text-gray-700 text-base font-semibold mb-2" for="title">
          {{ $t('tags') }}
        </label>
        <input
          id="title"
          v-model="post.tags"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
          type="text"
          placeholder="Example text"
        />
      </div>
    </div>

    <button @click="createPost()">save</button>

    <client-only>
      <mavon-editor
        v-model="post.body"
        :toolbars="markdownOption"
        language="ja"
        class="mavonEditor mb-32"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { serviceContainer } from '~/dependencyInjection/container'

import { TYPES } from '~/dependencyInjection/types'
import { PostRepositoryInterface } from '~/dependencyInjection/interfaces'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(
  TYPES.PostRepositoryInterface
)

@Component
export default class NewPost extends Vue {
  // user.language?をゲットして、mavonEditorに適用する
  post = {
    title: '',
    body: '',
    is_public: false,
    is_draft: false,
    tags: [{name: "asdf"}]
  }

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
    navigation: true
  }

  async createPost() {
    const post = await PostRepo.createPost(this.post)
    console.log(post)
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
