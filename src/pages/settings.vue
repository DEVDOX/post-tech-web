<template>
  <div class="mx-3 lg:mx-64">
    <div class="grid grid-cols-4 col-gap-8">
      <div id="sidebar" class="col-span-4 lg:col-span-1 mb-4">
        <button class="w-full btn btn-blue mb-5">{{ $t('options.save') }}</button>
        <div class="w-full card lg:min-h-512px py-3">
          <ul class>
            <li
              v-for="item in menuNames"
              :key="item.id"
              class="sidebar-item flex items-center py-2 pl-4 pr-2 my-1"
              :class="item.id == tabId ? 'active' : ''"
              @click="updateTabId(item.id)"
            >
              <i :class="`mdi-${item.icon}`" class="mdi text-xl mr-2 lg:mr-4" />
              <span class="font-semibold text-gray-700">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div id="main" class="col-span-4 lg:col-span-3 card p-8">
        <div v-if="tabId == 'profile'">
          <div class="flex justify-center">
            <div class="w-96 mb-8">
              <PersonCard
                :card="true"
                :detail="true"
                :user="user"
              />
              <p class="text-center my-2">{{ $t('preview') }}</p>
            </div>
          </div>
          <div class="mb-6">
            <label class="text-sm text-gray-700" for="unique-name">{{ $t('options.uniqueName') }}</label>
            <input
              id="unique-name"
              v-model="user.uniqueName"
              class="w-full m-input text-gray-800"
              type="text"
              placeholder="Jane Doe"
              :aria-label="$t('options.uniqueName')"
            />
            <small class="text-xs text-gray-600">{{ $t('options.uniqueNameWarn') }}</small>
          </div>
          <div class="mb-6">
            <label class="text-sm text-gray-700" for="display-name">{{ $t('options.displayName') }}</label>
            <input
              id="display-name"
              v-model="user.displayName"
              class="w-full m-input text-gray-800"
              type="text"
              placeholder="JaneDoe"
              :aria-label="$t('options.displayName')"
            />
          </div>
          <div class="mb-6">
            <label class="text-sm text-gray-700" for="tagline">{{ $t('options.tagline') }}</label>
            <input
              id="tagline"
              v-model="user.tagline"
              class="w-full m-input text-gray-800"
              type="text"
              placeholder="Lorem ipsum dolor sit amet"
              :aria-label="$t('options.tagline')"
            />
          </div>
          <div class="mb-6">
            <label class="text-sm text-gray-700" for="web-site-url">{{ $t('options.webSiteUrl') }}</label>
            <input
              id="web-site-url"
              v-model="user.websiteUrl"
              class="w-full m-input text-gray-800"
              type="text"
              :placeholder="getDomainName()"
              :aria-label="$t('options.webSiteUrl')"
            />
          </div>
          <div class="mb-6">
            <label class="text-sm text-gray-700" for="location">{{ $t('options.location') }}</label>
            <input
              id="location"
              v-model="user.location"
              class="w-full m-input text-gray-800"
              type="text"
              placeholder="Tokyo"
              :aria-label="$t('options.location')"
            />
          </div>
        </div>

        <div v-if="tabId == 'account'">
          <div class="mb-6">
            <label class="text-sm text-gray-700" for="email">{{ $t('options.email') }}</label>
            <input
              id="email"
              v-model="user.email"
              class="w-full m-input text-gray-800"
              type="text"
              placeholder="user@example.com"
              :aria-label="$t('options.email')"
            />
          </div>
          <div class="flex flex-col mb-6">
            <div class="mb-3">
              <button class="w-32 btn btn-twitter mr-3">
                <i class="mdi mdi-twitter"/>
                <span>Twitter</span>
              </button>
              <span>{{ $t('options.link') }}</span>
            </div>
            <div class="mb-3">
              <button class="w-32 btn btn-github mr-3">
                <i class="mdi mdi-github"/>
                <span>GitHub</span>
              </button>
              <span>{{ $t('options.linked') }}</span>
            </div>
          </div>
        </div>

        <div v-if="tabId == 'preference'">
          <div class="mb-6">
            <label class="text-sm text-gray-700">{{ $t('options.language') }}</label>
            <div class="flex items-center m-3">
              <input
                id="japanese"
                name="language"
                type="radio"
                value="ja"
                class="mr-2"
                :checked="user.language_code == 'ja'"
              >
              <label for="japanese">
                日本語
                <small class="text-sm ml-1">(Japanese)</small>
              </label>
            </div>
            <div class="flex items-center m-3">
              <input
                id="english"
                name="language"
                type="radio"
                value="en"
                class="mr-2"
                :checked="user.language_code == 'en'"
              >
              <label for="english">
                English
                <small class="text-sm ml-1">(English)</small>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PersonCard from '~/components/PersonCard.vue'

import { serviceContainer } from '~/dependencyInjection/container'

import { TYPES } from '~/dependencyInjection/types'
import { UserRepositoryInterface } from '~/dependencyInjection/interfaces'
import { Context } from '@nuxt/types'
import { UserDetail } from '../apollo/schemas/userDetail'

const UserRepo = serviceContainer.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface)

type tabType = 'profile' | 'account' | 'preference'
interface tabInterface {
  id: tabType
  icon: string
  name: string
}

@Component({
  components: {
    PersonCard
  }
})
export default class Settings extends Vue {
  isTwitterLinked: boolean = false
  isGithubLinked: boolean = false

  user = null

  private userData = {
    uniqueName: this.user.uniqueName
  }

  menuNames: tabInterface[] = [
    {
      id: 'profile',
      icon: 'account-details-outline',
      name: this.$root.$tc('options.profile')
    },
    {
      id: 'account',
      icon: 'account-outline',
      name: this.$root.$tc('options.account')
    },
    {
      id: 'preference',
      icon: 'tune',
      name: this.$root.$tc('options.preference')
    },
  ]

  /* user = {
    uniqueName: 'RikuS3n',
    displayName: 'rikusen0335',
    location: 'Hokkaido',
    tagline: 'Lorem ipsum roamen sit',
    contacts: [{ type: 'twitter', url: 'https://twitter.com/RikuS3n' }],
    languageCode: 'ja'
  } */

  tabId: tabType = 'profile'

  getDomainName(): string {
    if (process.env.DOMAIN_NAME) {
      return process.env.DOMAIN_NAME
    }
    return ''
  }

  addContactInput() {
    this.user.contacts.push({type: '', url: ''})
  }

  updateTabId(tabId: tabType) {
    this.tabId = tabId
  }

  get currentTab() {
    return this.tabId
  }

  async asyncData({ store, app: { $auth } }: Context) {
    const uniqueName = store.getters.getAuthUser.uniqueName
    const user = UserRepo.getUserByUName(uniqueName)

    return {
      user
    }
  }

  uniqueNameValidation() { //uniqueNameって大文字含められる？

  }

  async updateUser() {
    console.log(this.user)
  }
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
.sidebar-item {
  @apply border-l-3 border-transparent cursor-pointer py-2 pl-4 pr-2 my-1 duration-100;
}
.sidebar-item:hover {
  @apply border-teal-500 bg-gray-100;
}
.sidebar-item.active {
  @apply border-teal-700 bg-gray-200;
}
.v-leave-active {
  position: absolute;
}
.v-enter {
  transform: translateX(-100%);
}
.v-leave-to {
  transform: translateX(100%);
}
.disable {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed !important;
}
</style>