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
              v-model="newPost.title"
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
            :existTags="queryData"
            @inputChanged="checkValidation"
            @tagsChanged="updateTags"
            :placeholder="$t('post.tagsPlaceholder')"
          />
          <p class="text-sm">テスト用: {{ selectedTags }}</p>
          <small class="text-xs text-gray-600">{{ $t('post.tagsWarn') }}</small>
        </div>
      </div>

      <client-only>
        <ValidationProvider rules="required" v-slot="{ invalid, errors }">
          <mavon-editor
            v-model="newPost.body"
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
            @click="createPost()"
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

import BlockUnloadMixin from "~/mixins/BlockUnloadMixin"

import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import { directive as onClickaway } from 'vue-clickaway'
import FloatingAlertBox from '~/components/FloatingAlertBox.vue'
import TagsInputCompletion from '~/components/TagsInputCompletion.vue'

import { ValidationObserver, ValidationProvider, extend, validate } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

import { serviceContainer } from '~/dependencyInjection/container'

import { TYPES } from '~/dependencyInjection/types'
import { PostRepositoryInterface } from '~/dependencyInjection/interfaces'
import { Post, postState } from '../../apollo/schemas/post'
import { Tag } from '~/apollo/schemas/tag'


const PostRepo = serviceContainer.get<PostRepositoryInterface>(
  TYPES.PostRepositoryInterface
)

type Tags = Array<Tag>;

extend('required', required)
extend('tag', {
  validate: value => /^([a-z0-9]+)$/.test(value)
})


@Component<NewPost>({
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    'mavon-editor': mavonEditor.mavonEditor,
    FloatingAlertBox,
    TagsInputCompletion,
    ValidationObserver,
    ValidationProvider
  },
})
export default class NewPost extends mixins(BlockUnloadMixin) {
  // user.language?をゲットして、mavonEditorに適用する
  private newPost = {
    title: '',
    body: '',
    state: 'private',
    tags: [] as Tags
  }

  message: string = ''
  isFailed: boolean = false
  isPublicOpen: boolean = false
  isFullscreen: boolean = false
  tagInputResult: boolean = false
  selectedTags: Tags = []
  queryData: Tags = [
    {name: 'java'},
    {name: 'javascript'},
    {name: 'json'},
    {name: 'test'},
    {name: 'typescript'},
    {name: 'webdevelopment'},
    {name: 'window10'},
  ]

  visibilityState: postState = 'private'
  submitIcon: string = 'upload'
  submitText: string = this.$root.$tc('post.publish')

  get visibility(): string {
    const localeString: string = 'post.state.' + this.visibilityState
    let stateIcon: string = ''

    switch (this.visibilityState) {
      case 'published':
        stateIcon = 'earth'
        this.submitIcon = 'upload'
        this.submitText = this.$root.$tc('post.publish')
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

  updateFullscreen(payload: boolean) { this.isFullscreen = payload }
  toggleDropDown() { this.isPublicOpen = !this.isPublicOpen }
  closeDropDown() { this.isPublicOpen = false }

  mounted() {
    window.addEventListener('keypress', () => this.isBlockUnload = true)
  }

  checkValidation(value: string) {
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
    const data = this.queryData // await PostRepo.searchTagsByCharacter(char)

    return { searchResults: data }
  }

  async createPost() {
    this.newPost.state = this.visibilityState
    this.newPost.tags = this.selectedTags
    const { successful, result, messages } = await PostRepo.createPost(this.newPost)

    if (successful && result) {
      this.isBlockUnload = false
      this.$store.commit('CREATED_POST', true)
      await this.$router.push(`/post/${result.url}`)
    }/* else {
      if (messages) {
        this.message = ''
        for (let message of messages) {
          switch (message.field) {
            case 'title':
              this.message += this.$root.$tc('post.failed.title')
              break
            case 'body':
              this.message += this.$root.$tc('post.failed.body')
              break
          }
        }
        this.isFailed = true
      } else {
        this.message = this.$root.$tc('error')
      }
    }*/
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
    readmodel: true,
    htmlcode: true,
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
.disabled {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed;
}
.input-invalid {
  @apply border-red-500;
}
.input-invalid:focus {
  @apply border-red-500;
}
</style>

