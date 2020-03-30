<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 py-3 px-8 lg:px-32 xl:px-64 mb-8">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <n-link to="/">
          <span class="font-semibold text-xl tracking-tight">Unposter</span>
        </n-link>
      </div>
      <div class="block lg:hidden">
        <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="isOpen ? 'block' : 'hidden'" class="w-full lg:w-auto lg:flex flex-row items-center">
        <div class="text-sm my-3 lg:my-0 lg:mr-4">
          <a href="#responsive-header" class="lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            <div class="relative mx-auto text-gray-600">
              <input class="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                type="search" name="search" :placeholder="$t('search')">
            </div>
          </a>
        </div>
        <div class="flex items-center" v-if="isLogIn">
          <div class="mr-3">
            <n-link to="/post/new" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">+ {{ $t('newPost') }}</n-link>
          </div>
          <n-link to="/user/RikuS3n" class="inline-block"><img class="w-10 h-10 rounded-full object-cover mr-4" src="/image/kawaii_1.png" alt="avatar"></n-link>
        </div>
        <div v-else-if="!isLogIn">
          <button @click="openModal" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">{{ $t('login') }}</button>
        </div>
      </div>
    </nav>
    <LoginModal :isModalOpen="isModalOpen" @close="closeModal"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import LoginModal from '~/components/LoginModal.vue'

@Component({
  components: {
    LoginModal
  }
})
export default class Header extends Vue {
  @Prop() isLogIn!: boolean
  isOpen: boolean = false
  isModalOpen: boolean = false

  mounted() {
    this.isOpen = false
    this.isModalOpen = false
    this.$root.$on('close', this.closeModal)
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }
}
</script>
