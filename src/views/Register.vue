<template>
  <div>
    <div class="error">{{ titleError }}</div>
    <div>
      タイトル(必須)：
      <input type="text" v-model="title" />
    </div>
    <div class="error">{{ textError }}</div>
    <div>
      感想(必須) ：
      <textarea cols="30" rows="10" v-model="text"></textarea>
    </div>
    <button type="button" v-on:click="registerLog">登録する</button>
  </div>
</template>

<script lang="ts">
import { Log } from "@/types/Log";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
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

  /**
   * 鑑賞作品を登録する.
   */
  registerLog(): void {
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
    let logList = this.$store.getters.showLogList;
    let newId = 0;
    if (logList.length >= 1) {
      newId = logList[0].id + 1;
    }
    this.$store.commit("registerLog", {
      log: new Log(newId, this.title, this.text),
    });
    this.$router.push("/logList");
  }
}
</script>

<style scoped></style>
