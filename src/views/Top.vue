<template>
  <div class="whole">
    <div class="container">
      <div>
        <div class="top-img">
          <div><img src="../assets/img/top1.jpg" /></div>
          <div><img src="../assets/img/top2.jpg" /></div>
        </div>
        <div class="top-img">
          <div><img src="../assets/img/top3.png" /></div>
          <div><img src="../assets/img/top4.jpeg" /></div>
        </div>
      </div>
      <div class="btn-erea">
        <div>
          <router-link to="/" tag="button" class="button">新規登録</router-link>
        </div>
        <div>
          <router-link to="/login" tag="button" class="button"
            >ログイン</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
@import url("/css/background.css");

.whole {
  padding-top: 60px;
}

.btn-erea {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  width: 150px;
  height: 40px;
  margin: 0 8px;
  background-color: rgb(219, 147, 169);
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

.container {
  width: 770px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 200px;
  margin: 5px 7px;
}

.top-img {
  display: flex;
  justify-content: center;
}
</style>
