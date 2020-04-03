<template>
  <div class="px-1 xl:px-3">
    <div class="flex flex-wrap -mx-1 xl:-mx-3">
      <div id="main" class="w-full lg:w-2/3 px-1 xl:px-3 mb-3">
        <div class="w-full lg:flex">
          <div class="w-full border border-gray-400 bg-white rounded p-4 flex flex-col leading-normal duration-150">
            <ul class="flex border-b">
              <li class="-mb-px mr-1">
                <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">自分の記事</a>
              </li>
              <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">いいねした記事</a>
              </li>
            </ul>
            <div id="article" class="last:border-b-0 border-b py-3 cursor-pointer" v-for="i in 5" :key="i">
              <n-link to="/post/">
                <div class="mb-5">
                  <div id="title" class="text-gray-900 font-bold text-xl mb-2">コーヒーを飲むと開発者はパワーアップするのか？</div>
                  <p class="text-gray-900 text-base">
                    <n-link to="/tag/lifestyle">
                      <span class="hover:underline">#lifestyle</span>
                    </n-link>
                    <n-link to="/tag/nuxt">
                      <span class="hover:underline">#nuxt</span>
                    </n-link>
                    <n-link to="/tag/preffered">
                      <span class="hover:underline">#preffered</span>
                    </n-link>
                  </p>
                </div>
                <div class="flex items-center">
                  <img class="w-10 h-10 rounded-full object-cover mr-2" src="/image/pikachu.jpg" alt="avatar">
                  <div class="w-full flex justify-start items-center">
                    <p class="text-gray-700 leading-none text-base mr-3">@RikuS3n</p>
                    <p class="text-gray-700 mr-3"><i class="mdi mdi-thumb-up-outline"></i>{{ $t('like') }}<span class="ml-1 font-semibold">15</span></p>
                    <p class="text-gray-700 text-sm ml-auto">2020/3/26</p>
                  </div>
                </div>
              </n-link>
            </div>
          </div>
        </div>
      </div>
      <div id="sidebar" class="w-full lg:w-1/3 px-1 xl:px-3">
        <div class="max-w-sm w-full lg:max-w-full lg:flex">
          <div class="w-full border border-gray-400 bg-white rounded p-4 flex flex-col leading-normal justify-center duration-150">
            <div class="mb-5">
              <div class="flex justify-center items-center mb-5">
                <img class="w-16 h-16 rounded-full object-cover mr-2" src="/image/pikachu.jpg" alt="avatar">
                <div>
                  <p class="text-gray-800 text-xl leading-none">@RikuS3n</p>
                </div>
              </div>
              <div class="flex justify-center items-center mb-5">
                <a href="https://twitter.com/RikuS3n" class="mdi mdi-twitter text-twitter text-xl mx-2"></a>
                <a href="https://twitter.com/RikuS3n" class="mdi mdi-twitter text-twitter text-xl mx-2"></a>
              </div>
              <p class="text-gray-600 text-lg text-center leading-none">Lorem ipsum roamen sit</p>
            </div>
            <div class="flex justify-center items-center">
              <div class="w-1/3 text-center">
                <p class="text-gray-800 text-2xl font-semibold">12</p>
                <p class="text-gray-600 text-xs">{{ $t('article') }}</p>
              </div>
              <div class="w-1/3 text-center">
                <p class="text-gray-800 text-2xl font-semibold">1,354</p>
                <p class="text-gray-600 text-xs">{{ $t('follow') }}</p>
              </div>
              <div class="w-1/3 text-center">
                <p class="text-gray-800 text-2xl font-semibold">76</p>
                <p class="text-gray-600 text-xs">{{ $t('follower') }}</p>
              </div>
            </div>
            <hr class="my-5">
            <div class="flex flex-col justify-start items-start mx-3">
              <span class="text-center text-gray-700 mb-2"><i class="mdi mdi-web mr-1"></i><a class="hover:underline" href="https://devmia.net">https://devmia.net</a></span>
              <span class="text-center text-gray-700 mb-2"><i class="mdi mdi-map-marker mr-1"></i>北海道</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PersonCard from '~/components/PersonCard.vue'

@Component({
  components: {
    PersonCard
  }
})
export default class UserPage extends Vue {
}
</script>

<style scoped>
#article:hover #title {
  text-decoration: underline;
}
</style>