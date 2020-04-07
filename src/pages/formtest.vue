<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <button
        @click="submit()"
        class="btn btn-blue"
        :class="invalid ? 'disabled' : ''"
        :disabled="invalid"
      >
        Submit
      </button>
      <p v-show="invalid">
        必須項目は全て入力してください
      </p>
      <ValidationProvider rules="required|min:3|max:15|lowercase" v-slot="{ errors, invalid }">
        <input
          id="test-input"
          class="border"
          :class="invalid ? 'error' : ''"
          type="text"
          v-model="test.text"
        >
        <p v-show="errors.length" class="error_message">
          {{ errors[0] }}
        </p>
      </ValidationProvider>
    </ValidationObserver>

    <div class="my-5">
      <ValidationObserver v-slot="{ invalid }" ref="parentObserver">
        <ValidationProvider rules="tag" v-slot="{ errors }">
          <div>
            <CustomTagInput element-id="tags"
              ref="tagsInput"
              v-model="selectedTags"
              @keydown.enter="validateInput"
              :validate="validateInput"
              :limit="10"
              :add-tags-on-comma="true"
              :existing-tags="[
                  { value: 'webdevelopment' },
                  { value: 'php' },
                  { value: 'javaScript' },
              ]"
              :typeahead="true"
              typeahead-style="dropdown"
            >
            </CustomTagInput>
          </div>
          <p v-show="errors">{{ errors[0] }}</p>
        </ValidationProvider>
        <button
          @click="submit()"
          class="btn btn-blue"
          :class="invalid ? 'disabled' : ''"
          :disabled="invalid"
        >
          Validate?
        </button>
      </ValidationObserver>
      <p>{{ selectedTags }}</p>
    </div>

    <div class="my-8">
      <TagsInputCompletion
        :state="inputResult"
        @inputChanged="checkValidation"
      />
    </div>

    <button @click="successful = true" class="btn btn-blue">Let's go bois</button>
    <!-- <FloatingAlertBox
      @close="successful = false"
      :isShow="isSuccessful"
      bgColor="bg-blue-500"
      textColor="text-white"
      message="うんちぶり！ｗ"
    /> -->

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import { ValidationObserver, ValidationProvider, extend, validate } from 'vee-validate'
import { required, min, max } from "vee-validate/dist/rules"
import '@voerro/vue-tagsinput/dist/style.css'
import TagInput from '~/components/TagInput.vue'
import TagsInputCompletion from '~/components/TagsInputCompletion.vue'


import FloatingAlertBox from '~/components/FloatingAlertBox.vue'

interface tag {
  value: string
}

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    FloatingAlertBox,
    'CustomTagInput': TagInput,
    TagsInputCompletion
  }
})
export default class Settings extends Vue {
  @Watch('tagInput')
  onTagsChange(value: any, oldValue: any) {
    console.error(value)
  }

  test = {
    text: '',
    nottest: ''
  }

  inputResult: boolean = false
  successful: boolean = false
  get isSuccessful(): boolean { return this.successful }
  selectedTags: tag[] = []

  validateInput(value: string) {
    console.log('validating')
    validate(value, 'tag').then(result => {
      console.log('isValid: ', result.valid)
      if (result.valid) {
        this.selectedTags.push({ value })
        // @ts-ignore
        this.$refs.tagsInput.clearInput()
      }
    })
  }

  checkValidation(value: any) {
    console.warn(value)
    validate(value, 'tag').then(result => {
      if (result.valid) {
        this.inputResult = true
      }
    })
  }

  testFunc(value: any) {
    console.log(value)
    const result = this.$refs.parentObserver.validate({silent: false})
  }

  submit() {
    console.log('example')
    console.log(this.test.text)
  }

  mounted() {
    console.warn(this.$refs.tagsInput)
    extend('lowercase', {
      validate: value => /^([a-z0-9\-\_]+)$/.test(value),
      message: 'all of characters must be lowercase.'
    })
    extend('tag', {
      validate: value => {
        return /^([a-z0-9]+)$/.test(value)
      }
    })
    extend('required', required)
    extend('min', min)
    extend('min', {message: `Name is at least 3 characters.`})
    extend('max', max)
    extend('max', {message: 'Name\'s limit is 15 characters.'})
  }
}
</script>

<style scoped>
.disabled {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed;
}
.error {
  @apply border-red-500;
}
</style>

<style>
.tags-input-wrapper-default.active {
  @apply border-teal-500 shadow-none;
}
.tags-input-badge {
  @apply text-sm;
}
</style>