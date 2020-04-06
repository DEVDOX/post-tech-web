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

    <client-only>
      <tags-input element-id="tags"
        v-model="selectedTags"
        :existing-tags="[
            { key: 'web-development', value: 'Web Development' },
            { key: 'php', value: 'PHP' },
            { key: 'javascript', value: 'JavaScript' },
        ]"
        :typeahead="true">
      </tags-input>
    </client-only>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, min, max } from "vee-validate/dist/rules"
import '@voerro/vue-tagsinput/dist/style.css'

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class Settings extends Vue {
  test = {
    text: '',
    nottest: ''
  }

  selectedTags = null

  submit() {
    console.log('example')
    console.log(this.test.text)
  }

  mounted() {
    extend('lowercase', {
      validate: value => /^([a-z0-9\-\_]+)$/.test(value),
      message: 'all of characters must be lowercase.'
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