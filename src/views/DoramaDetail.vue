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
  private apiObject = {
    __ob__: {
      value: this.doramaList,
    },
  };

  private sample = [new Dorama(1, "img/image1.jpg", "aaa", 2020)];

  created(): void {
    const doramaId = Number(this.$route.params.id);
    // データを取り出す（コレクションごと）
    const listData = collection(db, "ドラマ一覧");
    let newArray: any = [];
    getDocs(listData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        newArray.push(
          new Dorama(data[i].id, data[i].image, data[i].name, data[i].release)
        );
      }
    });
    let dummy = newArray as any;
    this.doramaList = dummy.__ob__.value;
    // let dummy = this.doramaList as any;
    // console.log(dummy.__ob__.value);
    console.log(this.doramaList);
    console.log(typeof this.doramaList[3]);
    console.log(this.sample);

    this.currentDorama = this.doramaList.filter(
      (dorama) => dorama.id == doramaId
    )[0];
    console.log(this.currentDorama);
  }
}
</script>

<style scoped></style>
