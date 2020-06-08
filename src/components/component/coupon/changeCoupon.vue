<template>
    <div class="changeCoupon">
        <div class="coupon-top dflex color_424242">
            <div class="coupon-top-title fz_16">优惠</div>
            <div class="coupon-top-cancel fz_12 color_424242" @click="cancel">不使用</div>
        </div>
        <van-tabs v-model="active" title-inactive-color="#424242" title-active-color="#ee2d2d">
            <van-tab title="优惠券">
                <div class="tab-content">
                    <div class="couponUl">
                        <!-- <div v-for="(item,index) in coupon" :class="['couponLi', {'active': item.status == 1 && item.usable == 1 && item.min_amount <= couponAmount}]" :key="index" @click="check(item)">
                            <div class="dflex">
                                <div class="coupon-left">
                                    <div class="coupon-left-price">
                                        <span class="coupon-left-yen fz_14">&yen;</span>
                                        <span class="coupon-left-money">{{item.discount_money}}</span>
                                    </div>
                                    <div class="coupon-left-remaker fz_12">满{{item.min_amount}}元可用</div>
                                </div>
                                <div class="coupon-center">
                                    <div class="coupon-center-title fz_16">{{item.name}}</div>
                                    <div class="coupon-center-time fz_12">{{item.start_time}}-{{item.end_time}}</div>
                                    <div class="coupon-center-remaker fz_12">{{item.describe}}</div>
                                </div>
                                <div class="coupon-right dflex">
                                    <div class="coupon-right-btn" v-if="item.full_list_id == coupon_id && item.status == 1 && item.usable == 1 && item.min_amount <= couponAmount"><img src="../../../assets/img/xuanzhong.png" alt=""></div>
                                    <div class="coupon-right-btn" v-else><img src="../../../assets/img/weixuanzhong.png" alt=""></div>
                                </div>
                            </div>
                            <div v-if="item.status == 1 && item.usable == 1 && item.min_amount > couponAmount" class="waring">
                                <img src="../../../assets/img/waring.png">
                                <span>差{{item.min_amount - couponAmount}}元商品可使用</span>
                            </div>
                        </div> -->

                        <div v-for="(item,index) in coupon" :class="['couponLi', {'active': item.usable == 1}]" :key="index" @click="check(item)">
                            <div class="dflex">
                                <div class="coupon-left">
                                    <div class="coupon-left-price">
                                        <span class="coupon-left-yen fz_14">&yen;</span>
                                        <span class="coupon-left-money">{{item.discount_money}}</span>
                                    </div>
                                    <div class="coupon-left-remaker fz_12">满{{item.min_amount}}元可用</div>
                                </div>
                                <div class="coupon-center">
                                    <div class="coupon-center-title fz_16">{{item.name}}</div>
                                    <div class="coupon-center-time fz_12">{{item.start_time}}-{{item.end_time}}</div>
                                    <div class="coupon-center-remaker fz_12">{{item.describe}}</div>
                                </div>
                                <div class="coupon-right dflex">
                                    <div class="coupon-right-btn" v-if="item.coupon_id == coupon_id"><img src="../../../assets/img/xuanzhong.png" alt=""></div>
                                    <div class="coupon-right-btn" v-else><img src="../../../assets/img/weixuanzhong.png" alt=""></div>
                                </div>
                            </div>
                            <div v-if="item.difference > 0" class="waring">
                                <img src="../../../assets/img/waring.png">
                                <span>差{{item.difference}}元商品可使用</span>
                            </div>
                        </div>
                    </div>
                </div>

            </van-tab>
            <van-tab title="农联金券">
                <div class="tab-content">
                    <!-- 金券列表部分 -->
                    <div class="list">
                        <h4 class="list-title">共抵扣<span :class="{'list-max': isMaxVoucher}"> &yen;{{maxVouchers}}</span></h4>

                        <!-- <div class="list-item">
                            <div class="money">
                                <p>&yen;<span>10</span></p>
                                <p>无门槛</p>
                            </div>
                            <div class="text">
                                <h1>农联金券</h1>
                                <p>可在农联商品购买商品时抵扣金额 ，最多可抵扣至0.01元</p>
                            </div>
                            <div class="tu">
                                <div @click="checkVoucher($event, '2', 10)"></div>
                            </div>
                        </div> -->
                        <div class="list-item" v-for="(item, index) in vouchers" :key="'voucher-'+index">
                            <div class="money">
                                <p>&yen;<span>{{item.discount_money}}</span></p>
                                <p>无门槛</p>
                            </div>
                            <div class="text">
                                <h1>{{item.name}}</h1>
                                <p>{{item.describe}}</p>
                            </div>
                            <div class="tu">
                                <div :class="{'selected': index == 0 && item.money_id == vouchersSelected[0]}" @click="checkVoucher($event, item.money_id, item.discount_money)"></div>
                            </div>
                        </div>
                  </div>
                </div>  
            </van-tab>
        </van-tabs>
        <div class="sumbit-btn dflex fz_16" v-show="coupon.length && active == 0 || vouchers.length && active ==1">
            <button type="button" class="sumbit" @click="sumbit">确定</button>
        </div>
    </div>
</template>


<script>
import Vue from "vue"
// import "../../../assets/css/commonstyle.css"
// amount 总金额， 用于农联金券计算
// vouchersSelected  默认被选中的金券id集合
// vouchers 有效金券列表
export default {
    props:['defActive', 'coupon','couponId','couponAmount','couponActive', 'amount', 'vouchers', 'vouchersSelected'],
    data(){
        return{
            active: 0,
            coupon_id:'0',
            coupon_price:0,
            coupon_name:'',
            coupon_minAmount:0,

            //被选中的农联金券数据
            selected: [], 
            //当前最大抵扣值(最大抵扣值 >= 商品金额 + 运费 - 0.01,    0.01 >= 实际支付金额 >= 商品金额 + 运费 - 最大抵扣值)
            maxVouchers: 0,
            //当前选中的金券的总额
            totalVoucher: 0,
            //农联金券抵扣是否达到最大抵扣值（最大抵扣值 =  >= 商品金额 + 运费 - 0.01）
            isMaxVoucher: false
        }
    },
    created(){
        // if(this.couponId > 0){
        //     this.coupon_id = this.couponId;
        // }

        if(this.couponActive){
            this.check(this.couponActive);
        }
        
        //默认选中优惠券类型
        this.active = this.defActive;
        if(this.active == 1) {
            this.selected = this.vouchersSelected;
            this.totalVoucher = this.totalVoucher + this.vouchers[0].discount_money;
            this.maxVouchers = this.totalVoucher;
            if(this.amount <= this.totalVoucher) {
                this.maxVouchers = (this.amount*100 - 0.01*100)/100;
                this.isMaxVoucher = true;
            }else {
                this.isMaxVoucher = false;
            }
        }
    },
    methods:{
        //切换选项卡
        onClick(index, title){
            this.$toast(title);
        },
        check(item){
            if(item.status == 1 && item.usable == 1 && item.min_amount <= this.couponAmount){
                this.coupon_id = item.coupon_id;
                this.coupon_price = item.discount_money;
                this.coupon_name = item.name;
                this.coupon_minAmount = item.min_amount;
                //最大可优惠金额 = 总商品金额 - 0.01
                /*if(this.coupon_price >= this.couponAmount) {
                    this.coupon_price = this.toCalculation(this.couponAmount, 0.01, 'sub');
                }*/
            }else{
                
            }
        },
        cancel(){

            //清除优惠券选中数据
            this.coupon_id = '0';
            this.coupon_price = 0;
            this.coupon_name = '';
            this.coupon_minAmount = 0;         

            //取消 金券选中数据
            this.selected = [];
            this.maxVouchers = 0;
            this.isMaxVoucher = false;
            this.totalVoucher = 0;

            //统一清除
            this.$emit('changeVoucher', {selected: this.selected, maxVouchers: this.maxVouchers});

        },
        sumbit(){
            switch(this.active) {
                //优惠券
                case 0:
                    let data = {};
                    data.coupon_id = this.coupon_id;
                    data.coupon_price = this.coupon_price;
                    data.coupon_name = this.coupon_name;
                    data.coupon_minAmount = this.coupon_minAmount;

                    if(this.coupon_id != 0){
                        this.$emit('sumbit',data);
                    }else{
                        this.$emit('cancel');
                    }               
                    break;
                //农联金券
                case 1:
                    this.$emit('changeVoucher', {selected: this.selected, maxVouchers: this.maxVouchers});
                    break;
            }
        },
        //切换金券选中状态
        checkVoucher(ev, id, va){
            let target = ev.target || window.event.srcElement;
            //判断此券是否被选中
            let i = this.selected.findIndex(value=> value==id);
            // console.log(target, i)
            //未被选中，则选中此值
            if(i === -1) {
                target.className = 'selected';
                this.selected.push(id);
                this.totalVoucher = this.toCalculation(this.totalVoucher, va, 'add');
                this.maxVouchers = this.totalVoucher;

            }else {
                //之前已被选中，则取消选中
                target.className = '';
                this.selected.splice(i, 1);
                this.totalVoucher = this.toCalculation(this.totalVoucher, va, 'sub');
                this.maxVouchers = this.totalVoucher;
            }

            if(this.amount <= this.totalVoucher) {
                this.maxVouchers = this.toCalculation(this.amount, 0.01, 'sub');
                this.isMaxVoucher = true;

            }else {
                this.isMaxVoucher = false;
            }
            // console.log('this.isMaxVoucher===',this.isMaxVoucher,'this.maxVouchers===',this.maxVouchers)
        },
        //修正js两位小数加减法错误问题的方法  sign add-加法  sub-减法
        toCalculation(x, y, sign){
            let a = x.toString().split('.');
            let b = y.toString().split('.');

            if(a[1] && a[1].length == 1) a[1] = a[1] + '0'; 
            if(b[1] && b[1].length == 1) b[1] = b[1] + '0'; 

            if(!a[1]) a.push('00');
            if(!b[1]) b.push('00');

            let as = Number(a.join(''));
            let bs = Number(b.join(''));

            // console.log(a, b, as, bs);

            if(sign == 'add') {
                return (as + bs)/100;
            }else if(sign == 'sub'){
                return (as - bs)/100;
            }
        }
    },
}
</script>

<style scoped>
@import url(../../../assets/css/commonstyle.css);
</style>

<style lang="less" scoped>
.changeCoupon{
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    .coupon-top{
        padding: 15px 12px;
        background-color: #fff;
        .coupon-top-title{
            margin: auto;
            margin-left: 0;
        }
        .coupon-top-cancel{
            margin: auto;
            margin-right: 0;
        }
    }
    .van-tabs {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 44px 0 50px;
    }
    .tab-content {
        width: 100%;
        height: calc(100% - 44px - 50px);
        overflow: auto;
        position: absolute;
        left: 0;
        top: 44px;
    }
    .couponUl{
        background-color: #f2f2f2;
        padding: 10px 12px;
    }
    .couponLi{
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 10px;
        padding: 10px 0;
        .coupon-left{
            color: #808080;
            flex:1;
            max-width: 100px;
            text-align: center;
            border-right: 1px dotted #c1c1c1;
            .coupon-left-price{
                .coupon-left-yen{
                    margin: auto;
                    margin-bottom: 0;
                }
                .coupon-left-money{
                    margin: auto;
                    font-size: 34px;
                    font-weight: 700;
                }
            }
        }
        .coupon-center{
            padding: 0 0 0 15px;
            margin: auto 0;
            flex:1;
            div{
                color: #808080;
            }
        }
        .coupon-right{
            margin: auto;
            margin-right: 10px;
            max-width: 50px;
            min-width: 50px;
            flex:1;
            height: 50px;
            .coupon-right-btn{
                width: 18px;
                margin: auto;
                margin-right: 0;
                img{
                    max-width: 100%;
                    display: block;
                }
            }
        }
        .waring {
            padding: 10px 0 0 14px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            img {
                width: 16px;
                height: 16px;
                padding-right: 6px;
            }
            span {
                font-size: 12px;
                color: #808080;
                line-height: 1.4em;
            }
        }
    }
    .couponLi.active {
        .coupon-left {
            color: #ee2d2d;
        }
        .coupon-center{
            .coupon-center-title{
                color: #212222;
            }
            .coupon-center-time{
                color: #808080;
            }
            .coupon-center-remaker{
                color: #424242;
            }
        }
    }
    .sumbit-btn{
        position: absolute;
        bottom: 0;
        background-color: #fff;
        width: 100%;
        height: 50px;
        .sumbit{
            width: 88%;
            height: 40px;
            background-color: #ee2d2d;
            text-align: center;
            line-height: normal;
            color: #fff;
            display: block;
            border:none;
            border-radius: 5px;
            margin: auto;
        }
    }
}

/*农联金券列表部分样式*/
    .list {
        padding: 0 10px 10px;
        color: #424242;
    }
    .list-title {
        font-size: 12px;
        font-weight: normal;
        margin: 0;
        padding: 9px 0 8px;
    }
    .list-title span {
        font-size: 12px;
        color: #ee2d2d;
        position: relative;
    }
    .list-title span.list-max:after {
        content: '';
        width: 18px;
        height: 9px;
        position: absolute;
        right: -18px;
        top: -2px;
        background: url('../../../assets/img/voucher/MAX.png') no-repeat;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;        
    }
    .list-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        min-height: 70px; 
        padding: 15px 0 10px; 
        background-color: #ffffff;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .list-item .money {
        width: 106px;
        text-align: center;
        border-right: 1px dashed #c1c1c1;
    }
    .list-item .money p {
        font-size: 13px;
        color: #ee2d2d;
        margin: 0;
    }
    .list-item .money p:first-child {
        font-weight: bold;
    }
    .list-item .money p span {
        font-size: 28px;
    }
    .list-item .text {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-left: 15px; 
        padding-right: 3px;
    }
    .list-item .text h1 {
        font-size: 16px;
        font-weight: normal;
        margin: 0;
        padding-bottom: 3px;
    }
    .list-item .text p {
        font-size: 12px;
        word-break: break-all;
        white-space: normal;
        margin: 0;
    }
    .list-item .tu {
        padding: 22px 10px 0;
    }
    .list-item .tu div {
        width: 18px;
        height: 18px;
        font-size: 0;
        background: url('../../../assets/img/voucher/no-selected.png') no-repeat;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;
        position: relative;
    }
    .list-item .tu div.selected {
        background: url('../../../assets/img/voucher/selected.png') no-repeat;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;
    }
</style>
