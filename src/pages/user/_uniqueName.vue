<template>
  <div class="px-1 xl:px-3">
    <div class="flex flex-wrap -mx-1 xl:-mx-3">
      <div id="main" class="w-full lg:w-2/3 px-1 xl:px-3 mb-3">
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
          <div id="article">
            <ArticleCard
              v-for="i in 5"
              :key="i"
              :card="false"
              :hover="false"
              class="border-b last:border-b-0 p-4"
            />
          </div>
        </div>
      </div>
      <div id="sidebar" class="w-full lg:w-1/3 px-1 xl:px-3">
        <PersonCard
          :card="true"
          :hover="false"
          :tagline="user.tagline"
          :contacts="user.contacts"
        >
          <hr class="my-5">
          <div class="flex flex-col justify-start items-start mx-3">
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

@Component({
  components: {
    ArticleCard,
    PersonCard
  }
})
export default class UserPage extends Vue {
  user = {
    tagline: "Lorem ipsum roamen sit",
    contacts: [
      { sns: 'twitter', link: 'https://twitter.com/RikuS3n'}
    ]
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