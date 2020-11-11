<template>
  <div class="singleImageUpload2 upload-container">
    <el-card>
      <el-select @change="indexSelect($event)" v-model="A" >
        <el-option v-for="(option1,index) in YX" :value="option1.text" :key="index">{{
          option1.text
        }}</el-option>
      </el-select>
      <span>-</span>
      <el-select v-model="B" >
        <el-option v-for="(option2,index) in selection" :value="option2.text" :key="index">{{
          option2.text
        }}</el-option>
      </el-select>
    </el-card>

    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload2"
      :on-success="handleImageSuccess"
      :on-error="handleImageFailure"
      class="image-uploader"
      accept="txt,doc,pdf"
      drag
      :action="upload()">
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        <em>拖拉或点击上传文件<br />(仅限txt,word,pdf)</em>
      </div>
    </el-upload>
    <div v-show="imageUrl.length > 0" class="image-preview">
      <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
        <img :src="imageUrl" />
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/api/qiniu";
import { mapGetters } from "vuex";

export default {
  name: "SingleImageUpload2",
  props: {
    value2: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      A: "总省行指示",
      B: "",
      YX: [
        {
          text: "总省行指示",
          ZY: [
            { text: "安全生产" },
            { text: "业务指引" },
            { text: "热点报告" },
            { text: "综合" }
          ]
        },
        {
          text: "支行营业",
          ZY: [
            { text: "安全生产" },
            { text: "业务指引" },
            { text: "热点报告" },
            { text: "综合" }
            ]
        },
        {
          text: "物资管理",
          ZY: [
            { text: "物品发放" },
            { text: "相关措施" },
            { text: "综合" }
            ]
        }
      ],

      tempUrl: "",
      dataObj: {
        token: "",
        key: "",
        username: "",
        group: ""
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    selection: function() {
      for (var i = 0; i < this.YX.length; i++) {
        if (this.YX[i].text == this.A) {
          return this.YX[i].ZY;
        }
      }
    },
    imageUrl() {
      return this.value2;
    },
    ...mapGetters(["id", "name", "avatar", "roles", "introduction"])
  },
  watch: {
  },
  methods: {
    upload(){
       return process.env.BASE_API+"/api/antiepidemic/fileUpload";
    },
    indexSelect(event) {
      this.B = ""
      this.A = event.target.text;
      // console.log(this.A);
    },
    indexSelect2(event) {
    },
    rmImage() {
      this.emitInput("");
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    handleImageSuccess(response) {
      if (response.code == 200) {
        this.submitOk(response.message);
        this.emitInput(this.tempUrl);
      } else {
        this.submitFail(response.message);
      }
    },
    handleImageFailure(response) {
      //  this.submitFail(response.message);
    },
    beforeUpload2() {
      this.dataObj.username = this.name;
      if (this.B == "") {
        alert("请选择分类");
        return false;
      }
      this.dataObj.group = this.A;
      this.dataObj.groupChild = this.B;
    },
    beforeUpload() {
      //   this.form.group = obj.label;
      const _self = this;
      return new Promise((resolve, reject) => {
        getToken()
          .then(response => {
            const key = response.data.qiniu_key;
            const token = response.data.qiniu_token;
            _self._data.dataObj.token = token;
            _self._data.dataObj.key = key;
            this.tempUrl = response.data.qiniu_url;
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  width: 100%;
  height: 100%;
  position: relative;
  .image-uploader {
    height: 100%;
  }
  .image-preview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 1px dashed #d9d9d9;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
