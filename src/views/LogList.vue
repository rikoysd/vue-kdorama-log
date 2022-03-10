<template>
  <div>
    <div>{{ errorMessage }}</div>
    <div
      class="block"
      v-for="log of currentLogList"
      v-bind:key="log.id"
      v-show="canShow"
    >
      <div>{{ log.name }}</div>
      <div>{{ log.formatWatchDate }}</div>
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
      this.canShow = false;
      this.errorMessage = "鑑賞した作品がありません";
      return;
    }
  }
}
</script>

<style scoped>
.block {
  display: flex;
  border: 2px solid;
  padding: 20px 50px;
  width: 300px;
  justify-content: space-between;
}
</style>
