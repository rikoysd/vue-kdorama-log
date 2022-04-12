<template>
  <div>
    <div class="container">
      <div><img v-bind:src="require(`@/assets/${dorama.image}`)" /></div>
      <div>
        <div class="title">{{ dorama.name }}({{ dorama.release }})</div>
        <div>★評価</div>
        <div>
          <button
            type="button"
            class="button"
            v-on:click="addList"
            v-bind:disabled="canClick"
          >
            {{ addMessage }}
          </button>
          <button type="button" class="button">見た</button>
        </div>
        <div class="story">{{ dorama.story }}</div>
      </div>
    </div>
    <div class="position">
      <button class="button" type="button" v-on:click="backToDoramaList">
        一覧に戻る
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Dorama } from "@/types/Dorama";
import { User } from "@/types/User";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
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
  // ウォッチリスト追加のメッセージ
  private addMessage = "見たいリストに追加する";

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
  }

  async addList(): Promise<void> {
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ログインユーザー");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));

      if (data.length === 0) {
        this.$router.push("/login");
        return;
      }

      this.currentUser = new User(
        data[0].id,
        data[0].name,
        data[0].mail,
        data[0].password,
        data[0].watchList
      );
    });

    const { id, image, name, release, story } = this.dorama;

    try {
      // ドキュメントを更新する
      await setDoc(doc(db, this.currentUser.name + "のウォッチリスト", name), {
        id: id,
        image: image,
        name: name,
        release: release,
        story: story,
      });
      this.addMessage = "リストに追加されました";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  /**
   * ドラマ一覧に戻る.
   */
  backToDoramaList(): void {
    this.$router.push("/doramaList");
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 800px;
}

img {
  width: 300px;
  margin-right: 30px;
}

.title {
  font-size: 30px;
  margin-top: 40px;
}

.story {
  margin-top: 25px;
}

.button {
  width: 200px;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
  background-color: #f48fb1;
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

.position {
  text-align: center;
  margin-top: 30px;
}
</style>
