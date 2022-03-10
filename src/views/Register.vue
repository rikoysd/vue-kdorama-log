<template>
  <div>
    <div>
      タイトル：
      <input type="text" v-model="title" />
    </div>
    <div>
      感想：
      <textarea cols="30" rows="10" v-model="text"></textarea>
    </div>
    <div>
      鑑賞日：
      <input type="date" v-model="watchDate" />
    </div>
    <button type="button" v-on:click="registerLog">登録する</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // タイトル
  private title = "";
  // 感想
  private text = "";
  // 鑑賞日
  private watchDate = new Date();

  /**
   * 鑑賞作品を登録する.
   */
  registerLog(): void {
    this.$store.commit("register", {
      title: this.title,
      text: this.text,
      watchDate: this.watchDate,
    });
  }
}
</script>

<style scoped></style>
