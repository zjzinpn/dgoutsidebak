<template>
  <div class="dashboard-editor-container" style="padding: 20px;background: #f2f2f2;">

    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card" style="height: 300px">
          <div slot="header" class="clearfix">
            <span>登陆用户</span>
          </div>
          <div style="width: 160px;display: inline-block;float: left">
            <pan-thumb :image="avatar" style="float: left">
              Your roles:
              <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
            </pan-thumb>
          </div>
          <div style="display: inline-block;float: left;margin-left: 20px;margin-top: 20px">
            <table>
              <!-- <tr class="userinfo-row">
                <td class="userinfo-lable">
                  角色
                </td>
                <td class="userinfo-content">
                  <span v-for="item in roles" :key="item" style="display: inline-block;margin-right: 5px">{{ item
                    }}</span>
                </td>
              </tr> -->
              <tr class="userinfo-row">
                <td class="userinfo-lable">
                  统一认证
                </td>
                <td class="userinfo-content">
                  {{ name }}
                </td>
              </tr>
              <tr class="userinfo-row">
                <td class="userinfo-lable">
                  姓名
                </td>
                <td class="userinfo-content">
                  {{ introduction }}
                </td>
              </tr>
              <tr class="userinfo-row">
                <td class="userinfo-lable">
                  部门
                </td>
                <td class="userinfo-content">
                  {{ branchName }}
                </td>
              </tr>
              <tr class="userinfo-row">
                <td class="userinfo-lable">
                  联系方式
                </td>
                <td class="userinfo-content">
                  {{ phone }}
                </td>
              </tr>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>

     <el-button  type="primary" @click="handleUpdate()" icon="el-icon-edit" plain>
    <!--  <el-button v-has="'sys:user:editPersonalInfo'" type="primary" @click="handleUpdate()" icon="el-icon-edit" plain> -->
   <!-- <el-button  type="primary" @click="handleUpdate()" icon="el-icon-edit" plain> -->
      修改个人信息
    </el-button>

    <!-- 修改个人信息 -->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form ref="dataForm" :model="form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="统一认证:" prop="username" >
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="nickName">
          <el-input v-model="form.nickName" ></el-input>
        </el-form-item>
        <el-form-item label="部门:" prop="branchName">
          <el-input v-model="form.branchName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false"> {{ $t('table.cancel') }} </el-button>
          <el-button type="primary" @click="submitForm"> {{ $t('table.confirm') }} </el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

  import { getServerInfo } from '@/api/dashboard'
  import TransactionTable from '../admin/components/TransactionTable'
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import { updatePersonalInfo } from '@/api/system/user'

  export default {
    name: 'DashboardEditor',
    components: { PanThumb, TransactionTable },
    data() {
      return {
        emptyGif: '',
        form: {
          id: undefined, //主键ID
          username: undefined, //账号
          nickName: undefined ,
          branchName: undefined ,
          phone: undefined
        },
        dialogVisible: false,
        dialogStatus: '',
        titleMap: {
          update: '修改个人信息',
          create: '创建'
        },













      }
    },
    created() {
    },
    methods: {
      handleUpdate(row) {
        this.form = Object.assign({}, row)
        this.form.id = this.id
        this.form.username = this.name
        this.form.nickName = this.introduction
        this.form.branchName = this.branchName
        this.form.phone = this.phone
        this.dialogStatus = 'update'
        this.dialogVisible = true
      },
      submitForm() {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
           updatePersonalInfo(this.form).then(response => {
              if (response.code == 200) {
                this.submitOk(response.message)
                this.dialogVisible = false
                location.reload();
              } else {
                this.submitFail(response.message)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      // 监听dialog关闭时的处理事件
      handleDialogClose() {
        if (this.$refs['dataForm']) {
          this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
        }
      }
    },
    computed: {
      ...mapGetters([
        'id',
        'name',
        'avatar',
        'roles',
        'introduction',
        'branchName',
        'phone'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .userinfo-row {
    height: 50px;
  }

  .userinfo-lable {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    text-align: right;;
    margin-right: 10px;
  //  align: right;
    width: 120px;
  }

  .userinfo-content {
    display: inline-block;
    font-size: 20px;
  }

  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
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
