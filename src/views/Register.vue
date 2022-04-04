<template>
  <div class="container">
    <div class="register-log">
      <div class="tab">
        <button type="button" class="menu menu-btn" v-on:click="inputLogInfo">
          手動で入力する
        </button>
        <button type="button" class="menu menu-btn" v-on:click="serchName">
          作品を検索する
        </button>
      </div>
      <div v-show="showLogInfo">
        <div class="item">
          <div>タイトル(必須)</div>
          <div class="error">{{ titleError }}</div>
          <input type="text" v-model="title" />
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
          class="btn waves-effect waves-light pink lighten-3"
          type="button"
          name="action"
          v-on:click="registerLog"
        >
          登録する
          <i class="material-icons right">send</i>
        </button>
      </div>
      <div v-show="searchLog">
        <div>作品を検索する</div>
        <div class="text">
          <input type="text" size="30" v-model="serchWord" />
        </div>
        <div><button type="button">検索する</button></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Log } from "@/types/Log";
import { Component, Vue } from "vue-property-decorator";
import ImageComp from "@/components/ImageComp.vue";
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
  // 鑑賞日
  // private watchDate = new Date();
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
   * 「手動で入力」タブの表示
   */
  inputLogInfo(): void {
    this.showLogInfo = true;
    this.searchLog = false;
  }

  /**
   * 「作品を検索する」タブの表示
   */
  serchName(): void {
    this.searchLog = true;
    this.showLogInfo = false;
  }

  /**
   * 鑑賞作品を登録する.
   */
  registerLog(): void {
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
    let logList = this.$store.getters.showLogList;
    let newId = 0;
    if (logList.length >= 1) {
      newId = logList[0].id + 1;
    }
    this.$store.commit("registerLog", {
      log: new Log(newId, this.title, this.text),
    });
    this.$router.push("/logList");
  }
}
</script>

<style scoped>
.register-log {
  margin-top: 40px;
  text-align: center;
  width: 400px;
  margin: 0 auto;
}

.container {
  width: 650px;
  height: auto;
  padding: 50px;
  margin-top: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 20px;
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

.menu-btn {
  width: 150px;
  height: 40px;
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

.menu-btn:hover {
  opacity: 0.8;
}

.btn {
  width: 150px;
  height: 40px;
}

.btn:hover{
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
