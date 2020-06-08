<template>
    <div>
        <!-- 求购tab -->
        <navbar type="left" title="我的求购信息" @clickleft="goPreviousPage" v-if="type == 2"></navbar>
        <navbar type="left" title="求购信息" @clickleft="goPreviousPage" v-else></navbar>
        <!-- 求购信息 -->
        <div class="order-info" v-for="(goodsItem,goodsIndex) in purchaseOrder.goods" :key="goodsIndex">
            <div class="auction-title fz_14 color_808080" v-if="type == 1">求购人：{{purchaseOrder.nick_name}}</div>
            <div class="order-title dflex fz_16">
                <div class="color_424242">{{purchaseOrder.title}}</div>
                <div class="color_EE2D2D">{{goodsItem.goods_number}}{{goodsItem.unit}}</div>
            </div>
            <div class="order-remarks color_808080 fz_14" v-if="goodsItem.goods_intro != ''">
                {{goodsItem.goods_intro}}
                <div class="guoqi-img" v-if="purchaseOrder.status == 4"><img src="../assets/img/guoqi.png" alt=""></div>
            </div>
            <div class="order-class color_424242 fz_14">
                分类<span>{{goodsItem.cat_name}}</span>
            </div>
            <div class="order-origin color_424242 fz_14">
                产地<span>{{goodsItem.origin}}</span>
            </div>
            <div class="order-time fz_14">
                报价时限<span :class="{'color_999':purchaseOrder.end_time < time/1000 , 'color_EE2D2D' : purchaseOrder.end_time >= time/1000}">{{purchaseOrder.end_time}}</span>
                
            </div>
            <div class="order-time fz_14">
                交货时间<span>{{purchaseOrder.received_time}}</span>
            </div>
            <div class="order-imgs dflex" v-if="goodsItem.goods_img.length > 0">
                <div class="order-img" v-for="(imgItem,imgKey) in goodsItem.goods_img" :key="imgKey" >
                    <img :src="imgItem" alt="" @click="changeSwiper(goodsItem.goods_img,imgKey)">
                </div>
            </div>
        </div>
        <!-- 报的价列表 -->
        <template v-if="orderInfo.length > 0">
            <div class="order-offer-title fz_14">报价列表</div>
            <div class="order-offer">
                <div v-for="(item,index) in orderInfo" :key="index" class="order-lists">
                    <div v-for="(val,index) in item.goods" :key="index" class="order-list">
                        <div class="order-offer-li-title dflex">
                            <div class="order-offer-li-index color_424242 fz_14">
                                {{index + 1}}
                            </div>
                            <div class="order-offer-li-goodsName fz_16">
                                <span>{{val.goods_name}}</span>
                            </div>
                            <div class="order-offer-li-price fz_12 color_EE2D2D">
                                ¥<span class="fz_16">{{val.price}}</span><span v-show="item.unit" class="fz_16 color_424242">/{{item.unit}}</span>
                            </div>
                        </div>
                        <div class="order-offer-li-content">
                            <div class="dflex">
                                <div class="order-offer-li-img">
                                    <img :src="val.goods_img" width="100%"/>
                                </div>
                                <div class="order-offer-li-introduce">
                                    <div class="order-offer-li-item fz_12">
                                        <div>报价时间:<span class="pl-10">{{item.add_time}}</span></div>
                                    </div>
                                    <div class="order-offer-li-item fz_12">
                                        <div>运费:<span class="pl-10">&yen;{{item.shipping_fee}}</span></div>
                                    </div>
                                    <div class="order-offer-li-item dflex fz_12">
                                        <div>商家评级:</div>
                                        <div class="pl-10"><template v-if="item.score>=0"><gStar :starValue="item.score"></gStar></template></div>
                                        <div class="color_EE2D2D fz_14">{{item.score}}</div>
                                    </div>
                                    <div class="order-offer-li-describe dflex fz_12">
                                        <div class="describe-label">备注：</div>
                                        <div class="describe-text">{{item.remarks}}</div>
                                    </div>
                                    <div class="stamp " v-if="item.status == 2 && purchaseOrder.status == 3"><img src="../assets/img/yingzhang.png" alt=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="type == 2">
                        <div class="call-up fz_14 dflex" v-for="(val,index) in item.goods" :key="index">
                            <div class="dflex" v-if="purchaseOrder.status == 2">
                                <span class="color_424242" v-show='val.wid>0&&val.wid!==null' size='small' @click="queryCondition(item,val,false)">商品详情</span>
                                <span class="trade " size='small' @click="orderTrade(item)">交易</span>
                            </div>
                            <div class="dflex" v-if="item.status == 2 && purchaseOrder.status == 3">
                                <span class="color_424242" @click="CallUp(item)">联系商家</span>
                                <span class="color_424242" v-show='val.wid>0&&val.wid!==null' size='small' @click="queryCondition(item,val,true)">商品详情</span>
                                <span class="color_424242" size='small' @click="queryOrder(purchaseOrder)">查看订单</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div v-else-if="pitera" class="pitera-img fz_14 color_808080">
            <img src="../assets/img/zanwuhsangjia.png" alt="">
            <div>暂无报价商家</div>
        </div>
        <swiper-alert ref="swiperAlert" class="swiper-alert-box swiperHide animated" :class="[swiperShowStatus()]" :swiperImg="img" @swiperClose="swiperClose"></swiper-alert>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Dialog} from 'vant';
    import {HandleTime,post,appFunc} from '../assets/js/commonAPI.js';
    import '../assets/css/animate.css'
    import '../assets/css/commonstyle.css';
    import gStar from '../components/goods/star.vue'
    import navbar from '../components/navbar/nav.vue'
    import swiperAlert from "../components/swiper/swiper.vue"

    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    Vue.use(Dialog)
    export default {
        data() {
            return {
                receivedTime:'',        //####>结束时间
                orderInfo:[],           //####>报价列表
                catId:'',
                type:0,                 //判断是否是自己的求购单 1不是 2是

                img: [],
                //swiper 弹窗状态
                swiperShow:0,
                //swiper 弹窗图片选择状态
                imgActive:0,
                purchaseOrder:[],       //求购详情
                time:new Date().getTime(),

                pitera:false,
            }
        },
        created(){
            this.catId = this.$route.query.catid;
            let type = this.$route.query.type;
            if(this.$appFunc.prototype.isEmpty(type)){
                this.type = 2;
            }else{
                this.type = type;
            }

            this.$post('/?c=sourcing&a=purchaseInfo',{
                purchase_id:this.catId
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.purchaseOrder = res.data;
                        break;
                    default:
                        break;
                }
            });

            this.$post('/?c=sourcing&a=biddingList',{
                purchase_id:this.catId
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.orderInfo = res.data.list;
                        if(!res.data.list){
                            this.pitera = true;
                        }
                        break;
                    default:
                        break;
                }
            })
        },
        filters:{
            receivedTime(date){
                return HandleTime(new Date(Number(date + '000')))
            }
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            //拨打电话
            CallUp(item){
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=merchant&a=call',{
                    seller_id:item.ru_id
                })
                .then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            Dialog.confirm({
                                title: '联系商家',
                                message: '请使用该'+ res.data.mobile +'号码联系该商家,如果手机为该号码，请点击确定键'
                            }).then(() => {
                            // on confirm
                                window.location.href='tel://'+res.data.phone;
                            }).catch(() => {
                            // on cancel
                            });
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                })
            },
            //确认订单
            orderTrade(item){ 
                Dialog.confirm({
                    title: '确认是否交易',
                }).then(() => {
                // on confirm
                    this.$parent.$refs.loading.style.display = 'flex'
                                
                    this.$post('/?c=sourcing&a=confirm',{
                        purchase_seller_id : item.purchase_seller_id
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch(res.code){
                            case 0:
                                this.$toast('达成交易意向，请及时支付');
                                let amount = Number(item.amount) + Number(item.shipping_fee)
                                sessionStorage.setItem('wapPrice',amount);
                                this.goToPayPage(res.data.order_sn)
                                break;
                            default:
                                this.$toast(res.msg);
                                break;
                        }
                    })
                }).catch(() => {
                // on cancel
                });
            },

            
            //判断是跳转到一般支付页还是线下支付页
            goToPayPage(order_sn){
                this.$post('/?c=order&a=payStatus',{
                    order_sn: order_sn  //订单号
                })
                .then((res)=>{   
                    console.log('/?c=order&a=payStatus===', res)                 
                    switch(res.code){                    
                        case 0:
                            let Path = ''
                            if(res.data.online_pay === 1) {
                                //线上支付
                                Path = '/Cashier'
                            }else {
                                //线下支付
                                Path = '/Payoff'
                            }
                            this.$router.push({
                                path:Path,
                                query:{
                                    id:order_sn,
                                    endtime: res.data.end_time,
                                    offline_img: res.data.offline_img,
                                    type:'purchase',
                                }
                            });
                            break;
                        case 1:
                            this.$toast(res.msg);
                            this.$router.go(-1);
                        default:
                            break;
                    }
                })                
            },
            // 点击查看详情
            
            queryCondition(item,val,lock){
                let data = {
                    amount:item.amount,
                    price:val.price,
                    wid:val.wid,
                    num:this.purchaseOrder.goods[0].goods_number,
                    unit:this.purchaseOrder.goods[0].unit,
                    lock:lock,
                };
                localStorage.setItem('purchaseGoods',JSON.stringify(data));
                this.$router.push({
                    path:'/purchaseGoods',
                    query:{
                        'goods':val.wid
                    }
                });
        
            },
            queryOrder(item){
                this.$router.push({
                    path:'/seeDetails',
                    query:{
                        'sn':item.order_sn
                    }
                });
            },
            
            /* swiper 组件 */
            //图片查看
            changeSwiper(item,index){
                this.img = item;
                this.swiperShow = 1;
                this.imgActive = index;
                let swiperChild = this.$refs.swiperAlert.swiper;
                swiperChild.slideTo(index,0,false);
            },
            //关闭图片浏览
            swiperClose(){
                this.swiperShow = 2;
                setTimeout(()=>{
                    this.swiperShow = 0;
                },600)
            },
            swiperShowStatus(){
                if(this.swiperShow==0){
                    return ''
                }else if(this.swiperShow==1){
                    //打开弹窗 过度动画
                    return 'swiperShow fadeIn'
                }else{
                    //关闭弹窗 过度动画
                    return 'swiperShow fadeOut'
                }
            },
           
        },
        components: {
            gStar,
            navbar,
            swiperAlert,
        },
    }
</script>

<style scoped lang="less">
    .icon-style{
        font-size: 22px;
        color: #333;
    }
    
    /* 查看图片的弹窗 默认隐藏 */
    .swiper-alert-box{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: opacity .8s;
        -webkit-animation-duration: .6s;
        animation-duration: .6s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    /* 查看图片的弹窗*/
    .swiperHide{
        opacity: 0;
        z-index: -1;
    }
    /* 查看图片的弹窗*/
    .swiperShow{
        opacity: 1;
        z-index: 1;
    }

    .pl-10{
        padding-left: .533rem;
    }
    .van-hairline--bottom::after{
        border-bottom: 1px solid #808080;
    }

    .order-info{
        padding: .8rem .64rem;
        margin-bottom: .533rem;
        background-color: #fff;
        .auction-title{
            padding: 0 0 .533rem;
        }
        
    }
    .order-title{
        justify-content:space-between;
    }
    .order-remarks{
        position: relative;
        margin: 6px 0;
        .guoqi-img{
            width: 81px;
            height: 27px;
            position: absolute;
            right: 0;
            top: 0;
            img{
                display: block;
                width: 100%;
            }
        }
    }
    .order-class,
    .order-origin,
    .order-time{
        margin-bottom: 6px;
    }
    .order-class span,
    .order-origin span,
    .order-time span{
        padding-left: 5px;
    }
    .order-imgs{
        justify-content: flex-start;
    }
    .order-imgs .order-img{
        max-width: 3.2rem;
        min-width: 3.2rem;
        height: 3.2rem;
        margin-right: .533rem;
        border-radius: 5px;
        overflow: hidden;
        background-color: #eee;
    }
    .order-imgs .order-img img{
        display: block;
        width: 100%;
        height: 100%;
    }


    .order-offer-title{
        text-align: center;
        height: 2.35rem;
        line-height: 2.35rem;
        background-color: #fff;
    }

    /* 求购列表 */
    .order-offer{
        background-color: #fff;
    }
    .order-lists{
        padding-bottom: .8rem;
        border-bottom: 1px solid #eee;
        .order-list{
            border-top: 1px solid #d8d8d8;
            padding: 0 .64rem;
            .order-offer-li-title{
                width: 100%;
                margin: .8rem 0;
                .order-offer-li-index{
                    min-width: 1.17rem;
                    height: 1.17rem;
                    line-height: 1.17rem;
                    text-align: center;
                    border-radius: 5px;
                    background-color: #FDE4E4;
                    margin: auto;
                    margin-left: 0;
                    margin-right: 5px;
                    
                }
                .order-offer-li-goodsName{
                    margin: auto;
                    margin-left: 0;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;  
                    max-width: 60%;
                }
                .order-offer-li-price{
                    margin: auto;
                    margin-right: 0;
                    white-space: nowrap;
                }
            }
        }
    }
    .order-lists:last-child{
        border-bottom: 0;
    }
    .order-offer-li-item{
        font-size: .64rem;
        margin-bottom: 3px;
    }
    .order-offer-li-img{
        max-width: 5.33rem;
        min-width: 5.33rem;
        height: 5.33rem;
        border-radius: 5px;
        overflow: hidden;
        flex: 1;
    }
    .order-offer-li-img>img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .order-offer-li-introduce{
        padding-left: .533rem;
        position: relative;
        flex: 1;
        .stamp{
            width: 81px;
            position: absolute;
            top: 0;
            right: 0;
            img{
                width: 100%;
                display: block;
            }
        }
    }
    .order-offer-li-describe{
        color:  #414241;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        .describe-label{
            flex:.2;
            max-width: 2.13rem;
            min-width: 2.13rem;
        }
        .describe-text{
            flex:.8;
        }
    }
    /* 联系商家 */
    .call-up{
        text-align: right;
        padding: .8rem .64rem 0;
        justify-content: flex-end;
    }
    .call-up span{
        display: inline-block;
        padding: 0 .6rem;
        line-height: 1.49rem;
        font-size: .75rem;
        border-radius: 5px;
        background-color: #fff;
        border:1px solid #999;
        margin-left: .533rem;
    }
    .call-up span.trade{
        color: #fff;
        border-radius: 5px;
        background-color: #EE2D2D;
        border:1px solid #EE2D2D;
    }


    .pitera-img{
        margin-top: 20px;
        img{
            display: block;
            width: 5.07rem;
            margin: auto;
        }
        >div{
            margin: 12px auto;
            text-align: center;
        }
    }
</style>