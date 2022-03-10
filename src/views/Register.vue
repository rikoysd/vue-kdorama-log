<template>
  <div>
    <div>
      タイトル：
      <input type="text" />
    </div>
    <div>
      感想：
      <textarea cols="30" rows="10"></textarea>
    </div>
    <div>
      鑑賞日：
      <input type="date" />
    </div>
    <button type="button">登録する</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped></style>
