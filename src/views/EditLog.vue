<template>
  <div class="whole">
    <div class="edit-log">
      <div class="error">{{ titleError }}</div>
      <div class="item">
        <div class="title">
          <label for="title">タイトル(必須)</label>
        </div>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="error">{{ textError }}</div>
      <div class="item">
        <div class="title"><label for="text">感想(必須)</label></div>
        <textarea id="text" cols="30" rows="10" v-model="text"></textarea>
      </div>
    </div>
    <div class="btn-erea">
      <button type="button" class="button" v-on:click="overWrightLog">
        上書きする
      </button>
      <button type="button" class="button" v-on:click="backLogDetail">
        戻る
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Log } from "@/types/Log";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 表示されている作品
  private currentLog = new Log(0, "", "", "");
  // 作品一覧
  private logList = new Array<Log>();
  // タイトル
  private title = "";
  // 感想
  private text = "";
  // 鑑賞日
  // private watchDate = new Date();
  // タイトルのエラー
  private titleError = "";
  // 感想のエラー
  private textError = "";
  // エラーチェック
  private errorChecker = true;

  async created(): Promise<void> {
    // idから詳細ページを表示させる
    const logId = Number(this.$route.params.id);
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ログ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.logList.push(
          new Log(data[i].id, data[i].title, data[i].text, data[i].watchDate)
        );
      }
    });
    this.currentLog = this.logList.filter((log) => log.id === logId)[0];
    console.log(this.currentLog);
    this.title = this.currentLog.title;
    this.text = this.currentLog.text;
  }

  /**
   * 鑑賞作品を更新する.
   */
  async overWrightLog(): Promise<void> {
    // エラー処理
    if (this.title === "") {
      this.titleError = "タイトルを入力してください";
      this.errorChecker = false;
    }

    if (this.text === "") {
      this.textError = "感想を入力してください";
      this.errorChecker = false;
    }

    if (this.errorChecker === false) {
      return;
    }

    // 成功の処理
    const logId = Number(this.$route.params.id);
    //データを更新する
    const docRef = await setDoc(doc(db, "ログ一覧", this.title), {
      id: logId,
      title: this.title,
      text: this.text,
    });
    console.log(docRef);
    this.$router.push("/logDetail/" + this.currentLog.id);
  }

  /**
   * 作品の詳細画面に戻る.
   */
  backLogDetail(): void {
    this.$router.push("/logDetail/" + this.currentLog.id);
  }
}
</script>

<style scoped>
@import url("/css/background.css");

.whole {
  padding-top: 60px;
}

.edit-log {
  text-align: center;
  width: 650px;
  height: auto;
  padding: 50px;
  margin-top: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.button {
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

.button:hover {
  opacity: 0.8;
}

.btn-erea {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.tab {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.title {
  margin-bottom: 8px;
  color: rgb(156, 156, 156);
  font-size: 13px;
  text-align: left;
}

.menu {
  margin: 0 15px;
}

.error {
  font-size: 10px;
  color: red;
}

.item {
  margin-bottom: 30px;
}
</style>
