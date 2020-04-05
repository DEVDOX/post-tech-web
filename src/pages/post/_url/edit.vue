<template>
  <div v-if="post" class="mt-8 lg:mt-0">
    <div class="w-full bg-white shadow-md rounded mb-8">
      <div class="p-5">
        <label class="block text-gray-700 text-base font-semibold mb-2" for="title">
          {{ $t('post.title') }}
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
          {{ $t('post.tags') }}
        </label>
        <input
          id="title"
          v-model="getTags"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
          type="text"
          placeholder="Example text"
        />
      </div>
    </div>

    <client-only>
      <mavon-editor
        v-model="post.body"
        :toolbars="markdownOption"
        language="ja"
        ref="markdownEditor"
        :class="isFullscreen ? '' : 'editor'"
        @fullScreen="updateFullscreen"
      />
    </client-only>

    <div class="w-full fixed bg-gray-200 bottom-0 left-0 z-50">
      <div class="flex flex-no-wrap justify-center items-center mx-4 lg:mx-16 my-4">

        <div class="relative w-50">
          <button
            @click="toggleDropDown()"
            class="w-32 flex justify-center items-center bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mx-2"
          >
            <span v-html="visibility"></span>
            <i v-if="isPublicOpen" class="mdi mdi-chevron-right"/>
            <i v-if="!isPublicOpen" class="mdi mdi-chevron-up"/>
          </button>

          <ul v-on-clickaway="closeDropDown" v-if="isPublicOpen" class="absolute bottom-0 left-0 bg-white rounded py-2 shadow-xl ml-2 mb-12">
            <li @click="updateVisibilityState('published')" class="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer">
              <i class="mdi mdi-earth mr-1"/><span>{{ $t('post.state.published') }}</span>
            </li>

            <li @click="updateVisibilityState('private')" class="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer">
              <i class="mdi mdi-lock mr-1"/><span>{{ $t('post.state.private') }}</span>
            </li>

            <li @click="updateVisibilityState('draft')" class="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer">
              <i class="mdi mdi-file-edit-outline mr-1"/><span>{{ $t('post.state.draft') }}</span>
            </li>
          </ul>
        </div>

        <button @click="createPost()" class="w-32 btn btn-blue mx-2">
          <i :class="`mdi-${submitIcon}`" class="mdi"/>
          <span>{{ submitText }}</span>
        </button>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, mixins } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

import BlockUnloadMixin from "~/mixins/BlockUnloadMixin"

import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import { directive as onClickaway } from 'vue-clickaway'

import { serviceContainer } from '~/dependencyInjection/container'

import { TYPES } from '~/dependencyInjection/types'
import { PostRepositoryInterface } from '~/dependencyInjection/interfaces'

import { Post, postState } from '~/apollo/schemas/post'
import { Tag } from '../../../apollo/schemas/tag'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(
  TYPES.PostRepositoryInterface
)

@Component({
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  }
})
export default class EditPost extends mixins(BlockUnloadMixin) {
  async asyncData({ params: { url } }: Context) {
    const post = await PostRepo.getUserPostByUrl(url)

    console.log(post)

    return {
      post,
      visibilityState: post.state
    }
  }

  // user.language?をゲットして、mavonEditorに適用する
  private post: Post = <Post> {}
  private visibilityState: postState = 'private'

  isPublicOpen: boolean = false
  isFullscreen: boolean = false

  submitIcon: string = 'upload' // APIからデータを取る
  submitText: string = this.$root.$tc('newPost.publish') // APIからデータを取る

  get visibility(): string {
    const localeString: string = 'post.state.' + this.visibilityState
    let stateIcon: string = ''

    switch (this.visibilityState) {
      case 'published':
        stateIcon = 'earth'
        this.submitIcon = 'upload'
        this.submitText = this.$root.$tc('newPost.publish')
        break
      case 'private':
        stateIcon = 'lock'
        this.submitIcon = 'content-save'
        this.submitText = this.$root.$tc('newPost.save')
        break
      case 'draft':
        stateIcon = 'file-edit-outline'
        this.submitIcon = 'content-save'
        this.submitText = this.$root.$tc('newPost.save')
        break
    }
    return `<i class="mdi mdi-${stateIcon} mr-1"></i><span>${this.$t(localeString)}</span>`
  }

  updateVisibilityState(state: postState) {
    this.visibilityState = state
    this.isPublicOpen = false
  }

  updateFullscreen(payload: boolean) {
    this.isFullscreen = payload
  }

  toggleDropDown() {
    this.isPublicOpen = !this.isPublicOpen
  }

  closeDropDown() {
    this.isPublicOpen = false
  }

  get getTags(): string {
    let tag = 'test'
    for (let item of this.post.tags) {
      tag = `${item.name}, ${tag}`
    }
    return tag
  }

  mounted() {
    window.addEventListener('keypress', () => this.isBlockUnload = true)
  }

  content = ''

  // user.language?をゲットして、mavonEditorに適用する
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

  async updatePost() {
    this.post.state = this.visibilityState
    const updatedPost = await PostRepo.updatePost(this.post)
  }
}
</script>

<style scoped>
.editor {
  width: 100%;
  max-height: 500px;
  height: 500px;
}

.v-note-wrapper {
  z-index: 40;
}
</style>
