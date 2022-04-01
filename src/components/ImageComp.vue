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
  }
}
}
</script>

<style scoped>
img{
  width: 200px;
}
</style>
