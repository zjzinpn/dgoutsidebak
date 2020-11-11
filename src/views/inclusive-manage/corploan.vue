<template>
  <div class="app-container">
    <cus-wraper>
      <cus-filter-wraper>
              <el-select class="item-choose" placeholder="请选择查询类型" v-model="value" label-width="200px">
              <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
          ></el-option>
          </el-select>
        <el-input v-model="listQuery.content" placeholder="请输入" style="width:300px" clearable></el-input>
        <el-date-picker
          v-model="listQuery.startDate"
          type="datetime"
          placeholder="开始时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-date-picker
          v-model="listQuery.endDate"
          type="datetime"
          placeholder="结束时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" @click="getList" icon="el-icon-search" v-waves>查询</el-button>
<!--        <el-button type="primary" @click="handleCreate" icon="el-icon-plus" v-waves>添加</el-button>-->
        <br/>
        <!-- <label style="font-size:12px">(上述输入框留空，则默认该项为全部)</label> -->
      </cus-filter-wraper>
      <div class="table-container">
        <el-table v-loading="listLoading" :data="list" size="mini" element-loading-text="Loading" fit border highlight-current-row>
          <el-table-column label="支行名称" prop="branchname" align="center" ></el-table-column>
          <el-table-column label="网点名称" prop="networkname" align="center"></el-table-column>
          <el-table-column label="客户经理" prop="name" align="center"></el-table-column>
          <el-table-column label="营销代码" prop="marketcode" align="center"></el-table-column>
          <el-table-column label="产品名称" prop="productname" align="center"></el-table-column>
          <el-table-column label="企业名称" prop="corpname" align="center"></el-table-column>
          <el-table-column label="贷款品种" prop="loantype" align="center"></el-table-column>
          <el-table-column label="贷款金额" prop="corploanbalance" align="center"></el-table-column>
          <el-table-column label="上报准入会时间" prop="plandate" align="center"></el-table-column>
          <el-table-column label="贷款形式" prop="loanstyle" align="center"></el-table-column>
          <el-table-column label="小企业法人备注"  align="center">
            <template slot-scope="scope">
              <a v-show="scope.row.corpmemo != null" @click="popMemo(scope.row.corpmemo)" style="text-decoration:underline;color:blue;">详情</a>
              <van-popup
                v-model="showMemo"
                closeable
                close-icon-position="top-right"
                :style="{ height: '50%', width: '50%'}"
                ><p style="font-size:20px;">{{ memos }}</p>
                </van-popup>
            </template>

          </el-table-column>
          <el-table-column label="录入日期" prop="indate" align="center"></el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <cus-del-btn @ok="handleDelete(scope.row.corpname,scope.row.loantype,scope.row.indate)"></cus-del-btn>
            </template>
          </el-table-column>
        </el-table>
         <span v-show="total>0" style="display:line-block;line-height:35px;color:orange;">共有{{total}}条，请点击</span> <a v-show="total>0"  style="text-decoration: underline;color:blue;" @click="downloadCorpFile"> 【下载】 </a>

        <!-- 分页 -->
        <cus-pagination  v-show="total>0"  :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

      </div>

    </cus-wraper>
  </div>
</template>

<script>
  import { getCorploanPage } from '@/api/inclusive/';
  import { getCorploanAll } from '@/api/inclusive/';
  import { deleteCorploan } from '@/api/inclusive/corploan';
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
 import axios from 'axios'
import fileDownload from 'js-file-download'

  export default {
    name: 'corploan',
    data() {
      return {
        memos: "",
         showMemo: false,
         options: [
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'b.branchname',
                    label: '支行名称'
                },
                 {
                    value: 'networkname',
                    label: '网点名称'
                },
                {
                    value: 'name',
                    label: '客户经理'
                },
                {
                    value: 'a.marketcode',
                    label: '营销代码'
                },
                {
                    value: 'custname',
                    label: '企业名称'
                },
                 {
                    value: 'housename',
                    label: '贷款品种'
                },

                ],
                value: 'all',
        list: [],
        list2: [],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          username: undefined,
          type: '',
          content: '',
          startDate: '',
          endDate: ''
        },
        deleteQuery:{
           corpname:'',
           loantype:'',
           indate:''
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        input: '',
        rules: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ]
        }
      }
    },
     filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
    },
    created() {
      this.getList()
    },
      computed: {
    ...mapGetters(["id", "name", "avatar", "roles", "introduction"])
    },
    methods: {
       popMemo(memo) {
         this.memos = memo;
      this.showMemo = true;
    },
      getList() {
        this.listLoading = true
        this.listQuery.username = this.name
        let obj = {};
        obj = this.options.find((item)=>{
        return item.value === this.value;
        });
        this.listQuery.type = obj.value;
        getCorploanPage(this.listQuery).then(response => {

          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleDelete(corpname,loantype,indate) {
            this.deleteQuery.corpname = corpname;
            this.deleteQuery.loantype = loantype;
            this.deleteQuery.indate = indate;
        deleteCorploan(this.deleteQuery).then(response => {
          if (response.code === 200) {
            // this.submitOk(response.message)
            alert("删除成功")
            this.getList()
          } else {
            this.submitFail(response.message)
          }
        })
      },
      export2Excel() {
        require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/Export2Excel');
        // 设置Excel的表格第一行的标题
        const tHeader = [
          '支行名称',
          '网点名称',
          '客户经理',
          '营销代码',
          '产品名称',
          '企业名称',
          '贷款类别',
          '贷款金额',
          '贷款形式',
          '拟上报准入会时间',
          '小企业法人贷款备注',
          '登记日期'
          ];
         // tableData里对象的属性
        const filterVal = [
          'branchname',
          'networkname',
          'name',
          'marketcode',
          'productname',
          'corpname',
          'loantype',
          'corploanbalance',
          'loanstyle',
          'plandate',
          'corpmemo',
          'indate'
          ];

      //  const list2 = this.tableData;  //把data里的tableData存到list2
        const data = this.formatJson(filterVal, this.list2);
        let tt = new Date().getTime();
        export_json_to_excel(tHeader, data, '小企业法人贷款明细'+tt);
        })
        },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
   },

      downloadCorpFile(){
      this.loading = true
      this.loadingText = '正在导出模板...'
      this.listQuery.username = this.name
        let obj = {};
        obj = this.options.find((item)=>{
        return item.value === this.value;
        });
        this.listQuery.type = obj.value;
        getCorploanAll(this.listQuery).then(response => {
            this.loading = false
            this.list2 = response.data
            this.export2Excel();
          })
    },
    }
  }
</script>
