<template>
  <div class="container">
    <div><img v-bind:src="require(`@/assets/${dorama.image}`)" /></div>
    <div>
      <div class="title">{{ dorama.name }}({{ dorama.release }})</div>
      <div>★評価</div>
      <div>ウォッチリスト</div>
      <div>あらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじあらすじ</div>
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
  private dorama = new Dorama(0, "", "", 0);
  // ドラマリスト
  private doramaList = new Array<Dorama>();

  async created(): Promise<void> {
    const doramaId = Number(this.$route.params.id);
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ドラマ一覧");
    await getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.doramaList.push(
          new Dorama(data[i].id, data[i].image, data[i].name, data[i].release)
        );
      }
    });

    this.dorama = this.doramaList.filter((dorama) => dorama.id == doramaId)[0];
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
</style>
