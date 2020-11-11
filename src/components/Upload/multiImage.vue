<template>
<div class="form-right">
                        <div class="right_btns">转账汇款信息
                            <el-button type="primary" @click="addupload" v-if="adduploadShow">+32222222222</el-button>
                        </div>
                        <div class="upload_parent" v-if="uploadShow" v-for="(item, index) in datas_upload" :key="index">
                            <div class="defind_img_s">
                                <img :src="item.url" class="defind">
                                <el-upload
                                        :ref='"upload" + index'
                                        name="img_b"
                                        class="upload-demo"
                                        :action="uploadUrl"
                                        :headers="upload_hearder"
                                        :on-remove='handleRemove'
                                        :on-success='uploadSuc'
                                        :file-list='fileList'
                                        :show-file-list="false">
                                    <div @click='getUploadTag(item, index)' class="up_btns">{{item.up_btn}}</div>
                                </el-upload>
                                <span v-show="item.upbtnGroup" class="upbtnGroups"
                                      @click="delupload(item,index)">删除</span>
                            </div>
                        </div>
                    </div>
</template>
<script>

import { getToken } from '@/utils/auth';
  import { getShowImageURL } from '@/utils'
export default {
  data() {
      return {
 // 上传成功后的id
        uploadId: '',
        // 重新上传成功后的id
        resetUploadId: '',
        // upload控件tag
        uploadTag: 0,
        // 上传图片文件列表
        fileList: [],
        upItem: {},
//        所有账号-select
        accVal: '1',
//        图片上传框初始数组
        datas_upload: [{ up_btn: '上传图片', upbtnGroup: false, imgId: '', url: '' }],
//       图片初始id数组
        imgArryid: [],
      }
},
methods: {

//      点击“+”按钮生成图片上传框
      addupload() {
        this.datas_upload.push({ up_btn: '上传图片', upbtnGroup: false, imgId: '', url: '' })
      },
//      获取图片id
    getimgId() {
      for (var i = 0; i < this.datas_upload.length; i++) {
        this.imgArryid.push(this.datas_upload[i].imgId)
      }
      console.log(this.imgArryid, 785)
      return this.imgArryid
    },
//      图片上传
      getUploadTag(item, index) {
//        console.log(response, file, fileList, 564)
        this.uploadTag = index
        console.log(index, 220)
        this.upItem = item
      },
//      图片上传成功
      uploadSuc(response, file, fileList) {
        console.log(1230, response, response.id)
        console.log(file, fileList, 6630)
        // 把图片id添加到 uploadId 数据中
        this.datas_upload[this.uploadTag].imgId = response.id
        this.uploadId = response.id
        this.upItem.up_btn = '重新上传图片'
        this.upItem.upbtnGroup = true
        var imgs = 'imgs' + this.uploadTag
        console.log(this.$refs.imgs, 267)
        this.upItem.url = file.url
      },
      //      上传图片-删除
      delupload(item, index) {
        console.log(index, 562)
        for (var i = 0; i < this.datas_upload.length; i++) {
          if (i != 0) {
            if (index == i) {
              this.datas_upload.splice(i, 1)
              this.datas_upload[index].imgId = ''
            }
          } else if (i == 0) {
            console.log(index, item, 563)
            this.datas_upload[index].imgId = ''
            this.datas_upload[index].url = ''
            item.up_btn = '上传图片'
            item.upbtnGroup = false
          }
        }
      },
      // 重新上传-success
      resetUploadSuc(response, file, fileList) {
        this.resetUploadId = response.id
        this.conResUploadView = false
        this.conRessubmitView = true
      }

}
}
</script>

