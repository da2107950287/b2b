<template>
    <div>
        <!-- 标题 -->
        <navbar type="left" title="我的钱包" @clickleft="goPreviousPage"></navbar>
        <!-- 背景 -->
        <div class="wallet">
            <!-- 账户金额 -->
            <div class="wallet-content">
                <div class="wallet-content-amountTitle fz_14">账户余额</div>
                <div class="wallet-content-money fz_30"><span class="fz_18">&yen;</span>{{amount}}</div>
                <div class="wallet-btn" v-if="cashShow"><span @click="cashOut">提现</span></div>
            </div>
            
            <!-- -->
            <div class="wallet-profit">
                <!-- <h1>推广</h1> -->
                <div v-if="promotion == 1" class="wallet-profit-content">
                    <div>冻结账户<span>{{frozen_amount}}</span></div>
                    <span class="wallet-profit-line"></span>
                    <div @click="goToPage">推广账户<span>{{commission_money_now}}</span><van-icon name="arrow" /></div>
                </div>
                <div v-else class="wallet-profit-content">
                    <div>冻结账户<span>{{frozen_amount}}</span></div>
                </div>
            </div>

            <!-- 账户明细等 列表部分 -->
            <van-cell-group>
                <van-cell title="账户管理" is-link to="/bindingBankCard" />
                <van-cell title="账户明细" is-link to="/account" />
                <van-cell title="提现记录" is-link to="/cashOutRecord" />
                <!-- <van-cell title="发放金券" is-link to="/voucherGrant" /> -->
                <!-- <van-cell title="推荐的采购商" v-model="promotionNumber" />
                <van-cell title="推荐的非采购商" v-model="noPromotionNumber" /> -->
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post,appFunc} from '../assets/js/commonAPI.js'
    import "../assets/css/commonstyle.css"
    import navbar from './navbar/nav.vue'

    Vue.prototype.$post = post
    Vue.prototype.$appFunc = appFunc
    export default {
        data() {
            return {
                amount:0,   //账户余额
                frozen_amount:0,  //冻结余额
                commission_money_now: 0,  //推广账户

                //提现设置
                cashOutConfig: {},
                cashShow: false,  //是否开始提现功能
                promotion: 0,  //是否显示推广账户 0——隐藏  1——显示
            }
        },
        created(){
            //判断是否显示推广账户 ——星级买家不显示
            const userinfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if(userinfo) {
                this.promotion = userinfo.promotion;
            }else {   
                //处理 用户信息 未请求时， 就进入此页的问题
                this.$post('/?c=user&a=info',).then(res => {
                    switch (res.code) {
                        case 0:
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data));
                            this.promotion = res.data.promotion || 0;
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                });
            }

            this.getWalletInfo();
            this.getCashOutConfig()
        },
        methods:{

            //####=>返回上一页
            goPreviousPage(){
                this.$router.push('/personal');
            },
            account(){
                this.$router.push({
                    path:'/account'
                })
            },
            //钱包接口
            getWalletInfo(){
                this.$post('/?c=user&a=wallet232',{})
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            this.amount = res.data.amount || '0.00';
                            this.frozen_amount = res.data.frozen_amount || '0.00';
                            this.commission_money_now = res.data.commission_money_now || 0;
                            sessionStorage.setItem('wallet_info', JSON.stringify(res.data));
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;                    
                        default:
                            break;
                    }
                })
            },
            //获取提现相关设置
            getCashOutConfig(){
                this.$post('/?c=user&a=withdrawalConfig',{})
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            //1 - 开启提现
                            if(res.data.withdrawal_able == 1) {
                                this.cashOutConfig = res.data;
                                this.cashShow = true;
                            }
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;                    
                        default:
                            break;
                    }
                }) 
            },
            //提现
            cashOut(){
                this.$router.push({path: '/cashOut', query: {
                    amount: this.amount,
                    cashOutConfig: JSON.stringify(this.cashOutConfig)
                    }
                });
            },
            //进入新页面
            goToPage(){
                this.$router.push('/extendAcount')
            }
        },
        components:{
            navbar
        } 
    }
</script>

<style scoped lang="less">
    .wallet-content{
        padding: 35px 0;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background-image: url('../assets/img/walletBg.jpg');
        background-size: 100% 100%;
        .wallet-content-amountTitle{
            margin-bottom: 9px;
            line-height: 14px;
        }
        .wallet-content-money{
            margin-bottom: 17px;
            line-height: 30px;
        }
        .wallet-btn {
            text-align: center;
            margin-top: 10px;
            span {
                display: inline-block;
                font-size: 14px;
                color: #ffffff;
                padding: 7px 25px;
                border: 1px solid #ffffff;
                border-radius: 8px;                
            }
        }
    }

    .wallet-profit {
        background-color: #ffffff;
        margin-bottom: 10px;
    }
    .wallet-profit h1 {
        font-size: 14px;
        font-weight: normal;
        color: #ee2d2d;
        padding: 7px 15px;
        margin: 0;
    }
    .wallet-profit-content {
        font-size: 12px;
        height: 18px;
        line-height: 1.5em;
        color: #808080; 
        padding: 20px 0 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        div {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            padding-left: 15px;
            position: relative;
            span {
                font-size: 14px;
                color: #ee2d2d;
                padding-left: 15px;
            }
            .van-icon {
                font-size: 14px;
                position: absolute;
                top: 2px;
                right: 15px;
            }
        }
        .wallet-profit-line {
            display: inline-block;
            width: 2px;
            height: 22px;
            background-color: #f2f2f2;
        }
    }

    .van-cell__right-icon {
        margin-right: -4px;
    }
    .van-cell:not(:last-child)::after {
        left: 0;
    }
</style>