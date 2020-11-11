<template>
  <div class="mobile">
    <van-card style="height:70px;">
      <template slot="title">
        <span
          style="display:line-block;font-size:25px;color:black;padding:10px 0px;"
          >普惠业务营销登记</span
        >
      </template>
      <template slot="tags">
        <div style="margin: 5px 0px;">
          <van-tag plain type="primary">个人e抵快贷</van-tag>
          <van-tag plain type="primary">小企业法人贷款</van-tag>
        </div>
      </template>
    </van-card>

    <van-tabs
      type="card"
      v-model="activename"
      title-active-color="black"
      title-inactive-color="silver"
      @click="tabClick"
    >
      <!-- ****************个人e抵快贷************************ -->

      <van-tab title="个人e抵快贷" name="equickloan" dot>
        <van-form ref="equickForm" validate-first>
          <van-field
            v-model="equickForm.custname"
            clickable
            required
            clearable
            label="客户姓名:"
            placeholder="请输入"
          />

          <van-field
            v-model="equickForm.housename"
            clickable
            required
            label="楼盘名称："
            placeholder="请输入楼盘关键字，支持模糊匹配"
            @input="onchange"
          />
          <div>
            <van-list
              style="position: absolute; z-index: 10;opacity:1;width:100%;"
            >
              <van-cell
                title-class="titleStyle"
                v-for="item in housenameList"
                :key="item"
                :title="item"
                :center="true"
                v-if="item.indexOf(equickForm.housename) != -1 && showcell"
                @click="clickcell(item)"
              />
            </van-list>
          </div>

          <van-field
            label="贷款金额(万)："
            placeholder="请输入"
            label-width="120px"
            v-model="equickForm.equickloanbalance"
            clickable
            required
            type="number"
            input-align="left"
            :rules="[{ validator, message: '金额上限1000万（含）' }]"
          />

          <van-field
            v-model="equickForm.doename"
            required
            clickable
            label-width="120px"
            lable-class="lable"
            label=" 经营实体名称 ："
            placeholder="请输入"
          />
          <van-field
            v-model="equickForm.estateno"
            label-width="120px"
            required
            clickable
            label="不动产权证号码:"
            placeholder="请输入"
          />

          <van-cell
            title="是否需要赎楼："
            required
            title-style="margin-right:-300px;"
          >
            <van-radio-group
              v-model="equickForm.buybackflag"
              direction="horizontal"
            >
              <van-radio name="是" shape="square">是</van-radio>
              <van-radio name="否" shape="square" style="margin-left:35px;"
                >否</van-radio
              >
            </van-radio-group>
          </van-cell>

          <van-field
            v-model="equickForm.equickmemo"
            rows="4"
            type="textarea"
            placeholder="备注（非必填）"
            maxlength="512"
          />
        </van-form>
      </van-tab>

      <!-- *********************************小企业法人贷款************************ -->
      <van-tab title="小企业法人贷款" name="corploan" dot>
        <van-form ref="corpForm" validate-first>
          <van-field
            v-model="corpForm.corpname"
            required
            clickable
            label="企业名称:"
            placeholder="请输入"
          />

          <van-field
            v-model="corpForm.loantype"
            required
            clickable
            readonly
            label="贷款类别:"
            placeholder="请选择"
            @focus="showLoanChoice = true"
          />
          <van-action-sheet
            v-model="showLoanChoice"
            :round="false"
            :actions="loantypeList"
            @select="onSelect"
          >
          </van-action-sheet>

          <van-field
            label="贷款金额(万)："
            placeholder="请输入"
            label-width="120px"
            v-model="corpForm.corploanbalance"
            clickable
            required
            type="number"
            input-align="left"
            :rules="[
              { validator: validator2, message: '金额上限3000万（含）' }
            ]"
          />
          <van-field
            v-model="corpForm.plandate"
            label-width="150px"
            required
            readonly
            clickable
            label="拟上报准入会时间："
            placeholder="请选择"
            @click="show = true"
          />
          <van-calendar
            v-model="show"
            @confirm="onConfirm"
            :show-confirm="false"
          />

          <van-cell
            title="贷款形式："
            required
            title-style="margin-right:-300px;"
          >
            <van-radio-group
              v-model="corpForm.loanstyle"
              direction="horizontal"
            >
              <van-radio name="纯新增" shape="square">纯新增</van-radio>
              <van-radio
                name="存量新增"
                shape="square"
                style="margin-left:35px;"
                >存量新增</van-radio
              >
            </van-radio-group>
          </van-cell>

          <van-field
            v-model="corpForm.corpmemo"
            rows="5"
            type="textarea"
            placeholder="营销中遇到的问题（非必填）"
            maxlength="512"
          />
        </van-form>
        <!-- show-word-limit="true" -->
      </van-tab>
    </van-tabs>

    <div style="margin: 20px 5%;">
      <van-button
        round
        type="primary"
        style="width:45%;"
        native-type="submit"
        @click="onClickButtonSubmit"
      >
        提交
      </van-button>

      <van-button
        round
        type="warning"
        style="margin-left:30px;width:45%;"
        @click="logout"
      >
        退出
      </van-button>
    </div>
    <van-panel :title="managerInfo" :desc="descMsg" :status="this.branchName">

      <van-cell-group v-show="countEquick > 0" title="个人e抵快贷">

        <van-cell v-for="item in todayEquickList" :key="item.custname">
          <table style="border-bottom: 1px dotted #000;text-align:left;width:100%;">
            <tr>
              <td style="width:20%"><span > {{ item.custname }} </span></td>
              <td style="width:60%"><span> {{ item.housename }}</span></td>
              <td style="width:20%"><span> {{ item.equickloanbalance }} </span></td>
            </tr>
          </table>
        </van-cell>
      </van-cell-group>

      <van-cell-group v-show="countCorp > 0" title="小企业法人贷款">
        <van-cell
          v-for="item in todayCorpList"
          :key="item.corpname"
        >
         <table style="border-bottom: 1px dotted #000;text-align:left;width:100%;">
            <tr>
              <td style="width:20%"><span > {{ item.corpname }} </span></td>
              <td style="width:60%"><span> {{ item.loantype }}</span></td>
              <td style="width:20%"><span> {{ item.corploanbalance }} </span></td>
            </tr>
          </table>
        </van-cell>
      </van-cell-group>
 </van-panel>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Toast } from "vant";
import { validUsername } from "@/utils/validate";
import { listHousename } from "@/api/inclusive/housename";
import { saveEquickloan } from "@/api/inclusive/equickloan";
import { saveCorploan } from "@/api/inclusive/corploan";
import { countInclusive } from "@/api/inclusive";
export default {
  data() {
    return {
      activename: "equickloan",
      managerInfo: "",
      housenameList: [],
      housenamebak: "",
      loading: false,
      showcell: false,
      equickForm: {
        marketcode: "",
        productname: "",
        custname: "",
        housename: "",
        equickloanbalance: "",
        doename: "",
        estateno: "",
        buybackflag: "否",
        equickmemo: ""
      },

      corpForm: {
        marketcode: "",
        productname: "",
        corpname: "",
        loantype: "",
        loanstyle: "",
        plandate: "",
        loanstyle: "纯新增",
        corploanbalance: "",
        corpmemo: ""
      },

      loantypeList: [
        { name: "普通网贷通" },
        { name: "法人e抵快贷" },
        { name: "周转贷" },
        { name: "购建贷" },
        { name: "经营型物业贷" },
        { name: "科技贷" },
        { name: "倍增贷" },
        { name: "线下税务贷" },
        { name: "法人经营快贷" },
        { name: "其他" }
      ],
      show: false,
      showLoanChoice: false,
      errorMessage: {
        custname: "客户姓名",
        housename: "楼盘名称",
        equickloanbalance: "贷款金额",
        doename: "经营实体名称",
        estateno: "不动产权证号码",

        corpname: "企业名称",
        loantype: "贷款类别",
        loanstyle: "贷款形式",
        plandate: "拟上报准入会时间",
        corploanbalance: "贷款金额"
      },
      descMsg: "今日已录个人e抵快贷【0】笔，小企业法人贷款【0】笔",
      countEquick: 0,
      countCorp: 0,
      todayEquickList: [],
      todayCorpList: [],
      center: false
    };
  },
  watch: {
    housename: function(val) {
      if (val == "") {
        this.showcell = false;
      }
      this.$emit("transferdata", val);
    } //监听并传值给父组件
  },
  methods: {
    onchange() {
      this.showcell = true;
      // console.log(this.value, "change");
    },
    onSelect(item) {
      this.showLoanChoice = false;
      this.corpForm.loantype = item.name;
    },
    // focusfield(){this.showcell=true},
    // blurfield(){this.showcell=false},
    clickcell(item) {
      this.equickForm.housename = item;
      this.housenamebak = item;
      this.showcell = false;
      // console.log(this.value, "ss");
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return val <= 1000 && val > 0;
    },
    validator2(val) {
      return val <= 3000 && val > 0;
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
      return false;
    },
    formatDate(date) {
      return `${date.getYear() + 1900}-${date.getMonth() +
        1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.corpForm.plandate = this.formatDate(date);
    },
    tabClick(name, title) {
      if (name == "corploan") {
        this.equickForm = {
          marketcode: "",
          custname: "",
          housename: "",
          equickloanbalance: "",
          doename: "",
          estateno: "",
          buybackflag: "否",
          equickmemo: ""
        };
      }
      if (name == "equickloan") {
        this.corpForm = {
          marketcode: "",
          corpname: "",
          loantype: "",
          loanstyle: "",
          plandate: "",
          loanstyle: "纯新增",
          corploanbalance: "",
          corpmemo: ""
        };
      }

      // this.$refs['equickForm'].clear() // 清除整个表单的校验
      // this.$refs['equickForm'].clearValidate() // 清除整个表单的校验
    },

    getInclusive() {
      this.equickForm.marketcode = this.name;
      countInclusive(this.equickForm)
        .then(response => {
          if (response.code == 200) {
            this.descMsg = response.data.descMsg;
            this.todayEquickList = response.data.todayEquickList;
            this.todayCorpList = response.data.todayCorpList;
            this.countCorp = this.todayCorpList.length;
            this.countEquick = this.todayEquickList.length;
          } else {
            this.submitFail(response.message);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.managerInfo = this.introduction + "(" + this.name + ")";
    },

    onClickButtonSubmit() {
      if (this.activename == "equickloan") {
        this.equickForm.marketcode = this.name;
        this.equickForm.productname = "个人e抵快贷";
        for (var key in this.equickForm) {
          if (this.equickForm[key] == "" && key != "equickmemo") {
            this.submitFail("必输项【" + this.errorMessage[key] + "】为空");
            return false;
          }
        }
        if (this.housenamebak != this.equickForm.housename) {
          this.submitFail("楼盘名称不在白名单内，请重新输入");
          return false;
        }
        saveEquickloan(this.equickForm)
          .then(response => {
            if (response.code == 200) {
              this.submitOk(response.message);
              this.getInclusive();
              // this.descMsg = response.data;
            } else {
              this.submitFail(response.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (this.activename == "corploan") {
        this.corpForm.marketcode = this.name;
        this.corpForm.productname = "小企业法人贷款";
        for (var key in this.corpForm) {
          if (this.corpForm[key] == "" && key != "corpmemo") {
            this.submitFail("必输项【" + this.errorMessage[key] + "】为空");
            return false;
          }
        }
        saveCorploan(this.corpForm)
          .then(response => {
            if (response.code == 200) {
              this.submitOk(response.message);
              this.getInclusive();
              // this.descMsg = response.data;
            } else {
              this.submitFail(response.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    logout() {
      this.$store.dispatch("FedLogOut").then(() => {
        this.$router.push({ path: "/mobile/equickloan" });
        // this.$router.push({ path: "/equickloan" });
        location.reload(); // 强制刷新
      });
    }
  },
  computed: {
    ...mapGetters([
      "id",
      "name",
      "branchName",
      "avatar",
      "roles",
      "introduction"
    ])
  },
  created() {
    listHousename()
      .then(response => {
        if (response.code == 200) {
          response.data.forEach(element => {
            this.housenameList.push(element.housename);
          });
        } else {
          this.submitFail(response.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.getInclusive();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.mobile {
  width: 700px;
  margin: auto;
  padding: 0px;
  background-color: aliceblue;
  // width: auto;
  font-family: Arial, Helvetica, sans-serif;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.titleStyle {
  color: red;
  margin-left: 90px;
}
.van-cell {
  font-size: 16px;
  background-color: aliceblue;
}
.van-card {
  font-size: 16px;
  background-color: aliceblue;
}
 /deep/ .van-field__label {
  line-height: 35px;
  font-size: 16px;
}
/deep/ .van-field__control {
  background-color: #fffffb;
  color: red;
  height: 35px;
}
/deep/ textarea.van-field__control {
  height: 125px;
}
/deep/ .van-tabs__nav--card {
  border: 0px;
  font-size: 16px;
}
/deep/ .van-tabs__nav--card .van-tab.van-tab--active {
  background-color: #009ad6;
  // background-color: #008792;
}
/deep/ .van-panel__header-value {
  color: black;
  margin-right: 5px;
}
/deep/ .van-cell__label {
  font-size: 14px;
  color: purple;
  width: 400px;
}
</style>
