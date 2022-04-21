<template>
  <div class="whole">
    <div class="position">
      <div class="container">
        <div class="register-log">
          <div v-show="showLogInfo">
            <div class="item">
              <div>
                <label for="title" class="title">タイトル(必須)</label>
              </div>
              <div class="error">{{ titleError }}</div>
              <input type="text" id="title" v-model="title" />
            </div>
            <div class="item">
              <div class="title">鑑賞日</div>
              <input type="date" v-model="watchDate" />
            </div>
            <div class="item">
              <div class="title">画像</div>
              <image-comp v-on:upload="upload"></image-comp>
            </div>
            <div class="item">
              <label for="text" class="title">感想(必須)</label>
              <div class="error">{{ textError }}</div>
              <textarea cols="50" rows="8" id="text" v-model="text"></textarea>
            </div>
            <div class="item btn-position">
              <button
                class="register-btn"
                type="button"
                v-on:click="registerLog"
              >
                登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ImageComp from "@/components/ImageComp.vue";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "@/firebase";
import "firebase/auth";
import "firebase/storage";
@Component({
  components: {
    ImageComp,
  },
})
export default class XXXComponent extends Vue {
  // タイトル
  private title = "";
  // 感想
  private text = "";
  // 画像ファイル
  private imageFile = "";
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
  // idリスト
  private idList = Array<number>();

  /**
   * アップロードした画像パスを取得.
   *
   */
  upload(file: string): void {
    //アップロードしたい画像の情報を取得
    this.imageFile = file;
    console.log(this.imageFile);
  }

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

        for (let i = 0; i < data.length; i++) {
          this.idList.push(data[i].id);
        }

        // idを採番
        logId = Math.max(...this.idList) + 1;
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
@import url("/css/background.css");
.whole {
  height: auto;
  padding: 60px 0;
}

.position {
  display: flex;
  justify-content: center;
}

.register-log {
  text-align: left;
  width: 400px;
  margin: 0 auto;
}

.btn-position {
  display: flex;
  justify-content: center;
}

.container {
  width: 600px;
  height: auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

textarea {
  height: 200px;
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

.register-btn {
  width: 150px;
  height: 40px;
  background-color: rgb(223, 153, 175);
  border: none;
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

.error {
  font-size: 13px;
  color: red;
}

.item {
  margin-bottom: 30px;
}

.text {
  margin-bottom: 20px;
}
</style>
