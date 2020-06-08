<template>
    <div class="goodsBox">
        <!-- nav -->
        <navbar type="left" title="求购商品详情" @clickleft="goPreviousPage"></navbar>
        
        <!-- 商品内容 -->
        <div class="goods-content">
            <!-- 轮播图 -->
            <div class="goods-swiper">
                <van-swipe :autoplay="6000" @change="bannerOnChange" :height="innerHtmlWidth">
                    <van-swipe-item v-for="(item,index) in goodsBanner" :key="index">
                        <a :href="item.link">
                            <img :src="item.img_url" width="100%">
                        </a>
                    </van-swipe-item>
                    <div class="custom-indicator fz_14" slot="indicator">
                        {{ bannerCurrent + 1 }}/{{goodsBanner.length}}
                    </div>
                </van-swipe>
            </div>
            <!-- 商品名称 -->
            <div class="goods-info">
                <div class="goods-info-titel fz_16 color_424242">
                    <div class="">{{goods_name}}</div>
                </div>
                <div class="goods-info-puchase">
                    <div class="goods-info-puchase-price color_424242 fz_14">报价：<span class="color_EE2D2D ">&yen;{{purchaseGoods.price}}</span><template v-if="purchaseGoods.unit != null">/{{purchaseGoods.unit}}</template></div>
                    <div class="goods-info-puchase-count color_424242 fz_14">合同量：<span class="color_EE2D2D ">{{purchaseGoods.num}}{{purchaseGoods.unit}}</span></div>
                    <div class="goods-info-puchase-total color_424242 fz_16">总价：<span class="color_EE2D2D fz_18">&yen;{{purchaseGoods.amount}}</span></div>
                </div>
            </div>
            <!-- 标签 -->
            <div class="goods-info-service fz_12" v-if="goods_tag.length > 0">
                <van-row>
                    <van-col  class="goods-info-service-title color_424242">
                        <span>实力保障：</span>
                    </van-col>
                    <van-col span='18' class="goods-info-service-label">
                        <div class="goods-info-service-tag color_808080" v-for="(item,index) in goods_tag" :key="index">{{item}}</div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <!-- 店铺信息 -->
        <div class="goods-shop-info-box" v-if="purchaseGoods.lock">
            <div class="goods-shop-info ">
                <div class="goods-shop-info-head dflex" @click="goShop">
                    <div class="goods-shop-info-logo">
                        <img src="../../assets/img/no_picture.gif" width="100%" v-if="shopLogo == '/images/no_picture.gif' || shopLogo == ''" />
                        <img :src="shopLogo" width="100%" v-else />
                    </div>
                    <div class="goods-shop-box">
                        <div class="goods-shop-info-name fz_14 color_424242">{{shopName}}</div>
                        <div v-if="starValue>=0">
                            <gStar :starValue="starValue"></gStar>
                        </div>
                    </div>
                    <div class="goods-shop-Goshop ">
                        <van-button>进入店铺</van-button>
                    </div>
                </div>
            </div>
            <div class="goods-evaluate dflex">
                <div class="goods-pf fz_12 color_808080">货品描述<span class="lower color_EE2D2D">{{description}}</span></div>
                <div class="goods-pf fz_12 color_808080">商家服务<span class="lower color_EE2D2D">{{service}}</span></div>
                <div class="goods-pf fz_12 color_808080">物流服务<span class="lower color_EE2D2D">{{shipping}}</span></div>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="cutbox">
            <div v-if='attrInfo.length>0'>
                <div class="cut-title"><van-button>商品属性</van-button></div>
                <div class="cut-attr-box">
                    <div class="cut-attr-tr fz_12" v-for="(cutItem,cutIndex) in attrInfo" :key="cutIndex">
                        <div class="cut-attr dflex">
                            <div class="cut-attr-td dflex color_808080"><span>{{cutItem.attr_name}}</span></div>
                            <div class="cut-attr-td dflex color_424242"><span>{{cutItem.attr_value}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div  v-if='getcutImg && getcutImg !=""' class="getcutImg">
                <div class="cut-title"><van-button>商品详情页</van-button></div>
                <div>
                    <div class='goods-item'>
                        <div v-if="getcutImg.word_one != ''">{{getcutImg.word_one}}</div>
                        <div v-if="getcutImg.img_one != ''"><img :src="getcutImg.img_one" alt=""></div>
                        <div v-if="getcutImg.word_two != ''">{{getcutImg.word_two}}</div>
                        <div v-if="getcutImg.img_two != ''"><img alt="" v-for="(gImgTwoItem,gImgTwoKey) in getcutImg.img_two" :key="gImgTwoKey" :src="gImgTwoItem"></div>
                    </div>
                </div>
            </div>
            <div v-else class="getcutImg">
                <div class="cut-title"><van-button>商品详情页</van-button></div>
                <div>
                    <div class='buyer-tips'>
                        <img src="../../assets/img/none/commodity_details.png">
                        <div>暂无详情内容</div>
                    </div >
                </div>
            </div>
            <div v-if="buyerTips != ''" class="buyerTips">
                <div class="cut-title"><van-button>买家须知</van-button></div>
                <div>
                    <div class='buyer-tips'>
                        <img :src="buyerTips">
                    </div >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import $ from "jquery";
    import 'font-awesome/css/font-awesome.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {post,appFunc} from '../../assets/js/commonAPI.js';
    import Vue from 'vue';
    import {Dialog,Tab,Tabs} from 'vant'
    import navbar from '../navbar/nav.vue'
    import goodsSpec from '../component/goodsSpec.vue';
    import goodsPriceSpec from '../component/goodsPriceSpec.vue';
    import gStar from '../goods/star.vue';


    Vue.prototype.$post = post
    Vue.prototype.$appFunc = appFunc

    const innerHtmlWidth = document.documentElement.clientWidth;
    export default {
        data() {
            return {
                goods_name: '',             //商品名称
                goodsBanner: [],            //轮播图
                bannerCurrent: 0,
                shopLogo: '',               //店铺LOGO
                shopName: '',               //店铺名称
                goods_price: '--',          //价格
                moq: '--',                  //起批量
                goods_unit: '--',           //单位
                goods_tag: [],                    //商品标签
                tag: [],                    //标签
                goods_id: '',               //商品ID
                goodsImage: '',
                comments:0,                 //评价个数
                commentInfo:[],             //评论详情
                
                // starValue:'0',              //店铺星级
                /* 参数 */
                id: '',                     //方案ID
                /*评价控制*/
                trade90: '',                //最近
                customerRetention: '',      //回头率
                description: '',            //货品描述
                service: '',                //响应
                shipping: '',               //发货
                dataInfo: {},
                dataInfodata:{},
                region: 0,
                seller_id: '',
                user_id: '',
                isReceivedTiem: false,
                configId: '',
                getcutImg:[],               //商品详情
                getcuTitle:[],              //商品属性
                attrInfo:[],                //商品属性
                buyerTips:"",               //买家须知
                pricemode: -1,              //判断显示那一个
                volume: [],                 //价格展示
                is_collect:0,               //初始化收藏
                starValue:-1,                    //平均分
                disabled:false,             //是否下架

                purchaseGoods : [],

                innerHtmlWidth:innerHtmlWidth,//窗口宽度
            }
        },
        created() {
            //获取地址栏信息
            let _this = this;
            this.id = this.$route.query.goods;
            this.region = localStorage.getItem('wapres');

            let purchaseGoods = localStorage.getItem('purchaseGoods');
            if(purchaseGoods){
                this.purchaseGoods = JSON.parse(purchaseGoods);
            }
            
            //商品信息
            this.$post('/?c=goods&a=detail', {
                id: this.id
            }).then((res) => {
                switch (res.code) {
                    case 0:
                        this.goodsBanner = res.data.goods_banner;
                        this.goods_name = res.data.goods_name;
                        this.goods_id = res.data.goods_id;
                        this.goods_price = res.data.goods_price;
                        this.moq = res.data.moq;
                        this.goods_unit = res.data.goods_unit;
                        this.goods_tag = res.data.tag;
                        this.goodsImage = res.data.goods_img;
                        this.user_id = res.data.user_id;
                        this.pricemode=res.data.price_model;
                        this.volume=res.data.volume;
                        this.comments=res.data.comment_cnt;
                        this.is_collect=res.data.is_collect;
                        //店铺信息
                        
                        this.$post('/?c=merchant&a=shopInfo', {
                            seller_id: this.user_id
                        }).then((res) => {
                            switch (res.code) {
                                case 0:
                                    this.shopName = res.data.name;
                                    this.shopLogo = res.data.logo_thumb;
                                    this.trade90 = res.data.rate.trade90;
                                    this.customerRetention = res.data.rate.customer_retention;
                                    this.description = res.data.rate.description.value;
                                    this.service = res.data.rate.service.value;
                                    this.shipping = res.data.rate.shipping.value;
                                    this.seller_id = res.data.seller_id;

                                    
                                    this.starValue = res.data.rate.score.value;
                                    console.log(res.data.rate.score.value);
                                    break;
                                default:
                                    break;
                            }
                        });


                        // 获取商品详情的请求
                        this.$post('/?c=goods&a=info2',{
                            //接口传值
                            id: this.id
                        }).then((res)=> {
                            this.getcutImg = res.data
                        });
                        //商品属性
                        this.$post('/?c=goods&a=attr', {
                            id: this.goods_id
                        })
                        .then((res) => {
                            if(this.$appFunc.prototype.isEmptyObject(res.data)){
                                
                            }else{
                                this.attrInfo = res.data.attr;
                            }
                        })
                        break;
                    default:
                        break;
                }
            });
            
            this.$post('/?a=userKnown',{}).then(res => {//用户须知
                switch(res.code){
                    case 0:
                        this.buyerTips = res.data
                        break;
                }
            }); 
        },
        methods: {
            //轮播图切换
            bannerOnChange(index){
                this.bannerCurrent = index;
            },
            //返回上一页
            goPreviousPage() {
                this.$router.go(-1);
            },
            //购物车
            shoppingCart() {
                this.$router.push({
                    path: '/shoppingCart'
                })
            },
            //加入购物车或立即购买
            addShoppingCart() {
                if(this.disabled){
                    this.$toast("该商品已下架")
                    return
                }
                let hasSpec = false;
                if(this.dataInfo.hasOwnProperty('data')){
                    if(this.dataInfo.data.hasOwnProperty('spe')){
                        hasSpec = true;
                    }
                }
                const dataLength = hasSpec?Object.keys(this.dataInfo.data.spe).length:0;
                if (dataLength > 0) {
                    this.isReceivedTiem = true;
                } else {  //没有规格，重新获取规格
                    this.$post('/?c=goods&a=spec', {
                        id: this.goods_id
                    }).then((res) => {
                        console.log(this.moq);
                        if ( res.data.spe.length == 0) { //无规格
                            this.$post('/?c=cart&a=addToCart', {
                                wholesale_id: this.id,
                                attribute: [{'spec': '', number: this.moq}]
                            })
                                .then((res) => {
                                    switch (res.code) {
                                        case 0:
                                            // this.$router.push({
                                            //     path: '/shoppingCart'
                                            // });
                                            this.$toast("添加购物车成功");
                                            this.isReceivedTiem = false;
                                            break;
                                        case 1:
                                            this.$toast(res.msg);
                                            break;
                                        default:
                                            break;
                                    }
                                })
                        } else {
                            this.mask = 1;
                            this.goods_order = 1;
                            this.goods_botton = 2;
                            this.isReceivedTiem = true;
                        }
                    })
                }
            },
            //产品规格
            goodsSpec() {
                this.isReceivedTiem = true;
            },
            //进入店铺
            goShop() {
                localStorage.setItem('merchantsLogo', this.goodsLogn);
                this.$router.push({
                    path: '/shop',
                    query: {
                        businessHeadTitle: this.goodsNmae,
                        index: this.user_id,
                        region: this.region
                    }
                })
            },
            // 评价
            evaluate() {
                this.$router.push({
                    path: '/goodsEvaluate',
                    query: {
                        index: this.goods_id
                    }
                })
            },
            // 收藏
            changeicon() {
                // 获取点击的当前项
                    if ( this.is_collect == 0) {
                            //取消
                            // 取消收藏以后发送id
                            this.$post("/?c=goods&a=addCollect", {
                            // 接口传值
                            wholesale_id:this.id
                            }).then(res => {
                            if (res.code == 0) {
                                this.is_collect=1
                                console.log(this.is_collect)
                                this.$toast("收藏成功");
                            }
                            });
                    } else {
                    }
                 },
            //取消收藏
             // 取消收藏
            changeiconChange( index, item) {
                // 获取点击的当前项
                if ( this.is_collect == 1) {
                //取消
                // 取消收藏以后发送id
                    this.$post("/?c=goods&a=delCollect", {
                        // 接口传值
                        wholesale_id: this.id
                    }).then(res => {
                        if (res.code == 0) {
                        this.is_collect=0
                        this.$toast("取消收藏");
                        }
                    });
                } else {
                }
            },  
            // 商品详情左右切换事件
             cut(index, title) {
                // this.$toast(title);
            },
            /* getStar(){
                let starValue = ((Number(this.description.value) + Number(this.service.value) + Number(this.shipping.value) ) / 3).toFixed(2)
                return starValue;
            } */
        },
        components: {
            swiper,
            navbar,
            swiperSlide,
            goodsSpec,
            gStar,
            goodsPriceSpec
        },
    }
    
</script>

<style lang="less" scoped>
    .goodsBox{background-color: #f2f2f2;}
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: .64rem;line-height: .64rem;}
    .fz_14{font-size: .75rem;line-height: .75rem;}
    .fz_16{font-size: .85rem;line-height: .85rem;}
    .fz_18{font-size: .96rem;line-height: .96rem;}
    .fw_bolder{font-weight: bolder;}
    .dflex{display: flex;}
    .van-nav-bar{border-bottom: 1px solid #f2f2f2;}
    .van-nav-bar .van-icon{color: #232323;}
    .van-button{border: none;}

    .dialog{
        .dialog-box{
            border-bottom: 1px solid #d8d8d8;
            .van-col{
                text-align: center;
            }
            .van-col:first-child div{
                border-right: 1px solid #d8d8d8
            }
            .van-col > div{
                padding: 10px 0;
            }
        }
        
    }

    .goods-swiper{
        position: relative;
        // max-height: 300px;
        background-color: #fff;
        .van-swipe-item{
            a{
                display: block;
                height: 100%;
            }
            img{
                display: block;
                height: 100%;
            }
        }
        .custom-indicator{
            position: absolute;
            right: 10px;
            bottom: 10px;
            padding: 2px 5px;
            background-color: rgba(0,0,0,.42);
            color: #fff;
            border-radius: 5px;
        }
    }
    .goods-info{
        background-color: #fff;
        padding: 0 12px;
        .goods-info-titel{
            line-height: 24px;
            padding: 15px 0;
        }
        .goods-info-price-info{
            padding-bottom: 10px;
            .goods-info-price-info-box{
                max-width: 33%;
            }
        }
        .goods-info-price-info.pricemode2{
            .goods-info-price-info-box{
                margin: auto;
                max-width: 33%;
            }
            .goods-info-price-info-box:nth-child(1){
                text-align: left;
                margin-left: 0;
                .goods-info-price{
                    text-align: center;
                }
            }
            .goods-info-price-info-box:nth-child(2){
                text-align: center;
                margin-left: 0;
            }
            .goods-info-price-info-box:nth-child(3){
                text-align: right;
                margin-right: 1px;
                .goods-info-price{
                    text-align: center;
                }
            }
            .goods-info-order{
                margin-top: 8px;
            }
        }
    }
    .goods-info-service{
        background-color: #fff;
        padding: 0 15px;
        line-height: 18px;
        max-width: 375px;
        overflow: hidden;
        padding-bottom: 5px;
        .goods-info-service-title{
            min-width: 60px;
            margin: 5px 0;
            margin-left: 0;
        }
        .goods-info-service-label{
            margin: auto;
            margin-left: 0;
            .goods-info-service-tag{
                padding: 3px 5px;
                background-color: #f2f2f2;
                margin: 5px auto;
                margin-left: 5px;
                line-height: 12px;
                float: left;
            }
        }
        .goods-info-service-label::after{
            content: "";
            display: table;
            clear: both;
        }

    }
    .evaluate{
        margin-top: 10px;
        padding: 0 15px;
        background-color: #fff;
        .goods-info-service-title{
            margin: auto;
            margin-left: 0;
            padding: 15px 0;
        }
        .checkInvestigateBox{
            margin: auto;
            margin-right: 0;
            .checkMore{
                margin-left: 6px;
            }
        }
        .goods-comment-box{
            word-break: break-word;
            .comment-user-box{
                margin-bottom: 5px;
                .commnet-user-head{
                    width:28px;
                    height: 28px;
                    border-radius: 28px;
                    overflow: hidden;
                    margin: auto 0;
                    margin-right: 10px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .commnet-user-name{
                    margin: auto;
                    margin-left: 0;
                }
            }
            .commnet-content{
                line-height: 24px;
                padding-bottom: 10px;
                word-break: break-word;
            }
        }
    }
    .goods-shop-info-box{
        padding: 0 15px;
        margin-top: 10px;
        background-color: #fff;
        .goods-shop-info{
            padding-top: 18px;
            .goods-shop-info-head{
                .goods-shop-info-logo{
                    width: 54px;
                    height: 54px;
                    overflow: hidden;
                    border-radius: 5px;
                    margin-right: 10px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .goods-shop-box{
                    margin: auto;
                    margin-left: 0;
                    .goods-shop-info-name{
                        margin-bottom: 10px;
                    }
                    .goods-star-box{
                        .goods-star{
                            position: relative;
                            width:16px;
                            height: 16px;
                            margin-right: 5px;
                            .goodsStar_default{
                                img{
                                    display: block;
                                    width:16px;
                                    height: 16px;
                                }
                            }
                            .goodsStar_all{
                                position: absolute;
                                top: 0;
                                overflow: hidden;
                                img{
                                    display: block;
                                    width:16px;
                                    height: 16px;
                                }
                            }
                            .goodsStar_none{
                                width: 0;
                            }
                            .goodsStar_half{
                                width: 50%;
                            }
                            .goodsStar_block{
                                width: 100%;
                            }
                        }
                    }
                }
                .goods-shop-Goshop{
                    margin: auto;
                    margin-right: 0;
                    .van-button {
                        height: 25px;
                        line-height: 1;
                        width: 75px;
                        padding: 0;
                        border: 1px solid #EE2D2D;
                        color: #EE2D2D;
                        border-radius: 5px;
                        font-size: .75rem;
                    }
                }
            }
        }
        .goods-evaluate{
            margin-top: 10px;
            padding-bottom: 15px;
            .goods-pf:nth-child(1){
                margin: auto;
                margin-left: 0;
            }
            .goods-pf:nth-child(2){
                margin: auto;
            }
            .goods-pf:nth-child(3){
                margin: auto;
                margin-right: 0;
            }
        }
    }
    .cutbox{
        padding: 0 12px;
        background-color: #fff;
        margin-top: 10px;
        .cut-title{
            padding: 15px 0;
            .van-button{
                background-color: #EE2D2D;
                color: #fff;
                line-height: .85rem;
                padding: 5px 10px;
                font-size: .85rem;
                height: auto;
                border:none;
            }
        }
        .cut-attr-box{
            padding-bottom: 20px;
            .cut-attr-tr{
                border:1px solid #d8d8d8;
                border-bottom: 0;
                .cut-attr{
                    margin: auto;
                    .cut-attr-td{
                        border-right: 1px solid #d8d8d8;
                        max-width: 100px;
                        flex: 1;
                        height: 42px;
                        span{
                            margin: auto;
                        }
                    }
                    .cut-attr-td:last-child{
                        border-right: 0;
                        max-width: none;
                    }
                }
            }
            .cut-attr-tr:last-child{
                border-bottom: 1px solid #d8d8d8;
            }
        }
        .getcutImg{
            text-align: left;
            img{
                margin: auto;
                display: block;
                max-width: 100%;
            }
        }
        .buyer-tips{
            padding-bottom: 20px;
            img{
                margin: auto;
                display: block;
                width: 100%;
            }
        }
        .buyerTips{
            img{
                width: 100%;
            }
        }
        
    }
    .goods-nav{
        position: fixed;
        height: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: #fff;
        .goods-btn-box{
            flex: 1;
            .icon-img-box{
                margin: auto;
                width: 33%;
                text-align: center;
            }
            .icon-img{
                margin-bottom: 5px;
                img{
                    display: block;
                    height: 19px;
                    margin: auto;
                }
            }
            .icon-tit{
                color: #666;
            }
            .van-button{
                background-color: #ee2d2d;
                height: 50px;
                width: 100%;
                line-height: 1;
                padding: 0;
                color: #fff;
            }
        }
        .goods-btn-left{
            border-top: 1px solid #dadada;
        }
        
    }
    .goods-btn{
        height: 100%;
    }
    .goods-info-puchase{
        .goods-info-puchase-price{
            padding-bottom: 10px;
        }
        .goods-info-puchase-count{
            padding-bottom: 10px;
        }
        .goods-info-puchase-total{
            padding-bottom: 15px;
        }
    }
    
    .zon-content-none {
        text-align: center;
    }
    .zon-content-none img{
        display: block;
        width: 50%;
        margin: auto;
    }
    .zon-content-none p{
        color: #808080;
        font-size: 14px;
    }
</style>