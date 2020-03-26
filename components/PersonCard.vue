<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div class="w-full border-t border-r border-b border-l border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal cursor-pointer hover:shadow-md duration-150">
      <div class="mb-3">
        <div class="flex justify-center items-center">
          <img class="w-16 h-16 rounded-full object-cover mr-4" src="/image/pikachu.jpg" alt="Avatar of Jonathan Reinink">
          <div>
            <p class="text-gray-800 text-base leading-none">@RikuS3n</p>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="w-1/3 text-center">
          <p class="text-gray-800 text-2xl font-semibold">12</p>
          <p class="text-gray-600 text-xs">記事</p>
        </div>
        <div class="w-1/3 text-center">
          <p class="text-gray-800 text-2xl font-semibold">1,354</p>
          <p class="text-gray-600 text-xs">フォロー</p>
        </div>
        <div class="w-1/3 text-center">
          <p class="text-gray-800 text-2xl font-semibold">76</p>
          <p class="text-gray-600 text-xs">フォロワー</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class IndexCard extends Vue {
}
</script>