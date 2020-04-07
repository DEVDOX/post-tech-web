<template>
  <div>
    <transition>
      <div class="tags-input-wrapper-default tags-input" :class="isActive ? 'active' : ''">

        <!-- Tags -->
        <span class="tags-input-badge"
          v-for="(tag, index) in tags"
          :key="index"
        >
          <span v-html="tag.value"></span>
          <a class="tags-input-remove"></a>
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
      </div>
    </transition>
    <p class="my-1">Input: {{ input }}</p>
    <p class="my-1">Tags: {{ tags }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class TagsInputComplete extends Vue {
  @Prop({default: 'Add a tag'}) placeholder!: string
  @Prop() state!: boolean

  tags: {}[] = []
  input: string = ''
  oldInput: string = ''
  hiddenInput: string = 'DATA'
  isActive: boolean = false

  @Watch('input')
  takeData() {
    this.$emit('inputChanged', this.input)
  }

  addTag() {
    if (this.state === true) {
      this.tags.push({value: this.input})
      this.input = ''
    } else {
      console.log('state is not true')
    }
  }

  removeLastTag() {
    if (!this.input.length && this.tags.length) {
        this.removeTag(this.tags.length - 1);
    }
  }

  removeTag(index: number) {
    let tag = this.tags[index];
    this.tags.splice(index, 1);
  }

  /* getTags() {
    this.
  } */

  onFocus() {
    this.isActive = true
  }

  onBlur() {
    this.isActive = false
  }
}
</script>

<style>
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
    width: 75%;
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

/* Typeahead */
.typeahead-hide-btn {
    color: #999 !important;
    font-style: italic;
}

/* Typeahead - badges */
.typeahead-badges > span {
    cursor: pointer;
    margin-right: 0.3em;
}

/* Typeahead - dropdown */
.typeahead-dropdown {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    z-index: 1000;
}

.typeahead-dropdown li {
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