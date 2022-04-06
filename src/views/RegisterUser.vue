<template>
  <div>
    <form class="form">
      <div class="top-wrapper">
        <div class="container">
          <div class="row register-page">
            <div class="error">{{ errorMessage }}</div>
            <div class="row">
              <div class="error">{{ errorName }}</div>
              <div class="input-field col s12">
                <input
                  id="name"
                  type="text"
                  class="validate"
                  v-model="name"
                  required
                />
                <label for="name">名前</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorMailAddress }}</div>
              <div class="input-field col s12">
                <input
                  id="email"
                  type="email"
                  class="validate"
                  v-model="mailAddress"
                  required
                />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorPassword }}</div>
              <div class="input-field col s12">
                <input
                  id="password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="password"
                  required
                />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorPasswordConfirmation }}</div>
              <div class="input-field col s12">
                <input
                  id="confirmation_password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="passwordConfirmation"
                  required
                />
                <label for="confirmation_password">確認用パスワード</label>
              </div>
            </div>
            <div class="row register-admin-btn">
              <button class="btn" type="button" v-on:click="registerUser">
                <span>登録<i class="material-icons right">done</i></span>
              </button>
              <button type="button" v-on:click="reset" class="clear-btn">
                クリア
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 名前
  private name = "";
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private passwordConfirmation = "";
  // エラーメッセージ
  private errorMessage = "";
  // 名前のエラーメッセージ
  private errorName = "";
  // メールアドレスのエラーメッセージ
  private errorMailAddress = "";
  // パスワードのエラーメッセージ
  private errorPassword = "";
  // 確認用パスワードのエラーメッセージ
  private errorPasswordConfirmation = "";
  // フォームチェッカー
  private errorChecker = true;
  // 送信チェック
  private submitChecker = true;

  /**
   * ユーザー情報を登録する.
   */
  async registerUser(): Promise<void> {
    // エラー処理
    if (this.name === "") {
      this.errorName = "名前が入力されていません";
      this.errorChecker = false;
    }
    if (this.mailAddress === "") {
      this.errorMailAddress = "メールアドレスが入力されていません";
      this.errorChecker = false;
    }
    if (!this.mailAddress.indexOf("@")) {
      this.errorMailAddress = "メールアドレスの形式が不正です";
      this.errorChecker = false;
    }

    if (this.password === "") {
      this.errorPassword = "パスワードが入力されていません";
      this.errorChecker = false;
    }
    if (
      (this.password !== "" && this.password.length < 8) ||
      16 < this.password.length
    ) {
      this.errorPassword =
        "パスワードは８文字以上１６文字以内で設定してください";
      this.errorChecker = false;
    }
    if (this.passwordConfirmation === "") {
      this.errorPasswordConfirmation = "確認用パスワードが入力されていません";
      this.errorChecker = false;
    }
    if (this.password != this.passwordConfirmation) {
      this.errorPassword = "パスワードと確認用パスワードが不一致です";
    }

    if (this.errorChecker === false) {
      return;
    }

    // 成功の処理
    try {
      // データを取り出す（コレクションごと）
      const listData = collection(db, "ユーザー一覧");
      let userId = 0;
      await getDocs(listData).then((snapShot) => {
        const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
        // idを採番
        userId = data.length + 1;
        // メールアドレスで同じものがあれば、エラー文を出す
        for (let i = 0; i < data.length; i++) {
          if (this.mailAddress === data[i].mail) {
            this.errorMessage = "既にそのメールアドレスは登録されています";
            this.submitChecker = false;
          } else {
            this.errorMessage = "";
            this.submitChecker = true;
          }
        }
      });

      if (this.submitChecker === false) {
        return;
      }

      //データを追加する
      const docRef = await setDoc(doc(db, "ユーザー一覧", this.name), {
        id: userId,
        name: this.name,
        mail: this.mailAddress,
        password: this.password,
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    this.$router.push("/logList");
  }

  /**
   * フォームに入力された内容をリセットする.
   */
  reset(): void {
    this.name = "";
    this.mailAddress = "";
    this.passwordConfirmation = "";
    this.errorMessage = "";
    this.errorMailAddress = "";
    this.errorPassword = "";
    this.errorPasswordConfirmation = "";
  }
}
</script>

<style scoped>
.top-wrapper {
  width: 700px;
  height: auto;
  padding: 20px;
  margin-top: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 20px;
}
</style>
