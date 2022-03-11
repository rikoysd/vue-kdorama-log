<template>
  <div>
    <div>{{ errorMessage }}</div>
    <div class="block" v-show="canShow">
      <div class="content" v-for="log of currentLogList" v-bind:key="log.id">
        <div>{{ log.name }}</div>
        <div>{{ log.formatWatchDate }}</div>
      </div>
      <div class="button">
        <button>編集する</button>
        <button v-on:click="clickDetail">詳細を見る</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Log } from "@/types/Log";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 現在の記録作品一覧
  private currentLogList = Array<Log>();
  // エラーメッセージ
  private errorMessage = "";
  // 一覧を表示・非表示
  private canShow = true;

  created(): void {
    this.currentLogList = this.$store.getters.showLogList;
    if (this.currentLogList.length === 0) {
      this.errorMessage = "鑑賞した作品がありません";
      this.canShow = false;
      return;
    }
  }

  /**
   * 記録作品の詳細ページに遷移する.
   */
  clickDetail(): void {
    this.$router.push("/logDetail");
  }
}
</script>

<style scoped>
.block {
  border: 2px solid;
  padding: 20px 50px;
  width: 300px;
}

.content {
  display: flex;
  justify-content: space-between;
}

.button {
  margin-top: 20px;
}
</style>
