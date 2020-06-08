<template>
    <div >
        <!-- 搜索栏 -->
        <div class="search">
            <search @scrollTopShow="scrollTopShow" @scrollTopHide="scrollTopHide" @wapres="getWapres"></search>
        </div>

        <!-- 轮播图 -->
        <div class="swipe-bar">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item,index) in bannerPicArray" :key="index">
                  <a :href="item.link">
                      <img :src="item.img" width="100%">
                  </a>
                </van-swipe-item>
            </van-swipe>
        </div>


        <!-- 导航 -->
        <div class="nav">
            <van-row>
                <van-col class='navDiv' span='5' v-for="(item,index) in navList" :key="index" >
                     <a :href="item.wap_url" v-if="index < 5">
                         <div class="nav-icon" @click="base(item)" :data-index="item.nav_id">
                             <div class="nav-icon-img">
                                 <img :src="item.img" width="100%" />
                             </div>
                             <br />
                             <span>{{item.name}}</span>
                        </div>
                     </a>
                </van-col>
            </van-row>
            <div class="allCategory">
                <swiper :options='navDiv'>
                    <swiper-slide v-for="(item,index) in allCategory" :key="index">
                        <a href="javascript:;" class="allCategory-link" @click="toWholesale(index)">
                            <div class="allCategory-img">
                                <img v-if="item.touch_icon" :src="item.touch_icon" alt="">
                                <img v-else src="../assets/img/no_picture.gif" @click="skipDetails(goods)"/>
                            </div>
                            <div class="allCategory-name">{{item.cat_name}}</div>
                        </a>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
        <!-- 产品展示 -->
        <div >
            <van-row class="product" >
                <div class="productbox">
                    <van-col span="12" class="productimglf" v-for="(item,index) in productList" :key="index">
                        <div class="imgleft">
                            <a :href="item.link">
                                <img :src="item.img" width="100%" height="100%"/>
                            </a>
                        </div>
                    </van-col>
                </div>
                <div class="productBanner" v-show="productListBig?true:false">
                    <a v-for="(pitem,pindex) in productListBig" :key="pindex" :href="pitem.link">
                        <img :src="pitem.img" width="100%" height="100%">
                    </a>
                </div>
            </van-row>
        </div>
        <!-- 限时采购 -->
        <div class="purchase paA4" v-if="purchase.length > 0">
            <div class="purchase_head">
                <div class="purchase_title pad6">
                    <span class="purchase_text">限时采购</span>
                </div>
            </div>
            <div class="purchare-bar">
                <swiper :options='swiperOption'>
                    <swiper-slide v-for="(item,index) in purchase" :key="index">
                        <a href="javascript:;" @click="toGoods(item.wId)">
                            <div class="purchare-itme">
                                <img class="purchaseImg" :src="item.thumb">
                                <div class="purchasename">
                                    <div class="purchasename_flex">{{item.goods_name}}</div>
                                </div>
                                <div class="purchasePriceDiv">
                                    <!-- <div class="purchaseDelPrice" v-if="item.market_price != null">&yen;{{item.market_price}}</div> -->
                                    <div class="purchasePrice">&yen;{{item.goods_price}}<template v-if="item.goods_unit != null && item.goods_unit != ''">/{{item.goods_unit}}</template></div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="newGoodsLists-box">
            <div class="termNav-alert-bg" v-show="categorySortShow || marketSortShow || intellectSortShow" @click="closeAlert"></div>
            <div class="dflex goods-sort-box">
                <div class="nearbyBox term-li" @click="changeCategorySort">
                    <div class="dflex">
                        <div :class="[{'color_EE2D2D': categorySortShow || categorySortActive > -1},'term-li-title fz_14']">{{categorySortName}}</div>
                        <img src="../assets/img/shang.png" alt="" v-if="categorySortShow">
                        <img src="../assets/img/xia.png" alt="" v-else>
                    </div>
                    <div class="nearby-ul term-box-ul fz_14" v-show="categorySortShow">
                        <div class="nearby-li" @click.stop="categorySortInput('全部商品', 0)">
                            <div class="color_EE2D2D" v-if="categorySortActive == 0">全部商品</div>
                            <div class="color_999" v-else>全部商品</div>
                        </div>
                        <div class="nearby-li" v-if="specialtitle" @click.stop="categorySortInput(specialtitle, 1)">
                            <div class="color_EE2D2D" v-if="categorySortActive == 1">{{specialtitle}}</div>
                            <div class="color_999" v-else>{{specialtitle}}</div>
                        </div>
                        <!-- <div class="nearby-li" v-for="(csortItem,csortIndex) in allCategory" :key="csortIndex" @click.stop="categorySortInput(csortItem.cat_name,csortIndex,csortItem.cat_id)">
                            <div class="color_EE2D2D" v-if="categorySortActive == csortIndex">{{csortItem.cat_name}}</div>
                            <div class="color_999" v-else>{{csortItem.cat_name}}</div>
                        </div> -->
                    </div>
                </div>
                <div class="nearbyBox term-li"  @click="changeMarketSort">
                    <div class="dflex">
                        <div :class="[{'color_EE2D2D': marketSortShow || marketSortActive > -2},'term-li-title fz_14']">{{marketSortName}}</div>
                        <img src="../assets/img/shang.png" alt="" v-if="marketSortShow">
                        <img src="../assets/img/xia.png" alt="" v-else>
                    </div>
                    <div class="nearby-ul term-box-ul fz_14" v-show="marketSortShow">
                        <div class="nearby-li" @click.stop="marketSortInput('全部市场', -1)">
                            <div class="color_EE2D2D" v-if="marketSortActive == -1">全部市场</div>
                            <div class="color_999" v-else>全部市场</div>
                        </div>
                        <div class="nearby-li" v-for="(msortItem,msortIndex) in marketSortLists" :key="msortIndex" @click.stop="marketSortInput(msortItem.market_name,msortIndex,msortItem.market_id)">
                            <div class="color_EE2D2D" v-if="marketSortActive == msortIndex">{{msortItem.market_name}}</div>
                            <div class="color_999" v-else>{{msortItem.market_name}}</div>
                        </div>
                    </div>
                </div>
                <div class="nearbyBox term-li" @click="changeIntellectSort">
                    <div class="dflex" >
                        <div :class="[{'color_EE2D2D': intellectSortShow || intellectSortActive > -1},'term-li-title fz_14']">{{intellectSortName}}</div>
                        <img src="../assets/img/shang.png" alt="" v-if="intellectSortShow">
                        <img src="../assets/img/xia.png" alt="" v-else>
                    </div>
                    <div class="nearby-ul term-box-ul fz_14" v-show="intellectSortShow">
                        <div class="nearby-li" v-for="(isortItem,isortIndex) in intellectSortLists" :key="isortIndex" @click="intellectSortInput(isortItem.name,isortIndex)">
                            <div class="color_EE2D2D" v-if="intellectSortActive == isortIndex">{{isortItem.name}}</div>
                            <div class="color_999" v-else>{{isortItem.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index-content-rContent">
                <div v-if="pageShow === 1">
                    <div v-for="(item,index) in lists" :key="index">
                        <newGoodsLists
                            :item="item"
                            :marketName="item.market_name"
                            :tag="item.tag"
                            :name="item.goods_name"
                            :wid="item.wId"
                            :imgThumb="item.goods_thumb"
                            :img="item.goods_img"
                            :unit="item.measure_unit"
                            :goodsUnit="item.goods_unit || ''" 
                            :price="item.price"
                            :goods_price="item.goods_price"
                            :sid="item.seller_id"
                            :moq="item.moq"
                            :shopName="item.shop_name"
                            :remark="item.remark"
                            :priceType="item.price_model"
                            :spec="item.spec?item.spec:[]"
                            :i="index"
                            parentPath="index"

                            :is-activity="item.activity"
                            :is-promote="Number(item.is_promote)"

                            @showCart="shoppingInCart($event,item.res)"
                            @toggleBtn="toggleBtn"
                            :toggleShow="toggleShow"
                        ></newGoodsLists>
                    </div>
                    <div v-show="lock===1"  class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
                    <div class="end-msg">{{endMsg}}</div>
                </div>
                <div v-else-if="pageShow === 2" style="height:100%;background-color:#f2f2f2;">
                    <searchNone :item="'newGoodsList'"></searchNone>
                    <specialDom></specialDom>
                </div>
                <div v-else class="vantLoading">
                    <vloading :vertical="false" text=""></vloading>
                </div>
            </div>
        </div>

        <congratulations v-if="showCongratulations" @close="closeCongratulations" :info="congratulationsInfo" :type="congratulationsType"></congratulations>
        <div v-if="m_wholesale_activity?true:false && indexAlertShow">
            <indexAlert v-if="showIndexAlert" @close="closeIndexAlert" :img="m_wholesale_activity[0].img" :link="m_wholesale_activity[0].link"></indexAlert>
        </div>
        <div class="toTop" @click="toTop" v-if="isScrollTop"><img src="../assets/img/fanhuidingbu.png" alt=""></div>
        <div style="height:51px"></div>


        <shoppingInCar ref="shoppingInCar"></shoppingInCar>
        <div v-show="!vloadingShow" class="vantLoading vloadingBox">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import {is_wexin} from '../assets/js/commonAPI.js'
import {apiUrl} from "../assets/js/apiHeader";
import {getLocation,wxStart,wxShare} from '../assets/js/wxjs.js'

import '../assets/css/commonstyle.css'
import '../assets/css/resetiu.css'
import 'swiper/dist/css/swiper.css'
import '../assets/css/resetiu.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'

const search = () => import('./search.vue');
const searchNone = () => import('./component/searchNone/searchNone.vue');
const newGoodsLists = () => import('./component/newGoodsLists/newGoodsLists.vue');
const vloading = () => import('./vloading.vue');
const vantLoading = () => import('./vantLoading.vue');
const congratulations = () => import('./component/congratulations.vue');
const indexAlert = () => import('./component/indexAlert.vue');
const specialDom = () => import('./component/recommendComponent/special.vue');
const shoppingInCar = () => import('./shoppingInCar/shoppingInCar.vue');

export default {
    props:['indexAlertShow'],
    data(){
        return{
            bannerPicArray:[], //轮播图

            purchase:[],  //限时采购
            swiperOption:{
                slidesPerView:3,
                spaceBetween: 5,
                slidesOffsetBefore : -15,
            },//幻灯片左右切换按钮

            navDiv:{    //分类导航
                slidesPerView:5,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            region:322,//地址id

            productList:[],//
            productListBig:'',//首页大图
            navList:[],//首页导航
            scrollTopNum: null,// 定义滚动条默认位置
            isScrollTop: false,// 定义按钮默认状态

            lists:[],//商品列表


            showCongratulations:false,//显示优惠券弹窗
            congratulationsType:-1,//是否开启优惠券
            congratulationsInfo:"",//优惠券金额

            pageShow:0,
            page:2,
            lock:0,
            endMsg:'',

            toggleShow:false,//规格选择切换显示开关

            categorySortShow:false,//分类选择弹窗
            allCategory:[],//所有分类
            categorySortName:'全部商品',//已选中的分类
            specialtitle:'',
            categorySortActive:-2,//已选中的分类key

            intellectSortShow:false,//智能排序选择窗
            intellectSortLists:[{
                name:'智能排序', // 0
            },{
                name:'低价优先',//[sort_price] 1
            },{
                name:'高价优先',//[sort_price] 2
            },{
                name:'好评优先', //[sort_evaluate]
            },{
                name:'销量优先',//[sort_num] 1
            }],//智能排序列表
            intellectSortName:'智能排序',//已选中的排序
            intellectSortActive:-1,//已选中的排序key

            marketSortShow:false,//来源市场选择窗
            marketSortLists:[],//来源市场列表
            marketSortName:'全部市场',//已选中的市场
            marketSortActive:-2,//已选中的市场key

            showIndexAlert:false,//每日弹窗开关
            m_wholesale_activity:[],//每日弹窗

            cat_id:0,//分类ID
            sort_num:0,//销量排序
            sort_price:0,//价格排序
            sort_evaluate:0,//好评排序
            market_id:0,//市场ID
            is_senior:0,//是否有行业类别

            shoppingShow:false,
            vloadingShow:true,
        }
    },
    components:{
        search,
        vloading,
        vantLoading,
        swiper,
        swiperSlide,
        congratulations,
        searchNone,
        newGoodsLists,
        specialDom,
        indexAlert,
        shoppingInCar
    },
    watch:{
        indexAlertShow(res){
            this.indexAlertShow = res;
            this.getHomeAds();
        },
        shoppingShow(res){
            if(res){
                setTimeout(()=>{
                    this.$refs.shoppingInCar.setParabola();
                },1000)
            }
        }
    },
    created(){
        if(is_wexin()){
            this.vloadingShow = false;
            wxStart(()=>{
                this.vloadingShow = true;
                this.getLocationPost();

                // 分享内容
                let datas = {
                    urls: window.location.origin+apiUrl().apiUrl+'/m/index',
                    imgurls : window.location.origin + apiUrl().apiUrl+"/images/wxDefault.png",
                    title: '【农联贡菜】健康不贵、分享有礼',
                    desc: `您的朋友向您推荐了农联贡菜，这是四川最具规模和专业化的农产品在线交易综合服务平台!`,
                };
                this.wxShare(datas);
            });
        }

        this.$emit('toPage',{index:0,path:'/index'})
        let specialtitle = localStorage.getItem('specialtitle');
        if(specialtitle){
            this.specialtitle = specialtitle;
            this.categorySortName = specialtitle;
            this.is_senior = 1;
        }

        localStorage.removeItem('shoppingCarCount');
        this.$emit('getShoppingCar');
        this.getHomeAds();


        // 判断用户能否领取平台优惠券
        let is_coupon = localStorage.getItem('is_coupon');
        if(!is_coupon){
            this.$post('/?c=wholesaleCoupon&a=receiveAdmin',).then((res) => {
                if(res.code == 0){
                    if(res.data.length>0 || res.data){
                        this.showCongratulations = true;
                        this.congratulationsType = 1;
                        this.congratulationsInfo = res.data;
                        this.$post('/?c=wholesaleCoupon&a=receive',{
                            full_id:res.data.full_id
                        }).then((e) => {
                            if(e.code == 0){
                                localStorage.setItem('is_coupon',true)
                            }
                        })
                    }
                }else if(res.code == 1){
                    // this.$toast(res.msg);
                }
            })
        }

    },
    mounted(){
    },
    activated(){
        // this.getDefault();
        let rContentTop = sessionStorage.getItem('scrollTop');
        window.scroll(0,rContentTop)

        if(is_wexin()){
            this.vloadingShow = false;
            wxStart(()=>{
                this.vloadingShow = true;
                this.getLocationPost();

                // 分享内容
                let datas = {
                    urls: window.location.origin + apiUrl().apiUrl+'/m/index',
                    imgurls : window.location.origin + apiUrl().apiUrl+"/images/wxDefault.png",
                    title: '【农联贡菜】健康不贵、分享有礼',
                    desc: `您的朋友向您推荐了农联贡菜，这是四川最具规模和专业化的农产品在线交易综合服务平台!`,
                };
                this.wxShare(datas);
            });
        }
        this.$emit('toPage',{index:0,path:'/index'});
        localStorage.setItem('loading','false');
        this.$parent.loadingShow = 'false';
        if(this.lists.length > 0){
            this.pageShow = 1;
        }else{
            this.pageShow = 2;
        }
        if(sessionStorage.getItem('resetLocation') == 1){//重新定位resetLocation 1 数据加载  2 判断列表更新
            sessionStorage.setItem('resetLocation',2)
            /* let specialtitle = localStorage.getItem('specialtitle');
            if(specialtitle){
                this.specialtitle = specialtitle
                this.categorySortName = specialtitle
                // this.is_senior = 1;
            } */
            localStorage.removeItem('shoppingCarCount')
            this.$emit('getShoppingCar')
            this.getHomeAds();

            this.getWapres(localStorage.getItem('wapres'));
            // 判断用户能否领取平台优惠券
            let is_coupon = localStorage.getItem('is_coupon');
            if(!is_coupon){
                this.$post('/?c=wholesaleCoupon&a=receiveAdmin',).then((res) => {
                    if(res.code == 0){
                        if(res.data.length>0 || res.data){
                            this.showCongratulations = true;
                            this.congratulationsType = 1;
                            this.congratulationsInfo = res.data;
                            this.$post('/?c=wholesaleCoupon&a=receive',{
                                full_id:res.data.full_id
                            }).then((e) => {
                                if(e.code == 0){
                                    localStorage.setItem('is_coupon',true)
                                }
                            })
                        }
                    }else if(res.code == 1){
                        // this.$toast(res.msg);
                    }
                })
            }
        }
    },
    methods:{
        getDefault(){//设置默认值
        },
        getHomeAds(){
            // 产品展示大图片
            this.$cacheStorage(
                'homeAds',
                '/?a=homeAds225',
                'session',
                {},
                ((res)=>{
                    if(res.code == 0){
                        this.bannerPicArray = res.data.m_wholesale_ad;
                        this.productList = res.data.m_wholesale_four;
                        this.productListBig = res.data.m_wholesale_one;
                        this.m_wholesale_activity = res.data.m_wholesale_activity;
                        if(this.indexAlertShow){
                            this.indexAlertOpen();
                        }
                    }
                }),
            )
        },
        getWapres(res){
            this.region = res;
            localStorage.setItem('wapres',res);

            let loading = localStorage.getItem('loading');

            if(res==undefined && loading == "false"){
                this.$router.push({
                    path:'/location',
                })
                // this.region = 322; 
            }
            this.indexPost(res);
        },
        indexPost(region){
            // 获取首页导航
            this.$cacheStorage(
                'navList',
                '/?a=navList',
                'session',
                {region_id: region},
                ((res)=>{
                    this.navList = res.data;
                }),
            )
            // 获取所有分类
            this.$cacheStorage(
                'allCategory',
                '/?a=allCategory',
                'session',
                {region_id: region},
                ((res)=>{
                    this.allCategory = res.data;
                }),
            )
            // 获取市场
            this.$cacheStorage(
                'marketList',
                '/?a=marketList',
                'session',
                {region_id: region,type:2},
                ((res)=>{
                    this.marketSortLists = res.data.list;
                }),
            )
            // 限时采购
            this.$post('/?c=goods&a=sourcingLimitedTime',{
                //接口传值
                region_id: region,
                page: 1
            }).then((res)=> {
                if(res.code == 0){
                    this.purchase = res.data;

                }
            });
            // 商品列表
            if(sessionStorage.getItem('resetLocation') == 2){
                sessionStorage.removeItem('resetLocation');
            }else{
                sessionStorage.removeItem('indexWholesale');
            }
            this.$cacheStorage(
                'indexWholesale',
                '/?c=goods&a=wholesale',
                'session',
                {
                    region_id:region,
                    is_senior:this.is_senior,
                    sort_num:this.sort_num,
                    sort_price:this.sort_price,
                    sort_evaluate:this.sort_evaluate,
                    market_id:this.market_id,
                },
                ((res)=>{
                    if(res.code === 0){
                        if(res.data.length>0){
                            this.pageShow = 1;
                            this.lists=res.data;
                            this.lock = 0;

                            this.intellectSortShow = false;
                            this.marketSortShow = false;
                            this.categorySortShow = false;

                            this.shoppingShow = true;

                            if(res.data.length>9){
                                window.addEventListener('scroll',this.handleScroll);
                            }
                        }else{
                            this.pageShow = 2;
                        }

                    }else if(res.code === 1){
                        this.pageShow = 2;
                    }else{
                        // this.$toast(res.msg)
                    }
                }),
            )
        },
        //微信分享
        wxShare(data){
            wxShare(data,function(res){
                if(res == "success"){
                    // alert("success")
                }else if(res == "cancel"){
                    // alert("cancel")
                }
            });
        },
        //顶部显示
        scrollTopShow(){
            this.isScrollTop = true;
        },
        //顶部隐藏
        scrollTopHide(){
            this.isScrollTop = false;
        },
        //返回顶部
        toTop(){
            // setInterval()
            $(window).scrollTop(0);
        },
        getLocationPost(){
            //获取用户当前地理位置
            let _this = this;
            getLocation({},_this);
        },

        base(item){
            let dataObj = {
                data:item,
                region:this.region
            };
            sessionStorage.setItem('data',JSON.stringify(dataObj));
            localStorage.setItem('wapres',this.region);
        },
        toGoods(index){
            this.$router.push({
                path:'/goods',
                query:{
                    'goods':index
                }
            });
        },
        toWholesale(id){
            this.$router.push({
                path:'/wholesale',
                query:{
                    'id':id
                }
            })
        },
        /* 关闭优惠券弹窗 */
        closeCongratulations(){
            this.showCongratulations = false
        },
        //分类选择
        categorySortInput(name,key,id){
            this.categorySortName = name;
            this.categorySortActive = key;
            this.categorySortShow = false;
            this.page = 2;

            this.lists = [];
            this.pageShow = 0;

            this.is_senior = key;
            this.getGoodsList('category');
        },
        //分类选择
        /* categorySortInput(name,key,id){
            this.categorySortName = name;
            this.categorySortActive = key;
            this.categorySortShow = false;
            this.page = 2;

            this.lists = [];
            this.pageShow = 0;

            if(key != -1){
                this.cat_id = id;
            }else{
                this.cat_id = 0;
            }
            this.getGoodsList('category');
        }, */
        //来源选择
        marketSortInput(name,key,id){
            this.marketSortName = name;
            this.marketSortActive = key;
            this.marketSortShow = false;
            this.page = 2;

            this.lists = [];
            this.pageShow = 0;
            if(key != -1){
                this.market_id = id;
            }else{
                this.market_id = 0;
            }
            this.getGoodsList('market');
        },
        //智能排序
        intellectSortInput(name,key){
            this.intellectSortShow = false;
            this.intellectSortActive = key;
            this.intellectSortName = name;
            this.page = 2;

            this.lists = [];
            this.pageShow = 0;

            this.sort_evaluate = 0;
            this.sort_num = 0;
            this.sort_price = 0;
            if(key == 0){
            }else if(key == 1){
                this.sort_price = 1;
            }else if(key == 2){
                this.sort_price = 2;
            }else if(key == 3){
                this.sort_evaluate = 1;
            }else if(key == 4){
                this.sort_num = 1;
            }
            this.getGoodsList('intellect');
        },

        getGoodsList(type){//列表请求
            this.lock = 1;
            this.$post("/?c=goods&a=wholesale", {
                region_id:this.region,
                is_senior:this.is_senior,
                sort_num:this.sort_num,
                sort_price:this.sort_price,
                sort_evaluate:this.sort_evaluate,
                market_id:this.market_id,
            }).then((res) => {
                if(res.code === 0){
                    if(res.data.length>0){
                        this.pageShow = 1;
                        this.lists=res.data;
                        this.lock = 0;

                        this.intellectSortShow = false;
                        this.marketSortShow = false;
                        this.categorySortShow = false;

                        this.$refs.shoppingInCar.setParabola();
                        if(res.data.length>9){
                            window.addEventListener('scroll',this.handleScroll);
                        }
                    }else{
                        this.pageShow = 2;
                    }

                }else if(res.code === 1){
                    this.pageShow = 2;
                }else{
                    // this.$toast(res.msg)
                }
            });
        },

        handleScroll(){
            let _this=this
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= (scrollHeight-100)) {
                //写后台加载数据的函数
                if(_this.lock == 0){
                    _this.lock = 1;
                    _this.$post("/?c=goods&a=wholesale", {
                        region_id:this.region,
                        is_senior:this.is_senior,
                        sort_num:this.sort_num,
                        sort_price:this.sort_price,
                        sort_evaluate:this.sort_evaluate,
                        market_id:this.market_id,
                        page:this.page,
                    }).then((res) => {
                        if(res.code === 0){
                            if(res.data.length>0){
                                _this.lists=[..._this.lists,...res.data];
                            }
                            if(res.data.length<10){
                                _this.endMsg = '已经没有更多内容啦~';
                                window.removeEventListener('scroll', this.handleScroll)
                            }
                            _this.lock = 0;
                            _this.page+=1
                        }
                    });
                }
            }
        },
        shoppingInCart(item){
            let data = {
                event : item.event,
                item : item.res,
                key:item.key,
                spec:item.spec,
                wid:item.wid,
                moq:item.moq
            }
            this.$refs.shoppingInCar.shoppingInCart(data);
        },
        getShoppingCar(){
            localStorage.removeItem('shoppingCarCount')
            this.$emit('getShoppingCar')
        },
        toggleBtn(){
            if(this.toggleShow){
                this.toggleShow = false;
            }else{
                this.toggleShow = true;
            }
        },
        changeCategorySort(){
            this.intellectSortShow = false;
            this.marketSortShow = false;
            if(this.categorySortShow){
                this.categorySortShow = false;
            }else{
                this.categorySortShow = true;
            }
        },
        changeMarketSort(){
            this.categorySortShow = false;
            this.intellectSortShow = false;
            if(this.marketSortShow){
                this.marketSortShow = false;
            }else{
                this.marketSortShow = true;
            }
        },
        changeIntellectSort(){
            this.marketSortShow = false;
            this.categorySortShow = false;
            if(this.intellectSortShow){
                this.intellectSortShow = false;
            }else{
                this.intellectSortShow = true;
            }
        },


        closeAlert(){//关闭排序筛选
            this.categorySortShow = false;
            this.marketSortShow = false;
            this.intellectSortShow = false;
        },
        closeIndexAlert(){//关闭首页活动弹窗
            this.showIndexAlert = false;
        },
        indexAlertOpen(){//判断首页活动弹窗
            let indexAlertTime = localStorage.getItem('indexAlertTime');
            let date = new Date().toLocaleDateString();//获取当前日期
            if(indexAlertTime){
                if(indexAlertTime == date){//根据当前日期判断是否弹窗
                    this.showIndexAlert = false;
                }else{
                    localStorage.setItem('indexAlertTime',date);
                    this.showIndexAlert = true;
                }
            }else{
                localStorage.setItem('indexAlertTime',date);
                this.showIndexAlert = true;
            }
        },

    },
    destroyed () {
        this.page=2;
        this.endMsg="";
        window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>
<style>
.swipe-bar .van-swipe__indicator--active{
    background-color: #EE2D2D;
}
</style>
<style scoped>
.search{
    width: 100%;
    background:  rgba(255, 255, 255, 0);
    min-height: 45px;
}
.swipe-bar{
    width: 100%;
    min-height: 8rem;
    background-color: #eee;
    overflow: hidden;
}
.swipe-bar a{
    display: block;
}
.swipe-bar img{
    width: 100%;
    height: 10rem;
    clear:both;
    display: block;
}
.main-div .nav a {
    display: block;
}
.nav{
    background-color: #fff;
    margin-bottom: 10px;
}

.nav-icon{
    padding: .6rem 0;
    font-size: 12px;
    color: #777;
    text-align: center;
}
.nav-icon>span{
    font-size: 12px;
}
.nav-icon-img{
    width: 2rem;
    height: 2rem;
    line-height: 3rem;
    text-align: center;
    display: inline-block;
    /* overflow: hidden; */
}
.nav-icon-img img{
    display: block;
}
.nav .navDiv:nth-child(-n+5) .nav-icon-img{
    width:2.5rem;
        height: 2.5rem;
}

.nav .van-row .van-col--5{
    width: 20%;
}

</style>
<style lang="less" scoped>
.allCategory{
    .swiper-container{
        height: 100%;
        .swiper-button-prev{
            background-image: url(../assets/img/left.svg);
            background-size: 10px 44px;
            left:0;
        }
        .swiper-button-next{
            background-image: url(../assets/img/right.svg);
            background-size: 10px 44px;
            right:0;
        }
        .allCategory-link{
            padding: .6rem 0;
            .allCategory-img{
                display: block;
                width: 2rem;
                height: 2rem;
                margin: auto;
                overflow: hidden;
                img{
                    width: 100%;
                    display: block;
                    margin: auto;
                }
            }
            .allCategory-name{
                padding-top: 5px;
                font-size: 12px;
                color:#777;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                white-space: nowrap;
            }
        }
    }
}
.newGoodsLists-box{
    margin-top: 10px;
    background-color: #fff;
    position: relative;
    .goods-sort-box{
        height: 40px;
        text-align: center;
        color: #777;
        border: 1px solid #eee;
        border-left: none;
        border-right: none;
        background-color: #fff;
        position: relative;
        z-index: 1002;
        .term-li{
            margin: auto 0;
            flex: 1;
            text-align: center;
            .term-li-title{
                margin: auto;
                margin-right: 0;

                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
            }
            img{
            margin: auto;
            margin-left: 5px;
            height: 7px;
            display: block;
            }
        }
        .term-box-ul{
        width: 100%;
        position: absolute;
        top: 40px;
        left: 0;
        background-color: #fff;
        border-top: 1px solid #d8d8d8;
        .classify-left-box{
            max-height: 255px;
            overflow-y: auto;
            max-width: 110px;
            min-width: 110px;
            .classify-left-li{
            padding: 15px 0;
            }
        }
        .classify-right-box{
            max-height: 255px;
            flex: 1;
            overflow-y: auto;
            text-align: left;
            background-color: #f2f2f2;
            .classify-right-li{
            padding: 15px 30px;
            }
        }
        .category-button{
            height: 44px;
            border-top: 1px solid #d8d8d8;
            border-bottom: 1px solid #d8d8d8;
            >div{
            width: 50%;
            height: 100%;
            margin: auto 0;
            line-height: 44px;
            }
            .category-all-button{
            span{
                border-right: 1px solid #d8d8d8;
                display: block;
                height: 100%;
            }
            }
        }
        }
        .nearby-ul{
            padding: 20px 12px;
            width: calc(100% - 24px);
            text-align: left;
            max-height: 214px;
            overflow: auto;
            margin-bottom: 51px;
            .nearby-li{
                margin-bottom: 10px;
                margin-left: 15px;

            }
            .nearby-li.active{
                border-color: #EE2D2D;
                color: #EE2D2D;
            }
            .nearby-li:last-child{
                margin-bottom: 0;
            }
            .nearby-title-list{
                text-align: left;
            }
            .nearby-title-list.active{
                color: #EE2D2D;
            }
        }
        .sort-ul{
            justify-content: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 15px 12px;
            width: calc(100% - 24px);
            .sort-title-list{
                text-align: left;
                margin-bottom: 15px;
            }
            .sort-title-list:last-child{
                margin-bottom: 0;
            }
            .sort-title-list .active{
                color: #EE2D2D;
            }
        }
        .allMarket-ul{
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 20px 12px 10px;
        width: calc(100% - 24px);
        .allMarket-li{
            padding: 0 5px;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            margin-right: 5px;
            margin-bottom: 10px;
        }
        /* .allMarket-li:nth-child(4n){
            margin-right: 0;
        } */
        .allMarket-li.active{
            border-color: #EE2D2D;
            color: #EE2D2D;
        }
        }
    }
}

.toTop{
    position: fixed;
    right: 12px;
    bottom: 70px;
    z-index: 1002;
    width: 55px;
    height: 55px;
    img{
        display: block;
        max-width: 100%;
    }
}
/* 产品展示 */
.product{
    background: #fff;
    .productbox{
        display: flex;
        flex-flow: wrap;
        padding: 5px 12px;
        .productimglf{
            margin: 2.5px 0;
            min-width: calc(50% - 5px);
            flex: .5;
            a{
                display: block;
                width: 100%;
                img{
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            .imgleft:nth-child(2n){
                border-right:none;
            }
        }
        .productimglf:nth-child(2n){
            margin-left: 5px;
        }
    }
    .productBanner{
        background: #fff;
        width: 100%;
        margin-bottom: 7.5px;
        a {
            display: block;
            padding: 0 12px;
            img{
                display: block;
            }
        }
    }
}

.purchase.paA4{
    margin-top: 10px;
    margin-bottom: 10px;
}
/* 限时采购 */
.purchase{
    margin-top: 10px;
    background: #fff;
    .purchase_head{
        height: 41px;
        display: flex;
        align-items: center;
        .purchase_title{
            font-size: 15px;
            margin-left: 12px;
            background-color: #fff;
            border-left: 3px solid #d1442b;
            .purchase_text{
                font-size: 15px;
                font-weight: 700;
                color: #d1442b;
            }
        }
    }
    .purchare-bar{
        margin-top: 5px;
        background-color: #fff;
        margin-left: 12px;
        .swiper-wrapper{
            width: 110px;
            .swiper-slide{
                // margin-right: 5px;
                // width: calc(100% / 3 - 5px * 3) !important;
                a{
                    display: block;
                }
            }
        }
        .purchare-itme{
            width: 100%;
            text-align: center;
            .purchasename{
                margin: 0;
                padding: 0;
                text-align: center;
                width: 80%;
                width: 96px;
                margin-left: 15px;
                font-size: 12px;
                display:flex;
                height:34px;
                .purchasename_flex{
                    width: 100%;
                    position: relative;
                    text-align: left;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                }
            }
            .purchasePriceDiv{
                margin-left:15px;
                width:80%;
                .purchaseDelPrice{
                    color: rgb(150, 151, 153);
                    font-size:12px;
                    text-align: left;
                    text-decoration: line-through;
                }
                .purchasePrice{
                    color: #db2921;
                    margin-bottom:0;
                    font-size:12px;
                    line-height: 12px;
                    line-height: 12px;
                    text-align: left;
                }
            }
            .purchaseImg{
                width: 100%;
                height: 100%;
                border-radius: 5px 5px 0 0;
                display: block;
                margin-bottom: 5px;
            }
            >div{
                padding: .2rem 0;
            }
        }
        a{
            color: #000;
        }
    }
}
.vloadingBox.vantLoading{
    margin-top: -20px;
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 9999;
    height: 100%;
    top: 0;
    left: 0;
}
.index-content-rContent .vantLoading{
    margin-top: 20px;
    width: 100%;
    display: flex;
}
.business-loading {
    padding: 10px;
}
.end-msg {
    font-size: 14px;
    text-align: center;
    color: #c9c9c9;
    line-height: 3em;
    margin: 0;
}

.termNav-alert-bg{
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1001;
}
</style>
