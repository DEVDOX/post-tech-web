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
                  :to="`/tag/${tag}`"
                  v-for="(tag, index) in tags"
                  :key="index"
                  class="hover:underline p-1 m-1">
                    #{{ tag }}
                </n-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="main" class="w-full col-span-12 lg:col-span-9 xl:col-span-6">
        <ArticleCard
          v-for="i in 5"
          :key="i"
          :card="true"
          :hover="true"
          class="mb-2"
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
  isSidebar: boolean = false
  tags: string[] = [
    'docker', 'linux', 'webpack', 'unix', 'java',
    'rust', 'typescript', 'discord', 'python', 'babel',
    'unixporn', 'algorithm', 'nodetree', 'binary', 'json',
    'graphql', 'rest-api', 'webassembly', 'elm', 'vscode',
  ]
}
</script>
