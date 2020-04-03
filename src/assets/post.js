const content = `

# ここから内容 :)

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
mounted() {
  window.addEventListener('keydown', this.handler)
  const _this = this

  this.$root.$on('loginWithGithub', async function() {
    await _this.loginWithGithub()
  })
}

async loginWithGithub() {
  await this.$auth.loginWith('github')
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
`;

export default content;