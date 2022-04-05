<template>
  <div>
    <header>
      <div class="navi">
        <div>
          <router-link to="/" class="menu">登録</router-link>
          <router-link to="/logList" class="menu">一覧</router-link>
          <!-- <router-link to="/login">ログイン</router-link> -->
          <router-link to="/doramaList" class="menu">ドラマ一覧</router-link>
          <router-link to="/watchList" class="menu">ウォッチリスト</router-link>
        </div>
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
  height: 80px;
  line-height: 60px;
  margin-bottom: 10px;
}

.menu {
  margin: 0 15px;
}
</style>
