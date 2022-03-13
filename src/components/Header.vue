<template>
  <div>
    <header>
      <div class="navi">
        <router-link to="/register">登録</router-link>
        <router-link to="/logList">一覧</router-link>
        <!-- <router-link to="/login">ログイン</router-link> -->
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped></style>
