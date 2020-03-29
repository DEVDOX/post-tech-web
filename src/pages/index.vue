<template>
  <div class="px-1 xl:px-3">
    <div class="flex flex-wrap -mx-1 xl:-mx-3">
      <div id="sidebar" class="w-full lg:w-1/6 xl:w-2/12 px-1 xl:px-3">
      </div>
      <div id="main" class="w-full lg:w-5/6 xl:w-7/12 px-1 xl:px-3">
        <ArticleCard
          v-for="i in 5"
          :key="i"
          :card="true"
          :hover="true"
          class="mb-3"
        />
      </div>
      <div id="toc" class="w-full lg:w-full xl:w-3/12 px-1 xl:px-3">
        <PersonCard
          :card="true"
          :hover="true"
          :link="true"
          userName="RikuS3n"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ArticleCard from '~/components/ArticleCard.vue'
import PersonCard from '~/components/PersonCard.vue'

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class IndexPage extends Vue {
  mounted() {
    console.log(process.env.GITHUB_CLIENT_ID)
  }
}
</script>
