<template>
  <div id="app">
    <div class="container" style="width:600px">
      <div style="margin: 20px">
        <h3>Vue Frontend</h3>
        <h4>CRUD Documents</h4>
      </div>
      <upload-documents></upload-documents>
    </div>
  </div>
</template>

<script>
import UploadDocuments from "./components/UploadDocument.vue"
export default {
  name: 'App',
  components: {
    UploadDocuments
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
