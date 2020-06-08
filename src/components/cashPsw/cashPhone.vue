<template>
    <div>
        <navbar type="left" title="验证手机号" @clickleft="goPreviousPage"></navbar>
        <div class="cash-phone-box">
            <!-- 手机号 -->
            <div class="van-call-box">
                <van-field
                    type="tel"
                    v-model="contacTinformation"
                    label="手机号"
                    placeholder=""
                    readonly
                    :error-message="Verification.contacTinformation"
                    @blur="vtContacTinformation"
                    maxlength="11"
                />
            </div>
            <!-- 输入验证码 -->
            <div class="sendsms-box van-call-box">
                <van-field
                    v-model="sms"
                    center
                    clearable
                    label="验证码"
                    placeholder="请输入短信验证码"
                    :error-message="Verification.sms"
                    @blur="vtSms"
                >   
                </van-field>
                <div class="sendsms after">
                    <span class="sendsms-line"></span>
                    <van-button slot="button" size="small" type="primary" @click="getCode" class="sendsms-txt">{{codeMsge}}</van-button>
                </div>
            </div>
            <div>
                <van-button @click="openCashPsw" class="check-phone">提交</van-button>
            </div>
        </div>

        <cashPsw class="cash-psw" v-if="cashPswBox" @closeCashPsw="closeCashPsw" :saveType="saveType" :snCode="snCode"></cashPsw>
    </div>
</template>

<script>
    import $ from 'jquery';
    import "../../assets/css/commonstyle.css"
    
    const navbar =  ()=>import("./../navbar/nav.vue");
    const cashPsw =  ()=>import("./cashPsw.vue");

    export default {
        data() {
            return{
                cashPswBox:false,
                saveType:'add',
                contacTinformation:'',
                scode:'',
                sms:'',

                snCode:'',
                
                canClick:true,
                codeMsge:'发送验证码',
                totalTime:60,

                Verification:{
                    contacTinformation:'',
                    sms:'',
                },

                userInfo:'',
            }
        },
        created(){
            let userInfo = sessionStorage.getItem('userInfo');
            let scode = sessionStorage.getItem('scode');
            if(scode){
                this.scode = scode;
            }
            if(userInfo){
                this.userInfo = JSON.parse(userInfo);
                this.contacTinformation = this.userInfo.mobile_phone;
            }else{
                this.$post('/?c=user&a=info',).then(res => {
                    switch (res.code) {
                        case 0 :
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data));
                            this.userInfo = res.data;
                            this.contacTinformation = res.data.mobile_phone;
                            break;
                        case 1 :
                            break;
                        default :
                            break;
                    }
                })
            }
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            closeCashPsw(){
                this.cashPswBox = false;
            },
            openCashPsw(){
                let vtContacTinformation = this.vtContacTinformation();
                let vtSms = this.vtSms();
                this.$parent.$refs.loading.style.display = 'flex'
                if(vtSms){
                    this.$post('/?c=user&a=checkMsg',{
                        scode: this.scode,
                        mobile_code: this.sms,
                        mobile_phone: this.contacTinformation
                    }).then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch (res.code) {
                            case 0:
                                this.cashPswBox = true;
                                this.snCode = res.data.snCode;
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                    });
                }
            },
            //短信验证码
            vtSms(){
                let sum = /^[1-9]\d*$/
                if(!sum.test(this.sms)){
                    this.Verification.sms = '请输入验证码'
                    return false
                }else{
                    sessionStorage.setItem('code',this.sms);
                    this.Verification.sms = ''
                    return true
                }
            },
            //联系方式
            vtContacTinformation(){
                if(this.contacTinformation == ''){
                    this.Verification.contacTinformation = '请输入手机号'
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.contacTinformation)){
                    this.Verification.contacTinformation = '请输入正确的手机号'
                    return false
                }else{
                    this.Verification.contacTinformation = ''
                    return true
                }
                // 电话号码
                sessionStorage.setItem('telNumber',this.contacTinformation);
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

                            this.scode = res.data.state;
                            sessionStorage.setItem('scode',res.data.state);
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
        },
        components:{
            navbar,
            cashPsw,
        },
    }
</script>
<style scoped lang="less">
    .van-call-box{
        border-bottom: 1px solid #f2f2f2;
    }
    .van-call-box:last-child{
        border-bottom: 0;
    }
    .sendsms-box{
        background-color: #fff;
        display: flex;
        > div{
            flex: 1;
        }
        > div.sendsms{
            width: auto;
            float: right;
            display: flex;
            flex:none;
        }
    }
    .after::after{
        display: table;
        content: " ";
        clear: both;
    }
    .sendsms {
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
        .sendsms-txt.van-button--disabled{
            color: #666;
        }
    }
    
    .check-phone{
        width: 85%;
        margin: 20px auto;
        height: 44px;
        border-radius: 5px;
        background-color: #ee2d2d;
        color: #fff;
        display: block;
    }
    .cash-psw{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1002;
        background-color: #f2f2f2;
    }
</style>