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
      <button type="button" v-on:click="registerLog">登録する</button>
      <button type="button">戻る</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
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
