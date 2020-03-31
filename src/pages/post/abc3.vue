<template>
  <div class="px-1 xl:px-3">
    <div class="flex flex-wrap -mx-1 xl:-mx-3">

      <div id="sidebar" class="w-full lg:w-1/6 xl:w-1/12 px-1 xl:px-3">
        <div class="sticky top-0 w-full flex flex-col justify-center items-end mt-16">
          <div class="flex items-center mb-8">
            <button class="w-12 h-12 bg-white rounded-full border-white hover:border-teal-500 focus:border-teal-600 border-2 hover:shadow-sm duration-150">
              <LikeIcon :isLiked="true" className="text-xl"/>
            </button>
            <p class="w-12 text-xl font-bold text-center hover:underline">
              <n-link :to="`/post/${post.url}/likes`">1</n-link>
            </p>
          </div>
        </div>
      </div>

      <div id="main" class="w-full lg:w-5/6 xl:w-8/12 px-1 xl:px-3 mb-16">
        <div class="w-full border border-gray-400 bg-white rounded p-8">

          <div class="flex items-center mb-2">
            <img class="w-8 h-8 rounded-full object-cover mr-2" src="/image/kawaii_1.png" alt="avatar">
            <p class="text-gray-800 text-base leading-none mr-2">@RikuS3n</p>
            <p class="text-gray-600 text-base leading-none mr-2"><i class="mdi mdi-clock-outline"/>2020/03/30</p>
            <p class="text-gray-600 text-base leading-none mr-2"><i class="mdi mdi-update"/>2020/04/02</p>
          </div>

          <p class="text-4xl font-semibold">{{ post.title }}</p>

          <div>
            <n-link
              v-for="(tag, index) in post.tags"
              :to="`/tag/${tag}`"
              :key="index"
              class="bg-gray-100 rounded hover:underline cursor-pointer px-2 py-1 m-1">
                #{{ tag }}
            </n-link>
          </div>

          <div class="markdown mt-16">
            <div v-if="markdownIt" v-html="markdownIt.render(content)"></div>
          </div>

          <hr class="my-16">

          <div>
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

      <div id="toc" class="w-full lg:w-full xl:w-3/12 px-1 xl:px-3">
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
    PersonCard,
    LikeIcon
  }
})
export default class Article extends Vue {
  markdownIt = null
  content = `

# ここから内容
## レベル2ヘッディング :(
### 環境とか <3
#### :) Lemme test this

### 環境とか <3
VagrantのDebian9 (Windows10 Pro上)
ただし、\`cat /etc/os-release\`をすると\`PRETTY_NAME="Debian GNU/Linux 10 (buster)"\`とでる。
これはパッケージリストを間違ってbusterを使う設定にしてしまったので、特に気にしない。

---

### (注意) 一度この記事をすべて読み進めてみてから実行してみることをおすすめします。
一部不安定や確立しない場合がありますので、それらを考慮しつつ実行してください。
責任は一切負いませんので、不安な方はバックアップをとるなりしてから実行してください。
殴り書きです。

\`\`\`js
function test(thing) {
  return thing.contains("test");
}
\`\`\`

例えば、テストデータ形式のcsvをインポートしたときに、データが保存されない場合があります。
入出力に問題はないです。

> これはテストです。
> 例えば、\`python -v 3.5\`と入力することで、
> python 3.5で対話型ランタイムを実行することができます(嘘)

## 解決方法
少し長いです。
上から2行目あたりで、\`/bin/sh: 1: mecab-config: not found\`と言われてるので、ターミナル上で\`mecab-config\`と打ってみると、
->\`zsh: command not found: mecab-config\`
とでるので、\`sudo apt install libmecab-dev\`と打って\`libmecab-dev\`をインストールする。

\`\`\`js
function test(thing) {
  return thing.contains("test");
}
\`\`\`
`

  post = {
    title: 'Windows 10でDocker-composeを実行する',
    url: 'abc3',
    author: 'RikuS3n',
    body: '# うんち',
    tags: ['Windows 10', 'docker', 'docker-compose'],
  }

  user = {
    tagline: 'Lorem ipsum roamen sit',
    contacts: [
      { sns: 'twitter', link: 'https://twitter.com/RikuS3n'}
    ]
  }

  mounted() {
    // @ts-ignore
    const hljs = require('highlight.js')
    // @ts-ignore
    this.markdownIt = mavonEditor.mavonEditor.getMarkdownIt()
    // @ts-ignore
    this.markdownIt.options.highlight = function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><div class="mx-8"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></div></pre>';
        } catch (__) {}
      }
      return '<pre class="hljs"><div class="mx-8"><code>' + this.markdownIt.utils.escapeHtml(str) + '</code></div></pre>';
    }
    console.log(this.markdownIt)
  }
}
</script>

<style>
.sticky {
  top: 25vh;
}
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
  @apply text-3xl mt-16 mb-4 font-bold border-b;
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
  @apply px-2 py-1 mx-6 bg-gray-100 my-4 border-l-4 border-gray-400;
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
  @apply p-1 bg-gray-300 rounded;
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