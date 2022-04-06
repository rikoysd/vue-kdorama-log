<template>
  <div class="container">
    <div><img v-bind:src="require(`@/assets/${dorama.image}`)" /></div>
    <div>
      <div class="title">{{ dorama.name }}({{ dorama.release }})</div>
      <div>★評価</div>
      <div>
        <button type="button" class="button" v-on:click="addList">
          見たいリストに追加する
        </button>
        <button type="button" class="button">見た</button>
      </div>
      <div class="story">{{ dorama.story }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import db from "@/firebase";
import { Dorama } from "@/types/Dorama";
import { collection, getDocs } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 表示されているドラマ作品
  private dorama = new Dorama(0, "", "", 0, "");
  // ドラマリスト
  private doramaList = new Array<Dorama>();
  // ログイン状況
  private currentIsLogin = true;

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

  // addList():void{
  //   this.currentIsLogin=this.$store.getters.isLogin;
  //   if(this.currentIsLogin===false){
  //     this.$router.push("/login");
  //   } else{
      
  //   }
  // }
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
</style>
