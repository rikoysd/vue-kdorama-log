<template>
  <div class="items">
    <div class="list" v-for="dorama of doramaList" v-bind:key="dorama.id">
      <div><img v-bind:src="dorama.image" /></div>
      <div>{{ dorama.name }}</div>
      <div>{{ dorama.release }}年</div>
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
          new Dorama(data[i].id, data[i].image, data[i].name, data[i].release)
        );
      }
    });
    console.log(this.doramaList);
  }
}
</script>

<style scoped>
.items {
  display: flex;
  /* 自動的に複数行になる */
  flex-wrap: wrap;
  justify-content: center;
}
.list {
  text-align: center;
}

img {
  width: 200px;
}
</style>
