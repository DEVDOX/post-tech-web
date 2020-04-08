export default {
  like: 'いいね',
  article: '記事',
  preview: 'プレビュー',
  areYouSure: '本当にページから移動しても良いですか？',
  myPosts: '自分の記事',
  likedPosts: 'いいねした記事',
  error: '原因不明のエラーが起きました。管理人にコンタクトを行ってください。',

  user: {
    login: 'ログイン',
    loginWith: 'Login with ',
    logout: 'ログアウト',
    follow: 'フォロー',
    follower: 'フォロワー',
  },
  
  post: {
    title: 'タイトル',
    tags: 'タグ',
    state: {
      published: '公開',
      private: '非公開',
      draft: '下書き',
    },
    successful: '記事を公開しました！',
    failed: {
      title: 'タイトルは必須です。',
      body: '本文は必須です。'
    },
  },

  newPost: {
    publish: '投稿する',
    save: '保存',
    tagsWarn: 'タグは、小文字のアルファベットもしくは数字のみ使用できます。',
  },

  header: {
    search: '探す',
    newPost: '投稿する',
    settings: '設定',
    myPage: 'マイページ',
  },

  options: {
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
}