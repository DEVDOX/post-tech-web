<template>
  <div class="relative tags-input-root">
    <div class="tags-input-wrapper-default tags-input" :class="isActive ? 'active' : ''">
      <!-- Tags -->
      <span class="tags-input-badge" v-for="(tag, index) in tags" :key="index">
        <span v-html="tag.name"></span>
        <a @click.prevent="removeTag(index)" class="tags-input-remove"></a>
      </span>

      <!-- Add tag input -->
      <input
        ref="tagInput"
        type="text"
        v-model="input"
        :placeholder="placeholder"
        @keydown.8="removeLastTag"
        @keydown.enter.prevent="tagFromInput(false)"
        @keydown.down="nextSearchResult"
        @keydown.up="prevSearchResult"
        @keyup.esc="clearSearchResults"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <!-- Dropdown -->
    <div>
      <ul v-show="searchResults.length" class="dropdown">
        <li
          v-for="(tag, index) in searchResults"
          :key="index"
          @mouseover="searchSelection = index"
          @mousedown.prevent="tagFromSearchOnClick(tag.name)"
          v-bind:class="{
            'tags-input-typeahead-item-default': index != searchSelection,
            'tags-input-typeahead-item-highlighted-default': index == searchSelection
        }"
        >
          {{ tag.name }}
        </li>
      </ul>
    </div>
    <p class="my-1">Input: {{ input }}</p>
    <p class="my-1">Tags: {{ tags }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

interface Tag {
  id?: number
  name: string
}

type Tags = Array<Tag>

@Component
export default class TagsInputCompletion extends Vue {
  $refs!: {
    tagInput: HTMLInputElement
  }

  @Prop({ default: 'Add a tag' }) placeholder!: string
  @Prop() existTags!: Tags
  @Prop({ default: false }) validate!: boolean
  @Prop({ default: 7 }) maxResults!: number

  tags: Tags = []
  searchResults: Tags = []
  searchSelection: number = 0
  input: string = ''
  isActive: boolean = false

  @Watch('input')
  receiveData() {
    if (this.input.length >= 1) {
      this.$emit('inputChanged', this.input)
    }
    this.searchTag()
  }

  addTag(tag: Tag) {
    console.log(this.searchResults.length)
    // this.searchResults.lengthが1以上なら、補完がある
    if (this.validate == false && this.searchResults.length == 0) {
      return false
    }
    // prohibit duplicates
    if (!this.tagSelected(tag)) {
      this.tags.push(tag)
      this.$nextTick(() => {
        this.input = ''
      })
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

  searchTag(): void {
    this.searchResults = []
    this.searchSelection = 0
    const searchQuery: string = this.escapeRegExp(this.input.toLowerCase())

    for (let tag of this.existTags) {
      const compareable = tag.name.toLowerCase()

      if (compareable.search(searchQuery) > -1) {
        this.searchResults.push(tag)
      }
    }

    // Sort the search results alphabetically
    this.searchResults.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1

      return 0
    })

    // Shorten Search results to desired length or emit back empty array
    this.searchResults =
      this.input.length >= 1 ? this.searchResults.slice(0, this.maxResults) : []

    this.$emit('updateResult', this.searchResults)
  }

  tagSelected(tag: Tag): boolean {
    if (!tag) {
      return false
    }

    const searchQuery = this.escapeRegExp(tag.name.toLowerCase())

    for (let selectedTag of this.tags) {
      const compareable = selectedTag.name.toLowerCase()

      if (
        selectedTag.name === tag.name &&
        this.escapeRegExp(compareable).length == searchQuery.length &&
        compareable.search(searchQuery) > -1
      ) {
        return true
      }
    }

    return false
  }

  tagFromSearch(tag: string) {
    this.addTag({ name: tag })
    this.clearSearchResults()

    /* this.$nextTick(() => {
      this.input = ''
    }) */
  }

  tagFromInput(ignoreSearchResults = false) {
    // If we're choosing a tag from the search results
    if (this.searchResults.length && this.searchSelection >= 0) {
      this.tagFromSearch(this.searchResults[this.searchSelection].name)

      //this.input = ''
    } else {
      // If we're adding an unexisting tag
      let text = this.input.trim()

      // If the new tag is not an empty string and passes validation
      if (text.length) {
        // && this.validate(text)
        //this.input = ''

        // Determine if the inputted tag exists in the existingTags
        // Array
        let newTag: Tag = {
          name: text
        }

        this.addTag(newTag)
      }
    }
  }

  tagFromSearchOnClick(tag: string) {
    this.tagFromSearch(tag)
    console.log('onClick', tag)
    this.$refs.tagInput.blur()
  }

  clearSearchResults(returnFocus = false) {
    this.searchResults = []
    this.searchSelection = 0

    if (returnFocus) {
      this.$refs.tagInput.focus()
      // this.$refs['taginput'].focus();
    }
  }

  nextSearchResult() {
    if (this.searchSelection + 1 <= this.searchResults.length - 1) {
      this.searchSelection++
    }
  }

  prevSearchResult() {
    if (this.searchSelection > 0) {
      this.searchSelection--
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
  position: relative;
}

.tags-input input {
  flex: 1;
  background: transparent;
  border: none;
}

.tags-input input:focus {
  outline: none;
}

.tags-input input[type='text'] {
  color: #495057;
}

.tags-input-wrapper-default {
  padding: 0.5em 0.25em;
  background: #fff;
  border: 1px solid transparent;
  border-radius: 0.25em;
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

.tags-input-remove:before,
.tags-input-remove:after {
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
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 0 0 10px 10px / 0 0 10px 10px;
}

.dropdown li {
  padding: 0.25em 1em;
  cursor: pointer;
}

/* Typeahead elements style/theme */
.tags-input-typeahead-item-default {
  color: #2d3748;
  background-color: #fff;
}

.tags-input-typeahead-item-highlighted-default {
  color: #2d3748;
  background-color: #e2e8f0;
}
</style>