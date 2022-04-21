<template>
  <div id="login" class="whole">
    <div class="top-wrapper">
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <div class="error">{{ errorMessage }}</div>
            <form class="login-form">
              <div class="row"></div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input
                    class="validate"
                    id="mailAddress"
                    type="email"
                    v-model="email"
                  />
                  <label
                    for="mailAddress"
                    data-error="wrong"
                    data-success="right"
                    >メールアドレス</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" v-model="password" />
                  <label for="password">パスワード</label>
                </div>
              </div>
              <div class="row">
                <button
                  type="button"
                  name="action"
                  class="login-btn"
                  v-on:click="loginUser"
                >
                  ログイン
                </button>
              </div>
              <div class="row">
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small">
                    <router-link to="/"
                      >管理者登録はこちら</router-link
                    >
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { User } from "@/types/User";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // エラーメッセージ
  private errorMessage = "";
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";
  // ユーザー
  private user = new User(0, "", "", "", []);
  //ユーザーリスト
  private userList = new Array<User>();

  async loginUser(): Promise<void> {
    // 成功の処理
    try {
      // データを取り出す（コレクションごと）
      const listData = collection(db, "ユーザー一覧");
      await getDocs(listData).then((snapShot) => {
        const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          this.userList.push(
            new User(
              data[i].id,
              data[i].name,
              data[i].mail,
              data[i].password,
              data[i].watchList
            )
          );
        }
      });

      console.log(this.userList);

      // エラー
      if (this.email === "" || this.password === "") {
        this.errorMessage =
          "メールアドレスまたはパスワードが入力されていません";
        return;
      }
      this.errorMessage = "";

      for (let i = 0; i < this.userList.length; i++) {
        if (this.email !== this.userList[i].mail) {
          this.errorMessage = "メールアドレスが間違っています";
        } else {
          this.user = this.userList[i];
          this.errorMessage = "";
        }
      }

      // console.log(this.user);

      if (this.password !== this.user.password) {
        this.errorMessage = "パスワードが間違っています";
        return;
      }
      this.errorMessage = "";

      //データを追加する
      await setDoc(doc(db, "ログインユーザー", this.user.name), {
        id: this.user.id,
        name: this.user.name,
        mail: this.email,
        password: this.password,
      });
      // ログイン状況をオンにする
      this.$store.commit("loginUser");
      this.$router.push("/myPage");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
</script>

<style scoped>
@import url("/css/background.css");

.container {
  width: 650px;
  height: auto;
  padding: 45px 0;
}

.error {
  margin-top: 12px;
  color: rgb(210, 53, 53);
}

.login-btn {
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
  margin-left: 20px;
}

.login-btn:hover {
  opacity: 0.8;
}
</style>
