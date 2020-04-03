<template>
  <div>
    <div class="grid grid-cols-3 gap-6">
      <div id="main" class="w-full col-span-3 lg:col-span-2">
        <div class="w-full border border-gray-400 bg-white rounded p-4 flex flex-col leading-normal duration-150">
          <ul class="flex border-b">
            <li class="-mb-px mr-1">
              <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">自分の記事</a>
            </li>
            <li class="mr-1">
              <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">いいねした記事</a>
            </li>
          </ul>
          <!-- last:border-b-0 が効いてない -->
          <div id="articles">
            <ArticleCard
              v-for="(article, index) in posts"
              :article="article"
              :key="index"
              :card="false"
              :hover="false"
              class="border-b last:border-b-0 p-4"
            />
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
import { serviceContainer } from '../../dependencyInjection/container'
import PostRepository from '../../repositories/Post/PostRepository'
import { PostRepositoryInterface, UserRepositoryInterface } from '../../dependencyInjection/interfaces'
import { TYPES } from '../../dependencyInjection/types'
import { Context } from '@nuxt/types'
import { UserDetail } from '../../apollo/schemas/userDetail'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)
const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class UserPage extends Vue {
  private user: UserDetail | null = null

  async asyncData({ params }: Context) {
    const user = await UserRepo.getUserByUName(params.uniqueName)
    const posts = await PostRepo.getUserPostsByUName(user.uniqueName)

    return {
      user,
      posts
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
</style>