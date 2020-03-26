<template>
  <div>
    <div class="flex">
      <div id="sidebar" class="w-2/12 mx-3">
      </div>
      <div id="main" class="w-7/12 mx-3">
        <IndexCard class="mb-3" />
        <IndexCard class="mb-3" />
        <IndexCard class="mb-3" />
      </div>
      <div id="toc" class="w-3/12 mx-3">
        <PersonCard />
      </div>
    </div>
    <t-pagination
      prev-label="Previous"
      next-label="Next"
      first-label="First"
      last-label="Last"
      :total-items="100"
      :per-page="4"
      :limit="5"
      :value="3"
      :hide-ellipsis="true"
      :hide-first-last-controls="true"
      wrapper-class="flex w-full justify-between"
      item-class="h-12"
      page-class="w-12"
      control-class=""
      disabled-control-class="opacity-50"
      ellipsis-class=""
      button-class="p-2 text-blue-500 hover:text-blue-700 w-full"
      control-button-class="text-blue-500 hover:text-blue-700"
      ellipsis-button-class="text-gray-600"
      active-button-class="font-bold underline"
    />

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import IndexCard from '~/components/IndexCard.vue'
import PersonCard from '~/components/PersonCard.vue'

@Component({
  components: {
    IndexCard,
    PersonCard
  }
})
export default class Index extends Vue {
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
