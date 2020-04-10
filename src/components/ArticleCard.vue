<template>
  <div v-if="article" :class="isStyle" class="main w-full relative z-10 flex flex-col justify-between leading-normal">
    <n-link :to="articleUrl()" class="stretched-link"></n-link>
    <div class="w-full flex flex-col justify-between leading-normal">
      <div class="mb-5">
        <p class="title text-gray-900 font-bold text-xl mb-2">{{ article.title }}</p>
        <div class="relative text-gray-900 text-base z-20">
          <n-link v-for="(tag, index) in article.tags" :key="index" :to="tagUrl(tag.urlName)" class="hover:underline">#{{ tag.name }}</n-link>
        </div>
      </div>
      <div class="w-full flex items-center">
        <n-link :to="`/user/${article.author.uniqueName}`" class="relative z-20 flex items-center hover:underline">
          <img class="w-10 h-10 rounded-full object-cover mr-2" :src="article.author.avatar" alt="Avatar of Jonathan Reinink">
          <p class="text-gray-700 leading-none no-underline text-base mr-3">@{{ article.author.uniqueName }}</p>
        </n-link>
        <p class="text-gray-700 mr-3"><LikeIcon :liked="false"/>{{ $t('like') }}<span class="ml-1 font-semibold">15</span></p>
        <p class="text-gray-700 text-sm ml-auto"><i class="mdi mdi-clock-outline"/>{{ getDate(article.insertedAt) }}</p>
        <p class="text-gray-700 text-sm ml-2"><i class="mdi mdi-update"/>{{ getDate(article.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import LikeIcon from '~/components/LikeIcon.vue'
import { Post } from '~/apollo/schemas/post'

import dayjs from 'dayjs'
import 'dayjs/locale/ja' // load on demand
dayjs.locale('ja')

@Component({
  components: {
    LikeIcon
  }
})
export default class ArticleCard extends Vue {
  @Prop() card!: boolean
  @Prop() hover!: boolean
  @Prop() article!: Post

  author: string = 'RikuS3n'

  isStyle = {
    'card-class': this.card,
    'hover-class': this.hover
  }

  getDate(date: string) {
    return dayjs(this.article.insertedAt).format('YYYY/MM/DD')
  }

  tagUrl(urlName: string) {
    return `/tag/${urlName}`
  }

  articleUrl() {
    return `/post/${this.article.url}`
  }
}
</script>

<style scoped>
.main:hover .title {
  text-decoration: underline;
}

.stretched-link::after {
  content: "";
  @apply z-10 absolute inset-0 bg-transparent pointer-events-auto;
}

.card-class {
  @apply border border-gray-400 bg-white rounded p-4;
}

.hover-class {
  @apply duration-150;
}

.hover-class:hover {
  @apply shadow;
}

.hover-class:focus {
  @apply shadow;
}
</style>
