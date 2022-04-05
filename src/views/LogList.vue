<template>
  <div class="loglist">
    <div>{{ errorMessage }}</div>
    <div v-show="canShow">
      <div class="item" v-for="log of currentLogList" v-bind:key="log.id">
        <div class="title">{{ log.title }}</div>
        <div class="button-list">
          <router-link
            tag="button"
            class="button"
            v-bind:to="'/editLog/' + log.id"
            >編集する</router-link
          >
          <router-link
            tag="button"
            class="button"
            v-bind:to="'/logDetail/' + log.id"
            >詳細を見る</router-link
          >
          <button type="button" class="button btn-color">
            削除する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Log } from "@/types/Log";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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
    });

    // if (this.currentLogList.length === 0) {
    //   this.canShow = false;
    //   this.errorMessage = "鑑賞した作品がありません";
    // }
  }

  /**
   * ログを削除する.
   */
  deleteLog(): void {
  //データを削除する
    deleteDoc(doc(db, "ログ一覧", "testDoc1"));
  }
}
</script>

<style scoped>
.loglist {
  margin-top: 100px;
  text-align: center;
}

.item {
  width: 500px;
  height: 80px;
  padding: 10px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.title {
  margin-top: 3px;
}

.button-list {
  margin-top: 10px;
}

.button {
  width: 100px;
  height: 25px;
  margin-left: 10px;
  background-color: #f48fb1;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 13px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.3s;
  cursor: pointer;
}

.button:hover {
  opacity: 0.8;
}

.btn-color {
  background-color: rgb(173, 173, 173);
}
</style>
