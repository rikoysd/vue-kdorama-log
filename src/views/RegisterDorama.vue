<template>
  <div>
    <div class="whole">
      <div class="edit-log">
        <div class="error">{{ titleError }}</div>
        <div class="item">
          <div class="title">
            <label for="title">タイトル(必須)</label>
          </div>
          <input type="text" id="title" v-model="title" />
        </div>
        <div class="item">
          <div class="title">
            <label for="watchDate">鑑賞日</label>
          </div>
          <input type="date" id="watchDate" v-model="watchDate" />
        </div>
        <div class="item">
          <div class="title">画像</div>
          <div class="image-position">
            <img v-bind:src="require(`@/assets/${currentDorama.image}`)" />
          </div>
        </div>
        <div class="error">{{ textError }}</div>
        <div class="item">
          <div class="title"><label for="text">感想(必須)</label></div>
          <textarea id="text" cols="30" rows="10" v-model="text"></textarea>
        </div>
      </div>
      <div class="btn-erea">
        <button type="button" class="button" v-on:click="registerDorama">
          登録
        </button>
        <router-link
          tag="button"
          class="button"
          :to="'/doramaDetail/' + currentDorama.id"
          >戻る</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Dorama } from "@/types/Dorama";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // ドラマリスト
  private doramaList = new Array<Dorama>();
  // 現在表示されているドラマ
  private currentDorama = new Dorama(0, "", "", 0, "");
  // タイトル
  private title = "";
  // 鑑賞日
  private watchDate = "";
  // 感想
  private text = "";
  // タイトルのエラー
  private titleError = "";
  // 感想のエラー
  private textError = "";
  // エラーチェック
  private errorChecker = true;
  // idリスト
  private idList = Array<number>();

  async created(): Promise<void> {
    const doramaId = Number(this.$route.params.id);
    // ドラマのデータ取得
    const listData = collection(db, "ドラマ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.doramaList.push(
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

    this.currentDorama = this.doramaList.filter(
      (dorama) => dorama.id == doramaId
    )[0];

    this.title = this.currentDorama.name;
  }

  /**
   * ドラマを登録する.
   */
  async registerDorama(): Promise<void> {
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
  padding-top: 60px;
  height: auto;
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
  padding-bottom: 60px;
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
  font-size: 13px;
  color: red;
  text-align: left;
}

.item {
  margin-bottom: 30px;
}

img {
  width: 200px;
}

.image-position {
  /* 画像左寄せ */
  display: flex;
}
</style>
