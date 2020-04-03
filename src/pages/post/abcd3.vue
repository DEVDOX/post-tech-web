<template>
  <div>
    <div class="grid grid-cols-12 gap-6">

      <div id="sidebar" class="w-full relative z-50 col-span-12 lg:col-span-2 xl:col-span-1">
        <div class="fixed bottom-0 lg:sticky lg:top-25 lg:bottom-auto w-full flex flex-col justify-center items-end mt-16">
          <div class="flex items-center mb-16 lg:mb-8">
            <button @click="updateLikes()" class="focus:outline-none w-12 h-12 bg-white rounded-full border-white hover:border-teal-500 border-2 shadow-md lg:shadow-none hover:shadow-sm duration-150">
              <LikeIcon :liked.sync="post.liked" className="text-xl"/>
            </button>
            <p class="w-10 lg:w-12 text-xl font-bold text-center hover:underline">
              <n-link :to="`/post/${post.url}/likes`">{{ post.likes }}</n-link>
            </p>
          </div>
        </div>
      </div>

      <div id="main" class="w-full col-span-12 lg:col-span-10 xl:col-span-8">
        <div class="w-full border border-gray-400 bg-white rounded p-8">

          <div class="flex items-center mb-2">
            <n-link :to="`/user/${post.author}`" class="flex items-center">
              <img class="w-8 h-8 rounded-full object-cover mr-2" src="/image/kawaii_1.png" alt="avatar">
              <p class="text-gray-800 text-base leading-none mr-2 hover:underline">@RikuS3n</p>
            </n-link>
            <p class="text-gray-600 text-base leading-none whitespace-no-wrap mr-2"><i class="mdi mdi-clock-outline"/>2020/03/30</p>
            <p class="text-gray-600 text-base leading-none whitespace-no-wrap mr-2"><i class="mdi mdi-update"/>2020/04/02</p>
          </div>

          <p class="text-4xl font-semibold">{{ post.title }}</p>

          <div class="flex flex-wrap items-center">
            <n-link
              v-for="(tag, index) in post.tags"
              :to="`/tag/${tag}`"
              :key="index"
              class="bg-gray-100 rounded hover:underline cursor-pointer px-2 py-1 m-1">
                #{{ tag }}
            </n-link>
            <span
              v-for="(word, index) in post.keywords"
              :key="index"
              class="bg-gray-100 rounded text-gray-600 text-sm px-1 py-0 m-1">
                {{ word }}
            </span>
          </div>

          <div class="markdown mt-16">
            <div v-if="markdownIt" v-html="markdownIt.render(post.body)"></div>
          </div>

          <hr class="hidden lg:block my-16">

          <div class="hidden lg:block">
            <p class="text-xl font-semibold mb-3">著者</p>
            <PersonCard
              :card="true"
              :hover="true"
              :link="true"
              :tagline="user.tagline"
              :contacts="user.contacts"
              userName="RikuS3n"
            />
          </div>
        </div>
      </div>

      <div id="user" class="w-full col-span-12 xl:col-span-3">
        <PersonCard
          :card="true"
          :hover="true"
          :link="true"
          :tagline="user.tagline"
          :contacts="user.contacts"
          userName="RikuS3n"
        >
          <hr class="my-5">
          <div class="relative z-20 flex flex-col justify-start items-start mx-3">
            <span class="text-center text-gray-700 mb-2"><i class="mdi mdi-web mr-1"></i><a class="hover:underline" href="https://devmia.net">https://devmia.net</a></span>
            <span class="text-center text-gray-700 mb-2"><i class="mdi mdi-map-marker mr-1"></i>北海道</span>
          </div>
        </PersonCard>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import 'highlight.js/styles/obsidian.css';
import mavonEditor from 'mavon-editor'
import PersonCard from '~/components/PersonCard.vue'
import LikeIcon from '~/components/LikeIcon.vue'

@Component({
  components: {
    'mavon-editor': mavonEditor.mavonEditor,
    PersonCard,
    LikeIcon
  }
})
export default class Article extends Vue {
  markdownIt = null

  post = {
    title: 'Windows 10でDocker-composeを実行する',
    url: 'abc3',
    author: 'RikuS3n',
    body: '# うんち',
    tags: ['docker', 'windows-10', 'containerd-io'],
    keywords: ['Windows 10', 'docker', 'docker-compose'],
    likes: 2, // likerの数をカウントするようにする
    liked: false
  }

  user = {
    tagline: 'Lorem ipsum roamen sit',
    contacts: [
      { sns: 'twitter', link: 'https://twitter.com/RikuS3n' }
    ]
  }

  async mounted() {
    const body = await import('~/assets/post.js')
    this.post.body = body.default
    // @ts-ignore
    const hljs = require('highlight.js')
    // @ts-ignore
    this.markdownIt = mavonEditor.mavonEditor.getMarkdownIt()

    if (this.markdownIt) {
      // @ts-ignore
      this.markdownIt.options.highlight = function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><div class="mx-8"><code>' +
                  hljs.highlight(lang, str, true).value +
                  '</code></div></pre>'
          } catch (__) {}
        }

        if (this.markdownIt) {
          return '<pre class="hljs"><div class="mx-8"><code>' + this.markdownIt.utils.escapeHtml(str) + '</code></div></pre>'
        }
      }
    }
  }

  updateLikes() {
    if (this.post.liked) {
      this.post.liked = false
      this.post.likes--
    } else {
      this.post.liked = true
      this.post.likes++
    }
    console.log(this.post.likes)
  }
}
</script>

<style>
/* purgecss start ignore */
/* Markdown Styles */
/* Global */
.markdown {
  @apply leading-loose text-lg;
}
.markdown {
  font-family: 'Noto Sans JP', sans-serif;
}
/* Headers */
.markdown h1 {
  @apply text-3xl mt-16 mb-4 font-bold border-b border-gray-400;
}
.markdown h2 {
  @apply text-2xl mt-16 mb-4 font-bold border-b;
}
.markdown h3 {
  @apply text-xl mt-12 mb-3 font-semibold;
}
.markdown h4,
.markdown h5,
.markdown h6 {
  @apply text-lg mt-12 mb-3 font-semibold;
}
.markdown hr {
  @apply my-8;
}
/* Links */
.markdown a {
  @apply text-blue-600;
}
.markdown a:hover {
  @apply underline;
}
/* Paragraph */
.markdown p {
  @apply mb-4 text-base;
}
/* Lists */
.markdown ul,
.markdown ol {
  @apply mb-4 ml-8;
}
.markdown li > p,
.markdown li > ul,
.markdown li > ol {
  @apply mb-0;
}
.markdown ol {
  @apply list-decimal;
}
.markdown ul {
  @apply list-disc;
}
/* Blockquotes */
.markdown blockquote {
  @apply px-2 py-1 bg-gray-100 my-4 border-l-4 border-gray-400;
}
.markdown blockquote > p {
  @apply mb-0;
}
/* Tables */
.markdown td,
.markdown th {
  @apply px-2 py-1 border border-gray-400;
}
.markdown tr:nth-child(odd) {
  @apply bg-gray-100;
}
.markdown table {
  @apply mb-6;
}
.markdown code {
  @apply p-1 bg-gray-200 rounded;
}
.markdown pre {
  @apply text-base;
}
.markdown pre {
  margin: 1rem -33px;
}
.markdown pre code {
  @apply p-0 bg-transparent;
}
/* purgecss end ignore */
</style>