<template>
    <div class="contain">
        <!-- 标题栏 -->
        <navbar class="cashierBar" type="left" title="收银台" @clickleft="goPreviousPage"></navbar>
        <!-- 内容 -->
        <div class="cashierConent">
            <!-- 支付截止时间 -->
            <p class="endTime"><span>{{endtime}}</span> <br>请尽快完成支付，超时订单将自动取消</p>
            <div class="accountsPayable">
                应付款:
                <br/>
                <span><small>¥</small>{{Number(money).toFixed(2)}}</span>
            </div>
            <div class="PaymentList">
                <van-radio-group v-model="radio" v-if='show != "WeChat"'>
                    <van-cell-group class="radio-box">
                        <van-cell v-for="(item,index) in data" :key="index" clickable @click="radioID(item)">
                            <template slot="title">
                                <div class="PaymentListType" v-if="item.pay_id == 'wxpay'"><img :src="WeChat" width="26px" /> 微信支付</div>
                                <div class="PaymentListType" v-if="item.pay_id == 'alipay'"><img :src="Alipay" width="26px" /> 支付宝支付</div>
                                <div class="PaymentListType" v-if="item.pay_id == 'balance'"><img :src="balance" width="26px" /> 余额支付</div>
                            </template>
                            <van-radio checked-color="#EE2D2D" :name="item.pay_id" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>

                <van-radio-group v-model="radio" v-if='show == "WeChat"'>
                    <van-cell-group class="radio-box">
                        <div v-for="(item,index) in data" :key="index" clickable @click="radioID(item)">
                            <van-cell v-if="item.pay_id != 'alipay'">
                                <template slot="title">
                                    <div class="PaymentListType" v-if="item.pay_id == 'wxpay'"><img :src="WeChat" width="26px" /> 微信支付</div>
                                    <div class="PaymentListType" v-if="item.pay_id == 'balance'"><img :src="balance" width="26px" /> 余额支付</div>
                                </template>
                                <van-radio checked-color="#EE2D2D" :name="item.pay_id" />
                            </van-cell>
                        </div>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </div>
        <!-- 提交按钮 -->
        <div style="height:50px"></div>
        <div class="cashierSubmit">
            <van-button size="large" type="danger" v-if='show != "WeChat"' @click="clickPayable">提交</van-button>
            <van-button size="large" type="danger" v-if='show == "WeChat"' @click="clickWeChatPayable">提交</van-button>
        </div>
        <van-popup @close="closePassWord" v-model="open" position="bottom" :style="{ height: '70%'}" style="border-radius: 15px 15px 0 0">
            <payPassWord class="cash-out" @yuePay="yuePay" @closePassWord="closePassWord" :no_psw="isSetPsw" :inputDisable="inputDisable"></payPassWord>
        </van-popup>

        
        <div v-if="inputDisable || !vloadingShow" class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {is_wexin} from '../../assets/js/commonAPI.js';
    import {wxPay,wxStart} from '../../assets/js/wxjs.js';
    import $ from 'jquery';
    // 如果需要商家确认跳转待支付页面
    // import waitPay from './component/waitPay.vue'

    const navbar =  ()=>import("./../navbar/nav.vue");
    const payPassWord =  ()=>import("./payPassWord.vue");
    const vloading =  ()=>import("../vloading.vue");

    const innerHeight = $(window).height();
    export default {
        data() {
            return {
                //支付截止时间
                endtime: '',
                money: 0,
                radio: 0,
                data:[],
                id:0,
                WeChat:require('../../assets/img/WeChat.png'),
                Alipay:require('../../assets/img/Alipay.png'),
                balance:require('../../assets/img/balance.png'),
                show:'',
                clock:'on',
                innerHeight : innerHeight,
                open:false,
                inputDisable:false, // 判断是否可以继续输入密码
                isSetPsw:-1,    //  是否设置支付密码 0 未设置 1已设置 -1默认

                vloadingShow:true,
            }
        },
        created(){
            let wapPrice=sessionStorage.getItem('wapPrice');
            if(wapPrice){
                 this.money = wapPrice
            }
            this.id = this.$route.query.id;
            this.endtime = this.$route.query.endtime

            if(is_wexin()){
                this.show = 'WeChat';
                this.vloadingShow = false;
                wxStart(()=>{
                    this.vloadingShow = true;
                })
            }

            this.$post('/?c=order&a=payList',{
                order_id:this.id
            })
            .then((res)=>{
                // let setData = [];
                switch(res.code){
                    case 0:
                        this.data = res.data;
                        break;
                    default:
                        this.$toast('无效订单，请联系管理员!');
                        break;
                }
            })

            this.$post('/?c=user&a=isSetPassWrod',{
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.isSetPsw = res.data;
                        break;
                    case 1:
                        // this.$toast(res.msg)
                        break;
                    default:
                        break;
                }
            })
            
        },
        methods:{
            goPreviousPage(){
                if(this.$route.query.type == 'purchase'){
                    this.$router.go(-1);
                }else{
                    this.$router.push({
                        path:'/shoppingCart'
                    });
                }
                
            },
            successAfterPay(){
                this.inputDisable = false;
                this.$router.push({
                    path:'/done',
                    query:{id:this.id}
                });
            },
            clickPayable(){
                localStorage.setItem('goodsAdd','');
                const _this = this;
                if(this.radio == 'alipay'){
                    this.$parent.$refs.loading.style.display = 'flex'
                    this.$post('/?c=order&a=pay',{
                        id: this.id,
                        pay_code : this.radio,
                        total_amount : this.money,
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch(res.code){
                            case 0:
                                _this.clock = 'on'
                                if(res.data.status == 0){
                                    localStorage.removeItem('goods_about_status');
                                    window.location = res.data.url;
                                }else{
                                    sessionStorage.setItem('wapPrice',JSON.stringify(res.data.money));
                                    this.money = res.data.money;
                                    this.$toast(res.msg);
                                }
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                    })
                }else if(this.radio == 'balance'){
                    this.openPayPassWord();
                    return false;
                }else if(this.radio == 'wxpay'){
                    this.$parent.$refs.loading.style.display = 'flex'
                    this.$post('/?c=order&a=pay',{
                        id: this.id,
                        pay_code : this.radio,
                        total_amount : this.money,
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch(res.code){
                            case 0:
                                _this.clock = 'on'
                                if(res.data.status == 0){
                                    window.location = res.data.url;
                                }else{
                                    sessionStorage.setItem('wapPrice',JSON.stringify(res.data.money));
                                    this.money = res.data.money;
                                    this.$toast(res.msg);
                                }
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                    })
                }else{
                    this.$toast("请选择支付方式")
                    return false;
                }
            },
            radioID(item){
                this.radio = item.pay_id;
                return item.pay_id;
            },
            /* 微信端支付 */
            clickWeChatPayable(){
                localStorage.setItem('goodsAdd','');
                const _this = this;
                _this.clock = 'off'
                if(this.radio == 'wxpay'){
                    var orderId ={
                        "order_sn":_this.id
                    };
                    _this.clock = 'on'
                    wxPay({},_this,orderId);
                }else if(this.radio == 'balance'){
                    this.openPayPassWord();
                    return false;
                }else{
                    this.$toast("请选择支付方式")
                    return false;
                }
            },
            /* yuePay(password){
                if(!this.inputDisable){
                    this.inputDisable = true;
                    this.$post('/?c=user&a=checkPayPassWrod',{
                        passWrod : password,
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                this.yePay(res.data);
                                break;
                            case 1:
                                this.$toast(res.msg);
                                this.inputDisable = false;
                                break;
                            default:
                                this.$toast("系统错误，请刷新后重试！")
                                break;
                        }
                    })
                }
            }, */
            yuePay(password){
                let _this = this;
                console.log(this.inputDisable);
                if(!this.inputDisable){
                    this.inputDisable = true;

                    this.$post('/?c=order&a=pay',{
                        id: this.id,
                        pay_code : this.radio,
                        total_amount : this.money,
                        password:password,
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                _this.clock = 'on'
                                
                                if(res.data.status == 0){
                                    this.successAfterPay();
                                }else{
                                    this.inputDisable = false;
                                    sessionStorage.setItem('wapPrice',JSON.stringify(res.data.money));
                                    this.money = res.data.money;
                                    this.$toast(res.msg);
                                }
                                break;
                            case 1:
                                this.inputDisable = false;
                                this.$toast(res.msg);
                                break;
                            default:
                                this.$toast("系统错误，请刷新后重试！")
                                break;
                        }
                    })
                }
            },
            closePassWord(){
                $('.contain').attr('style','');
                this.open = false;
            },
            openPayPassWord(){
                $('.contain').css({
                    height:this.innerHeight,
                });
                this.open = true;
            },
        },
        components:{
            payPassWord,
            navbar,
            vloading,
        },
    }
</script>

<style scoped>
.contain {
    background-color: #eee;
    min-height: 100%;
}
.van-cell {
    padding: 15px !important;
}


    .cashierBar{
        border-bottom: 1px solid #eee;
    }
    .endTime {
        color: #ffffff;
        font-size: 13px;
        text-align: center;
        background-color: rgba(238,45,45,0.3);
        padding: 9px 3rem;
        margin: 0;
    }
    .endTime span {
        color: #EE2D2D;
    }
    .accountsPayable{
        font-size: 14px;
        height: 5rem;
        margin: 0 0 10px;
        padding: .6rem 0;
        text-align: center;
        background-color: #ffffff;
    }
    .accountsPayable span{
        font-size: 28px;
        font-weight: bold;
        color: #f44;
    }
    /* 提交按钮 */
    .cashierSubmit{
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0;
    }
    /* 余额 */
    .balance{
        line-height: 1rem;
    }
    .balance i{
        font-size: 34px;
        color: #d1442b;
    }
    .radio-box .van-radio{
        display: inline-block;
    }


    /*支付方式*/
    .PaymentListType {
        font-size: 16px; 
    }
    .PaymentListType img {
        vertical-align: bottom;
        padding-right: 8px;
    }
    
.vantLoading{
    margin-top: -20px;
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 9999;
    height: 100%;
    top: 0;
    left: 0;
}
</style>