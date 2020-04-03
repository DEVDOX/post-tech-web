<template>
  <div v-if="user" :class="isStyle" class="w-full relative z-10 flex flex-col justify-between leading-normal">
    <n-link v-if="link" :to="'/user/' + user.uniqueName" class="stretched-link"></n-link>
    <div class="flex justify-center items-center">
      <img class="w-16 h-16 rounded-full object-cover mr-2" :src="user.avatar" alt="Avatar of Jonathan Reinink">
      <div>
        <p class="text-gray-800 text-lg leading-none">@{{ user.uniqueName }}</p>
      </div>
    </div>
    <p v-if="tagline" class="text-gray-600 text-lg text-center leading-none mt-4">タグライン？</p>
    <div v-if="contacts" class="relative z-20 flex justify-center items-center mt-5">
      <a
        v-for="(contact, index) in contacts"
        :key="index"
        :href="contact.link"
        :class="`mdi-${contact.sns} text-${contact.sns} hover:text-${contact.sns}-darker`"
        class="relative mdi text-xl mx-2 duration-100"
      ></a>
    </div>
    <div v-if="detail" class="flex justify-center items-center mt-5">
      <div class="w-1/3 text-center">
        <p class="text-gray-800 text-2xl font-semibold">12</p>
        <p class="text-gray-600 text-xs">{{ $t('article') }}</p>
      </div>
      <div class="w-1/3 text-center">
        <p class="text-gray-800 text-2xl font-semibold">1,354</p>
        <p class="text-gray-600 text-xs">{{ $t('user.follow') }}</p>
      </div>
      <div class="w-1/3 text-center">
        <p class="text-gray-800 text-2xl font-semibold">76</p>
        <p class="text-gray-600 text-xs">{{ $t('user.follower') }}</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { UserDetail } from '~/apollo/schemas/userDetail'

@Component
export default class PersonCard extends Vue {
  @Prop() card!: boolean
  @Prop() hover!: boolean
  @Prop() link!: boolean
  @Prop() detail!: boolean
  @Prop() user!: UserDetail

  isStyle = {
    'card-class': this.card,
    'hover-class': this.hover
  }

  get contacts() {
    // return this.user.contacts
    return ["twitter.com"]
  }

  get tagline() {
    // return this.user.contacts
    return ""
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

.hover-class:hover {
  @apply shadow;
}

.hover-class:focus {
  @apply shadow;
}
</style>