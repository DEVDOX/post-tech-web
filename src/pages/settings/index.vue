<template>
  <div class="mx-64">
    <div class="grid grid-cols-4 col-gap-8">

      <div id="sidebar" class="col-span-1">
        <div class="w-full card min-h-512px py-3">
          <ul class="">
            <li v-for="(item, index) in menuNames" :key="index" class="flex items-center border-l-3 border-transparent hover:border-teal-500 hover:bg-gray-100 cursor-pointer py-2 pl-4 pr-2 my-1 duration-100">
              <i :class="`mdi-${item.icon}`" class="mdi text-xl mr-2 lg:mr-4"/>
              <span class="font-semibold text-gray-700">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div id="main" class="col-span-3 card p-8">
          <div class="flex justify-center">
            <div class="w-96 mb-8">
              <PersonCard
                :card="true"
                :detail="true"
                :userName="name"
                :tagline="tagline"
                :contacts="contacts"
              />
              <p class="text-center my-2">{{ $t('preview') }}</p>
            </div>
          </div>
          <div class="mb-5">
            <label class="text-gray-700" for="unique-name">{{ $t('options.uniqueName') }}</label>
            <input id="unique-name" class="w-full m-input text-gray-800" type="text" placeholder="Jane Doe" :aria-label="$t('options.uniqueName')">
            <small class="text-xs text-gray-600">{{ $t('options.uniqueNameWarn') }}</small>
          </div>
          <div class="mb-5">
            <label class="text-gray-700" for="display-name">{{ $t('options.displayName') }}</label>
            <input id="display-name" class="w-full m-input text-gray-800" type="text" placeholder="JaneDoe" :aria-label="$t('options.displayName')">
          </div>
          <div class="mb-5">
            <label class="text-gray-700" for="tagline">{{ $t('options.tagline') }}</label>
            <input id="tagline" class="w-full m-input text-gray-800" type="text" placeholder="Lorem ipsum dolor sit amet" :aria-label="$t('options.tagline')">
          </div>
          <div class="mb-5">
            <label class="text-gray-700" for="web-site-url">{{ $t('options.webSiteUrl') }}</label>
            <input id="web-site-url" class="w-full m-input text-gray-800" type="text" :placeholder="getDomainName()" :aria-label="$t('options.webSiteUrl')">
          </div>
          <button class="btn btn-blue">{{ $t('options.save') }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PersonCard from '~/components/PersonCard.vue'

@Component({
  components: {
    PersonCard
  }
})
export default class Settings extends Vue {
  menuNames: object[] = [
    { icon: 'account-details-outline', name: this.$root.$t('options.profile') },
    { icon: 'account-outline', name: this.$root.$t('options.account') },
    { icon: 'security', name: this.$root.$t('options.security') },
  ]

  user = {
    name: 'RikuS3n',
    tagline: 'Lorem ipsum roamen sit',
    contacts: [
      { sns: 'twitter', link: 'https://twitter.com/RikuS3n' }
    ]
  }

  getDomainName(): string {
    if (process.env.DOMAIN_NAME) { return process.env.DOMAIN_NAME }
    return ''
  }

  get name() { return this.user.name }
  get tagline() { return this.user.tagline }
  get contacts() { return this.user.contacts }
}
</script>

<style scoped>
.card {
  @apply border border-gray-400 rounded bg-white;
}
.m-input {
  @apply appearance-none bg-transparent border-b border-gray-200 text-gray-800 mr-3 py-2 px-2 leading-tight duration-200;
}
.m-input:focus {
  @apply outline-none border-teal-500;
}
li.active {
  @apply border-teal-700 bg-gray-200;
}
</style>