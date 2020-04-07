<template>
  <div class="relative tags-input-root">
    <transition>
      <div class="tags-input-wrapper-default tags-input" :class="isActive ? 'active' : ''">

        <!-- Tags -->
        <span class="tags-input-badge"
          v-for="(tag, index) in tags"
          :key="index"
        >
          <span v-html="tag.value"></span>
          <a @click.prevent="removeTag(index)" class="tags-input-remove"></a>
        </span>

        <!-- Add tag input -->
        <input
          type="text"
          v-model="input"
          :placeholder="placeholder"
          @keydown.8="removeLastTag"
          @keydown.enter.prevent="addTag"
          @focus="onFocus"
          @blur="onBlur"
        >

        <!-- Dropdown -->
        <ul v-show="searchResults.length" class="dropdown">
          <li v-for="(tag, index) in searchResults"
            :key="index"
            v-html="tag.value"
            @mouseover="searchSelection = index"
            @mousedown.prevent="tagFromSearchOnClick(tag)"
            v-bind:class="{
              'tags-input-typeahead-item-default': index != searchSelection,
              'tags-input-typeahead-item-highlighted-default': index == searchSelection
          }"></li>
        </ul>
      </div>
    </transition>
    <p class="my-1">Input: {{ input }}</p>
    <p class="my-1">Tags: {{ tags }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

type Tags = Array<{
  value: string
}>

@Component
export default class TagsInputCompletion extends Vue {
  @Prop({default: 'Add a tag'}) placeholder!: string
  @Prop() existTags!: Tags
  @Prop({default: false}) validate!: boolean
  @Prop({default: 7}) maxResults!: number

  tags: Tags = []
  searchResults: Tags = []
  searchSelection: number = 0
  input: string = ''
  oldInput: string = ''
  hiddenInput: string = 'DATA'
  isActive: boolean = false

  @Watch('input')
  receiveData() {
    this.$emit('inputChanged', this.input)
    this.searchTag(this.input)
  }

  addTag() {
    if (this.validate === true) {
      this.tags.push({value: this.input})
      this.$nextTick(() => {
        this.input = ''
      })
    } else {
      console.log('validation failed')
    }
  }

  removeLastTag() {
    if (!this.input.length && this.tags.length) {
        this.removeTag(this.tags.length - 1)
    }
  }

  removeTag(index: number) {
    let tag = this.tags[index]
    this.tags.splice(index, 1)
  }

  escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  searchTag(char: string) {
    this.searchResults = []
    this.searchSelection = 0
    const searchQuery: string = this.escapeRegExp(this.input.toLowerCase())

    for (let tag of this.existTags) {
      const compareable = tag.value.toLowerCase()

      if (compareable.search(searchQuery) > -1) {
        this.searchResults.push(tag)
      }
    }

    // Sort the search results alphabetically
    this.searchResults.sort((a, b) => {
      if (a.value < b.value) return -1
      if (a.value > b.value) return 1

      return 0
    })

    // Shorten Search results to desired length
    this.searchResults = this.searchResults.slice(0, this.maxResults)
  }

  nextSearchResult() {
    if (this.searchSelection + 1 <= this.searchResults.length - 1) {
      this.searchSelection++;
    }
  }

  prevSearchResult() {
    if (this.searchSelection > 0) {
      this.searchSelection--;
    }
  }

  onFocus() {
    this.isActive = true
  }

  onBlur() {
    this.isActive = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');

.v-enter-active,
.v-leave-active {
  transition: 500ms;
}

/* The input */
.tags-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.tags-input input {
    flex: 1;
    background: transparent;
    border: none;
}

.tags-input input:focus {
    outline: none;
}

.tags-input input[type="text"] {
    color: #495057;
}

.tags-input-wrapper-default {
    padding: .5em .25em;
    background: #fff;
    border: 1px solid transparent;
    border-radius: .25em;
    border-color: #dbdbdb;
}

.tags-input-wrapper-default.active {
    border: 1px solid #38b2ac;
    outline: 0 none;
}

/* The tag badges & the remove icon */
.tags-input span {
    margin-right: 0.3em;
    font-family: 'Source Sans Pro';
    letter-spacing: 0.025em;
}

.tags-input-remove {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    right: 0.3em;
    top: 0.3em;
    padding: 0.5em;
    overflow: hidden;
}

.tags-input-remove:focus {
    outline: none;
}

.tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 85%;
    left: 0.15em;
    background: #5dc282;
    height: 2px;
    margin-top: -1px;
}

.tags-input-remove:before {
    transform: rotate(45deg);
}
.tags-input-remove:after {
    transform: rotate(-45deg);
}

/* Tag badge styles */
.tags-input-badge {
    position: relative;
    display: inline-block;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 1.25em;
    padding-left: 0.6em;
    border-radius: 10em;
    color: #212529;
    background-color: #f0f1f2;
}

/* Typeahead - dropdown */
.dropdown {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    z-index: 1000;
}

.dropdown li {
    padding: .25em 1em;
    cursor: pointer;
}

/* Typeahead elements style/theme */
.tags-input-typeahead-item-default {
    color: #fff;
    background-color: #343a40;
}

.tags-input-typeahead-item-highlighted-default {
    color: #fff;
    background-color: #007bff;
}
</style>