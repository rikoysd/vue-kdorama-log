<template>
  <div class="loglist">
    <div>{{ errorMessage }}</div>
    <div v-show="canShow">
      <hr />
      <div v-for="log of currentLogList" v-bind:key="log.id">
        <div>{{ log.title }}</div>
        <div class="button">
          <router-link tag="button" v-bind:to="'/editLog/' + log.id"
            >編集する</router-link
          >
          <router-link tag="button" v-bind:to="'/logDetail/' + log.id"
            >詳細を見る</router-link
          >
        </div>
        <hr />
        <div class="comment" v-show="showText">{{ log.text }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Log } from "@/types/Log";
import { collection, getDocs } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 現在の記録作品一覧
  private currentLogList = Array<Log>();
  // エラーメッセージ
  private errorMessage = "";
  // 一覧を表示・非表示
  private canShow = true;
  // 感想を表示・非表示
  private showText = false;

  async created(): Promise<void> {
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ログ一覧");
    getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        this.currentLogList.push(
          new Log(data[i].id, data[i].title, data[i].text)
        );
      }
      console.log(this.currentLogList);
    });

    // if (this.currentLogList.length === 0) {
    //   this.canShow = false;
    //   this.errorMessage = "鑑賞した作品がありません";
    // }
  }

  showDetail(): void {
    if (this.showText === false) {
      this.showText = true;
    } else {
      this.showText = false;
    }
  }
}
</script>

<style scoped>
.loglist {
  margin-top: 100px;
  text-align: center;
}
</style>
