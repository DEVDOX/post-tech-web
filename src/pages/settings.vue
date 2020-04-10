<template>
  <div class="mx-3 lg:mx-64">
    <ValidationObserver v-slot="{ invalid }">
      <div class="grid grid-cols-4 col-gap-8">

        <!-- ボタンやバーなど -->
        <div id="sidebar" class="col-span-4 lg:col-span-1 mb-4">
          <button
            class="w-full btn btn-blue mb-5"
            :class="invalid ? 'disabled' : ''"
            :disabled="invalid"
          >
            {{ $t('options.save') }}
          </button>
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

        <!-- メインの設定欄 -->
        <div id="main" class="col-span-4 lg:col-span-3 card p-8">

          <!-- プロフィール設定 -->
          <div :class="tabId == 'profile' ? 'block' : 'hidden'">
            <div class="flex justify-center">
              <div class="w-96 mb-8">
                <PersonCard
                  :card="true"
                  :detail="true"
                  :user="updatedUser"
                />
                <p class="text-center my-2">{{ $t('preview') }}</p>
              </div>
            </div>
            <div class="mb-6">
              <label class="text-sm text-gray-700" for="unique-name">{{ $t('options.uniqueName') }}</label>
              <ValidationProvider rules="required|uniqueName|min:5|max:15" v-slot="{ invalid, errors }">
                <input
                  id="unique-name"
                  v-model="updatedUser.uniqueName"
                  maxlength="15"
                  class="w-full m-input text-gray-800"
                  :class="invalid ? 'input-invalid' : ''"
                  type="text"
                  placeholder="Jane Doe"
                  :aria-label="$t('options.uniqueName')"
                >
                <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
              </ValidationProvider>
              <small class="text-xs text-gray-600">{{ $t('options.uniqueNameWarn') }}</small>
            </div>
            <div class="mb-6">
              <label class="text-sm text-gray-700" for="display-name">{{ $t('options.displayName') }}</label>
              <ValidationProvider rules="required|min:5|max:15" v-slot="{ invalid, errors }">
                <input
                  id="display-name"
                  v-model="updatedUser.displayName"
                  maxlength="15"
                  class="w-full m-input"
                  :class="invalid ? 'input-invalid' : ''"
                  type="text"
                  placeholder="JaneDoe"
                  :aria-label="$t('options.displayName')"
                >
                <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
            <div class="mb-6">
              <label class="text-sm text-gray-700" for="tagline">{{ $t('options.tagline') }}</label>
              <ValidationProvider rules="max:150" v-slot="{ invalid, errors }">
                <input
                  id="tagline"
                  v-model="updatedUser.tagline"
                  maxlength="150"
                  class="w-full m-input"
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet"
                  :aria-label="$t('options.tagline')"
                >
                <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
            <div class="mb-6">
              <label class="text-sm text-gray-700" for="web-site-url">{{ $t('options.webSiteUrl') }}</label>
              <ValidationProvider rules="url" v-slot="{ invalid, errors }">
                <input
                  id="web-site-url"
                  v-model="updatedUser.websiteUrl"
                  class="w-full m-input text-gray-800"
                  type="text"
                  :placeholder="getDomainName()"
                  :aria-label="$t('options.webSiteUrl')"
                >
                <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
            <div class="mb-6">
              <label class="text-sm text-gray-700" for="location">{{ $t('options.location') }}</label>
              <input
                id="location"
                v-model="updatedUser.location"
                class="w-full m-input text-gray-800"
                type="text"
                placeholder="Tokyo"
                :aria-label="$t('options.location')"
              >
            </div>
          </div>

          <!-- アカウント設定 -->
          <div :class="tabId == 'account' ? 'block' : 'hidden'">
            <!-- <div class="mb-6">
              <label class="text-sm text-gray-700" for="email">{{ $t('options.email') }}</label>
              <ValidationProvider rules="required|email" v-slot="{ invalid, errors }">
                <input
                  id="email"
                  v-model="updatedUser.email"
                  class="w-full m-input text-gray-800"
                  :class="invalid ? 'input-invalid' : ''"
                  type="text"
                  placeholder="user@example.com"
                  :aria-label="$t('options.email')"
                >
                <p v-show="errors.length" class="text-xs text-red-500">{{ errors[0] }}</p>
              </ValidationProvider>
            </div> -->
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

          <!-- 基本設定 -->
          <div :class="tabId == 'preference' ? 'block' : 'hidden'">
            <!-- showLikesができたらコメントアウトする -->
            <!-- <div class="mb-6">
              <label class="text-sm text-gray-700">{{ $t('options.showLike') }}</label>
              <p class="text-xs text-gray-600">{{ $t('options.showLikeDescription') }}</p>
              <div class="flex items-center m-3">
                <input
                  id="show-like"
                  type="checkbox"
                  value="ja"
                  class="mr-2"
                  :checked="updatedUser.showLikes == true"
                >
                <label for="show-like">
                  {{ $t('options.enable') }}
                </label>
              </div>
            </div> -->
            <div class="mb-6">
              <label class="text-sm text-gray-700">{{ $t('options.language') }}</label>
              <div class="flex items-center m-3">
                <input
                  id="japanese"
                  name="language"
                  type="radio"
                  value="ja"
                  class="mr-2"
                  :checked="updatedUser.localeCode == 'ja'"
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
                  :checked="updatedUser.localeCode == 'en'"
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
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PersonCard from '~/components/PersonCard.vue'

import { serviceContainer } from '~/dependencyInjection/container'

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email, min, max } from 'vee-validate/dist/rules'

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

extend('uniqueName', {
  validate: value => /^([a-z0-9\-\_]+)$/.test(value)
})
extend('url', {
  validate: value => /^(http|https):\/\//.test(value)
})
extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)


@Component({
  components: {
    PersonCard,
    ValidationObserver,
    ValidationProvider
  }
})
export default class Settings extends Vue {
  isTwitterLinked: boolean = false
  isGithubLinked: boolean = false

  user: UserDetail | null = null

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

  tabId: tabType = 'profile'

  getDomainName(): string {
    if (process.env.BASE_URL) {
      return process.env.BASE_URL
    }
    return ''
  }

  updateTabId(tabId: tabType) {
    this.tabId = tabId
  }

  get currentTab() {
    return this.tabId
  }

  async asyncData({ store }: Context) {
    const uniqueName = store.getters.getAuthUser.uniqueName
    const user = await UserRepo.getUserByUName(uniqueName)

    return {
      user: user
    }
  }

  async updateUser() {
    const updatedUser = await UserRepo.updateUser(this.updatedUser)
  }

  get updatedUser() { return this.user }
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
.disabled {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed;
}
.input-invalid {
  @apply border-red-500;
}
.input-invalid:focus {
  @apply border-red-500;
}
</style>