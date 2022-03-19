<template>
  <div>
    <div class="edit-log">
      <div class="error">{{ titleError }}</div>
      <div class="item">
        <div>タイトル(必須)</div>
        <input type="text" v-model="title" />
      </div>
      <div class="error">{{ textError }}</div>
      <div class="item">
        <div>感想(必須)</div>
        <textarea cols="30" rows="10" v-model="text"></textarea>
      </div>
      <button type="button" v-on:click="overWrightLog">上書きする</button>
      <button type="button" v-on:click="backLogDetail">戻る</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Log } from "@/types/Log";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 表示されている作品
  private currentLog = new Log(0, "", "");
  // タイトル
  private title = "";
  // 感想
  private text = "";
  // 鑑賞日
  // private watchDate = new Date();
  // タイトルのエラー
  private titleError = "";
  // 感想のエラー
  private textError = "";
  // エラーチェック
  private errorChecker = true;

  created(): void {
    // idから詳細ページを表示させる
    const logId = Number(this.$route.params.id);
    this.currentLog = this.$store.getters.getSearchLog(logId);
    this.title = this.currentLog.title;
    this.text = this.currentLog.text;
  }

  /**
   * 鑑賞作品を更新する.
   */
  overWrightLog(): void {
    // エラー処理
    if (this.title === "") {
      this.titleError = "タイトルを入力してください";
      this.errorChecker = false;
    }

    if (this.text === "") {
      this.textError = "感想を入力してください";
      this.errorChecker = false;
    }

    if (this.errorChecker === false) {
      return;
    }

    // 成功の処理
    const logId = Number(this.$route.params.id);
    this.$store.commit("overWrightLog", {
      log: new Log(logId, this.title, this.text),
    });

    this.$router.push("/logDetail/" + this.currentLog.id);
  }

  /**
   * 作品の詳細画面に戻る.
   */
  backLogDetail(): void {
    this.$router.push("/logDetail/" + this.currentLog.id);
  }
}
</script>

<style scoped>
.edit-log {
  margin-top: 90px;
  text-align: center;
}

.tab {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.menu {
  margin: 0 15px;
}

.error {
  font-size: 10px;
  color: red;
}

.item {
  margin-bottom: 30px;
}
</style>
