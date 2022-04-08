<template>
  <div class="items">
    <div class="list" v-for="dorama of currentWatchList" v-bind:key="dorama.id">
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
    const loginUser = collection(db, "ログインユーザー");
    await getDocs(loginUser).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));

      if (data.length === 0) {
        this.$router.push("/login");
        return;
      }

      this.currentUser = new User(
        data[0].id,
        data[0].name,
        data[0].mail,
        data[0].password,
        data[0].watchList
      );
    });

    // ログインユーザーのウォッチリストを取得
    const listData = collection(db, this.currentUser.name + "のウォッチリスト");
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

<style scoped></style>
