<template>
    <div>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/provide/addFile"
        name="file"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
</template>

<script>
    export default {
        name: "Upload",
      data() {
        return {
          fileList: []
        };
      },
      methods: {
        submitUpload(event) {
          event.preventDefault();
          this.$refs.upload.submit();
        },
        changeMe(file,fileList){
          this.fileList=fileList;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        }
      }
    }
</script>

<style scoped>

</style>
