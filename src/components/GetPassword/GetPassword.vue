<template>
    <div class="getPassword-dom">
        <van-nav-bar
            title='修改密码'
            left-arrow
            @click-left='goPreviousPage'
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
        </van-nav-bar>
            
        <!-- 修改密码 -->
        <div class="user-info">
            <!-- 基本信息 -->
            <div class="basic-info">
                <div class="content">
                    <van-cell-group>
                        <van-field
                            v-model="phone"
                            label="手机号："
                            placeholder="请输入手机号"
                            :error-message="Verification.phone"
                            @blur="phoneBlur"
                            @keyup.enter="register"
                        />
                        <van-cell-group class="sendsms-box">
                            <van-field
                                v-model="sms"
                                center
                                clearable
                                label="验证码："
                                placeholder="请输入验证码"
                                :error-message="Verification.sms"
                                @blur="smsBlur"
                                :maxlength='limit'
                                @keyup.enter="register"
                            >
                            </van-field>
                            <div class="sendsms after">
                                <span class="sendsms-line"></span>
                                <van-button slot="button" size="small" type="primary" @click="sendSms" :class="[{'canClick':!canClick},'sendsms-txt']">{{codeMsge}}</van-button>
                            </div>
                        </van-cell-group>
                        <van-field
                            v-model="password"
                            type="password"
                            label="新密码："
                            placeholder="请输入新密码"
                            :error-message="Verification.password"
                            @blur="PasswordBlur"
                            @keyup.enter="register"
                        />
                        <van-field
                            v-model="ConfirmPassworder"
                            type="password"
                            label="确认密码："
                            placeholder="请再次输入"
                            :error-message="Verification.confirmPassword"
                            @blur="ConfirmPassworderBlur"
                            @keyup.enter="submitPassword"
                        />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <div class="user-info-button">
            <van-button class="button-large" size="large" @click="submitPassword">修改密码</van-button>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                phone:'',//手机号
                sms:'',//验证码
                password:'',//密码
                ConfirmPassworder:'',//确认密码


                codeMsge:'获取验证码',
                totalTime:60,
                scode:'',//验证码安全码
                limit:'',//验证码长度
                canClick:true,//验证码发送开关

                Verification:{//错误提示
                    phone:'',
                    password:'',
                    confirmPassword:'',
                    sms:'',
                },
            }
        },
        methods:{
            // 返回上一页
            goPreviousPage(){
                this.$router.go(-1);
            },
            // 验证手机界面
            phoneBlur(){
                let inputDome = $(event.target); 
                console.log(this.phone);
                if(this.phone == ''){
                    inputDome.focus();
                    this.Verification.phone = '请输入手机号码'
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.phone)){
                    inputDome.focus();
                    this.Verification.phone = '请输入正确的手机号码'
                    return false
                }else{
                    this.Verification.phone = ''
                    return true
                }
            },
            smsBlur(){
                if(this.sms == ''){
                    this.Verification.sms = '请输入短信验证码'
                    return false
                }else{
                    this.Verification.sms = ''
                    return true
                }
            },
            // 密码界面
            PasswordBlur(){
                let inputDome = $(event.target); 
                let isLetter = /[a-zA-z]|\/d/;
                if(this.password == ''){
                    inputDome.focus();
                    this.Verification.password = '新密码不能为空';
                    return false
                }else if(!isLetter.test(this.password)){
                    inputDome.focus();
                    this.Verification.password = '密码过于简单，密码必须包含特殊字符，大小写字母和数字。';
                    return false
                }else{
                    this.Verification.password = '';
                    return true
                }
            },
            ConfirmPassworderBlur(){
                let inputDome = $(event.target); 
                if(this.ConfirmPassworder == ''){
                    inputDome.focus();
                    this.Verification.confirmPassword = '确认密码不能为空!';
                    return false
                }else if(this.password != this.ConfirmPassworder){
                    inputDome.focus();
                    this.Verification.confirmPassword = '密码不一致，请重新输入!';
                    return false
                }else{
                    this.Verification.confirmPassword = '';
                    return true
                }
            },
            // 发送验证码
            sendSms(){
                if (!this.phoneBlur()) return; 
                if (!this.$appFunc.prototype.getSednMsgNum()){
                    this.$toast("您发送短信的次数太频繁了！") 
                    return false
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
                    number: this.phone
                }).then((res)=>{
                    switch (res.code) {
                        case 0:
                            this.$appFunc.prototype.setSendMsgNum();
                            this.scode = res.data.state
                            this.limit = res.data.limit
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
            submitPassword(){
                if(!this.phoneBlur()) return false
                if(!this.smsBlur()) return false
                if(!this.PasswordBlur()) return false
                if(!this.ConfirmPassworderBlur()) return false

                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=user&a=resetPwd',{
                    code:this.sms,
                    scode:this.scode,
                    mobile_phone:this.phone,
                    password:this.password,
                    re_password:this.ConfirmPassworder
                })
                .then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            this.$toast('密码修改成功!');
                            this.$router.push({
                                path:'/index'
                            })
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .van-nav-bar .van-icon.icon-style{
        color:#333;
        font-size: 15px;
    }
    .getPassword-dom{
        height: 100%;
        background-color: #fff;
    }
    
    .button-large{
        color: #fff;
        background-color: #EE2D2D;
        border-radius: 5px;
        height: 44px;
        line-height: 42px;
        font-size: 18px;
    }
    .user-info-button{
        padding: 0 22px;
        margin-top: 20px;
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
            
        }
    }
</style>