<template>
  <div class="px-1 xl:px-3">
    <div class="flex flex-wrap -mx-1 xl:-mx-3">

      <div id="sidebar" class="w-full lg:w-1/6 xl:w-2/12 px-1 xl:px-3">
        <div class="w-full flex flex-col justify-center items-end">
          <button class="w-12 h-12 focus:w-14 focus:h-14 bg-white rounded-full border-white hover:border-teal-500 focus:border-teal-600 border-2 mb-8 hover:shadow-sm duration-150"><i class="mdi mdi-heart text-red-600 text-xl"></i></button>
        </div>
      </div>

      <div id="main" class="w-full lg:w-5/6 xl:w-7/12 px-1 xl:px-3">
        <div class="w-full border border-gray-400 bg-white rounded p-5">

          <div class="flex items-center mb-2">
            <img class="w-8 h-8 rounded-full object-cover mr-2" src="/image/kawaii_1.png" alt="avatar">
            <p class="text-gray-800 text-base leading-none mr-2">@RikuS3n</p>
            <p class="text-gray-600 text-base leading-none mr-2">2020/03/30</p>
          </div>

          <p class="text-4xl font-semibold">{{ post.title }}</p>

          <div class="mb-8">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="bg-gray-100 rounded hover:underline cursor-pointer px-2 py-1 m-1">
                #{{ tag }}
            </span>
          </div>
          
          <div v-if="markdownIt" v-html="markdownIt.render(post.body)"></div>
        </div>
      </div>

      <div id="toc" class="w-full lg:w-full xl:w-3/12 px-1 xl:px-3">
        <PersonCard
          :card="true"
          :hover="true"
          :link="true"
          tagline="Lorem ipsum roamen sit"
          userName="RikuS3n"
        />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import mavonEditor from 'mavon-editor'
import ArticleCard from '~/components/ArticleCard.vue'
import PersonCard from '~/components/PersonCard.vue'

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class Article extends Vue {
  markdownIt = null

  post = {
    title: 'Windows 10でDocker-composeを実行する',
    author: 'RikuS3n',
    body: '# うんち',
    tags: ['Windows 10', 'docker', 'docker-compose'],
  }

  mounted() {
    this.markdownIt = mavonEditor.mavonEditor.getMarkdownIt()
  }
}
</script>