<template>
  <div class="w-full lg:max-w-full lg:flex">
    <div class="w-full border border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal cursor-pointer hover:shadow duration-150">
      <n-link to="/post/">
        <div class="mb-5">
          <div class="text-gray-900 font-bold text-xl mb-2">コーヒーを飲むと開発者はパワーアップするのか？</div>
          <p class="text-gray-900 text-base">
            <n-link to="/tag/">
              <span class="hover:underline">#lifestyle</span>
            </n-link>
            <n-link to="/tag/">
              <span class="hover:underline">#nuxt</span>
            </n-link>
            <n-link to="/tag/">
              <span class="hover:underline">#preffered</span>
            </n-link>
          </p>
        </div>
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full object-cover mr-2" src="/image/pikachu.jpg" alt="Avatar of Jonathan Reinink">
          <div class="w-full flex justify-start items-center">
            <p class="text-gray-700 leading-none text-base mr-3">@RikuS3n</p>
            <p class="text-gray-700 mr-3"><i class="mdi mdi-thumb-up-outline"></i>{{ $t('like') }}<span class="ml-1 font-semibold">15</span></p>
            <p class="text-gray-700 text-sm ml-auto">2020/3/26</p>
          </div>
        </div>
      </n-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexCard extends Vue {
}
</script>
