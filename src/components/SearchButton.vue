<template>
  <div>
    <div class="search-box">
      <div>{{ errorMessage }}</div>
      <input type="text" class="search- name" v-model="searchText" />
      <button type="button" v-on:click="searchWord">検索する</button>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Dorama } from "@/types/Dorama";
import { collection, getDocs } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  private currentDoramaList = new Array<Dorama>();
  private searchText = "";
  private errorMessage = "";

  /**
   * ドラマを検索する.
   */
  async searchWord(): Promise<void> {
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ドラマ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        this.currentDoramaList.push(
          new Dorama(
            data[i].id,
            data[i].image,
            data[i].name,
            data[i].release,
            data[i].story
          )
        );
      }

      console.log("ok1");
      console.log(this.currentDoramaList);

      // エラー処理
      if (this.searchText === "") {
        console.log("ok2");
        this.errorMessage = "検索ワードが入力されていません";
      }
      this.errorMessage = "";
      for (let dorama of this.currentDoramaList) {
        if (dorama.name.includes(this.searchText)) {
          this.currentDoramaList.push(dorama);
        }
      }
      console.log("ok3");

      if (this.currentDoramaList.length === 0) {
        this.errorMessage = "該当する作品がありません";
      }
      console.log("ok4");
    });
  }
}
</script>

<style scoped>
.search-box {
  margin: 0 auto;
  width: 300px;
  margin-bottom: 30px;
}
</style>
