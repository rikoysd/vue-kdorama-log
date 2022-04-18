<template>
  <div class="block">
    <div class="search-box col s12">
      <div>
        <div>{{ searchError }}</div>
        <div class="search">
          <div class="input-field col s6">
            <input
              placeholder="タイトルで検索"
              id="first_name"
              type="text"
              v-model="searchWord"
              class="validate"
            />
          </div>
          <div>
            <button type="button" class="search-btn" v-on:click="searchTitle">
              検索
            </button>
          </div>
        </div>
        <div>
          <select
            name="sort"
            id="sort"
            v-model="sorting"
            v-on:change="sortByUser"
          >
            <option value="latestDate">登録が新しい順</option>
            <option value="oldestDate">登録が古い順</option>
            <option value="name">五十音順</option>
          </select>
        </div>
      </div>
    </div>
    <div>{{ searchResultError }}</div>
    <div class="btn-position">
      <button type="button" class="register-btn" v-on:click="registerLog">
        新規登録
      </button>
      <button type="button" v-on:click="onClick" class="delete-btn btn-color">
        削除
      </button>
    </div>
    <div>
      <!-- <div>{{ errorMessage }}</div>
      <div class="item dir" v-show="showDir">フォルダを作成する</div> -->
      <div v-show="canShow" class="loglist">
        <div
          class="item"
          v-for="(log, index) of currentLogList"
          v-bind:key="log.id"
        >
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
            <button
              type="button"
              class="button btn-color"
              v-on:click="deleteLog(index)"
              v-show="showDeleteButton"
            >
              削除する
            </button>
          </div>
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
  // 並び替え
  private sorting = "latestDate";
  // 削除ボタンの表示・非表示
  private showDeleteButton = false;
  // フォルダの表示・非表示
  private showDir = true;
  // 検索ワード
  private searchWord = "";
  // 検索エラー
  private searchError = "";
  // 検索結果エラー
  private searchResultError = "";

  async created(): Promise<void> {
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ログ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        this.currentLogList.push(
          new Log(data[i].id, data[i].title, data[i].text, data[i].watchDate)
        );
        this.$store.commit("showLogList", {
          id: data[i].id,
          title: data[i].title,
          text: data[i].text,
          watchDate: data[i].watchDate,
        });
      }

      // 降順（新しい順）に並べる
      if (this.sorting === "latestDate") {
        this.currentLogList.sort((before, after) => {
          return before.id < after.id ? 1 : -1;
        });
      }
    });

    if (this.currentLogList.length === 0) {
      this.showDir = false;
      this.canShow = false;
      this.errorMessage = "鑑賞した作品がありません";
      return;
    }
  }

  /**
   * 削除ボタンを表示させる.
   */
  onClick(): void {
    if (this.showDeleteButton === false) {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  /**
   * 検索する.
   */
  async searchTitle(): Promise<void> {
    // ログリストを空にする
    this.currentLogList.splice(0, this.currentLogList.length);
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ログ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        this.currentLogList.push(
          new Log(data[i].id, data[i].title, data[i].text, data[i].watchDate)
        );
        this.$store.commit("showLogList", {
          id: data[i].id,
          title: data[i].title,
          text: data[i].text,
          watchDate: data[i].watchDate,
        });
      }
    });
    console.log(this.currentLogList);

    if (this.searchWord === "") {
      this.searchError = "検索ワードを入力してください";
      return;
    }
    this.searchError = "";

    // ログの名前を部分一致検索
    let logArray = this.currentLogList.splice(0, this.currentLogList.length);
    // ループ回数を定義
    let loopBreakCount = logArray.length - 1;
    for (let i = 0; i < logArray.length; i++) {
      if (logArray[i].title.includes(this.searchWord) === true) {
        this.currentLogList.push(logArray[i]);
        console.log("OK");
      } else {
        console.log("NG");
      }

      // ループ回数になったらループ終了
      if (i === loopBreakCount) {
        break;
      }
    }
    if (this.currentLogList.length === 0) {
      this.searchResultError = "該当する作品がありません";
    } else {
      this.searchResultError = "";
    }
  }

  /**
   * ログを削除する.
   */
  deleteLog(index: number): void {
    //データを削除する
    alert("本当にこのログを削除しますか？");
    deleteDoc(doc(db, "ログ一覧", ""));
  }

  /**
   * ログを並び替える.
   */
  sortByUser(): void {
    // 登録降順（新しい順）
    if (this.sorting === "latestDate") {
      this.currentLogList.sort((before, after) => {
        return before.id < after.id ? 1 : -1;
      });
    }

    // 登録昇順（古い順）
    if (this.sorting === "oldestDate") {
      this.currentLogList.sort((before, after) => {
        return before.id > after.id ? 1 : -1;
      });
    }

    // 五十音順
    if (this.sorting === "name") {
      this.currentLogList.sort((before, after) => {
        return before.title.localeCompare(after.title, "ja");
      });
    }
  }

  /**
   * ログを登録する.
   */
  registerLog(): void {
    this.$router.push("/register");
  }
}
</script>

<style scoped>
.block {
  background-color: rgb(239, 222, 229);
}

.loglist {
  margin-top: 50px;
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

.dir {
  display: flex;
  justify-content: center;
  align-items: center;
  border: dotted rgb(185, 185, 185);
  color: rgb(156, 156, 156);
  background-color: rgb(239, 222, 229);
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

.button:hover {
  opacity: 0.8;
}

.register-btn {
  width: 150px;
  height: 25px;
  background-color: rgb(226, 136, 165);
  border: none;
  color: white;
  font-size: 13px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.3s;
  cursor: pointer;
}

.delete-btn {
  width: 150px;
  height: 25px;
  margin-left: 10px;
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

.delete-btn:hover {
  opacity: 0.8;
}

.btn-color {
  background-color: rgb(222, 97, 97);
}

.btn-position {
  text-align: center;
  margin: 20px 0;
}

.search-box {
  display: flex;
  justify-content: center;
}

.search-btn {
  margin-left: 5px;
  width: 80px;
  height: 30px;
  background-color: rgb(226, 136, 165);
  border: none;
  color: white;
  font-size: 13px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.3s;
  cursor: pointer;
}

.search-btn:hover {
  opacity: 0.7;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
}

select {
  width: 300px;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
