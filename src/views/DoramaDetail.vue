<template>
  <div class="whole">
    <div class="container">
      <div><img v-bind:src="require(`@/assets/${dorama.image}`)" /></div>
      <div>
        <div class="title">{{ dorama.name }}({{ dorama.release }})</div>
        <!-- <div>★評価</div> -->
        <div>
          <button
            type="button"
            class="button"
            v-on:click="addList"
            v-if="watchList"
          >
            観たいリストに追加する
          </button>
          <button type="button" class="button" v-on:click="addList" v-else>
            観たいリストから外す
          </button>
          <router-link
            tag="button"
            class="button"
            :to="'/registerDorama/' + dorama.id"
            v-if="canRegister"
            >観た</router-link
          >
          <router-link
            tag="button"
            class="button btn-large disabled btn-position"
            :to="'/registerDorama/' + dorama.id"
            v-else
          >
            <div>登録済</div>
          </router-link>
        </div>
        <div class="story">{{ dorama.story }}</div>
      </div>
    </div>
    <div class="position">
      <button class="back-btn" type="button" v-on:click="backToDoramaList">
        一覧に戻る
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Dorama } from "@/types/Dorama";
import { Log } from "@/types/Log";
import { User } from "@/types/User";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 表示されているドラマ作品
  private dorama = new Dorama(0, "", "", 0, "");
  // ドラマリスト
  private doramaList = new Array<Dorama>();
  // ログイン状況
  private currentIsLogin = true;
  // 現在のログイン中のユーザー
  private currentUser = new User(0, "", "", "", []);
  // 観たボタンの非押下
  private canRegister = true;
  // 作品一覧
  private logList = new Array<Log>();
  // ウォッチリスト追加ボタン切り替え
  private watchList = true;
  // ウォッチリスト
  private currentWatchList = new Array<Dorama>();

  async created(): Promise<void> {
    const doramaId = Number(this.$route.params.id);
    // データを取り出す（コレクションごと）
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

    this.dorama = this.doramaList.filter((dorama) => dorama.id == doramaId)[0];

    const watchList = collection(db, "ウォッチリスト");
    await getDocs(watchList).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.currentWatchList.push(
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

    if (
      this.currentWatchList.filter(
        (dorama) => dorama.name === this.dorama.name
      )[0]
    ) {
      this.watchList = false;
    }

    const logList = collection(db, "ログ一覧");
    await getDocs(logList).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.logList.push(
          new Log(data[i].id, data[i].title, data[i].text, data[i].date)
        );
      }
    });

    if (this.logList.filter((log) => log.title === this.dorama.name)[0]) {
      this.canRegister = false;
    }
  }

  async addList(): Promise<void> {
    const { id, image, name, release, story } = this.dorama;

    // ウォッチリストに追加する場合
    if (this.watchList === true) {
      try {
        // ドキュメントを更新する
        await setDoc(doc(db, "ウォッチリスト", name), {
          id: id,
          image: image,
          name: name,
          release: release,
          story: story,
        });
        this.watchList = false;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      return;
    }

    // ウォッチリストから削除する場合
    await deleteDoc(
      doc(db, this.currentUser.name + "のウォッチリスト", this.dorama.name)
    );
    this.watchList = true;
  }

  /**
   * ドラマ一覧に戻る.
   */
  backToDoramaList(): void {
    this.$router.push("/doramaList");
  }

  /**
   * 観たドラマを記録する.
   */
  watchedDorama(): void {
    this.$router.push("'/registerDorama/' + this.dorama.id");
  }
}
</script>

<style scoped>
@import url("/css/background.css");
.whole {
  height: auto;
  padding-bottom: 40px;
}

.container {
  display: flex;
  width: 800px;
  padding: 60px 0;
}

img {
  width: 300px;
  margin-right: 30px;
}

.title {
  font-size: 30px;
  margin-top: 20px;
}

.story {
  margin-top: 25px;
}

.back-btn {
  width: 200px;
  height: 40px;
  margin-top: 10px;
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

.back-btn:hover {
  opacity: 0.8;
}

.button {
  width: 200px;
  height: 50px;
  margin-top: 10px;
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

.btn-position {
  margin-bottom: 12px;
}

.position {
  text-align: center;
  margin-top: 30px;
}
</style>
