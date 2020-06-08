<!-- 银行卡正面上传部分样式 -->
<template>
    <van-cell-group class="upload-box">
        <div class="card-upload-box" v-if="is_weixin">
            <div class="card-upload-img-box">
                <div class="card-upload-label">{{title}}</div>
                <div class="dflex card-upload-img">
                    <div class="card-upload-img-from">
                        <div class="wxUploadForm uploadForm">
                            <div class="personal-img" @click="wxSetUsenImge('card3')">
                                <img :src="chartered" width="100%">
                                <div class="img_remove" @click.stop="imgRemove('chartered')" v-if="charteredStatus == 1">
                                    <span>&times;</span>
                                </div>
                            </div>
                            <div class="card-upload-text">{{notice}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-upload-box" v-else> 
            <div class="card-upload-img-box">
                <div class="card-upload-label">{{title}}</div>
                <div class="dflex card-upload-img">
                    <div class="card-upload-img-from">
                        <div class="uploadForm">
                            <form id="uploadForm3" class="upload" enctype="multipart/form-data">
                                <input id="file3" type="file" name="file" class="file" @change="setUsenImge('file3')"/>
                            </form>
                            <div class="personal-img">
                                <img :src="chartered" width="100%">
                                <div class="img_remove" @click.stop="imgRemove('chartered')" v-if="charteredStatus == 1">
                                    <span>&times;</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-upload-text">{{notice}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vantLoading" v-show="!vloadingShow">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </van-cell-group>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import {is_wexin} from '../../assets/js/commonAPI.js'
import {wxUpload,wxStart} from '../../assets/js/wxjs.js'
import chartered from '../../assets/img/yinyezhizhao.png'

const vloading = () => import('../vloading.vue');

export default {
    props:['title', 'notice'],
    data(){
        return{
            is_weixin:is_wexin(),               //判断是否微信

            imgCleck:true,      //控制图片上传一直点击
            wxConfig: '',
            chartered:chartered,//图片
            charteredStatus:0,//判断是否有上传图片 1 已上传 0未上传

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
    	if(localStorage.getItem('uploadSingleBox_bankCard')) {
    		this.charteredStatus = 1;
    		this.chartered = localStorage.getItem('uploadSingleBox_bankCard')
    	}
    },
    methods:{
        /* 图片上传 */
        wxSetUsenImge(imgType){
            let _this = this;
            if(_this.imgCleck){
                _this.imgCleck = false;
                wxUpload(this.wxConfig,_this,imgType,100,(res)=>{
                    _this.chartered = res;
                    _this.charteredStatus = 1;
                    localStorage.setItem('uploadSingleBox_bankCard',res);
                    _this.imgCleck = true;
                },(cancel)=>{
                    _this.imgCleck = true;
                });
            }
        },
        setUsenImge(imgType){
            let _this = this;
            if(_this.imgCleck){
                _this.imgCleck = false;
                let file = $('#'+imgType)[0].files[0];
                let formData = new FormData();
                formData.append('file', file);
                _this.$post('/?c=user&a=upload',formData).then((res)=>{
                    _this.imgCleck = true;
                    if(res.code == 0){
                        _this.chartered = res.data.img;
                        _this.charteredStatus = 1;
                        localStorage.setItem('uploadSingleBox_bankCard',res.data.img);   
                    }
                });
            }
        },
        
        imgRemove(key){
            this.chartered = chartered;
            this.charteredStatus = 0;
            localStorage.setItem('uploadSingleBox_bankCard','');
        },
    },
}
</script>

<style lang="less" scoped>
.dflex{display: flex;}

/*  */
.upload-box{
    margin-top: 10px;
    padding: 1px 12px 15px 12px;
}
.card-upload-box{
    .card-upload-img-box{
        .card-upload-label{
            font-size: 14px;
        }
        .card-upload-img{
            margin-top: 15px;
            .card-upload-img-from{
                flex: .5;
                margin-right: 12px;
                .uploadForm{
                    margin-bottom: 10px;
                    position: relative;
                    width: 9.06rem;
                    overflow: hidden;
                    height: 5.6rem;
                    .upload{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        margin: auto;
                        z-index: 2;
                        input{
                            display: block;
                            height: 100%;
                            width: 100%;
                        }
                    }
                    .personal-img{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        .img_remove{
                            position: absolute;
                            right: 0;
                            top: 0;
                            height: 33%;
                            width: 33%;
                            right: 0px;
                            top: 0px;
                            z-index: 2;
                            span{
                                display: block;
                                width: 18px;
                                height: 18px;
                                background-color: rgba(33, 33, 33, 0.65);
                                font-size: 16px;
                                border-radius: 100%;
                                line-height: 16px;
                                text-align: center;
                                color: #fff;
                                float: right;
                            }
                        }
                    }
                }
            }
            .card-upload-img-from:last-child{
                margin-right: 0;
            }
            .card-upload-text{
                font-size: 12px;
                text-align: center;
            }
        }
    }
    .card-upload-img-box:last-child{
        margin-top: 20px;
    }
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