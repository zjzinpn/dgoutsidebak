<template>
    <div id="star-pic-vue">
        <template v-if="data">
            <img v-for="item in images"
                 :src="item"
                 id="contract_url"
                 @click="enlargePic"/>
            <template v-if="isDialogShow">
        </template>
            <el-dialog
                :visible.sync="centerDialogVisible"
                modal
                close-on-click-modal
                custom-class="dialog"
                >
                <el-carousel :autoplay="false" arrow="always">
                    <el-carousel-item v-for="item in data" :key="item">
                        <img :src="item">
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
        </template>
    </div>
</template>

<script>
    export default {
        name: "star-pic-list",
        props: ["data","maxShow"],
        data(){
            return{
                centerDialogVisible: false,
                showPic: '',
                isDialogShow: false,
                index: 0,
            }
        },
        computed: {
          images() {
            console.log(this.data.length)
              if (this.data instanceof Array && this.data.length > 1) {
                  return this.data.splice(0,this.maxShow)
              } else {
                  return this.data
              }
          }
        },
        methods: {
            // 放大图片
            enlargePic(e){
                this.isDialogShow = true;
                this.centerDialogVisible = true;
                this.showPic = this.data[0];
                console.log(this.images)
            },
        }
    }
</script>

<style lang="less" scoped>
#star-pic-vue{
    width: 200px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    img{
        width: 80px;
        height: 80px;
        margin: 4px;
    }
    .dialog {
        img{
            width: 100%;
            height: 100%;
            margin: 0;
        }
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
        height: 100%;
        width: 100%;
    }
    .el-dialog__header{
        display: none;
    }
    .el-dialog__body {
        padding: 0 !important;
        margin: 0 !important;
        height: 600px;
    }
    .el-carousel{
        height: 100%;
    }
    .el-carousel__container {
        height: 100%;
    }
}
</style>
