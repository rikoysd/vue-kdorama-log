<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import M from "materialize-css/dist/js/materialize.min";

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 100);
  }
}
</script>

<style>
</style>
