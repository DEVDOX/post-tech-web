/*import md from 'markdown-it'
import prism from 'prismjs'

import "prismjs/components/prism-clike"
import "prismjs/components/prism-java"

export default ({ app }, inject) => {
  const markdownIt = new md({
    html: true,
    linkify: true,
    highlight: function (str, lang) {
      let hl

      try {
        hl = prism.highlight(str, prism.languages[lang])
      } catch (error) {
        console.error(error)
        hl = md.utils.escapeHtml(str)
      }
  
      return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`
    }
  })
  //markdownIt.use(prism)

  inject('markdownIt', markdownIt)
}*/