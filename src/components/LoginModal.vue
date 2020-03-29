<template>
  <div :class="{'opacity-0': !isOpen, 'pointer-events-none': !isOpen}" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div @click.self="$emit('close')" class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      
      <div @click="$emit('close')" class="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">{{ $t('login') }}</p>
          <div @click="$emit('close')" class="cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>

        <!--Body-->
        <div class="flex flex-col justify-center items-center">
          <button class="bg-twitter border border-twitter rounded text-white py-2 px-3 mb-2"><i class="mdi mdi-twitter mr-1"></i>{{ $t('loginWith') }}Twitter</button>
          <button @click="loginWithGithub" class="bg-gray-600 border border-gray rounded text-white py-2 px-3 mb-2">
            <i class="mdi mdi-github mr-1"></i>{{ $t('loginWith') }}GitHub
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class LoginModal extends Vue {
  @Prop() isOpen = false
  
  loginWithGithub() {
    this.$root.$emit('loginWithGithub')
  }
}
</script>

<style scoped>
.modal {
  transition: opacity 0.25s ease;
}
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>
