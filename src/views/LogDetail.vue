<template>
  <div class="whole">
    <div class="container">
      <div>
        <div class="item">
          <div class="title">タイトル</div>
          <div>{{ currentLog.title }}</div>
        </div>
        <div class="item item-position">
          <div class="title">鑑賞日</div>
          <div>{{ currentLog.watchDate }}</div>
        </div>
        <div class="item item-position">
          <div class="title">感想</div>
          <div>{{ currentLog.text }}</div>
        </div>
      </div>
    </div>
    <div class="button-erea">
      <div class="button">
        <button type="button" class="btn" v-on:click="editLog">編集する</button>
      </div>
      <div class="button">
        <button type="button" class="btn" v-on:click="backLogList">
          一覧に戻る
        </button>
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
  // 表示されている作品
  private currentLog = new Log(0, "", "", "");
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
          new Log(data[i].id, data[i].title, data[i].text, data[i].date)
        );
      }
    });

    console.log(this.currentLogList);

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
@import url("/css/background.css");

.whole {
  padding-top: 60px;
}

.button {
  margin-top: 60px;
}

.button-erea {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  width: 150px;
  height: 40px;
  margin-left: 10px;
  background-color: rgb(223, 153, 175);
  border: none;
  color: white;
  font-size: 13px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.3s;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.8;
}

.container {
  width: 650px;
  height: auto;
  padding: 30px 50px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.item-position {
  margin-top: 25px;
}

.title {
  margin-bottom: 8px;
  color: rgb(156, 156, 156);
  font-size: 13px;
}
</style>
