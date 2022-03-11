<template>
  <div>
    <div>
      <div>タイトル：{{ currentLog.title }}</div>
      <div>感想：{{ currentLog.text }}</div>
    </div>
    <div class="button">
      <button type="button">編集する</button>
      <button type="button" v-on:click="backLogList">一覧に戻る</button>
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

  created(): void {
    // idから詳細ページを表示させる
    const logId = parseInt(this.$route.params.id);
    this.currentLog = this.$store.getters.getSearchLog(logId);
  }

  /**
   * 一覧ページに戻る.
   */
  backLogList(): void {
    this.$router.push("/logList");
  }
}
</script>

<style scoped></style>
