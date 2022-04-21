<template>
  <div>
    <div class="whole">
      <div class="edit-log">
        <div class="error">{{ titleError }}</div>
        <div class="item">
          <div class="title">
            <label for="title">タイトル(必須)</label>
          </div>
          <input type="text" id="title" v-model="title" />
        </div>
        <div class="item">
          <div class="title">
            <label for="watchDate">鑑賞日</label>
          </div>
          <input type="date" id="watchDate" v-model="watchDate" />
        </div>
        <div class="error">{{ textError }}</div>
        <div class="item">
          <div class="title"><label for="text">感想(必須)</label></div>
          <textarea id="text" cols="30" rows="10" v-model="text"></textarea>
        </div>
      </div>
      <div class="btn-erea">
        <button type="button" class="button" v-on:click="overWrightLog">
          上書きする
        </button>
        <button type="button" class="button" v-on:click="backLogDetail">
          戻る
        </button>
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

.edit-log {
  text-align: center;
  width: 650px;
  height: auto;
  padding: 50px;
  margin-top: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.button {
  width: 150px;
  height: 40px;
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

.btn-erea {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.tab {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.title {
  margin-bottom: 8px;
  color: rgb(156, 156, 156);
  font-size: 13px;
  text-align: left;
}

.menu {
  margin: 0 15px;
}

.error {
  font-size: 10px;
  color: red;
}

.item {
  margin-bottom: 30px;
}
</style>
