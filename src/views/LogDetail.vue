<template>
  <div>
    <button type="button">編集する</button>
    <button type="button" v-on:click="backLogList">一覧に戻る</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  /**
   * 一覧ページに戻る.
   */
  backLogList(): void {
    this.$router.push("/logList");
  }
}
</script>

<style scoped></style>
