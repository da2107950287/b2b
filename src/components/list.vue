<template>
    <div>
        <!-- 导航 -->
        <van-nav-bar
            title='用户注册'
            left-text='返回'
            left-arrow
            @click-left='goReturn'
        />
        <!-- 用户注册信息 -->
        <div class="user-info">
            <van-steps :active='active'>
                <van-step>基本信息</van-step>
                <van-step>公司信息</van-step>
            </van-steps>

            <!-- 基本信息 -->
            <div class="basic-info" v-show='active == 0'>
                <div class="content">
                    <van-cell-group>
                        <van-field
                            v-model="username"
                            required
                            clearable
                            label="用户名"
                            placeholder="请输入用户名"
                            @click-icon="$toast('question')"
                        />
                        <van-field
                            v-model="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            required
                        />
                        <van-field
                            v-model="confirmPassword"
                            type="password"
                            label="确认密码"
                            placeholder="请输入确认密码"
                            required
                        />
                        <van-field
                            v-model="mailbox"
                            label="邮箱"
                            placeholder="请输入邮箱"
                            required
                        />
                    </van-cell-group>
                </div>
            </div>

            <!-- 公司信息 -->
            <div class="basic-info" v-show='active == 1'>
                <div class="content">
                    <van-cell-group>
                        <van-field
                            v-model="enterpriseName"
                            label="企业名称"
                            placeholder="企业名称"
                        />
                        <van-field
                            v-model="addressInfo"
                            label="公司地址"
                            placeholder="公司所在地"
                        />
                        <van-field
                            v-model="fullName"
                            label="法人姓名"
                            placeholder="请输入法人姓名"
                        />
                        <van-field
                            v-model="contacTinformation"
                            label="联系方式"
                            placeholder="请输入联系方式"
                        />
                        <van-field
                            v-model="businessLicenseNo"
                            label="营业执照号"
                            placeholder="请输入营业执照号"
                        />
                    </van-cell-group>
                    <div class="business-box">
                        <div class="business-licence">
                            <span>营业执照</span>
                            <div @click="upload" class="uploadStyle">
                                <p v-show="val == 0" class="uploadIcon"><i class="fa fa-cloud-upload" aria-hidden="true"></i>点击上传</p>
                                <p v-show="val == 1" class="uploadSuccess"><i class="fa fa-check-circle" aria-hidden="true"></i>上传成功</p>
                                <p v-show="val == 2" class="uploadError"><i class="fa fa-close" aria-hidden="true"></i>上传错误，请重新选择</p>
                            </div>
                            <form id="uploadForm" enctype="multipart/form-data">
                                <input id="file" type="file" name="file" class="file"/>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>

            <!-- 完成页面 -->
            <div class="over-info" v-show='active == 2'>
                完成
            </div>

        </div>
        <!-- 步进按钮 -->
        <div class="user-info-button">
            <van-button @click="upper" size="large" type="primary" v-show="active == 1">上一步</van-button>
        </div>
        <div class="user-info-button">
            <van-button @click="lower" size="large" type="danger" v-show="active == 0">下一步</van-button>
            <van-button @click="register" size="large" type="danger" v-show="active == 1">注册</van-button>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import {post} from '../assets/js/commonAPI.js'
    import api from '../assets/js/apiHeader.js'
    import 'font-awesome/css/font-awesome.css'
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                active:0,
                username:'',            //====>用户名
                password:'',            //====>密码
                confirmPassword:'',     //====>确认密码
                mailbox:'',             //====>邮箱
                enterpriseName:'',      //====>企业名称
                addressInfo:'',         //====>公司地址
                fullName:'',            //====>法人姓名
                contacTinformation:'',  //====>联系方式
                businessLicenseNo:'',   //====>营业执照号
                imageUrl: '',           //====>图片地址
                val: 0,                 //====>控制显示
                imgURL:'',              //====>营业执照
            }
        },
        methods:{
            //====>返回首页
            goReturn(){
                this.$router.go(-1);
            },
            //====>上一步
            upper(){
                if(this.active != 0){
                    this.active--
                }
            },
            //====>下一步
            lower(){
                if(this.active <= 1){
                    this.active++
                }
            },
            //====>选择公司地址
            address(){
                console.log('百度');
            },
            //====>上传图片
            upload(){
                let _this = this;
                $('#file').click();
                $('#file').on('change',function(){
                    let file = this.files[0];
                    let formData = new FormData($('#uploadImg')[0]);
                        formData.append('file', file);
                        _this.$post('/mobile/index.php?c=user&a=upload',formData).then((res)=>{
                            switch(res.code){
                                case 0:
                                    _this.val = 1;
                                    _this.imageUrl = res.data.img;
                                    break;
                                default:
                                    _this.val = 2;
                                    break;
                            }
                        });
                });
            },
            register(){
                this.$post('/mobile/index.php?c=user&a=register',{
                    user_name:this.username,
                    user_pwd:this.password,
                    corporation_name:this.enterpriseName,
                    address:this.addressInfo,
                    license_key:this.businessLicenseNo,
                    representative:this.fullName,
                    phone:this.contacTinformation,
                    attachments:this.imgURL,
                    email:this.mailbox
                }).then((res)=>{
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped>
    .user-info,
    .user-info-button{
        background-color: #fff;
        padding: 0 1rem;
    }
    .user-info-button{
        height: 64px;
    }
    .user-info-button>button{
        margin: .6rem 0;
    }
    /* 注册信息样式 */

    .business-box{
        padding: 10px 15px;
    }
    .business-licence{
        color: #323233;
        font-size: 14px;
    }
    .business-img{
        width: 100%;
        height: 10rem;
        border: 1px dashed #4b0;
        border-radius: .3rem;
    }
    .uploader-img{
        width: 100%;
        height: 100%;
    }


    .file{
        display: none;
    }
    .uploadStyle{
        width: 6rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: .3rem;
        margin-left: 1.2rem;
        display: inline-block;
        border: 1px dotted #757575;
    }
    .uploadIcon,
    .uploadSuccess,
    .uploadError{
        margin: 0;
        font-size: 14px;
        text-align: center;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        color: #757575;
        display: inline-block;
    }
    .uploadSuccess{
        color: #44bb00;
    }
    .uploadError{
        color: #d83636;
    }
</style>