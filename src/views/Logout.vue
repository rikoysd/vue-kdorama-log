<template>
  <div>ログアウト中…</div>
</template>

<script lang="ts">
import db from "@/firebase";
import { User } from "@/types/User";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // 現在のログイン中のユーザー
  private currentUser = new User(0, "", "", "", []);

  async created(): Promise<void> {
    const loginUser = collection(db, "ログインユーザー");
    await getDocs(loginUser).then((snapShot) => {
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

    // ログインユーザーのデータを削除する
    await deleteDoc(doc(db, "ログインユーザー", this.currentUser.name));

    // ログアウトしたらトップページに遷移
    this.$router.push("/");
  }
}
</script>

<style scoped></style>
