<template>
  <div
    class="dashboard-editor-container"
    style="padding: 20px;background: #f2f2f2;"
  >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>前后端分离的数字化管理项目</h3>
        <div style="font-size: 18px;text-indent: 0em;padding: 0px;margin-top: 20px;padding:0 35px;">
          <ol>
            <li>普惠金融部----普惠业务营销管理系统</li>
          </ol>
        </div>
      </div>
      <h3>研发技术</h3>
      <div style="font-size: 18px;text-indent: 0em;padding: 0px;margin-top: 20px;padding:0 35px;">
      <ol>
        <li>开发语言：Java 8</li>
        <li>数据库： &nbsp;&nbsp;Mysql 8.0</li>
        <li>前端框架：Vue 4 + Axios</li>
        <li>后端框架：Spring Boot 2</li>
        <li>权限： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spring Security 5</li>
      </ol>
      </div>
      <div class="text-right">
        <h3>联系我们： 2158</h3>
        <!-- <el-button type="primary" @click.native="jumpUrl('code-xiaoxiaosu')">项目地址</el-button>
        <el-button type="success" @click.native="jumpUrl('code-demo')">案例地址</el-button> -->
        <!--        <el-button type="warning" @click.native="jumpUrl('demo')">demo演示环境</el-button>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import LightTimeline from "vue-light-timeline";

Vue.use(LightTimeline);

import { getServerInfo } from "@/api/dashboard";
import TransactionTable from "../admin/components/TransactionTable";
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";

export default {
  name: "DashboardEditor",
  components: { PanThumb, TransactionTable },
  data() {
    return {
      activeNum: Math.round(Math.random() * 10000),
      faceNum: Math.round(Math.random() * 10000)
    };
  },
  created() {},
  methods: {
    jumpUrl(type) {
      switch (type) {
        case "home":
          window.open("https://*****");
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles", "introduction"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  /*min-height: 100vh;*/
  padding: 50px 60px 0px;
}
</style>
