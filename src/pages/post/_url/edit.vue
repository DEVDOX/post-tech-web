<template>
  <div class="mt-8 lg:-mt-2 lg:-mb-6">
    <ValidationObserver v-slot="{ invalid }">
      <div class="w-full bg-white shadow-md rounded mb-8">
        <div class="px-5 py-3">
          <label class="block text-gray-700 text-base font-semibold mb-1" for="title">
            {{ $t('post.title') }}
          </label>
          <ValidationProvider rules="required" v-slot="{ invalid, errors }">
            <input
              v-model="editPost.title"
              id="title"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
              :class="invalid ? 'input-invalid' : ''"
              type="text"
              :placeholder="$t('post.titlePlaceholder')"
            />
            <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>

        <div class="px-5 py-3">
          <label class="block text-gray-700 text-base font-semibold mb-1" for="tags">
            {{ $t('post.tags') }}
          </label>
          <TagsInputCompletion
            id="tags"
            :validate="tagInputResult"
            :existTags="searchResults"
            @inputChanged="inputChanged"
            @tagsChanged="updateTags"
            :placeholder="$t('post.tagsPlaceholder')"
          />
          <p class="text-sm">テスト用: {{ selectedTags }}</p>
        </div>
      </div>

      <client-only>
        <ValidationProvider rules="required" v-slot="{ invalid, errors }">
          <mavon-editor
            v-model="editPost.body"
            :toolbars="markdownOption"
            language="ja"
            ref="markdownEditor"
            :class="isFullscreen ? '' : 'editor'"
            @fullScreen="updateFullscreen"
          />
          <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
        </ValidationProvider>
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

          <button
            @click="updatePost()"
            class="w-32 btn btn-blue mx-2"
            :class="invalid ? 'disabled' : ''"
            :disabled="invalid"
          >
            <i :class="`mdi-${submitIcon}`" class="mdi"/>
            <span>{{ submitText }}</span>
          </button>

        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue, mixins } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

import BlockUnloadMixin from "~/mixins/BlockUnloadMixin"

import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider, extend, validate } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import FloatingAlertBox from '~/components/FloatingAlertBox.vue'
import TagsInputCompletion from '~/components/TagsInputCompletion.vue'

import { serviceContainer } from '~/dependencyInjection/container'

import { TYPES } from '~/dependencyInjection/types'
import { PostRepositoryInterface } from '~/dependencyInjection/interfaces'

import { Post, postState } from '~/apollo/schemas/post'
import { Tag } from '~/apollo/schemas/tag'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(
  TYPES.PostRepositoryInterface
)

type Tags = Array<Tag>;

extend('required', required)
extend('tag', {
  validate: value => /^([a-z0-9]+)$/.test(value)
})

@Component({
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    'mavon-editor': mavonEditor.mavonEditor,
    FloatingAlertBox,
    TagsInputCompletion,
    ValidationObserver,
    ValidationProvider
  }
})
export default class EditPost extends mixins(BlockUnloadMixin) {
  async asyncData({ redirect, store, params: { url } }: Context) {
    const currentUser = store.getters['getAuthUser']
    const post = await PostRepo.getUserPostByUrl(url)

    if (post.author.id !== currentUser.id) {
      return redirect('/')
    }

    return {
      post,
      editPost: {
        title: post.title,
        body: post.body,
        state: post.state,
        tags: post.tags,
        url: post.url
      },
      visibilityState: post.state
    }
  }

  // user.language?をゲットして、mavonEditorに適用する
  private post: Post = <Post> {}
  private editPost: Post = <Post> {}

  message: string = ''
  isFailed: boolean = false
  isPublicOpen: boolean = false
  isFullscreen: boolean = false
  tagInputResult: boolean = false
  selectedTags: Tags = []
  searchResults: Tags = []

  visibilityState: postState = 'private'
  submitIcon: string = 'sync'
  submitText: string = this.$root.$tc('post.update')

  get visibility(): string {
    const localeString: string = 'post.state.' + this.visibilityState
    let stateIcon: string = ''

    switch (this.visibilityState) {
      case 'published':
        stateIcon = 'earth'
        this.submitIcon = 'sync'
        this.submitText = this.$root.$tc('post.update')
        break
      case 'private':
        stateIcon = 'lock'
        this.submitIcon = 'content-save'
        this.submitText = this.$root.$tc('post.save')
        break
      case 'draft':
        stateIcon = 'file-edit-outline'
        this.submitIcon = 'content-save'
        this.submitText = this.$root.$tc('post.save')
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

  inputChanged(value: string) {
    this.sendQuery(value)
    return validate(value, 'tag').then(result => {
      if (result.valid) {
        this.tagInputResult = true
      } else {
        this.tagInputResult = false
      }
    })
  }

  updateTags(tags: Tags) {
    this.selectedTags = tags
  }

  async sendQuery(char: string) {
    const data = await PostRepo.searchTagsByCharacter(char)

    return { searchResults: data }
  }

  async updatePost() {
    this.editPost.state = this.visibilityState
    this.editPost.tags = this.selectedTags
    const { successful, result, messages } = await PostRepo.updatePost(this.editPost)

    if (successful && result) {
      this.isBlockUnload = false
      this.$store.commit('UPDATED_POST', true)
      await this.$router.push(`/post/${this.post.url}`)
    }
  }

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
