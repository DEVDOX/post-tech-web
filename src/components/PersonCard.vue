<template>
  <div :class="isStyle" class="w-full relative flex flex-col justify-between leading-normal">
    <n-link v-if="link" :to="'/user/' + userName" class="stretched-link"></n-link>
    <div>
      <div class="flex justify-center items-center mb-4">
        <img class="w-16 h-16 rounded-full object-cover mr-2" src="/image/kawaii_1.png" alt="Avatar of Jonathan Reinink">
        <div>
          <p class="text-gray-800 text-lg leading-none">@{{ userName }}</p>
        </div>
      </div>
      <p v-if="tagline" class="text-gray-600 text-lg text-center leading-none mb-5">{{ tagline }}</p>
      <div class="relative z-20 flex justify-center items-center mb-5">
        <a
          v-for="(contact, index) in contacts"
          :key="index"
          :href="contact.link"
          :class="`mdi-${contact.sns} text-${contact.sns}`"
          class="relative mdi text-xl mx-2 hover:filter-darker duration-100"
        ></a>
      </div>
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
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PersonCard extends Vue {
  @Prop() card!: boolean
  @Prop() hover!: boolean
  @Prop() link!: boolean
  @Prop() tagline!: string
  @Prop() userName!: string
  @Prop() contacts!: []

  isStyle = {
    'card-class': this.card,
    'hover-class': this.hover
  }
}
</script>

<style scoped>
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
</style>