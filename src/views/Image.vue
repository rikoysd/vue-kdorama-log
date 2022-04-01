<template>
  <div>
    <label for="image">アップロードする画像を選択してください。</label><br />
    <input type="file" id="image" accept="image/*" name="image" />
    <div class="container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    Image,
  },
})
export default class Image extends Vue {}
</script>

<style scoped></style>
