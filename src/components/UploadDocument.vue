<template>
  <div>
    <div v-if="currentDoc" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

    <label class="btn btn-default">
      <input type="file" ref="doc" @change="selectDoc" />
    </label>

    <button class="btn btn-success" :disabled="!selectedDocs" @click="upload">
      Upload
    </button>

    <div class="form">
      <select @change="selectDocType($event)"
        name="form-select"
        class="form-selet"
        aria-label="-- document type --"
      >
        <option>--- Select Type ---</option>
        <option :value="index" v-for="(type, index) in typeList" :key="index">
          {{ type }}
        </option>
      </select>
    </div>

    <div class="alert alert-light" role="alert">{{ message }}</div>

    <div class="row justify-content-">
      <div class="col-auto">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th scope="col" >Document</th>
              <th scope="col">Extension</th>
              <th scope="col">Document Type</th>
              <th scope="col">Size (bytes)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, index) in docList" :key="index">
              <td>
                <a :href="doc.url">{{ doc.name }}</a>
              </td>
              <td>
                <span>{{ doc.ext }}</span>
              </td>
              <td>
                <span>{{ doc.documentType }}</span>
              </td>
              <td>
                <span>{{ doc.size }}</span>
              </td>
              <td>
                <button type="button" class="btn btn-primary">Edit</button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" @click="removeSelectedDoc(doc.id, index)">X</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentService from "../services/DocumentService";
import DocumentTypeService from "../services/DocumentTypeService";

export default {
  name: "upload-document",
  data() {
    return {
      selectedDocs: undefined,
      selectedType: undefined,
      currentDoc: undefined,
      progress: 0,
      message: "",
      docList: [],
      typeList: [],
    };
  },
  methods: {
    removeSelectedDoc(id, index) {
      console.log(id);
      console.log(this.docList.splice(index, 1));
      DocumentService.deleteDoc(id);
    },
    selectDocType(event) {
      this.selectedType = event.target.value;
    },
    selectDoc() {
      this.selectedDocs = this.$refs.doc.files;
    },
    upload() {
      this.progress = 0;
      this.currentDoc = this.selectedDocs.item(0);
      DocumentService.upload(this.currentDoc, this.selectedType, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return DocumentService.getDocs();
        })
        .then(docs => {
          this.docList = docs.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the doc!";
          this.currentDoc = undefined;
          this.selectedDocs = undefined;
        });
      this.selectedDocs = undefined;
    },
  },
  mounted() {
    DocumentService.getDocs().then((response) => {
      this.docList = response.data;
    });
    DocumentTypeService.getTypes().then((response) => {
      this.typeList = response.data;
    });
  },
};
</script>

<style scoped>
</style>