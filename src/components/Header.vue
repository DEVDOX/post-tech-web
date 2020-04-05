<template>
  <div>
    <nav 
      :class="{ 'scrolled': !view.atTopOfPage }" 
      class="fixed w-full flex items-center flex-wrap bg-teal-500 z-50 py-2 lg:py-4 px-2 lg:px-32 xl:px-64 top-0 duration-100">
      <n-link to="/" class="font-semibold text-xl text-white tracking-tight mr-2">Unposter</n-link>
      <!-- <input class="border border-gray-400 bg-white w-32 lg:w-48 h-10 p-2 rounded text-sm focus:outline-none text-gray-600 ml-auto" type="search" name="search" :placeholder="$t('header.search')"> -->
      <div v-if="isLoggedIn" class="flex items-center ml-auto">
        <n-link to="/post/new" class="inline-block text-sm px-2 lg:px-4 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-1 lg:ml-4 mr-2 lg:mr-3 duration-50">
          + {{ $t('header.newPost') }}
        </n-link>
        <span @click="toggleMenu()">
          <button class="block w-10 h-10 rounded-full overflow-hidden focus:outline-none duration-100">
            <img class="w-full h-full object-cover" :src="currentUser.avatar" alt="avatar">
          </button>
          <ul v-on-clickaway="closeMenu" v-if="isOpen" class="absolute top-0 right-0 bg-white rounded py-2 shadow-xl lg:mr-64 mt-16">
            <n-link :to="`/user/${currentUser.uniqueName}`">
              <li class="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer">
                <i class="mdi mdi-account-circle-outline text-lg mr-1"/>
                <span>{{ $t('header.myPage') }}</span>
              </li>
            </n-link>

            <n-link to="/settings">
              <li class="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer">
                <i class="mdi mdi-cog-outline text-lg mr-1"/>
                <span>{{ $t('header.settings') }}</span>
              </li>
            </n-link>

            <li @click="logout()" class="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer">
              <i class="mdi mdi-logout text-lg mr-1"/>
              <span>{{ $t('user.logout') }}</span>
            </li>
          </ul>
        </span>
      </div>
      <div v-else>
        <button @click="openModal" class="text-sm px-4 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-3 duration-100">
          {{ $t('user.login') }}
        </button>
      </div>
    </nav>

    <LoginModal :isModalOpen="isModalOpen" @close="closeModal"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import LoginModal from '~/components/LoginModal.vue'
import { directive as onClickaway } from 'vue-clickaway'

import { UserDetail } from '../apollo/schemas/userDetail'

@Component({
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    LoginModal
  }
})
export default class Header extends Vue {
  @Prop() currentUser!: UserDetail

  protected blockUnloadMessage: string = this.$root.$tc('areYouSure')
  protected isBlockUnload: boolean = false;

  isOpen: boolean = false
  isModalOpen: boolean = false

  view = {
    atTopOfPage: false
  }

  get isLoggedIn(): boolean {
    return this.currentUser ? true : false
  }

  get profileLink(): string {
    return `/user/${this.currentUser.uniqueName}`
  }

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  mounted() {
    this.isOpen = false
    this.isModalOpen = false
    this.$root.$on('close', this.closeModal)
  }

  toggleMenu() {
    this.isOpen = !this.isOpen
  }

  closeMenu() {
    this.isOpen = false
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }

  logout() {
    this.$store.commit('DELETE_USER')
    this.$auth.logout()
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