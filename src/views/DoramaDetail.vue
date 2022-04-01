<template>
  <div>
    <div>作品画像</div>
    <div>
      <div>作品名(公開年)</div>
      <div>★評価</div>
      <div>ウォッチリスト</div>
      <div>あらすじ</div>
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
  private currentDorama = new Dorama(0, "", "", 0);
  private doramaList = new Array<Dorama>();

  private sample = [new Dorama(1, "img/image1.jpg", "aaa", 2020)];

  created(): void {
    const doramaId = Number(this.$route.params.id);
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ドラマ一覧");
    getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        this.doramaList.push(
          new Dorama(data[i].id, data[i].image, data[i].name, data[i].release)
        );
      }
    });
    console.log(this.doramaList);
    console.log(this.doramaList[3]);
    console.log(this.sample);
  }
}
</script>

<style scoped></style>
