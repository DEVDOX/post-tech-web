<template>
  <div class="mx-5" :class="isSidebar ? 'overflow-hidden' : ''">
    <div class="grid grid-cols-12 gap-6">
      <div id="sidebar" class="w-full col-span-12 lg:col-span-3 xl:col-span-3">
        <div>
          <div :class="isSidebar ? 'block' : 'hidden'" class="h-screen lg:h-auto fixed lg:static z-30 top-0 left-0 bg-white lg:bg-transparent lg:block mt-12 lg:mt-0">
            <div class="relative px-2 pb-2 pt-3 lg:pt-0">
              <h1 class="text-gray-800 font-bold text-xl mb-3">Upcoming Tags</h1>
              <div class="h-96 flex flex-col overflow-y-auto">
                <n-link
                  :to="`/tag/${tag.urlName}`"
                  v-for="(tag, index) in tags"
                  :key="index"
                  class="hover:underline p-1 m-1"
                >
                  #{{ tag.name }}
                </n-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="main" class="w-full col-span-12 lg:col-span-9 xl:col-span-6">
        <ArticleCard
          v-for="(post, index) in publicPosts"
          :key="index"
          :card="true"
          :hover="true"
          :article="post"
          class="mb-2"
        />
        <client-only>
          <infinite-loading
            ref="infiniteLoading"
            @infinite="infiniteLoad">
          </infinite-loading>
        </client-only>
      </div>

      <div v-if="currentUser" id="toc" class="w-full col-span-12 xl:col-span-3">
        <!-- Current loggedIn user -->
        <PersonCard
          :card="true"
          :hover="true"
          :link="true"
          :detail="true"
          :user="currentUser"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ArticleCard from '~/components/ArticleCard.vue'
import PersonCard from '~/components/PersonCard.vue'

import { Context } from '@nuxt/types'
import { serviceContainer } from '~/dependencyInjection/container'
import { UserRepositoryInterface, PostRepositoryInterface } from '~/dependencyInjection/interfaces'
import { TYPES } from '~/dependencyInjection/types'
import { UserDetail } from '../apollo/schemas/userDetail'
import { Post } from '../apollo/schemas/post'
import InfiniteLoading from 'vue-infinite-loading'

const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class IndexPage extends Vue {
  isSidebar: boolean = false
  tags: {}[] = [
    { "name": "docker" }, { "name": "linux" }, { "name": "webpack" }, { "name": "unix" },
    { "name": "java" }, { "name": "rust" }, { "name": "typescript" }, { "name": "discord" },
    { "name": "python" }, { "name": "babel" }, { "name": "unixporn" }, { "name": "algorithm" },
    { "name": "nodetree" }, { "name": "binary" }, { "name": "json" }, { "name": "graphql" },
    { "name": "rest-api" }, { "name": "webassembly" }, { "name": "elm" }, { "name": "vscode" }
  ]

  publicPosts!: Array<Post>
  next!: string | undefined

  async asyncData({ store, app: { $auth } }: Context) {
    const { metadata, entries } = await PostRepo.getPublicPosts({})
    return {
      publicPosts: entries,
      next: metadata.after
    }
  }

  get currentUser() {
    return this.$store.getters['getAuthUser']
  }

  async infiniteLoad($state: any) {
    if (!this.next) {
      $state.complete()
      return
    }

    const { metadata, entries } = await PostRepo.getPublicPosts({after: this.next})

    this.publicPosts.push(...entries)
    this.next = metadata.after
    $state.loaded()
  }
}
</script>
