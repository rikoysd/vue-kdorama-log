<template>
  <div>
    <div class="register-log">
      <div class="tab">
        <button type="button" class="menu" v-on:click="inputLogInfo">
          手動で入力する
        </button>
        <button type="button" class="menu" v-on:click="serchName">
          作品を検索する
        </button>
      </div>
      <div v-show="showLogInfo">
        <div class="error">{{ titleError }}</div>
        <div class="item">
          <div>タイトル(必須)</div>
          <input type="text" v-model="title" />
        </div>
        <div>
          <Image></Image>
        </div>
        <div class="error">{{ textError }}</div>
        <div class="item">
          <div>感想(必須)</div>
          <textarea cols="30" rows="10" v-model="text"></textarea>
        </div>
        <button type="button" v-on:click="registerLog">登録する</button>
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
import Image from "./Image.vue";
@Component
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

  async created(): Promise<void> {
    await this.$store.dispatch("asyncGetDoramaList");
  }
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
  margin-top: 90px;
  text-align: center;
}

.tab {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
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

.text {
  margin-bottom: 20px;
}
</style>
