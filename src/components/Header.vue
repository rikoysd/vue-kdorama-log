<template>
  <div>
    <header>
      <div class="navi">
        <div>
          <router-link to="/" class="menu">TOP</router-link>
          <router-link to="/register" class="menu">登録</router-link>
          <router-link to="/logList" class="menu">一覧</router-link>
          <!-- <router-link to="/login">ログイン</router-link> -->
          <router-link to="/doramaList" class="menu">ドラマ一覧</router-link>
          <router-link to="/watchList" class="menu">ウォッチリスト</router-link>
          <router-link to="/login" class="menu">ログイン</router-link>
          <router-link to="/logout" class="menu">ログアウト</router-link>
          <router-link to="/registerUser" class="menu">新規登録</router-link>
          <router-link to="/myPage" class="menu">マイページ</router-link>
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
