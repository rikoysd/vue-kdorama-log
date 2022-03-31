<template>
  <div>
    <!-- <div>{{ dorama.name }}</div>
    <div><img v-bind:src="dorama.image"></div>
    <div>{{ dorama.release }}</div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import db from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Dorama } from "@/types/Dorama";

@Component
export default class XXXComponent extends Vue {
  private dorama = new Dorama(0, "", "", 0);
  created(): void {
    //データを取り出す
    onSnapshot(doc(db, "ドラマ一覧", "トッケビ"), (doc) => {
      this.dorama.id = { ...doc.data() }.id;
      this.dorama.name = { ...doc.data() }.name;
      this.dorama.release = { ...doc.data() }.release;
      this.dorama.image = { ...doc.data() }.image;
    });
    console.log(this.dorama);
  }
}
</script>

<style scoped></style>
