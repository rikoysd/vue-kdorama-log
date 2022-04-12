<template>
  <div>
    <div class="search-box">
      <div>{{ errorMessage }}</div>
      <input type="text" class="search- name" v-model="searchText" />
      <button type="button" v-on:click="searchDorama">検索する</button>
    </div>
    <div class="items">
      <div class="list" v-for="dorama of doramaList" v-bind:key="dorama.id">
        <div>
          <router-link v-bind:to="'/doramaDetail/' + dorama.id"
            ><img v-bind:src="require(`@/assets/${dorama.image}`)"
          /></router-link>
        </div>
        <router-link v-bind:to="'/doramaDetail/' + dorama.id">{{
          dorama.name
        }}</router-link>
        <div>{{ dorama.release }}年</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import db from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { Dorama } from "@/types/Dorama";

@Component
export default class XXXComponent extends Vue {
  // private dorama = new Dorama(0, "", "", 0);
  private doramaList = new Array<Dorama>();
  private searchText = "";
  private errorMessage = "";

  created(): void {
    //データを取り出す(1つ取得)
    /* onSnapshot(doc(db, "ドラマ一覧", "トッケビ"), (doc) => {
      this.dorama.id = { ...doc.data() }.id;
      this.dorama.name = { ...doc.data() }.name;
      this.dorama.release = { ...doc.data() }.release;
      this.dorama.image = { ...doc.data() }.image;
    });
    console.log(this.dorama);
    **/

    // データを取り出す（コレクションごと）
    const listData = collection(db, "ドラマ一覧");
    getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        this.doramaList.push(
          new Dorama(
            data[i].id,
            data[i].image,
            data[i].name,
            data[i].release,
            data[i].story
          )
        );
      }
    });
  }

  /**
   * ドラマを検索する.
   */
  searchDorama(): void {
    console.log("ok");

    // エラー処理
    if (this.searchText === "") {
      this.errorMessage = "検索ワードが入力されていません";
    }
    this.errorMessage = "";
    for (let dorama of this.doramaList) {
      if (dorama.name.includes(this.searchText)) {
        this.doramaList.push(dorama);
      }
    }

    if (this.doramaList.length === 0) {
      this.errorMessage = "該当する作品がありません";
    }
  }
}
</script>

<style scoped>
.search-box {
  margin: 0 auto;
  width: 300px;
  margin-bottom: 30px;
}

.items {
  display: flex;
  /* 自動的に複数行になる */
  flex-wrap: wrap;
  justify-content: center;
}

.list {
  text-align: center;
  margin-left: 20px;
  margin-bottom: 20px;
}

img {
  width: 200px;
  height: 300px;
  /* 各画像の高さを統一 */
  object-fit: cover;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  /* ホバー時にふわっと浮き出る */
  position: relative;
  top: 0;
  display: inline-block;
  transition: all 0.3s;
}

img:hover {
  opacity: 0.8;
  top: -3px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
}
</style>
