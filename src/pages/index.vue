<template>
  <div class="mx-5">
    <div class="grid grid-cols-12 gap-6">
      <div id="sidebar" class="w-full col-span-12 lg:col-span-2 xl:col-span-1">
      </div>
      <div id="main" class="w-full col-span-12 lg:col-span-10 xl:col-span-8">
        <ArticleCard
          v-for="i in 5"
          :key="i"
          :card="true"
          :hover="true"
          class="mb-3"
        />
      </div>
      <div id="toc" class="w-full col-span-12 xl:col-span-3">
        <PersonCard
          :card="true"
          :hover="true"
          :link="true"
          :detail="true"
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
}
</script>
