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
