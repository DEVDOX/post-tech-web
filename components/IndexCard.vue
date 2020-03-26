<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div class="border-t border-r border-b border-l border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal cursor-pointer hover:shadow-md duration-150">
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
        <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
      </div>
      <div class="flex items-center">
        <img class="w-10 h-10 rounded-full object-cover mr-4" src="/image/pikachu.jpg" alt="Avatar of Jonathan Reinink">
        <div class="w-full flex justify-between items-center">
          <p class="text-gray-700 leading-none text-base">@RikuS3n</p>
          <p class="text-gray-600 text-sm">2020/3/26</p>
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