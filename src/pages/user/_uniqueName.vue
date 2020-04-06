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
          <!-- last:border-b-0 が効いてない -->
          <div v-if="currentTab == 'mine'">
            <ArticleCard
              v-for="(article, index) in posts"
              :article="article"
              :key="index"
              :card="false"
              :hover="false"
              class="border-b last:border-b-0 p-4"
            />
          </div>
          <div v-if="currentTab == 'liked'">
            <p>TEST</p>
          </div>
        </div>
      </div>
      <div id="sidebar" class="w-full col-span-3 lg:col-span-1">
        <PersonCard
          :card="true"
          :hover="false"
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
import { PostRepositoryInterface, UserRepositoryInterface } from '../../dependencyInjection/interfaces'
import { TYPES } from '../../dependencyInjection/types'
import { Context } from '@nuxt/types'
import { UserDetail } from '../../apollo/schemas/userDetail'

type articleType = 'mine' | 'liked'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)
const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class UserPage extends Vue {
  private user!: UserDetail
  tab: articleType = 'mine'

  get currentTab() {
    return this.tab
  }

  updateTab(type: articleType) {
    this.tab = type
  }

  async asyncData({ params }: Context) {
    const user = await UserRepo.getUserByUName(params.uniqueName)
    const { entries, metadata } = await PostRepo.getUserPostsByUName(user.uniqueName, {})

    return {
      user,
      posts: entries
    }
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
