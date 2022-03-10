<template>
  <div>
    <div class="block" v-for="log of currentLogList" v-bind:key="log.id">
      <div>{{ log.name }}</div>
      <div>{{ log.watchDate }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 現在の記録作品一覧
  private currentLogList = [];

  created(): void {
    this.currentLogList = this.$store.state.logList;
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
