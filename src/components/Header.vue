<template>
  <div>
    <nav 
      :class="{ 'scrolled': !view.atTopOfPage }" 
      class="fixed w-full flex items-center flex-wrap bg-teal-500 z-50 py-2 lg:py-4 px-2 lg:px-32 xl:px-64 top-0 duration-100">
      <n-link to="/" class="font-semibold text-xl text-white tracking-tight mr-2">Unposter</n-link>
      <input class="border border-gray-400 bg-white w-32 lg:w-48 h-10 p-2 rounded text-sm focus:outline-none text-gray-600 ml-auto" type="search" name="search" :placeholder="$t('header.search')">
      <div class="flex items-center" v-if="isLogIn">
        <n-link to="/post/new" class="inline-block text-sm px-2 lg:px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-1 lg:ml-4 mr-2 lg:mr-3">+ {{ $t('header.newPost') }}</n-link>
        <n-link to="/user/RikuS3n"><img class="w-10 h-10 rounded-full object-cover" src="/image/kawaii_1.png" alt="avatar"></n-link>
      </div>
      <div v-else-if="!isLogIn">
        <button @click="openModal" class="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-3">{{ $t('user.login') }}</button>
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
  view = {
    atTopOfPage: false
  }

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

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

  handleScroll(){
    if (window.pageYOffset > 0) {
      if (this.view.atTopOfPage) this.view.atTopOfPage = false
    } else {
      if (!this.view.atTopOfPage) this.view.atTopOfPage = true
    }
  }
}
</script>

<style scoped>
/*nav.scrolled {
    @apply shadow;
    border-bottom: 0px;
}*/
</style>