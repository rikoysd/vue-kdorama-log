<template>
  <div>
    <header>
      <div class="navi">
        <router-link to="/" class="menu">登録</router-link>
        <router-link to="/logList" class="menu">一覧</router-link>
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

<style scoped>
.navi {
  text-align: center;
  padding: 20px;
}

.menu {
  margin: 0 15px;
}
</style>
