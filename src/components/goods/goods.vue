<template>
    <div>
        <div v-if="show" class="goodsBox">
            <!-- nav -->
            <navbar type="left" :title="goods_name" @clickleft="goPreviousPage"></navbar>
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
                    <div class="goods-info-remark fz_14 color_808080">
                        <div class="">{{remark}}</div>
                    </div>
                    <div class="goods-info-price-info pricemode1" v-if="pricemode == 2">
                        <div class="goods-info-price-info-box">
                            <div class="goods-info-price fz_12"><span class="color_EE2D2D">&yen;</span><span class="goods-info-money fz_16 color_EE2D2D">{{goods_price}}</span><template v-if="goods_unit!='' && goods_unit!=null">/{{goods_unit}}</template></div>
                        </div>
                    </div>
                    <div class="goods-info-price-info pricemode2 dflex" v-if="pricemode == 1">
                        <div class="goods-info-price-info-box" v-for="(volumeItem,volumeIndex) in volume" :key="volumeIndex">
                            <div class="goods-info-price fz_12"><span class="color_EE2D2D">&yen;</span><span class="goods-info-money fz_16 color_EE2D2D">{{volumeItem.volume_price}}</span></div>
                            <template v-if="volumeIndex == 0"><div class="goods-info-order fz_12">{{volumeItem.volume_number}}{{goods_unit}}起批</div></template>
                            <template v-else-if=" volumeIndex == volume.length-1"><div class="goods-info-order fz_12">≥{{volumeItem.volume_number}}{{goods_unit}}</div></template>
                            <template v-else><div class="goods-info-order fz_12">{{volumeItem.volume_number}}~{{(volume[volumeIndex+1].volume_number)-1}}{{goods_unit}}</div></template>
                        </div>
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
            <div class="goods-spec-box dflex" v-if="shoppingCartClock==1 && dataInfodata != ''">
                <div class="goods-spec-box-label fz_14">选择<br>规格</div>
                <div class="goods-spec-box-spe" @click="addShoppingCart" v-if="is_close == 1 || is_close == 2">
                    <goodsSpecBox :data="dataInfodata" :measure_unit="measure_unit"></goodsSpecBox>
                </div>
                <div class="goods-spec-box-spe" v-else-if="enabled != 1">
                    <goodsSpecBox :data="dataInfodata" :measure_unit="measure_unit"></goodsSpecBox>
                </div>
                <div class="goods-spec-box-spe" v-else>
                    <goodsSpecBox :data="dataInfodata" :measure_unit="measure_unit"></goodsSpecBox>
                </div>
            </div>
            <!-- 按重计价 -->
            <div class="dflex pond" v-if="is_recosting == 1"  @click="changepond">
                <img class="pond-left" src="../../assets/img/chen.png" alt="">
                <div class="pond-text">按重计价</div>
                <img class="pond-right" src="../../assets/img/rightchen.png" alt="">
            </div>
            <pond v-if="flag" @showbtn='flagbtn'></pond>
            <!-- 规格 -->
            <van-actionsheet v-model="isReceivedTiem" :class="'pricemode'+pricemode">
                <!-- 阶梯 -->
                <goodsSpec @shoppingCartIn="shoppingCartIn" v-if='pricemode==1' :goodsID='goods_id' :id='id' :data='dataInfo' :goodsName='goods_name' :goodsImage='goodsImage' :goodsPrice='goods_price' :measure_unit="measure_unit"></goodsSpec>
                <!-- 规格 -->
                <goodsPriceSpec @shoppingCartIn="shoppingCartIn" v-if='pricemode==2' :goodsID='goods_id' :id='id' :data='dataInfo' :goodsName='goods_name' :goodsImage='goodsImage' :goodsPrice='goods_price' :measure_unit="measure_unit"></goodsPriceSpec>
            </van-actionsheet>

            <!-- 评价 -->
            <div class="evaluate">
                <div  v-if="commentInfo.length>0">
                    <div class="dflex " @click="evaluate">
                        <div class='goods-info-service-title fz_14 color_424242'>评价（{{comments}}）</div>
                        <div class="dflex fz_12 checkInvestigateBox color_808080">
                            <div class='checkInvestigateSpan'>点击查看</div>
                            <div class="fa fa-angle-right checkMore" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div>
                        <div class="goods-comment-box color_424242" v-for="(commentItem,commentIndex) in commentInfo" :key="commentIndex">
                            <div v-if="commentIndex == 0">
                                <div class="comment-user-box dflex">
                                    <div class="commnet-user-head" v-if="commentItem.userpicture && commentItem.userpicture != ''"><img :src="commentItem.userpicture" alt=""></div>
                                    <div class="commnet-user-name fz_12 ">{{commentItem.nick_name}}</div>
                                </div>
                                <div class="commnet-content fz_14">{{commentItem.content}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="dflex ">
                        <div class='goods-info-service-title fz_14 color_424242'>评价</div>
                        <div class="dflex fz_12 checkInvestigateBox color_808080">
                            <div class='checkInvestigateSpan'>暂无评论</div>
                            <div class="fa fa-angle-right checkMore" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 店铺信息 -->
            <div class="goods-shop-info-box">
                <div class="goods-shop-info ">
                    <div class="goods-shop-info-head dflex" @click="goShop">
                        <div class="goods-shop-info-logo">
                            <img src="../../assets/img/merchant_default.jpg" width="100%" v-if="shopLogo == '/images/no_picture.gif' || shopLogo == ''" />
                            <img :src="shopLogo" width="100%" v-else />

                            <div class="close_text_box" v-if="is_close == 0">
                                <div class="close_text close_bg" >店铺关闭</div>
                            </div>
                            <div class="" v-else-if="is_close == 1">
                                <div class="close_text " ></div>
                            </div>
                            <div class="close_text_box" v-else-if="is_close == 2">
                                <div class="close_text close_bg" >店铺打烊</div>
                            </div>
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
                <div v-if='attrInfo.length > 0'>
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
                <div  v-if='getcutImg && getcutImg != ""' class="getcutImg">
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
            <!-- 底部导航 -->
            <div style="height:50px;"></div>
            <div class="goods-nav" v-if="showCarBtn">
                <div class="dflex goods-btn">
                    <div class="dflex goods-btn-box goods-btn-left">
                        <div text="客服" @click="getPhone" class="icon-img-box" id="toGetPhone">
                            <div class="icon-img"><img src="../../assets/img/kefu.png" alt=""></div>
                            <div class="icon-tit fz_12">客服</div>
                        </div>
                        <div text="购物车" @click="shoppingCart" class="icon-img-box" id="toShoppingCart">
                            <div class="icon-img"><img src="../../assets/img/gouwuche.png" alt=""></div>
                            <div class="icon-tit fz_12">购物车</div>
                        </div>
                        <div v-show="is_collect==0" text="收藏" @click.stop="changeicon()" class="icon-img-box" id="toChangeicon">
                            <div class="icon-img"><img src="../../assets/img/soucang.png" alt=""></div>
                            <div class="icon-tit fz_12">收藏</div>
                        </div>
                        <div  v-show="is_collect==1" text="取消收藏" @click.stop="changeiconChange()" class="icon-img-box" id="toChangeicon">
                            <div class="icon-img"><img src="../../assets/img/souchang1.png" alt=""></div>
                            <div class="icon-tit fz_12">取消收藏</div>
                        </div>
                    </div>
                    <div class="goods-btn-box" id='addBtn' text="加入购物车" @click="addShoppingCart" v-if="is_close == 1 || is_close == 2">
                        <van-button>加入购物车</van-button>
                    </div>
                    <div class="goods-btn-box addBtnDisable" id='addBtn' text="商品已下架" v-else-if="enabled != 1">
                        <van-button disabled>商品已下架</van-button>
                    </div>
                    <div class="goods-btn-box addBtnDisable" id='addBtn' text="加入购物车" v-else>
                        <van-button>加入购物车</van-button>
                    </div>
                </div>
            </div>
            <van-dialog
                    v-model="dialogShow"
                    confirmButtonText='取消'
                    >
                <van-row class="dialog-box">
                    <van-col span='12'>
                        <div @click="getPhone" class="getPhone">
                            <img src="../../assets/img/dianhua.png" alt="">
                            <span>打电话给商家</span>
                        </div>
                    </van-col>
                    <van-col span='12'>
                        <div @click="contactService" class="contactService">
                            <img src="../../assets/img/kefu1-1.png" alt="">
                            <span>联系客服</span>
                        </div>
                    </van-col>
                </van-row>
            </van-dialog>
        </div>
        
        <div v-if="!vloadingShow" class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import $ from "jquery";
    import Vue from 'vue';
    import 'font-awesome/css/font-awesome.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {wxStart,wxShare} from '../../assets/js/wxjs.js';
    import {is_wexin} from '../../assets/js/commonAPI.js';
    import {Dialog,Tab,Tabs} from 'vant'
    import vantLoading from'../vantLoading.vue';

    const pond =  ()=>import("../../components/component/popup/pond.vue");
    const navbar =  ()=>import("../navbar/nav.vue");
    const goodsSpec =  ()=>import("../component/goodsSpec.vue");
    const goodsPriceSpec =  ()=>import("../component/goodsPriceSpec.vue");
    const goodsSpecBox =  ()=>import("./goodsSpecBox.vue");
    const gStar =  ()=>import("./star.vue");
    const vloading =  ()=>import("../vloading.vue");

    const innerHtmlWidth = document.documentElement.clientWidth;
    export default {
        data() {
            return {
                //是否显示内容 false-不显示 true-显示 。先判断商品是否为活动商品，是跳转到活动详情页，不是，显示内容
                show: false,

                goods_name: '',             //商品名称
                remark: '',                 //商品描述
                goodsBanner: [],            //轮播图
                bannerCurrent: 0,
                shopLogo: '',               //店铺LOGO
                shopName: '',               //店铺名称
                goods_price: '--',          //价格
                moq: '--',                  //起批量
                goods_unit: '--',           //单位
                measure_unit: '--',         //单位
                goods_tag: [],              //商品标签
                tag: [],                    //标签
                goods_id: '',               //商品ID
                goodsImage: '',
                comments:0,                 //评价个数
                commentInfo:[],             //评论详情
                
                // starValue:'0',           //店铺星级
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
                isicon: 2,                  //切换收藏
                dialogShow: false,          //显示客服
                tel: '4001288566',          //客服电话
                configId: '',
                getcutImg:[],               //商品详情
                getcuTitle:[],              //商品属性
                attrInfo:[],                //商品属性
                buyerTips:"",               //买家须知
                pricemode: -1,              //判断显示那一个    1-阶梯 2-规格
                volume: [],                 //价格展示
                is_collect:0,               //初始化收藏
                starValue:-1,               //平均分
                disabled:false,             //是否下架
                userInfo:{},                //商家信息
                shoppingCartClock : 0,      //购物车按钮  0 默认关闭 1 载入请求 2 点击购物车开关
                flag:false,
                is_recosting:0,

                showCarBtn:false,           //是否显示底部导航按钮
                enabled:1,                  //商品是否下架 0 已下架 1 未下架
                is_close:1,                 //店铺是否关闭 0 关闭 1开启 2店铺打烊

                innerHtmlWidth:innerHtmlWidth,//窗口宽度

                vloadingShow:true,
            }
        },
        created() {
            //获取地址栏信息
            let _this = this;
            this.id = this.$route.query.goods;
            this.region = localStorage.getItem('wapres');
                // this.getDetail();
            this.isActivityGoods()
        },
        methods: {
            //查询是否为活动商品
            isActivityGoods(){
                this.$post('/?c=groupBuying&a=isActivityGoods', {
                    wId: this.id
                })
                .then((res) => {
                switch (res.code) {
                    case 0:
                        console.log(res.data)
                            if(res.data.isActivity == 1) {
                                //是团购活动
                                this.$router.replace({
                                    path: "/groupBuyingGoods",
                                    query: {
                                        goods: this.id,
                                            }
                                });
                            }else {
                                this.show = true;
                                //不是团购活动
                                this.getDetail()
                            }
                        break;
                    default:
                            this.$toast(res.msg);
                        break;
                }
            }); 
        },
            //获取商品信息
            getDetail(){
                this.$post('/?c=goods&a=detail', {
                    id: this.id
                }).then((res) => {
                    switch (res.code) {
                        case 0:
                            this.goodsBanner = res.data.goods_banner;
                            this.goods_name = res.data.goods_name;
                            this.remark = res.data.remark;
                            this.goods_id = res.data.goods_id;
                            this.goods_price = res.data.goods_price;
                            this.moq = res.data.moq;
                            this.goods_unit = res.data.goods_unit;
                            this.measure_unit = res.data.measure_unit;
                            this.goods_tag = res.data.tag;
                            this.goodsImage = res.data.goods_img;
                            this.user_id = res.data.user_id;
                            this.pricemode=res.data.price_model;
                            this.volume=res.data.volume;
                            this.comments=res.data.comment_cnt;
                            this.is_collect=res.data.is_collect;
                            this.is_recosting=res.data.is_recosting;
                            this.enabled=res.data.enabled;
                            this.showCarBtn = true;
                            if(res.data.enabled !=='1'){
                                this.disabled = true;
                            }
                            
                            //店铺信息
                            this.$post('/?c=merchant&a=shopInfo', {
                                seller_id: this.user_id
                            }).then((res) => {
                                switch (res.code) {
                                    case 0:
                                        this.shopName = res.data.name;
                                        this.mobile = res.data.mobile;
                                        this.shopLogo = res.data.logo_thumb;
                                        this.trade90 = res.data.rate.trade90;
                                        this.customerRetention = res.data.rate.customer_retention;
                                        this.description = res.data.rate.description.value;
                                        this.service = res.data.rate.service.value;
                                        this.shipping = res.data.rate.shipping.value;
                                        this.seller_id = res.data.seller_id;

                                        this.is_close = res.data.shop_close ? res.data.shop_close : 1;
                                        
                                        this.starValue = res.data.rate.score.value;
                                        break;
                                    default:
                                        break;
                                }
                            });

                            
                            this.$post("/?c=goods&a=evaluationList",{
                                goods_id:this.goods_id,
                                score: 0 ,
                                page:1,
                                limit:1,
                            }).then(res=>{
                                switch(res.code){
                                    case 0:
                                        this.commentInfo = res.data.list;
                                        break;
                                    default:
                                        break;
                                }
                            })
                            //IM 客服
                            this.$post('/?c=user&a=getHx', {
                                id: this.goods_id
                            }).then((res) => {
                                this.configId = res.data;
                            });
                            
                            // 获取商品详情的请求
                            this.$post('/?c=goods&a=info2',{
                                //接口传值
                                id: this.id
                            }).then((res)=> {
                                this.getcutImg = res.data
                            });

                            this.$post('/?c=goods&a=spec', {
                                id: this.goods_id
                            })
                            .then((res) => {
                                this.shoppingCartClock = 1;
                                this.dataInfo = res;
                                this.dataInfodata=res.data.spe;
                                this.getcuTitle=res.data.pro;
                            })
                            
                            this.$post('/?c=goods&a=attr', {
                                id: this.goods_id
                            })
                            .then((res) => {
                                if(this.$appFunc.prototype.isEmptyObject(res.data)){
                                    
                                }else{
                                    this.attrInfo = res.data.attr;
                                }
                            })

                            if(is_wexin()){
                                let img_url = "";
                                if(this.goodsBanner[0].img_url == ""){
                                    img_url = window.location.origin + "/mobile/images/wxDefault.png";
                                }else{
                                    img_url = this.goodsBanner[0].img_url;
                                }
                                //微信分享
                                let datas = {
                                    urls : window.location.origin+"/mobile/m/goods?goods=" + this.id,
                                    imgurls : this.goodsBanner[0].img_url,
                                    title : "【农联贡菜】"+this.goods_name,
                                    desc : "¥" + this.goods_price + "/" +this.goods_unit,
                                }
                                
                                this.vloadingShow = false;
                                wxStart(()=>{
                                    this.vloadingShow = true;
                                    this.wxShare(datas)
                                })
                            }
                            break;
                        default:
                            break;
                    }
                }); 

            //环信
            this.$post('/?c=user&a=info',{}).then(res => {
                switch (res.code) {
                    case 0:
                        this.userInfo = res.data;
                        this.head = res.data.head;
                        this.tag = res.data.tag;
                        this.userName = res.data.name;
                        this.upgrade = res.data.upgrade === 1;
                        let _this = this;
                        // console.log(_this.orderSn)
                        easemobim.config = {
                            user: {
                                username: _this.userInfo.hx_username,
                                password: _this.userInfo.hx_pwd,
                            },
                            // 访客信息（可选）
                            visitor: {
                                phone: _this.userInfo.mobile_phone,
                                userNickname: _this.userInfo.name,
                                email: _this.userInfo.email,
                            },
                            onready: function () {
                                easemobim.sendExt({
                                    ext: {
                                        "type": "custom",
                                        "msgtype": {
                                            "order": {
                                               "title":"我正在看"+_this.goods_name,
                                                "price":"¥"+_this.goods_price,
                                                "img_url":_this.goodsImage,
                                                "desc":"商家:"+_this.shopName+''+_this.mobile
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

            
            this.$post('/?a=userKnown',{}).then(res => {
                switch(res.code){
                    case 0:
                        this.buyerTips = res.data
                        break;
                }
            }); 

        },
            //轮播图切换
            bannerOnChange(index){
                this.bannerCurrent = index;
            },
            //返回上一页
            goPreviousPage() {
                
                // if(localStorage.getItem('G_ROUTER_GOODS_FromName')){
                //     // let r = JSON.parse(localStorage.getItem('G_ROUTER_GOODS_FromName'));
                //     localStorage.removeItem('G_ROUTER_GOODS_FromName')
                //     // this.$router.push(r);
                //     this.$router.go(-2);
                // }else{
                //     this.$router.go(-1);
                // }

                if(this.fromHerf == null){
                    this.$router.push({
                        path:'/index'
                    });
                }else{
                    this.$router.go(-1);
                }
            },
            //客服
            customerService() {
                this.dialogShow = true;
            },
            // 跳转环信
            contactService() {
                this.dialogShow = false;
                let _this = this;
                // 跳转新页面
                // location.href='https://kefu.easemob.com/webim/im.html?configId={_this.configId}'
                // 当前页面显示弹出框
                easemobim.bind({
                    configId: _this.configId,
                });
            },
            // 获取电话
            getPhone() {
                //平台客服电话
                window.location.href='tel:4001288566';
                /*this.$post('/?c=merchant&a=call', {
                    seller_id: this.user_id
                })
                .then((res) => {
                    switch (res.code) {
                        case 0:
                            window.location.href = 'tel:' + res.data.phone;
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                });
                this.dialogShow = false;*/
            },
            //购物车
            shoppingCart() {
                this.$router.push({
                    path: '/shoppingCart'
                })
            },
            //加入购物车或立即购买
            addShoppingCart() {
                if(this.shoppingCartClock == 0){
                    return false;
                }else{
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
                        if(this.shoppingCartClock == 1){
                            this.shoppingCartClock = 2;
                                this.$post('/?c=goods&a=spec', {
                                id: this.goods_id
                            }).then((res) => {
                                if ( res.data.spe.length == 0) { //无规格
                                    this.$post('/?c=cart&a=addToCart', {
                                        wholesale_id: this.id,
                                        attribute: [{'spec': '', number: this.moq}]
                                    }).then((res) => {

                                        this.shoppingCartClock = 1;
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
                                    this.shoppingCartClock = 1;
                                    this.mask = 1;
                                    this.goods_order = 1;
                                    this.goods_botton = 2;
                                    this.isReceivedTiem = true;
                                }
                            })
                        }
                    }
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
                        businessHeadTitle: this.shopName,
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
            
            // 点击弹框
            changepond(){
                this.flag = true;
            },
            flagbtn(val){
                this.flag = val;
            },
            shoppingCartIn(){
                this.isReceivedTiem = false;
            },


            wxShare(data){
                wxShare(data,function(res){
                    if(res == "success"){
                        // alert("success")
                    }else if(res == "cancel"){
                        // alert("cancel")
                    }
                });
            },
        },
        components: {
            swiper,
            swiperSlide,
            goodsSpec,
            gStar,
            goodsPriceSpec,
            goodsSpecBox,
            navbar,
            pond,
            vloading
        },
        destroyed(){
            if(localStorage.getItem('G_ROUTER_GOODS_FromName')) {
                localStorage.removeItem('G_ROUTER_GOODS_FromName')
            }
            let data = {
                urls : window.location.origin,
                imgurls : "",
                title : "农联贡菜",
                desc : "",
            }
            this.wxShare(data)
        },      
        // beforeRouteEnter(to, from, next) {
        //     if(from.name != 'groupBuyingGoods') {
        //         localStorage.setItem('G_ROUTER_GOODS_FromName', JSON.stringify({path: from.path, query: from.query}));
        //     }
        //     next();
        // }
    }
    
</script>

<style lang="less">
    .goodsBox .van-dialog__footer{
        .van-button{
            background-color: #f2f2f2;
            font-size: 14px;
            color: #999;
        }
    }
</style>
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
    
    .van-dialog{
        border-radius: 10px;
    }
    .dialog-box{
        height: 3rem;
        line-height: 3rem;
        font-size: 20px;
        text-align: center;
        .getPhone{
            display: flex;
            font-size: 16px;
            color: #424242;
            img{
                margin: auto;
                display: block;
                height: 22px;
                margin-right: 0;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
        .contactService{
            display: flex;
            font-size: 16px;
            color: #424242;
            img{
                margin: auto;
                display: block;
                height: 22px;
                margin-right: 0;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
    }

    .goods-swiper{
        position: relative;
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
            padding: 15px 0 10px;
        }
        .goods-info-remark{
            padding-bottom: 15px;
        }
        .goods-info-price-info{
            padding-bottom: 10px;
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
    
    .pond{
        align-items: center;
        background: #fff;
        padding-bottom: 15px;
        padding-left: 14px;
        .pond-left{
            display: block;
            margin-right: 6px;
            height: 20px;
        }
        .pond-text{
            font-size: 14px;
            color: rgba(128,128,128,1);
            margin-right: 6px;
        }
        .pond-right{
            display: block;
            height: 14px;
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
                    position: relative;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    .close_text_box{
                        position: absolute;
                        height: 18px;
                        background-color: rgba(0,0,0,0.6);
                        border-radius: 0px 0px 5px 5px;
                        bottom: 0;
                        width: 100%;
                        display: flex;
                        .close_bg{
                            margin: auto;
                            color: #ccc;
                            font-size: 12px;
                            text-align: center;
                            line-height: normal;
                        }
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
                border-bottom:0;
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
            font-size: 0.85rem;
            text-align: left;
            img{
                margin: 10px auto;
                display: block;
                max-width: 100%;
            }
            .buyer-tips{
                img{
                    margin: auto;
                    width: 110px;
                    display: block;
                    margin-bottom: 5px;
                }
            }
        }
        .buyer-tips{
            font-size: 12px;
            text-align: center;
            padding-bottom: 20px;
            color:#808080;
            img{
                margin: auto;
                display: block;
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

    .goods-spec-box{
        margin-top: 10px;
        padding: 15px 12px;
        background-color: #fff;
        .goods-spec-box-label{
            margin: auto 12px auto 0;
        }
    }
    .van-actionsheet.pricemode2{
        max-height: 75%;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
    }

    
    .goods-nav .addBtnDisable{
        display:flex;
        align-items:center;
        justify-content:center;
        .van-button{
            opacity: 1;
            background-color:#CCC;
            border:1px solid #ccc;
        }
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