<template>
  <div v-if="user" :class="isStyle" class="w-full relative z-10 flex flex-col justify-between leading-normal">
    <n-link v-if="link" :to="'/user/' + user.uniqueName" class="stretched-link"></n-link>
    <div class="flex justify-center items-center">
      <img class="w-16 h-16 rounded-full object-cover mr-2" :src="user.avatar" alt="avatar">
      <div>
        <p class="text-gray-800 text-lg leading-none mb-1">{{ user.displayName }}</p>
        <p class="text-gray-600 text-sm leading-none">@{{ user.uniqueName }}</p>
      </div>
    </div>
    <p v-if="user.tagline" class="text-gray-600 text-sm text-center mt-4">{{ user.tagline }}</p>
    <div v-if="user.contacts" class="relative z-20 flex justify-center items-center mt-5">
      <a
        v-for="(contact, index) in contacts"
        :key="index"
        :href="contact.link"
        :class="`mdi-${contact.sns} text-${contact.sns} hover:text-${contact.sns}-darker`"
        class="relative mdi text-xl mx-2 duration-100"
      ></a>
    </div>
    <div v-if="user.details" class="flex justify-center items-center mt-5">
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

    <hr v-if="user.websiteUrl || user.location" class="my-5">

    <div class="relative z-20 flex flex-col justify-start items-start mx-3">
      <span v-if="user.websiteUrl" class="text-center text-gray-700 mb-2"><i class="mdi mdi-web mr-1"></i><a class="hover:underline" :href="user.websiteUrl">{{ user.websiteUrl }}</a></span>
      <span v-if="user.location" class="text-center text-gray-700 mb-2"><i class="mdi mdi-map-marker mr-1"></i>{{ user.location }}</span>
    </div>
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