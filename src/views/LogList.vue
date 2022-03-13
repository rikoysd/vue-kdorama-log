<template>
  <div class="loglist">
    <div>{{ errorMessage }}</div>
    <div v-show="canShow">
      <div v-for="log of currentLogList" v-bind:key="log.id">
        <div>{{ log.title }}</div>
        <div class="button">
          <button>編集する</button>
          <router-link v-bind:to="'/logDetail/' + log.id"
            >詳細を見る</router-link
          >
        </div>
        <hr />
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
      this.canShow = false;
      this.errorMessage = "鑑賞した作品がありません";
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
.loglist {
  margin-top: 100px;
  text-align: center;
}
</style>
