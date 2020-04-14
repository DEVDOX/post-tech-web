<template>
  <div>
    <div class="grid grid-cols-3 gap-6">
      <div id="main" class="w-full col-span-3 lg:col-span-2">
        <div class="w-full border border-gray-400 bg-white rounded p-4 flex flex-col leading-normal duration-150">
          <div class="bg-white">
            <nav class="flex flex-col sm:flex-row">
              <button
                @click="updateTab('mine')"
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 border-transparent"
                :class="currentTab == 'mine' ? 'active' : ''"
              >
                {{ $t('myPosts') }}
              </button>
              <button
                @click="updateTab('liked')"
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 border-transparent"
                :class="currentTab == 'liked' ? 'active' : ''"
              >
                {{ $t('likedPosts') }}
              </button>
            </nav>
          </div>

          <!-- 自分の記事 -->
          <div v-show="currentTab == 'mine'">
            <ArticleCard
              v-for="(article, index) in myPosts"
              :article="article"
              :key="index"
              class="border-b last:border-b-0 p-4"
            />
            <client-only>
              <infinite-loading
                @infinite="loadMyPosts">
              </infinite-loading>
            </client-only>
          </div>

          <!-- いいねした記事 -->
          <div v-show="currentTab == 'liked'">
            <ArticleCard
              v-for="(article, index) in likedPosts"
              :article="article"
              :key="index"
              class="border-b last:border-b-0 p-4"
            />
            <client-only>
              <infinite-loading
                @infinite="loadLikedPosts">
              </infinite-loading>
            </client-only>
          </div>

        </div>
      </div>
      <div id="sidebar" class="w-full col-span-3 lg:col-span-1">
        <PersonCard
          :card="true"
          :user="user"
        >
          <hr class="my-5">
          <div class="relative z-20 flex flex-col justify-start items-start mx-3">
            <span class="text-center text-gray-700 mb-2"><i class="mdi mdi-web mr-1"></i><a class="hover:underline" href="https://devmia.net">https://devmia.net</a></span>
            <span class="text-center text-gray-700 mb-2"><i class="mdi mdi-map-marker mr-1"></i>北海道</span>
          </div>
        </PersonCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ArticleCard from '~/components/ArticleCard.vue'
import PersonCard from '~/components/PersonCard.vue'

import { serviceContainer } from '~/dependencyInjection/container'
import PostRepository from '~/repositories/Post/PostRepository'
import { PostRepositoryInterface, UserRepositoryInterface } from '~/dependencyInjection/interfaces'
import { TYPES } from '~/dependencyInjection/types'
import { Context } from '@nuxt/types'
import { UserDetail } from '~/apollo/schemas/userDetail'
import { Post } from '~/apollo/schemas/post'
import InfiniteLoading from 'vue-infinite-loading'

type articleType = 'mine' | 'liked'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)
const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)

@Component({
  components: {
    ArticleCard,
    PersonCard,
    InfiniteLoading
  }
})
export default class UserPage extends Vue {
  private user!: UserDetail
  tab: articleType = 'mine'
  myPosts!: Array<Post>
  likedPosts!: Array<Post>
  myPostsNext!: string | undefined
  likedPostsNext!: string | undefined


  get currentTab() {
    return this.tab
  }

  updateTab(type: articleType) {
    this.tab = type
  }

  async asyncData({ params }: Context) {
    const user = await UserRepo.getUserByUName(params.uniqueName)
    // ユーザーの投稿
    const userPosts = await PostRepo.getUserPostsByUName(user.uniqueName, {})
    const userLikedPosts = await PostRepo.getUserLikedPosts(user.uniqueName, {})
    console.log(userLikedPosts)

    return {
      user,
      myPosts: userPosts.entries,
      myPostsNext: userPosts.metadata.after,

      likedPosts: userLikedPosts.entries,
      likedPostsNext: userLikedPosts.metadata.after
    }
  }

  async loadMyPosts($state: any) {
    if (!this.myPostsNext) {
      $state.complete()
      return
    }

    const { entries, metadata } = await PostRepo.getUserPostsByUName(this.user.uniqueName, {after: this.myPostsNext})

    this.myPosts = this.myPosts.concat(entries)
    this.myPostsNext = metadata.after
    $state.loaded()
  }

  async loadLikedPosts($state: any) {
    if (!this.likedPostsNext) {
      $state.complete()
      return
    }

    const { entries, metadata } = await PostRepo.getUserLikedPosts(this.user.uniqueName, {after: this.likedPostsNext})

    this.likedPosts = this.likedPosts.concat(entries)
    this.likedPostsNext = metadata.after
    $state.loaded()
  }
}
</script>

<style scoped>
#article:hover #title {
  text-decoration: underline;
}
.stretched-link::after {
  content: "";
  @apply z-10 absolute inset-0 bg-transparent pointer-events-auto;
}
.active {
  @apply text-blue-500 font-medium border-blue-500;
}
</style>
