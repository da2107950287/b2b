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
                            :error-message="Verification.name"
                            @click-icon="$toast('question')"
                            @blur="vtName"
                        />
                        <van-field
                            v-model="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            required
                            :error-message="Verification.password"
                            @blur="vtPassword"
                        />
                        <van-field
                            v-model="confirmPassword"
                            type="password"
                            label="确认密码"
                            placeholder="请输入确认密码"
                            required
                            :error-message="Verification.confirmPassword"
                            @blur="vtCatPassword"
                        />
                        <van-field
                            v-model="mailbox"
                            label="邮箱"
                            placeholder="请输入邮箱"
                            required
                            :error-message="Verification.mailbox"
                            @blur="vtMailbox"
                        />
                         <van-field
                            v-model="contacTinformation"
                            label="联系方式"
                            placeholder="请输入联系方式"
                            required
                            :error-message="Verification.contacTinformation"
                            @blur="vtContacTinformation"
                        />
                    </van-cell-group>
                    <van-cell-group>
                            <van-field
                                v-model="sms"
                                center
                                clearable
                                label="短信验证码"
                                placeholder="请输入短信验证码"
                                required
                                :error-message="Verification.sms"
                                @blur="vtSms"
                            >
                                <van-button slot="button" size="small" type="primary" @click="getCode">{{codeMsge}}</van-button>
                            </van-field>
                    </van-cell-group>
                </div>
            </div>

            <!-- 完成页面 -->
            <!-- <div class="over-info" v-show='active == 2'>
                完成
            </div> -->

        </div>
      <div class="user-info-button">
           <van-button @click="register" size="large" type="danger" v-show="active == 0">注册</van-button>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import {post,is_wexin} from '../assets/js/commonAPI.js'
    import api from '../assets/js/apiHeader.js'
    import 'font-awesome/css/font-awesome.css'
    

    //引入微信上传js


    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                active:0,
                username:'',            //用户名
                password:'',            //密码
                confirmPassword:'',     //确认密码
                mailbox:'',             //邮箱
                Name:'',            //法人姓名
                contacTinformation:'',  //联系方式
                imageUrl: '',           //图片地址 / 营业执照
                val: 0,                 //控制显示
                sms:'',                 //短信验证码
                codeMsge:'发送验证码',
                canClick: true,         //添加canClick
                totalTime: 60,
                labelId:0,

                Verification:{
                    name:'',
                    password:'',
                    confirmPassword:'',
                    mailbox:'',
                    contacTinformation:'',
                    sms:'',
                }
            }
        },
        created(){
           
        },
        methods:{
            //====>返回首页
            goReturn(){
                this.$router.go(-1);
            },
          
            register(){
                /* 表单验证 */
                /*
                //验证用户名
                if(this.username == ''){
                    this.$toast('请输入用户名')
                    this.Verification.name = '请输入用户名'
                    return;
                }else{
                    this.Verification.name = ''
                }

                //验证密码
                if(this.password == ''){
                    this.$toast('请输入密码')
                    this.Verification.password = '请输入密码'
                    return;
                }else{
                    this.Verification.password = ''
                }

                //确认密码
                if(this.password == this.confirmPassword){
                    this.Verification.confirmPassword = '密码和确认密码不一致'
                    return
                }else if(this.confirmPassword == ' '){
                    this.$toast('请输入确认密码')
                    this.Verification.confirmPassword = '请输入确认密码'
                }else{
                    this.Verification.confirmPassword = ''
                }

                //邮箱
                if(this.mailbox == ''){
                    this.$toast('请输入邮箱')
                    this.Verification.mailbox = '请输入邮箱'
                    return
                }else{
                    this.Verification.mailbox = ''
                }

                //企业名称
                if(this.enterpriseName == ''){
                    this.Verification.enterpriseName = '请输入企业名称'
                    return
                }else{
                    this.Verification.enterpriseName = ''
                }

                //公司地址
                if(this.addressInfo == ''){
                    this.Verification.addressInfo = '请输入公司地址'
                    return
                }else{
                    this.Verification.addressInfo = ''
                }

                //法人姓名
                if(this.fullName == ''){
                    this.Verification.fullName = '请输入法人姓名'
                    return
                }else{
                    this.Verification.fullName = ''
                }

                //联系方式
                if(this.contacTinformation == ''){
                    this.Verification.contacTinformation = '请输入联系方式'
                    return
                }else{
                    this.Verification.contacTinformation = ''
                }

                //短信验证码
                if(this.sms == ''){
                    this.Verification.sms = '请输入短信验证码'
                    return
                }else{
                    this.Verification.sms = ''
                }

                //营业执照号
                if(this.businessLicenseNo == ''){
                    this.Verification.businessLicenseNo = '请输入营业执照号'
                    return
                }else{
                    this.Verification.businessLicenseNo = ''
                }
                //上传图片
                if(this.val == 1){
                    this.$toast('请上营业执照');
                }else if(this.val == 2){
                    this.$toast('请重新上传营业执照');
                }
                 */
                 
                this.$post('/?c=user&a=register',{
                    user_name:this.username,
                    user_pwd:this.password,
                    phone:this.contacTinformation,
                    email:this.mailbox,
                    mobile_code:this.sms,
                }).then((res)=>{
                    switch(res.code){
                        case 0:
                            this.$router.push({
                                path:'/index'
                            });
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            break;
                    }
                });
            },
            //获取短信验证码
            getCode(){
                if (!this.vtContacTinformation()) return; 
                if (!this.$appFunc.prototype.getSednMsgNum()){
                    this.$toast("您发送短信的次数太频繁了！") 
                    return
                }; 
                if (!this.canClick) return; 
                this.canClick = false;
                this.codeMsge = this.totalTime + 's后重新发送';
                let clock = window.setInterval(() => {
                    this.totalTime--;
                    this.codeMsge = this.totalTime + 's后重新发送';
                    if (this.totalTime < 0) {
                        window.clearInterval(clock);
                        this.codeMsge = '发送验证码';
                        this.totalTime = 60;
                        this.canClick = true;  //这里重新开启
                    }
                },1000);
                this.$post('/?c=user&a=sendSms',{
                    number: this.contacTinformation
                }).then((res)=>{
                    switch (res.code) {
                        case 0:
                            this.$appFunc.prototype.setSendMsgNum();
                            this.$toast(res.msg);
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            this.$toast("网络故障，发送短信失败");
                            break;
                    }
                });
            },
            //验证用户名
            vtName(){
                let han = /^[\u4e00-\u9fa5]+$/;
                if(this.username == ''){
                    this.Verification.name = '用户名以字母或者数字开头同时不能少于6位且不能大于11位'
                    return
                }else if(han.test(this.username)){
                    this.Verification.name = "不能为中文，请以数字或者字母开头，特殊字符支持、_、-、@、.'";
                    return
                }else{
                    this.Verification.name = "";
                }
            },
            //验证密码
            vtPassword(){
                let isNumber = /\d/;
                let isLetter = /[a-zA-z]/;
                if (this.password == '') {
                    this.Verification.password = "请输入密码且包含特殊字符，大小写字母和数字。"
                    return
                }else if ( this.password.length < 6 ) {
                    this.Verification.password = "密码长度不能小于6位，且必须包含特殊字符，大小写字母和数字。"
                    return
                }else if( !isNumber.test(this.password) ){
                    this.Verification.password = "密码过于简单，密码必须包含特殊字符，大小写字母和数字。"
                    return
                }else if( !isLetter.test(this.password) ){
                    this.Verification.password = "密码过于简单，密码必须包含特殊字符，大小写字母和数字。"
                    return
                }else{
                    this.Verification.password = ""
                }
            },
            //确认密码
            vtCatPassword(){
                if (this.confirmPassword == '') {
                    this.Verification.confirmPassword = "确认密码不能为空"
                    return
                }else if(this.confirmPassword != this.password){
                    this.Verification.confirmPassword = "确认密码与密码不一致。"
                    return
                }else{
                    this.Verification.confirmPassword = ""
                }
            },
            //验证邮箱
            vtMailbox(){
                let reg = /^[a-zA-Z0-9]+[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if(this.mailbox == ''){
                    this.Verification.mailbox = '请输入邮箱'
                    return
                }else if(!reg.test(this.mailbox)){
                    this.Verification.mailbox = '请输入正确的邮箱'
                    return
                }else{
                    this.Verification.mailbox = ''
                }
            },
          
            //联系方式
            vtContacTinformation(){
                if(this.contacTinformation == ''){
                    this.Verification.contacTinformation = '请输入联系方式'
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.contacTinformation)){
                    this.Verification.contacTinformation = '请输入正确的联系方式'
                    return false
                }else{
                    this.Verification.contacTinformation = ''
                    return true
                }
            },
            //短信验证码
            vtSms(){
                let sum = /^[1-9]\d*$/
                if(!sum.test(this.sms)){
                    this.Verification.sms = '请输入验证码'
                    return
                }else{
                    this.Verification.sms = ''
                }
            },

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
   .van-button--danger{
        background-color: #d1442b;
        border: 1px solid #d1442b;
    }
    .van-button--primary {
        color: #777;
        background-color: #fff;
        border: 1px solid #d1442b;
    }

    .nl-button{
        margin-right: .5rem;
    }
    .ec{
        color: #fff;
        background-color: #d1442b;
        border: 1px solid #d1442b;
    }
</style>