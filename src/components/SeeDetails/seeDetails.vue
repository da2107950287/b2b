<template>
    <div class="orderdetails ft12">
        <navbar type="left" title="订单详情" @clickleft="goPreviousPage"></navbar>
        <!-- 循环商品 -->
        <div>
            <div class="toLogisticsDetails ">
                <div class="dflex fz_14 label_right label_right_txt">
                    <div class="label_title color_424242">订单跟踪</div>
                    <div class="label_right_status color_EE2D2D">{{status}}</div>
                </div>
                <div class="dflex fz_12 label_right label_right_txt_remake" @click="toLogisticsDetails(logList)" v-if="logList.length > 0">
                    <div class="label_title color_424242">{{logList[0].log_time}} {{logList[0].action_note}}</div>
                    <div class="label_right_img"><img src="../../assets/img/jiantou.png" alt=""></div>
                </div>
            </div>
            <div class="item-bg item-bg1">
                <div class="">
                    <div class="mrtop dflex shop_box" @click="toStop(seller_id)">
                        <div class="shopImg"><img src="../../assets/img/dianshang.png" alt=""></div>
                        <div class="shopTitle fz_14 color_424242">{{shop_name}}</div>
                        <div class="shopRight "><img src="../../assets/img/jiantou.png" alt=""></div>
                    </div>
                    <div class="goods_box after">
                        <div class="goods_list">
                            <div v-for="(itemgoods,indexgoods) in goodslist" :key="indexgoods" class="">
                                <div class="goodslist" @click.stop="toGoods(itemgoods.wId)">
                                    <div div class="dflex goodsli">
                                        <div>
                                            <img :src="itemgoods.goods_thumb" alt="" class="finishsign-img">
                                        </div>
                                        <div class="goods_attr_box after">
                                            <div class="goods_name">{{(itemgoods.goods_name)}}</div>
                                            <div class="goods_attr_box_name">
                                                <div class="goods_price">&yen; {{itemgoods.goods_price}}</div>
                                                <div class="goods_attr_content after">
                                                    <div class="goods_attr">{{itemgoods.goods_attr}}</div>
                                                    <div class="goods_number">x{{itemgoods.goods_number}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="goodslist_btn dflex" v-if="pay_status == 2 && shipping_status == 2 && itemgoods.after_status == 0 && goodslist.length>1">
                                        <van-button @click.stop="postSale(order_sn,itemgoods,'one')">申请售后</van-button>
                                    </div>
                                    <div class="goodslist_btn dflex" v-if="pay_status == 2 && shipping_status == 2 && itemgoods.after_status == 1 && goodslist.length>1">
                                        <van-button @click.stop="postDetails(itemgoods.after_sn)">处理中</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="price_box">
                        <div class="after price_content">
                            <div class="label-title">商品总额</div>
                            <div class="label-val">&yen;{{order_amount}}</div>
                        </div>
                        <div v-if="is_group != 2" class="after price_content">
                            <div class="label-title">运费</div>
                            <div class="label-val">+&yen;{{shipping_fee}}</div>
                        </div>
                        <div class="after price_content" v-show="is_group != 2 && add_money>0">
                            <div class="label-title">补价</div>
                            <div class="label-val">+&yen;{{add_money}}</div>
                        </div>
                        <div class="after price_content" v-show="is_group != 2 && sub_money>0">
                            <div class="label-title">折扣</div>
                            <div class="label-val">+&yen;{{sub_money}}</div>
                        </div>

                        <div class="after price_content" v-show="is_group != 2 && full_admin_money>0">
                            <div class="label-title">补贴</div>
                            <div class="label-val">-&yen;{{full_admin_money}}</div>
                        </div>
                        <div class="after price_content" v-show="is_group != 1 && voucher_amount>0">
                            <div class="label-title">抵扣</div>
                            <div class="label-val">-&yen;{{voucher_amount}}</div>
                        </div>
                        
                        <div class="after feeshippingfee price_content">
                            <div class="label-title">实付款</div>
                            <div class="label-val">&yen;<span>{{orderamount}}</span></div>
                        </div>
                    </div>
                    <div class="lianxi dflex fz_14 color_424242">
                        <!-- <div class="lianxiAttr " @click="contactService">
                            <div class="dflex">
                                <div class="lianxi_img"><img src="../../assets/img/kefu1.png" alt=""></div>
                                <div class="lianxi_txt">联系客服</div>
                            </div>
                        </div> -->
                        <div class="lianxiAttr " @click="getPhone">
                            <div class="dflex">
                                <div class="lianxi_img"><img src="../../assets/img/dianhua.png" alt=""></div>
                                <div class="lianxi_txt">联系客服</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-bg item-label" >
                <div class="item-label-title">订单信息</div>
                <div class="order-label-title">
                    <div class="order-label">订单编号：</div>
                    <div class="order-label-text">{{order_sn}}</div>
                </div>
                <div class="order-label-title">
                    <div class="order-label">下单时间：</div>
                    <div class="order-label-text">{{add_time}}</div>
                </div>
                <div class="order-label-title">
                    <div class="order-label">支付方式：</div>
                    <div class="order-label-text">{{pay_name}}</div>
                </div>
                <div class="order-label-title" v-show="pay_time">
                    <div class="order-label">支付时间：</div>
                    <div class="order-label-text">{{pay_time}}</div>
                </div>
                <div class="order-label-title">
                    <div class="order-label">购货人：</div>
                    <div class="order-label-text">{{nick_name}}</div>
                </div>
                <div class="order-label-title">
                    <div class="order-label">收货地址：</div>
                    <div class="order-label-text">{{address}}</div>
                </div>
                <div class="order-label-title">
                    <div class="order-label">订单备注：</div>
                    <div class="order-label-text">{{to_buyer}}</div>
                </div>
                <div class="order-label-title">
                    <div class="order-label">发票类型：</div>
                    <div class="order-label-text">{{invoiceType(invoice_type)}}</div>
                </div>
            </div>
            <div style="height:50px"></div>
            <div class="item-btn-box dflex">
                <van-button v-if="is_group != 2 && type != 1" @click="anotherOrder()">再来一单</van-button>
                <van-button @click="postSale(order_sn,goodslist,'all')" v-if="pay_status == 2 && shipping_status == 2 && after_status == 0">申请售后</van-button>
                <!-- <van-button @click="orderPary()" class="active" v-if="pay_status === 0 && order_status != 2 && order_status != 3">付款</van-button> -->
                <van-button @click="recipient()" class="active" v-if='pay_status == 2 && (shipping_status == 1 || shipping_status == 5)'>确认收货</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {Dialog} from 'vant'
import '../../assets/css/orderItem.css'
const navbar = ()=>import("../navbar/nav.vue");

export default {
    data(){
        return{
            order_id:'',            //订单号
            order_sn:'',            //订单编号
            type:'',                //是否求购订单 1 是
            status:'',              //订单状态
            pay_status:'',          //支付状态
            after_status:0,          //售后状态
            order_status:'',        //订单状态
            shipping_status:'',     //
            is_evaluate:'',     //
            goodslist:[],           //商品列表
            order_amount:'',         //商品总额
            orderamount:'',         //实付款
            add_money:'',           //补价
            sub_money:'',           //折扣
            full_admin_money: '',      //补贴
            voucher_amount: '',      //抵扣
            add_time:'',            //下单时间
            pay_name:'',            //支付方式
            pay_time:'',            //支付时间
            shipping_fee:'',        //运费
            nick_name:'',           //购货人
            mobile:'',              //联系方式
            address:'',             //收货地址
            to_buyer:'',            //订单备注
            invoice_type:'',        //发票类型
            shop_name:'',           //店铺名称
            seller_id:'',           //店铺ID
            item:[],
            is_group: 0,     //2是团购

            userInfo:[],
            tag:'',
            userName:'',
            upgrade:'',
            head:'',
            configId:'',
            logList:[],

            //最大可退款金额
            maxMoney: 0,
        }
    },
    created(){
        localStorage.removeItem('saleItemList');
        let _this = this;
    
        let oeSn=this.$route.query.sn?this.$route.query.sn:'';
        let oeId=this.$route.query.orderid?this.$route.query.orderid:0
        if(oeSn!==''){
            this.order_sn=oeSn
        }else{
            this.order_sn=oeId
        }
         // 获取订单详情
        this.$post("/?c=order&a=orderDetail", {
           order_sn:oeSn,
           order_id:oeId,
           }).then((res) => {
              switch (res.code){
                  case 0:
                    this.order_id=res.data.order_sn;    
                    this.shop_name=res.data.shop_name;   
                    this.seller_id=res.data.seller_id;   

                    this.type=res.data.type; 
                    this.status=res.data.status; 
                    if(res.data.status=="待评价"){
                        this.status = "已完成";
                    }
                    this.pay_status = Number(res.data.pay_status); 
                    this.after_status=res.data.after_status; 
                    this.order_status=res.data.order_status; 
                    this.shipping_status=res.data.shipping_status;
                    this.is_evaluate=res.data.is_evaluate;
                    
                    this.goodslist=res.data.goods_list;

                    this.orderamount=res.data.order_amount;
                    this.pay_name=res.data.pay_name;
                    this.add_time=res.data.add_time;
                    this.is_group = res.data.activity[0];
                    this.maxMoney = res.data.after_max;

                    let total = 0;
                    for(let key in this.goodslist){
                        total += Number(this.goodslist[key].goods_number) * Number(this.goodslist[key].goods_price);
                    }
                    this.order_amount=total;
                    this.shipping_fee=res.data.shipping_fee;
                    this.full_admin_money = res.data.full_admin_money;
                    this.voucher_amount = res.data.voucher_amount;

                    this.invoice_type=res.data.invoice_type;
                    this.mobile=res.data.mobile;
                    this.nick_name=res.data.consignee;
                    this.address=res.data.address;

                    this.to_buyer=res.data.postscript;//订单备注 下单时的备注
                    // this.to_buyer=res.data.msg_to_buyer;//订单备注 商家返回的备注
                    this.shipping_name=res.data.shipping_name;
                    this.shipping_code=res.data.shipping_code;
                    this.$post('/?c=user&a=getHx', {
                    }).then((res) => {
                        this.configId = res.data;
                    });

                    this.$post('/?c=order&a=log', {
                        order_id: res.data.order_id
                    }).then((res) => {
                        this.logList = res.data;
                    });
                break;
                case 1:
                    this.$toast(res.msg);
                    break;
                default:
                break;
              }
        });
        // 获取客服id
        this.$post('/?c=user&a=info',).then(res => {
            switch (res.code) {
                case 0:
                    this.userInfo = res.data;
                    this.head = res.data.head;
                    this.tag = res.data.tag;
                    this.userName = res.data.name;
                    this.upgrade = res.data.upgrade === 1;
                    easemobim.config = {
                        user: {
                            username: this.userInfo.hx_username,
                            password: this.userInfo.hx_pwd,
                        },
                        // 访客信息（可选）
                        visitor: {
                            phone: this.userInfo.mobile_phone,
                            userNickname: this.userInfo.name,
                            email: this.userInfo.email,
                        },
                        onready: function () {
                            easemobim.sendExt({
                                ext: {
                                    "type": "custom",
                                    "msgtype": {
                                        "order": {
                                            "title": "订单咨询",
                                            "order_title":"订单号："+_this.order_id,
                                            "price": "总价:"+"¥"+_this.orderamount,
                                            "desc":"商家:"+_this.shop_name
                                        }
                                    }
                                }
                            });
                        },
                    };
                    break;
                default:
                    break;
            }
        });
    },
    methods:{
        // 返回上一页
        goPreviousPage(){
            this.$router.go(-1);
        },
        toGoods(wid){
            this.$router.push({
                path:'/goods',
                query:{
                    goods:wid
                }
            })
        },
        toLogisticsDetails(log){
            localStorage.setItem('logList',JSON.stringify(log))
            this.$router.push({
                path:'/logisticsDetails',
                query:{type:'order'}
            })
        },
        postSale(snId,item,type){//type one 一个 all 所有
            if(type=='one'){
                let data = {
                    snid : snId,
                    list : [item], 
                    maxMoney: this.maxMoney,
                    shipping_fee: this.shipping_fee,
                    is_group: this.is_group
                }
                console.log('data==',data)
                localStorage.setItem('saleItemList',JSON.stringify(data))
                this.$router.push({
                    path:'/postSale',
                    query:{
                        snId:snId,
                        radio:"one"
                    }
                })
            }else{
                let data = {
                    snid : snId,
                    list : item,
                    maxMoney: this.maxMoney,
                    shipping_fee: this.shipping_fee,
                    is_group: this.is_group
                }
                console.log('data==',data)
                localStorage.setItem('saleItemList',JSON.stringify(data))
                this.$router.push({
                    path:'/postSale',
                    query:{
                        snId:snId,
                        radio:"all"
                    }
                })
            }
            
        },
        postDetails(id){
            this.$router.push({
                path:'/salesDetails',
                query:{id:id}
            });
        },
        cutString(str='',num){
            let val = this.$appFunc.prototype.cutString(str,num);
            return val;
        },
        invoiceType(type){
            if(type == 0){
                return "无发票"
            }
            if(type == 1){
                return "普票"
            }
            if(type == 2){
                return "专票"
            }
        },
        
        // 打电话给商家
        getPhone(){
            window.location.href='tel:4001288566';
            /*this.$post('/?c=merchant&a=call',{
                seller_id:this.seller_id
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        Dialog.confirm({
                            title: '联系商家',
                            message: '请使用该'+ res.data.mobile +'号码联系改商家,如果手机为该号码，请点击确定键'
                        }).then(() => {
                        // on confirm
                            window.location.href='tel:'+res.data.phone;
                        }).catch(() => {
                        // on cancel
                        });
                        break;
                    default:
                        this.$toast(res.msg);
                        break;
                }
            })*/
        },
        // 跳转环信
        contactService() {
            let _this = this;
            // 当前页面显示弹出框
            easemobim.bind({
                configId: _this.configId,
            });
        },

        
        // 再来一单
        anotherOrder(item){
            var _this = this;
            this.$router.push({
                path:"/shoppingCart",
                query:{
                    sn:_this.order_id
                }
            })
        },
        orderPary(item){
            var _this = this;
            this.$router.push({
                path:'/Cashier',
                query:{
                    id:_this.order_id
                }
            })
        },
        // 评价
        commentInfo(item){
            var _this = this;
            sessionStorage.setItem('wapGoodsInfo',JSON.stringify(item))
            this.$router.push({
                path:'/commentInfo',
                query:{
                    id:_this.is_evaluate
                }
            });
        },
        //查看物流
        logistics(item){
            var _this = this;
            this.$router.push({
                path:'/logistics',
                query:{
                    id:_this.order_id
                }
            })
        },
        //确认收货
        recipient(item){
            var _this = this;
            Dialog.confirm({
                title: '收货',
                message: '确认收货吗？'
            }).then(() => {
                // on confirm
                this.$parent.$refs.loading.style.display = 'flex'

                this.$parent.$refs.loading.style.display = 'flex'

                this.$post('/?c=order&a=receive',{
                    id:_this.order_id
                })
                .then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            location.reload();
                            break;
                        default:
                            break;
                    }
                })
            }).catch(() => {
            // on cancel
            });
        },
        toStop(seller_id){
            this.$router.push({
                path:'/shop',
                query:{
                    index:seller_id
                }
            })
        },
    },
    components:{
        navbar,
    }
}
</script>
<style lang="less" scoped>
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;line-height: 12px;}
    .fz_14{font-size: 14px;line-height: 14px;}
    .fz_16{font-size: 16px;line-height: 16px;}
    .dflex{display: flex;}
    .van-nav-bar{border-bottom: 1px solid #f2f2f2;}
    .van-nav-bar .van-icon{color: #232323;}
    .van-button{border: none;}

    .orderdetails{background-color: #f2f2f2;}
    .label_right{
        .label_right_img{
            margin: auto 0 auto auto;
            img{
                width: 7px;
                display: block;
            }
        }
    }
    .toLogisticsDetails{
        padding: 15px 12px;
        background-color: #fff;
        margin-bottom: 10px;
        .label_right_txt{
            .label_right_status{
                margin: auto;
                margin-right: 0;
            }
        }
        .label_right_txt_remake{
            margin-top: 15px;
            .label_title{
                word-break: break-word;
                text-align: justify;
                white-space: nowrap;
                width: 95%;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }

    .mrtop{
        .shopImg{
            width: 18px;
            margin: auto 0;
        }
        .shopTitle{
            margin: auto 0;
            margin-left: 9px;
            margin-right: 5px;
            
            overflow: hidden;
            line-height: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 14px;
            max-width: 200px;
        }
        .shopRight{
            width: 7px;
            margin: auto 0;
        }
        img{
            display: block;
            width: 100%;
        }
    }



    .goodsli{
        padding-bottom: 15px;
    }
    .goodsli:last-child{
        padding-bottom: 0;
    }
    .goodslist_btn{
        margin-top: 0;
    }
    .goodslist_btn .van-button{
        width: 80px;
        height: 30px;
        line-height: 1;
        border-radius: 5px;
        border: 1px solid #666;
        color: #424242;
        font-size: 14px;
        background-color: unset;
        padding: 0;
        margin: auto;
        margin-right: 0;
        margin-bottom: 15px;
    }
    .goodslist_btn .van-button:last-child{
        margin-bottom: 0;
    }
    .lianxi{
        margin-top: 15px;
        height: 38px;
        border-top: 1px solid #d8d8d8;
        .lianxiAttr{
            margin: auto;
            flex: 1;
            .lianxi_img{
                width: 18px;
                height: 18px;
                margin: auto;
                margin-right: 0;
                img{
                    display: block;
                    width: 100%
                }
            }
            .lianxi_txt{
                margin: auto;
                margin-left: 10px;
                line-height: 18px;
            }
        }
        .lianxiAttr:first-child{
            border-right: 1px solid #d8d8d8;
        }
            
    }
    .item-bg1{
        padding-bottom: 0;
    }
    .item-label{
        margin-bottom: 15px;
    }
    .item-btn-box{
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        background-color: #fff;
        height: 50px;
        border-top: 1px solid #d8d8d8;
        justify-content: flex-end;
        .van-button{
            width: 80px;
            height: 30px;
            line-height: 1;
            border-radius: 5px;
            border: 1px solid #666;
            color: #424242;
            font-size: 14px;
            background-color: unset;
            padding: 0;
            margin: auto;
            margin-right: 15px;
            margin-left: 0;
        }
        .active.van-button{
            border: 1px solid #ee2d2d;
            color: #ee2d2d;
        }
    }

.orderdetails .goods_box .goods_list .goods_attr_box .goods_name{
    color: #424242;
    line-height: .8rem;
    margin-bottom: .43rem;
    
    height: 1.6rem;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>


