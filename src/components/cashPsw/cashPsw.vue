<template>
    <div>
        <navbar type="left" title="设置支付密码" @clickleft="goPreviousPage"></navbar>
        <div class="cash-pwd-box">
            <!-- 手机号 -->
            <div class="van-call-box">
                <van-field
                    type="tel"
                    v-model="password"
                    label="新密码"
                    placeholder="请输入新的支付密码"
                    :error-message="Verification.password"
                    @blur="vtPassword"
                    maxlength="6"
                />
            </div>
            <div class="van-call-box">
                <van-field
                    type="tel"
                    v-model="confirmPassword"
                    label="确认密码"
                    placeholder="请再次输入支付密码"
                    :error-message="Verification.confirmPassword"
                    @blur="vtCatPassword"
                    maxlength="6"
                />
            </div>
            <div>
                <van-button @click="sendPsw" class="check-phone">保存</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import "../../assets/css/commonstyle.css"
    
    const navbar =  ()=>import("./../navbar/nav.vue");

    export default {
        props:['saveType','snCode'],
        data() {
            return{
                password:'',
                confirmPassword:'',
                Verification:{
                    password:'',
                    confirmPassword:'',
                },
                lock:true,
            }
        },
        created(){
            
        },
        methods:{
            goPreviousPage(){
                this.$emit('closeCashPsw')
            },
            //验证密码
            vtPassword(){
                let isNumber = /^\d{6}$/;
                if (this.password == '') {
                    this.Verification.password = "请输入支付密码"
                    return false;
                }else if(!isNumber.test(this.password)){
                    this.Verification.password = "密码必须为6位纯数字"
                    return false;
                }else{
                    this.Verification.password = ""
                    return true;
                }
            },
            //确认密码
            vtCatPassword(){
                if (this.confirmPassword == '') {
                    this.Verification.confirmPassword = "确认密码不能为空"
                    return false;
                }else if(this.confirmPassword != this.password){
                    this.Verification.confirmPassword = "确认密码与密码不一致。"
                    return false;
                }else{
                    this.Verification.confirmPassword = ""
                    return true;
                }
            },
            sendPsw(){
                if(!this.vtCatPassword()){
                    return false;
                }
                if(!this.vtPassword()){
                    return false;
                }
                this.$parent.$parent.$refs.loading.style.display = 'flex'
                if(this.lock){
                    this.lock = false;
                    this.$post('/?c=user&a=setPayPassWrod',{
                        passWrod : this.password,
                        snCode : this.snCode
                    }).then(res => {
                        this.$parent.$parent.$refs.loading.style.display = 'none'
                        switch (res.code) {
                            case 0 :
                                this.lock = true;
                                sessionStorage.removeItem('code')
                                sessionStorage.removeItem('scode')
                                this.$toast(res.msg);
                                
                                this.$router.go(-1);
                                break;
                            case 1 :
                                this.lock = true;
                                this.$toast(res.msg);
                                break;
                            default :
                                break;
                        }
                    })
                }
                
            },
        },
        components:{
            navbar,
        },
    }
</script>

<style lang="less">
    .cash-pwd-box{
        .van-call-box{
            input{
                -webkit-text-security: disc;
            }
        }
    }
</style>
<style scoped lang="less">
    .check-phone{
        width: 85%;
        margin: 20px auto;
        height: 44px;
        border-radius: 5px;
        background-color: #ee2d2d;
        color: #fff;
        display: block;
    }
</style>