<template>
  <div class="container">
    <div class="profile">
      <div>画像</div>
      <div>名前</div>
    </div>
    <div class="flex">
      <button type="button" class="menu" v-on:click="register">
        <i class="small material-icons">border_color</i>作品を登録する
      </button>
      <button type="button" class="menu" v-on:click="logList">
        <i class="small material-icons">border_color</i>作品一覧
      </button>
      <button type="button" class="menu" v-on:click="searchDorama">
        <i class="small material-icons">search</i>気になるドラマを検索する
      </button>
      <button type="button" class="menu" v-on:click="myWatchList">
        <i class="small material-icons">add_box</i>マイウォッチリスト
      </button>
      <button type="button" class="menu">
        <i class="small material-icons">account_circle</i>会員情報の変更
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  register(): void {
    this.$router.push("/register");
  }

  logList(): void {
    this.$router.push("/logList");
  }

  searchDorama(): void {
    this.$router.push("/doramaList");
  }

  myWatchList(): void {
    this.$router.push("/watchList");
  }
}
</script>

<style scoped>
.container {
  width: 600px;
}

.profile {
  display: flex;
  margin: 0 auto;
  margin-bottom: 40px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.menu {
  display: flex;
  padding: 10px 20px;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 270px;
  height: 80px;
  align-items: center;
  background-color: rgba(223, 181, 194, 0.724);
  border-radius: 3px;
  border: solid 1px;
}

.menu:hover {
  opacity: 0.8;
  cursor: pointer;
}

i {
  color: rgb(154, 154, 154);
}
</style>
