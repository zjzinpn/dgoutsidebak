<template>
  <div class="dashboard-editor-container" style="padding: 40px;">
    <el-card>
      <div slot="header">
        <span style="text-align:left">批量导入楼盘信息</span>
      </div>
          <UploadExcel :onSuccess="uploadHousename"/>
          <p style="text-align:center;font-size:13px;">(excel格式要求：第一行第一列为标题"楼盘名称")</p>
    </el-card>

    <!-- <el-card>
      <div slot="header">
        <span style="text-align:left">批量导入客户经理信息</span>
      </div>
          <UploadExcel :onSuccess="uploadManager"/>
          <p style="text-align:center;font-size:13px;">(excel格式要求：第一行为标题行，依次为：
            <br>"支行名称"、"支行号","网点名称","网点号","营销人员","营销代码")</p>
    </el-card> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { batchHousename } from "@/api/inclusive/inclusiveargs";
import { batchManager } from "@/api/inclusive/inclusiveargs";
import UploadExcel from "@/components/UploadExcel/inclusiveExcel";
import variables from "@/styles/variables.scss";

export default {
  name: "DashboardEditor",
  components: {
    UploadExcel
  },
  data() {
    return {
      excelData: {
        excelData: undefined,
        username: undefined
      }
    }
  },
  methods: {
    uploadHousename(data) {
      // data 为读取的excel数据，在这里进行处理该数据
      this.excelData.excelData = data.results
      this.excelData.username = this.name
      batchHousename(this.excelData)
            .then(response => {
              if (response.code == 200) {
                this.submitOk(response.message);
                this.dialogVisible = false;
              } else {
                this.submitFail(response.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
    },
    uploadManager(data) {
      // data 为读取的excel数据，在这里进行处理该数据
      this.excelData.excelData = data.results
      this.excelData.username = this.name
      batchManager(this.excelData)
            .then(response => {
              if (response.code == 200) {
                this.submitOk(response.message);
                this.dialogVisible = false;
              } else {
                this.submitFail(response.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
    }
    },
  computed: {
    ...mapGetters(["id", "name", "avatar", "roles", "introduction"])
  }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


.dashboard-editor-container {
 // background-color: #e3e3e3;
  /*  min-height: 100vh; */
  padding: 50px 60px 0px;

  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }

  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;

    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
