import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class BlockUnloadMixin extends Vue {
  // 表示するメッセージ
  protected blockUnloadMessage = this.$root.$tc('areYouSure')
  // アラートを出すかのフラグ
  protected isBlockUnload: boolean = false

  // ****************************
  // * ページを閉じるときの処理: beforeunloadイベント
  // ****************************
  created() {
    if (process.client) {
      // 作成時にイベントリスナーに登録
      window.addEventListener("beforeunload", this.checkWindow);
    }
  }

  beforeDestroy() {
    // 破棄される前にイベントリスナーから削除
    window.removeEventListener("beforeunload", this.checkWindow);
  }

  // 実際の処理
  protected checkWindow(event: BeforeUnloadEvent) {
    if (!!this.isBlockUnload) {
      // unloadをキャンセルして、メッセージを表示
      event.preventDefault();
      event.returnValue = this.blockUnloadMessage;
    }
  }

  // ****************************
  // * ページを移動するときの処理: v-router
  // ****************************
  // @ts-ignore
  beforeRouteLeave(to, from, next) {
    if (!!this.isBlockUnload) {
      // アラートダイアログを表示して、結果に応じて遷移
      const msg = this.blockUnloadMessage;
      const answer = window.confirm(msg);
      next(answer);
    } else {
      // next()は必ず呼び出さないといけない
      next();
    }
  }
}