<template>
    <div class="upload_box dflex">
        <div class="img_box dflex" v-if="imgList.length > 0">
            <div class="img_li" v-for="(imgItem,imgKey) in imgList" :key="imgKey">
                <div class="img_li_img" :class="'wxImg'+imgKey">
                    <img :src="imgItem" alt="" class="">
                    <div class="loading-img" v-show="imgItem == ''">
                        <van-loading type="spinner" color="#fff" />
                    </div>
                </div>
                <div class="img_remove" @click="imgRemove(imgKey)">
                    <span>&times;</span>
                </div>
            </div>
        </div>
        <div v-if="imgList.length < count">
            <div class="wxUploadForm uploadForm" v-if="is_weixin">
                <div class="personal-img" @click="wxSetUsenImge">
                    <img src='../../assets/img/shangchuantupian.png' width="100%">
                    <!-- <van-loading type="spinner" color="#EE2D2D" /> -->
                </div>
            </div>
            <div class="uploadForm" v-else>
                <form id="uploadForm" enctype="multipart/form-data">
                    <input id="file" type="file" name="file" class="file" @change="setUsenImge"/>
                </form>
                <div class="personal-img">
                    <img src='../../assets/img/shangchuantupian.png' width="100%">
                </div>
            </div>
        </div>
        <div class="vantLoading" v-show="!vloadingShow">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

 
<script>
import Vue from 'vue'
import $ from 'jquery'
import {is_wexin} from '../../assets/js/commonAPI.js'
import {wxMoreUpload,wxStart} from '../../assets/js/wxjs.js'

const vloading = () => import('../vloading.vue');


export default {
    props:['imgList','imgName','count'],
    data(){
        return{
            localIdsLength:0,                   //图片偏移值
            is_weixin:is_wexin(),               //判断是否微信
            alertBox :0,
            imgGotCount:0,                      //获取的图片数量
            localIdsCount:0,                    //选择的图片数量
            imgLock:0,

            vloadingShow:true,                //请求限制开关 true 可以请求 false 不可请求

        }
    },
    components:{
        vloading,
    },
    created(){
        if(is_wexin()){
            this.vloadingShow = false;
            wxStart(()=>{
                this.vloadingShow = true;
            })
        }
    },
    methods:{
        wxSetUsenImge(){
            let _this = this;
            let imgCount = this.count;
            if(_this.imgList.length<imgCount && _this.imgLock == 0){
                _this.imgLock = 1;
                let imgListLength = _this.imgList.length;
                let localIdsLength = _this.localIdsLength;
                wxMoreUpload({},_this,_this.imgName,100,(res,key)=>{
                    $('.wxImg'+(localIdsLength+imgListLength)).find('img').attr('src',res)
                    $('.wxImg'+(localIdsLength+imgListLength)).find('.loading-img').hide();
                    _this.imgList[localIdsLength+imgListLength] = res;
                    localIdsLength++;

                    _this.imgGotCount++;

                    console.log(_this.imgGotCount);
                    console.log(_this.localIdsCount);
                    if(_this.imgGotCount >= _this.localIdsCount){
                        _this.alertBox = 0;
                        _this.imgGotCount=0;
                        localIdsLength =0;
                    }
                    _this.imgLock = 0;
                    localStorage.setItem(_this.imgName,JSON.stringify(_this.imgList));
                    
                },(imgCount - imgListLength),(res)=>{

                    _this.alertBox = 1;

                    var localIds = res;
                    _this.localIdsCount = localIds.length

                    _this.imgLock = 0;

                    for(let i = 0; i < localIds.length;i++){//占位图片loading
                        _this.imgList.push('');
                    }
                },(error)=>{
                    console.log(error);
                    _this.alertBox = 0;
                    _this.imgGotCount=0;
                    _this.localIdsLength =0;
                    _this.imgLock = 0;

                    for(let key in _this.imgList){
                        if(_this.imgList[key] == ''){
                            _this.imgList.splice(key, 1)
                        }
                    }
                    _this.$toast('图片上传失败');

                },(cancel)=>{
                    _this.imgLock = 0;
                    // _this.$toast('已取消上传');
                });
            }
            
        },
        setUsenImge(){
            let _this = this;
            
            if(_this.imgList.length < this.count && _this.imgLock == 0){
                _this.imgLock = 1;
                let file = $('#file')[0].files[0];
                let formData = new FormData();
                formData.append('file', file);
                _this.$post('/?c=user&a=upload',formData).then((res)=>{
                    if(res.code == 0){
                        _this.imgList.push(res.data.img);

                        localStorage.setItem(this.imgName,JSON.stringify(_this.imgList));
                    }
                    _this.imgLock = 0;
                });
            }
        },
        imgRemove(key){
            let ary = this.imgList;
            for(var i=ary.length-1;i>=0;i--){
                if(i == key) ary.splice(i,1);
            }
            localStorage.setItem(this.imgName,JSON.stringify(this.ary));
        },
    },
}
</script>

<style lang="less" scoped>

    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;}
    .fz_14{font-size: 14px;}
    .fz_16{font-size: 16px;}
    .dflex{display: flex;}

    .upload_box{
        margin-top: 15px;
        margin-bottom: 5px;
        .img_box{
            .img_li{
                width: 60px;
                height: 60px;
                position: relative;
                margin-right: 10px;
                .img_li_img{
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                    overflow: hidden;
                    position: relative;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .img_remove{
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 50%;
                    width: 50%;
                    right: -6px;
                    top: -6px;
                    span{
                        display: block;
                        width: 12px;
                        height: 12px;
                        background-color: rgba(33, 33, 33, 0.65);
                        font-size: 12px;
                        border-radius: 100%;
                        line-height: 10px;
                        text-align: center;
                        color: #fff;
                        float: right;
                    }
                }
            }
        }
        .uploadForm{
            position: relative;
            width: 60px;
            #uploadForm{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0;
                width: 100%;
                height: 100%;
                margin: auto;
                input{
                    display: block;
                    height: 100%;
                    width: 100%;
                }
            }
            .personal-img{
                width: 60px;
                height: 60px;
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
    }
    .postSumbit{
        width: 331px;
        height: 44px;
        background-color: #EE2D2D;
        color: #fff;
        margin: auto;
        display: block;
        border-radius: 5px;
        overflow: hidden;
    }
    .loading-img{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        top: 0;
        left:0;
    }
    .van-loading{
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .vantLoading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        z-index: 1000;
    }
</style>
