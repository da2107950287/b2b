<template>
    <div class="login-dom">
        <div class="login-head">
            <img :src="locationIcon" width="100%">
        </div>
        <div class="comment-conent">
            <van-tabs v-model="active" title-active-color="#EE2D2D" title-inactive-color="#424242">
                <van-tab title="验证码登陆">
                <van-cell-group>
                        <van-field
                            v-model="phone"
                            placeholder="请输入手机号"
                            :left-icon="userIcon"
                            :error-message="Verification.phone"
                            @blur="VerifyCellPhone"
                            maxLength="11"
                            @keyup.enter="primaryDanger"
                        />
                        <van-cell-group class="sendsms-box">
                            <van-field
                                v-model="sms"
                                center
                                clearable
                                placeholder="请输入验证码"
                                :left-icon="pswIcon"
                                :error-message="Verification.sms"
                                @blur="VerifyCellSms"
                                :maxlength='limit'
                                @keyup.enter="primaryDanger"
                            >
                            </van-field>
                            <div class="sendsms after">
                                <span class="sendsms-line"></span>
                                <van-button slot="button" size="small" type="primary" @click="primary" :class="[{'canClick':!canClick},'sendsms-txt']">{{codeMsge}}</van-button>
                            </div>
                        </van-cell-group>
                    </van-cell-group>
                </van-tab>
                <van-tab title="密码登陆">
                    <van-cell-group>
                        <van-field
                            v-model="username"
                            placeholder="请输入手机号"
                            :left-icon="userIcon"
                            :error-message="Verification.username"
                            @blur="VerifyCellUsername"
                            @keyup.enter="pwd"
                        />
                        <van-field
                            v-model="password"
                            placeholder="请输入密码"
                            type="password"
                            :left-icon="pswIcon"
                            :error-message="Verification.password"
                            @blur="VerifyCellPassword"
                            @keyup.enter="pwd"
                        />
                        <van-cell-group class="sendsms-box" v-if="isCode">
                            <van-field
                                v-model="code"
                                placeholder="请输入验证码"
                                :left-icon="pswIcon"
                                :error-message="Verification.code"
                                @input="VerifyCellCode"
                                @blur="VerifyCellCode"
                                @keyup.enter="pwd"
                            >
                            </van-field>
                            <div class="sendsms after">
                                <div class="code-img-box" @click="captcha"><img :src="codeImg" alt=""></div>
                            </div>
                        </van-cell-group>
                    </van-cell-group>
                </van-tab>
            </van-tabs>

            <div class="login-button">
                <van-button class="button-large" size="large" v-if="active == 0" @click="primaryDanger">登录</van-button>
                <van-button class="button-large" size="large" v-else-if="active == 1" @click="pwd">登录</van-button>
            </div>
            <!-- 注册跳转 -->
            <div class="register">
                <a href="javascript:;" @click="forgetPwd">忘记密码</a>
                <a href="javascript:;" @click="toReg">新用户注册</a>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {is_wexin} from '../assets/js/commonAPI.js'
    import 'font-awesome/css/font-awesome.css'

    const locationIcon = require('../assets/img/login-icon.png');
    const userIcon = require('../assets/img/icon/user-icon.png');
    const pswIcon = require('../assets/img/icon/psw-icon.png');
    export default {
        data(){
            return{
                phone:'',//手机号
                sms:'',//验证码
                limit:'',//验证码长度
                state:'',//验证码code
                username:'',//登录名称
                password:'',//密码登录

                active:0,//切换标签
                codeMsge:'获取验证码',
                totalTime: 60,
                canClick: true, //添加验证码开关canClick

                Verification:{//错误提示
                    phone:'',
                    sms:'',
                    username:'',
                    password:'',
                    code:'',
                },
                isCode:false,//图片验证码限制 false关闭限制 true开启限制
                code:'',//图片验证码
                codeImg:'',//图片验证码
                locationIcon:locationIcon,
                userIcon:userIcon,
                pswIcon:pswIcon,
            }
        },
        
        created(){
            
            if(is_wexin()){
                this.$post('/?c=wechat&a=getOauth',{
                    redirect: localStorage.getItem('fullPath')
                })
                .then((res)=>{
                    switch (res.code){
                        case 0:
                            window.location.href = res.data.url
                            sessionStorage.setItem('cl',1);
                            break;
                        default:
                            break;
                    }
                })
                /*let APPID = 'wx315645230ec862dc';
                let REDIRECT_URI = 'http://jgnh36.natappfree.cc/wechatLogin.html';
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ APPID +'&redirect_uri='+ REDIRECT_URI +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'*/
            }

        },
        methods:{
            //图片验证码
            captcha(){
                this.$getCode(
                    '/?c=user&a=captcha',
                    {},
                ).then(res=>{
                    return 'data:image/png;base64,' + btoa(
                        new Uint8Array(res)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                }).then(data => {
                    this.isCode = true;
                    this.codeImg = data;
                })
            },
            primary(){
                if (!this.VerifyCellPhone()) return; 
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
                        this.codeMsge = '重新发送验证码';
                        this.totalTime = 60;
                        this.canClick = true;  //这里重新开启
                    }
                },1000);

                this.$post('/?c=user&a=sendSms',{
                    number: this.phone
                }).then((res)=>{
                    switch (res.code) {
                        case 0:
                            this.$appFunc.prototype.setSendMsgNum();

                            this.limit = res.data.limit;
                            this.state = res.data.state;
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
            //====>短信登录
            primaryDanger(){
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=user&a=login',{
                    type: 0,
                    scode:this.state,
                    username:this.phone,
                    pwd:this.sms
                }).then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch (res.code) {
                        case 0:
                            localStorage.setItem('loading',false);
                            if(!this.$appFunc.prototype.isEmpty(res.data.label_name)){/* 行业类名 */
                                localStorage.setItem('specialtitle',res.data.label_name)
                            }
                            localStorage.setItem('isSeller',res.data.seller);
                            localStorage.setItem('b2bTokenId', res.data.token);
                            this.$router.push({
                                path: '/index'
                            });
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            this.$toast('登录失败!请检查手机号或验证码是否正确');
                            break;
                    }
                });
            },
            // 手机密码登录
            pwd(){

                if(this.isCode){
                    if(!this.VerifyCellCode)return false;
                    if(!this.VerifyCellPassword)return false;
                }
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=user&a=login',{
                    type: 4,
                    username:this.username,
                    pwd:this.password,
                    code:this.code,
                }).then(res => {
                    this.$parent.$refs.loading.style.display = 'none'
                    switch (res.code) {
                        case 0:
                            localStorage.setItem('loading',false);
                            if(!this.$appFunc.prototype.isEmpty(res.data.label_name)){/* 行业类名 */
                                localStorage.setItem('specialtitle',res.data.label_name)
                            }
                            localStorage.setItem('isSeller',res.data.seller);
                            localStorage.setItem('b2bTokenId', res.data.token);
                            
                            this.$router.push({//你需要接受路由的参数再跳转
                                path: '/index'
                            });
                            break;
                        case 1:
                            if(res.data.num == 3){
                                this.password = "";
                                this.$toast("密码错误次数过多，请填写图片验证码");
                                this.captcha();
                            }else if(res.data.num == 4){
                                this.$toast(res.msg);
                                this.captcha();
                            }else{
                                this.$toast(res.msg);
                            }
                            break;
                        default:
                            this.$toast('登录失败!账号或密码错');
                            break;
                    }
                })
            },
            // 忘记密码
            forgetPwd(){
                this.$router.push({
                    path:"/GetPassword"
                })
            },
            // 注册
            toReg(){
                this.$router.push({
                    path:"/register"
                })
            },
            //====>验证登陆密码
            VerifyCellPassword(){
                if(this.password==''){
                    this.Verification.password = '登录密码不能为空';
                    return false
                }else{
                    this.Verification.password = '';
                    return true
                }
            },
            //====>验证图片验证码是否输入
            VerifyCellCode(){
                if(this.code==''){
                    this.Verification.code = '验证码不能为空';
                    return false
                }else{
                    this.Verification.code = '';
                    return true
                }
            },
            //====>验证用户名
            VerifyCellUsername(){
                let inputDome = $(event.target); 
                if(this.username==''){
                    inputDome.focus();
                    this.Verification.username = '手机号不能为空';
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.username)){
                    this.Verification.username = '手机号码不正确，请重新输入';
                    return false
                }else{
                    this.Verification.username = '';
                    return true
                }
            },
            //====>验证手机验证码
            VerifyCellSms(){
                if(this.sms==''){
                    this.Verification.sms = '验证码不能为空';
                    return false
                }else{
                    this.Verification.sms = '';
                    return true
                    }
            },
            //====>验证手机号码
            VerifyCellPhone(){
                let inputDome = $(event.target); 
                if(this.phone==''){
                    inputDome.focus();
                    this.Verification.phone = '手机号码不能为空';
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.phone)){
                    inputDome.focus();
                    this.Verification.phone = '手机号码不正确，请重新输入';
                    return false
                }else{
                    this.Verification.phone = '';
                    return true
            }
        },
        },
        beforeRouteEnter(to, from, next) {
            if(from.fullPath == '/'){
                localStorage.setItem('fullPath','');
            }else{
                localStorage.setItem('fullPath',from.fullPath);
            }
            next();
        }
    }
</script>

<style lang="less">
    .login-dom{
        .van-hairline--top-bottom::after{
            border-top: 0;
            border-color:#f2f2f2;
        }
        .van-tabs__content{
            margin-top: 30px;
        }
        .van-field__left-icon{
            display: flex;
            .van-icon--image{
                margin: auto;
            }
        }
    }
</style>

<style lang="less" scoped>

    .login-dom{
        height: 100%;
        background-color: #fff;
        .login-head{
            background-color: #fff;
            text-align: center;
                img{
                    width: 5.2rem;
                    height: 5.2rem;
                    margin: 2rem 0;
                    display: inline-block;
                    background-color: #fff;
                }
        }
        .comment-conent{
            padding: 0 28px;
        }
        
        .login-button{
            border-top: 1px solid #eee;
                padding: 20px 0;
        }
        .register{
                display: flex;
                justify-content: space-between;
                >a{
                    font-size: 14px;
                    color: #424242;
                }
            }
        }
        .button-large{
            color: #fff;
            background-color: #EE2D2D;
            border-radius: 5px;
            height: 44px;
            line-height: 42px;
            font-size: 18px;
        }
        .sendsms-box{
            background-color: #fff;
            display: flex;
            > div{
                flex: 1;
        }
        .sendsms {
            width: auto;
            float: right;
            display: flex;
            flex:none;
            .sendsms-line{
                height: 1.07rem;
                width:1px;
                background-color: #D8D8D8;
                display:block;
                margin: auto 0;
            }
            .sendsms-txt{
                margin: auto 0;
                padding: 0;
                border:none;
                font-size: .64rem;
                color: #EE2D2D;
                padding: 0 .64rem;
                background-color: #fff;
            }
            .sendsms-txt.canClick{
                color: #ccc;
            }
            .code-img-box{
                height: 44px;
                display: flex;
                img{
                    display: block;
                    height: 100%;
                }
            }

        }
    }
</style>