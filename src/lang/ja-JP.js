export default {
  like: 'いいね',
  article: '記事',
  preview: 'プレビュー',
  areYouSure: '本当にページから移動しても良いですか？',
  myPosts: '自分の記事',
  likedPosts: 'いいねした記事',
  redirecting: 'リダイレクト中...',

  error: {
    invalid: '原因不明のエラーが起きました。管理人にコンタクトを行ってください。',
    404: '指定されたページが見つかりませんでした。'
  },

  user: {
    login: 'ログイン',
    loginWith: 'Login with ',
    logout: 'ログアウト',
    follow: 'フォロー',
    follower: 'フォロワー',
  },
  
  post: {
    title: 'タイトル',
    titlePlaceholder: 'タイトルを入力',
    tags: 'タグ',
    tagsPlaceholder: 'タグを追加',
    state: {
      published: '公開',
      private: '非公開',
      draft: '下書き',
    },
    successful: {
      created: '記事を公開しました！',
      updated: '記事を更新しました！',
    },
    failed: {
      title: 'タイトルは必須です。',
      body: '本文は必須です。'
    },
    edit: '編集する',
    save: '保存',
    publish: '投稿する',
    update: '更新する',
    tagsWarn: 'タグは、小文字のアルファベットもしくは数字のみ使用できます。',
  },

  header: {
    search: '探す',
    newPost: '投稿する',
    settings: '設定',
    myPage: 'マイページ',
  },

  options: {
    enable: '有効にする',
    save: '保存',
    profile: 'プロフィール',
    account: 'アカウント',
    preference: '基本設定',
    uniqueName: 'ユーザーネーム',
    uniqueNameWarn: 'ユーザーネームは、小文字のアルファベットと数字、ハイフン、アンダースコアのみで、最低でも5文字以上でなければなりません。',
    displayName: '表示名',
    tagline: '一言コメント',
    webSiteUrl: 'サイト/ブログのURL',
    location: '居住地',
    email: 'メールアドレス',
    link: '連携する',
    linked: '連携済み',
    showLike: 'いいねした記事の可視化',
    showLikeDescription: '自分がいいねした記事を他のユーザーに見えるようにするか',
    language: '言語',
  },

  validation: {
    uniqueName: '条件に従ったユーザーネームを入力してください。',
    required: 'このフィールドは必須です。',
    email: '{_value_}はメールアドレスの形式にあっていません。',
    url: 'このフィールドはhttp://もしくはhttps://が必要です。',
    max: '{_value_}は長すぎます。{length}文字以下にしてください。',
    min: '{_value_}は短すぎます。{length}文字以上にしてください。',
  },

  infinite: {
    noResults: {
      index: '記事を増やしましょう！',
      myPost: 'もっと他の記事も書いてみましょう！',
      likes: '他の記事にもいいねをつけてみましょう！',
    },
  },
}