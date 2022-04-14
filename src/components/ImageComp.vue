<template>
  <div>
    <input type="file" ref="preview" @change="uploadFile" />
    <div v-if="url">
      <img :src="url" />
    </div>
  </div>
</template>

<script lang="js">
export default {
  data() {
  return {
    url:""
  }
  },
 methods:{
  uploadFile(){
    const file = this.$refs.preview.files[0];
    this.url = URL.createObjectURL(file);
    // アップロードファイルのurlを親に渡す
    this.$emit("upload",this.url);
    console.log("ok");
  }
}
}
</script>

<style scoped>
img {
  width: 200px;
}
</style>
