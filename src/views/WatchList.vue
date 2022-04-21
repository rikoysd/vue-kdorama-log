<template>
  <div class="whole">
    <div class="items">
      <div
        class="list"
        v-for="dorama of currentWatchList"
        v-bind:key="dorama.id"
      >
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
import db from "@/firebase";
import { Dorama } from "@/types/Dorama";
import { User } from "@/types/User";
import { collection, getDocs } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // ウォッチリスト
  private currentWatchList = new Array<Dorama>();
  // 現在のログイン中のユーザー
  private currentUser = new User(0, "", "", "", []);

  async created(): Promise<void> {
    // ウォッチリストを取得
    const listData = collection(db, "ウォッチリスト");
    getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));

      for (let i = 0; i < data.length; i++) {
        this.currentWatchList.push(
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
}
</script>

<style scoped>
@import url("/css/background.css");

.whole {
  padding: 60px 0;
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
