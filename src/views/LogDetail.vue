<template>
  <div class="log-detail">
    <div>
      <div>タイトル：{{ currentLog.title }}</div>
      <div>感想：{{ currentLog.text }}</div>
    </div>
    <div class="button">
      <button type="button" v-on:click="editLog">編集する</button>
      <button type="button" v-on:click="backLogList">一覧に戻る</button>
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
  // 表示されている作品
  private currentLog = new Log(0, "", "");
  // ログ一覧
  private currentLogList = Array<Log>();

  async created(): Promise<void> {
    // idから詳細ページを表示させる
    const logId = Number(this.$route.params.id);
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ログ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.currentLogList.push(
          new Log(data[i].id, data[i].title, data[i].text)
        );
      }
    });

    this.currentLog = this.currentLogList.filter((log) => log.id == logId)[0];
  }

  /**
   * 編集ページに遷移する.
   */
  editLog(): void {
    this.$router.push("/editLog/" + this.currentLog.id);
  }

  /**
   * 一覧ページに戻る.
   */
  backLogList(): void {
    this.$router.push("/logList");
  }
}
</script>

<style scoped>
.log-detail {
  margin-top: 100px;
  text-align: center;
}
</style>
