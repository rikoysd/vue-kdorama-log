<template>
  <div class="position">
    <div class="container">
      <div class="register-log">
        <div v-show="showLogInfo">
          <div class="item">
            <div>タイトル(必須)</div>
            <div class="error">{{ titleError }}</div>
            <input type="text" v-model="title" />
          </div>
          <div class="item">
            <div>鑑賞日</div>
            <input type="date" v-model="watchDate" />
          </div>
          <div class="item">
            <div>画像</div>
            <image-comp></image-comp>
          </div>
          <div class="item">
            <div>感想(必須)</div>
            <div class="error">{{ textError }}</div>
            <textarea cols="30" rows="10" v-model="text"></textarea>
          </div>
          <button
            class="btn waves-effect waves-light register-btn"
            type="button"
            name="action"
            v-on:click="registerLog"
          >
            登録する
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
    <div>
      <log-list></log-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ImageComp from "@/components/ImageComp.vue";
import LogList from "@/components/LogList.vue";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "@/firebase";
@Component({
  components: {
    ImageComp,
    LogList,
  },
})
export default class XXXComponent extends Vue {
  // タイトル
  private title = "";
  // 感想
  private text = "";
  // 鑑賞日
  private watchDate = "";
  // タイトルのエラー
  private titleError = "";
  // 感想のエラー
  private textError = "";
  // エラーチェック
  private errorChecker = true;
  // 「手動で入力」タブの表示・非表示
  private showLogInfo = true;
  // 「作品を検索する」タブの表示・非表示
  private searchLog = false;
  // 検索ワード
  private serchWord = "";

  /**
   * 鑑賞作品を登録する.
   */
  async registerLog(): Promise<void> {
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
    try {
      // データを取り出す（コレクションごと）
      const listData = collection(db, "ログ一覧");
      let logId = 0;
      await getDocs(listData).then((snapShot) => {
        const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
        // idを採番
        logId = data.length + 1;
      });
      //データを追加する
      const docRef = await setDoc(doc(db, "ログ一覧", this.title), {
        id: logId,
        title: this.title,
        text: this.text,
        date: this.watchDate,
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    this.$router.push("/logList");
  }
}
</script>

<style scoped>
.position {
  display: flex;
  justify-content: center;
  width: 1200px;
}

.register-log {
  margin-top: 40px;
  text-align: center;
  width: 400px;
  margin: 0 auto;
}

.container {
  width: 600px;
  height: auto;
  padding: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

textarea {
  height: 200px;
}

.tab {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.menu {
  margin: 0 15px;
}

.register-btn {
  width: 150px;
  height: 40px;
  background-color: rgb(223, 153, 175);
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 13px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.3s;
  cursor: pointer;
}

.register-btn:hover {
  opacity: 0.8;
}

.btn {
  width: 150px;
  height: 40px;
}

.btn:hover {
  opacity: 0.8;
}

.error {
  font-size: 10px;
  color: red;
}

.item {
  margin-bottom: 30px;
}

.text {
  margin-bottom: 20px;
}
</style>
