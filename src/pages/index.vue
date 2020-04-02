<template>
  <div class="mx-5">
    <div class="grid grid-cols-12 gap-6">
      <div id="sidebar" class="w-full col-span-12 lg:col-span-2 xl:col-span-1">
      </div>
      <div id="main" class="w-full col-span-12 lg:col-span-10 xl:col-span-8">
        <ArticleCard
          v-for="(post, index) in publicPosts"
          :key="index"
          :card="true"
          :hover="true"
          :article="post"
          class="mb-3"
        />
      </div>
      <div id="toc" class="w-full col-span-12 xl:col-span-3">
        <PersonCard
          v-if="user"
          :card="true"
          :hover="true"
          :link="true"
          :detail="true"
          :user="user"
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

const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class IndexPage extends Vue {
  async asyncData({ store, app: { $auth } }: Context) {
    const { strategy, user: { id, login } } = $auth.$state

    const currentUser = await UserRepo.getUserByUName(login)

    if (currentUser) {
      store.commit('SET_USER', currentUser)
    }

    const publicPosts = await PostRepo.getPublicPosts()

    return {
      user: currentUser,
      publicPosts
    }
  }
}
</script>
