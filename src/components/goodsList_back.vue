<template>
    <div id="goodsListScroll" style="position: relative;overflow-x: hidden;height:100%;">
        <!-- 顶部导航条 -->
        <navbar type="searchBoth" @search="search" @searchInput="searchInput" :value="inputVal" @clickleft="onClickLeft"></navbar>
        <!-- 筛选 -->
        <div>
            <div class="screen-bg" v-if="showScreen == 1" @click="changeScreen"></div>
            <div class="dflex screen-box">
                <van-tabs class="screen-van-tabs screen-van-tabs-left" v-model="active" @change="changeSearch(active)" title-active-color="#EE2D2D">
                    <van-tab title="商品">
                    </van-tab>
                    <van-tab title="店铺">
                    </van-tab>
                </van-tabs>
                <div class="screen-van-tabs screen-van-tabs-right dflex" @click="changeScreen">
                    <div class="fz_12 color_666">筛选</div>
                    <img src="../assets/img/shaixuan.png" alt="">
                </div>
            </div>
            <div class="screen-label" v-if="showScreen == 1">
                <div v-if="active == 0" >
                    <div class="screenLabel goodsLi-screen">
                        <div class="goodsLi-title fz_16 color_424242">价格区间</div>
                        <div class="dflex price-points">
                            <input class="min-price fz_12 color_424242" type="text" placeholder="最低价" v-model="min">
                            <span class="fz_14 color_999">-</span>
                            <input class="max-price fz_12 color_424242" type="text" placeholder="最高价" v-model="max">
                        </div>
                        <div class="goodsLi-title fz_16 color_424242">服务</div>
                        <div class="dflex tagTitleInfo">
                            <div v-for="(tItem,tIndex) in tagTitleInfo" :key="tIndex">
                                <div class="tag-title-list fz_12 color_808080" :class="{'active':tItem.active == 1}" @click="changeTag(tItem,tIndex)">{{tItem.label_name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="goodsLi-screen-btn color_666 dflex fz_16">
                        <div class="goodsLi-screen-button goodsLi-screen-all " @click="allCategory"><span>全部</span></div>
                        <div class="goodsLi-screen-button goodsLi-screen-confirm color_EE2D2D" @click="confirmCategory"><span>确认</span></div>
                    </div>
                </div>
                <div v-else >
                    <div class="screenLabel business-screen dflex">
                        <div v-for="(mItem,mIndex) in marketLabel" :key="mIndex">
                            <div class="market-title-list fz_12 color_808080" :class="{'active':mItem.type == marketType}" @click="changeMarket(mItem,mIndex)">{{mItem.title}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:45px;margin-bottom: 10px;"></div>
        </div>
        
        <div class="recommend-bar">
            <div v-if="active == 0" class="goodsLi">
                <div class="goodsLiBox" v-if="showList == 1">
                    <div v-for="(item,index) in hotGoods" :key="index">
                        <newGoodsLists
                            :item="item"
                            :marketName="item.market_name"
                            :tag="item.tag"
                            :name="item.goods_name"
                            :wid="item.wId"
                            :imgThumb="item.goods_thumb"
                            :img="item.thumb"
                            :unit="item.measure_unit || ''"
                            :goodsUnit="item.goods_unit || ''"
                            :price="item.price || '0'"
                            :goods_price="item.goods_price || '0'"
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
                <div class="goods-specialDom" v-else-if="showList == 2">
                    <!-- 您当前搜索的商品不存在~ -->
                    <!-- <div class="merchant-none">您当前搜索的商品不存在</div> -->
                    <searchNone item="goodsList"></searchNone>
                    <specialDom></specialDom>
                </div>
                <div v-else class="vantLoading">
                    <vloading :vertical="false" text=""></vloading>
                </div>
                
                <shoppingInCar ref="shoppingInCar"></shoppingInCar>
                <levitateCar :num="dropCount"></levitateCar>
            </div>
            <div v-else class="business">
                <div class="goodsLiBox" v-if="showList == 1">
                    <business v-for="(item,index) in businessBarList" :key="index" :index="index" :item="item" :lock="lock" :page="bpage"></business>
                    <p class="end-msg">{{endMsg}}</p>
                </div>
                <div class="goods-specialDom" v-else-if="showList == 2">
                    <!-- 您当前搜索的店铺不存在~ -->
                    <!-- <div class="merchant-none">您当前搜索的店铺不存在</div> -->
                    <searchNone item="businessList"></searchNone>
                    <merchantDom></merchantDom>
                </div>
                <div v-else class="vantLoading">
                    <vloading :vertical="false" text=""></vloading>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/css/commonstyle.css'
    import 'font-awesome/css/font-awesome.css'
    import Vue from 'vue'
    import {post} from '../assets/js/commonAPI.js'
    import navbar from './navbar/nav.vue'
    import goodsLi from './component/goodsLi/goodsList.vue'
    import business from './component/business/business.vue'
    import merchantDom from "./component/recommendComponent/merchant.vue"
    import specialDom from "./component/recommendComponent/special.vue";
    import {cacheStorage} from '../assets/js/cache.js'
    import $ from 'jquery'

    import searchNone from './component/searchNone/searchNone.vue'
    import vloading from './vloading.vue'
    
    const levitateCar = () => import('./component/levitateCar.vue');
    const vantLoading = () => import('./vantLoading.vue');
    const newGoodsLists = () => import('./component/newGoodsLists/newGoodsLists.vue');
    const shoppingInCar = () => import('./shoppingInCar/shoppingInCar.vue');

    Vue.prototype.$post = post;
    Vue.prototype.$cacheStorage = cacheStorage;
    export default {
        data(){
            return{
                sum:'2520',
                show:false,
                label_id:0,
                min:'',
                max:'',
                noGoods:0,
                bpage:1,
                gpage:1,
                sumArr:[],


                tagTitleInfo:[],        //标签列表
                tagActive:[],            //选中tagID
                hotGoods:[],            //商品
                businessBarList:[],     //店铺
                showList:-1,
                showScreen : 0,         //显示筛选框

                marketLabel:[
                    {
                        title:'全部',
                        active:0,
                        type:0,
                    },
                    {
                        title:'市场',
                        active:0,
                        type:2,
                    },
                    {
                        title:'基地',
                        active:0,
                        type:3,
                    },
                    {
                        title:'工厂',
                        active:0,
                        type:4,
                    },
                ],

                category_id:0,
                market_id:0,
                obregionID:0,
                indexID:2,
                value:'',
                inputVal:'',

                active:0,
                lock:0,
                endMsg: '',

                marketType:0,           //身份type  0全部 2市场 3基地 4工厂

                dropCount:0,            //购物车商品数量
                
                toggleShow:false,//规格选择切换显示开关
                shoppingShow:false,

                goodsListScroll:'',
            }
        },
        created(){
            const _this = this;

            this.getParams();
            //搜索
            this.$cacheStorage(
                'shoppingCarCount',
                '/?c=cart&a=num',
                'local',
                {},
                ((res)=>{
                    this.dropCount = res.data.num;
                }),
            )
            
            this.$post('/?a=searchGoods',{
                //传值
                region_id:this.obregionID,
                title:this.inputVal,
                page:1,
            }).then((res)=> {
                switch(res.code){
                    case 0:
                        this.hotGoods = res.data.list;
                        let goodsListScroll = document.getElementById('goodsListScroll');
                        this.goodsListScroll = goodsListScroll;
                        if(res.data.list.length>0){
                            this.gpage += 1;
                            this.shoppingShow = true;
                            if(res.data.list.length>9){
                                goodsListScroll.addEventListener('scroll',this.goodshandleScroll);
                                // window.addEventListener('scroll', this.goodshandleScroll)
                            }
                        }else{
                            this.showList = 2;
                        }

                        break;
                    case 1:
                        this.showList = 0;
                        break;
                    default:
                        break;
                }
            });
            this.$cacheStorage(
                'getLabel',
                '/?a=getLabel',
                'session',
                {},
                ((res)=>{
                    let tagTitleInfo = res.data.list;
                    for(let key in tagTitleInfo){
                        tagTitleInfo[key] = {...tagTitleInfo[key],active:0}
                    }
                    this.tagTitleInfo = tagTitleInfo
                }),
            )
        },
        watch:{
            shoppingShow(res){
                if(res){
                    setTimeout(()=>{
                        this.showList = 1;
                    },10)
                    this.$refs.shoppingInCar.setParabola();
                }
            },
            tagTitleInfo(res){
            }
        },
        methods:{
            onClickLeft(){
                sessionStorage.removeItem('searchInputVal');
                this.$router.go(-1);
            },
            getParams(){
                // 接收路由带过来的参数
                let searchVal = sessionStorage.getItem('searchInputVal');
                let name = this.$route.query.name;
                console.log(searchVal != '' && searchVal != null);
                if(searchVal != '' && searchVal != null){
                    this.inputVal = searchVal;
                }else{
                    this.inputVal = name;
                }
                this.obregionID = this.$route.query.region
            },
            //搜索
            search(val){
                //搜索
                this.showList = -1;
                this.bpage = 1;
                this.gpage = 1;
                this.inputVal = val;
                if(this.active == 0){
                    this.goodsListScroll.removeEventListener('scroll', this.markethandleScroll)
                    this.$post('/?a=searchGoods',{
                        //传值
                        region_id:this.obregionID,
                        title:this.inputVal,
                        page:1,
                    }).then((res)=> {
                        switch(res.code){
                            case 0:
                                this.hotGoods = res.data.list
                                if(res.data.list.length>0){
                                    this.showList = 1;
                                    this.gpage += 1;
                                    
                                    if(res.data.list.length>9){
                                        this.goodsListScroll.addEventListener('scroll', this.goodshandleScroll)
                                    }
                                }else{
                                    this.showList = 2;
                                }
                                break;
                            case 1:
                                this.$toast(res.msg)
                                this.showList = 2;
                                break
                            default:
                                break;
                        }
                    });   
                }else{
                    this.goodsListScroll.removeEventListener('scroll', this.goodshandleScroll)
                    this.$post("/?c=merchant&a=shopList2", {
                        region_id: this.obregionID,
                        category_id: this.category_id,
                        market_id: this.market_id,
                        keywords:this.inputVal,
                        page:1,
                    }).then(res => {
                        switch (res.code) {
                            case 0:
                            this.businessBarList = res.data;
                            if(res.data.length>0){
                                this.showList = 1;
                                this.bpage += 1;
                                
                                if(res.data.length>9){
                                    this.goodsListScroll.addEventListener('scroll', this.markethandleScroll)
                                }
                            }else{
                                this.showList = 2;
                            }
                            break;
                            default:
                            break;
                        }
                    });
                }
                
            },
            //获取搜索字符串
            searchInput(val){
                sessionStorage.setItem('searchInputVal',val);
                localStorage.setItem('searchInputVal',val);
                this.inputVal = val;
            },
            //切换顶部标签
            changeSearch(active){
                this.showList = -1;
                this.bpage = 1;
                this.gpage = 1;
                this.lock = 0;
                this.endMsg = '';
                let tagTitleInfo = this.tagTitleInfo;
                for(let key in tagTitleInfo){
                    tagTitleInfo[key] = {...tagTitleInfo[key],active:0}
                }
                this.tagTitleInfo = [...tagTitleInfo];

                if(active == 0){
                    this.goodsListScroll.removeEventListener('scroll', this.markethandleScroll)
                    this.$post('/?a=searchGoods',{
                        //传值
                        region_id:this.obregionID,
                        title:this.inputVal,
                        page:1,
                    }).then((res)=> {
                        switch(res.code){
                            case 0:
                                this.hotGoods = res.data.list;
                                    
                                if(res.data.list.length>0){
                                    this.showList = 1;
                                    this.gpage += 1;
                                    
                                    if(res.data.list.length>9){
                                        this.goodsListScroll.addEventListener('scroll', this.goodshandleScroll)
                                    }
                                }else{
                                    this.showList = 2;
                                }

                                break;
                            
                            case 1:
                                this.$toast(res.msg)
                                this.showList = 2;
                                break
                            default:
                                break;
                        }
                    });
                }else{
                    this.goodsListScroll.removeEventListener('scroll', this.goodshandleScroll)
                    this.$post("/?c=merchant&a=shopList2", {
                        region_id: this.obregionID,
                        category_id: this.category_id,
                        market_id: this.market_id,
                        keywords:this.inputVal,
                        page:1,
                    }).then(res => {
                        switch (res.code) {
                            case 0:
                                this.businessBarList = res.data;
                                if(res.data.length>0){
                                    this.showList = 1;
                                    this.bpage += 1;
                                    
                                    if(res.data.length>9){
                                        this.goodsListScroll.addEventListener('scroll', this.markethandleScroll)
                                    }
                                }else{
                                    this.showList = 2;
                                }
                            break;
                            case 1:
                                this.$toast(res.msg)
                                this.showList = 2;
                                break
                            default:
                            break;
                        }
                    });
                }
            },
            //切换筛选
            changeScreen(){
                if(this.showScreen == 0){
                    this.showScreen = 1;
                }else{
                    this.showScreen = 0;
                }
            },
            //切换标签
            changeTag(item,key){
                
                if(item.active == 1){
                    item.active = 0;
                }else{
                    item.active = 1;
                }
            },
            //切换身份
            changeMarket(item,index){
                this.showList = 0;
                this.showScreen = 0;
                this.marketType = item.type;
                let marketLabel = this.marketLabel;
                this.bpage = 1;
                for(let key in marketLabel){
                    marketLabel[key].active = 0
                }
                if(item.active == 0){
                    this.goodsListScroll.removeEventListener('scroll', this.goodshandleScroll)
                    item.active = 1;
                    this.$post("/?c=merchant&a=shopList2", {
                        region_id: this.obregionID,
                        category_id: this.category_id,
                        market_id: this.market_id,
                        keywords:this.inputVal,
                        page:1,
                        type:item.type,
                    }).then(res => {
                        switch (res.code) {
                            case 0:
                                this.businessBarList = res.data;
                                if(res.data.length>0){
                                    this.showList = 1;
                                    this.bpage += 1;
                                    
                                    if(res.data.length>9){
                                        this.goodsListScroll.addEventListener('scroll', this.markethandleScroll)
                                    }
                                }else{
                                    this.showList = 2;
                                }
                            break;
                            default:
                            break;
                        }
                    });
                }else{
                    this.goodsListScroll.removeEventListener('scroll', this.goodshandleScroll)
                    this.$post("/?c=merchant&a=shopList2", {
                        region_id: this.obregionID,
                        category_id: this.category_id,
                        market_id: this.market_id,
                        keywords:this.inputVal,
                        page:1,
                    }).then(res => {
                        switch (res.code) {
                            case 0:
                            this.businessBarList = res.data;
                            if(res.data.length>0){
                                this.showList = 1;
                                this.bpage += 1;
                                
                                if(res.data.length>9){
                                    this.goodsListScroll.addEventListener('scroll', this.markethandleScroll)
                                }
                            }else{
                                this.showList = 2;
                            }
                            break;
                            default:
                            break;
                        }
                    });
                }
            },
            allCategory(){
                this.gpage = 1;
                this.bpage = 1;
                this.showScreen = 0;
                let tagTitleInfo = this.tagTitleInfo;
                for(let key in tagTitleInfo){
                    tagTitleInfo[key] = {...tagTitleInfo[key],active:0}
                }
                this.goodsListScroll.removeEventListener('scroll', this.markethandleScroll)
                this.$post('/?a=searchGoods',{
                    //传值
                    region_id:this.obregionID,
                    title:this.inputVal,
                    page:1,
                }).then((res)=> {
                    switch(res.code){
                        case 0:
                            this.hotGoods = res.data.list;
                            if(res.data.list.length>0){
                                this.showList = 1;
                                this.gpage += 1;
                                
                                if(res.data.list.length>9){
                                    this.goodsListScroll.addEventListener('scroll', this.goodshandleScroll)
                                }
                            }else{
                                this.showList = 2;
                            }

                            break;
                    
                        default:
                            break;
                    }
                });
            },
            confirmCategory(){
                this.gpage = 1;
                this.bpage = 1;

                this.goodsListScroll.removeEventListener('scroll', this.markethandleScroll)
                this.showList = 0;
                let tagTitleInfo = this.tagTitleInfo;
                let tagId = [];
                for (let index = 0; index < tagTitleInfo.length; index++) {
                    if(tagTitleInfo[index].active == 1){
                        tagId.push(tagTitleInfo[index].label_id);
                    }
                }
                this.tagId = tagId.join(',')
                if(this.lock == 0){
                    this.lock = 1;
                    this.$post('/?a=searchGoods',{
                        //传值
                        region_id : this.obregionID,
                        title : this.inputVal,
                        min : this.min,
                        max : this.max,
                        label_id : this.tagId,
                        page:1,
                    })
                    .then((res)=>{
                        this.lock = 0
                        switch(res.code){
                            case 0:
                                this.hotGoods = res.data.list
                                this.showScreen = 0;

                                if(res.data.list.length>0){
                                    this.showList = 1;
                                    this.gpage += 1;
                                    
                                    if(res.data.list.length>9){
                                        this.goodsListScroll.addEventListener('scroll', this.goodshandleScroll)
                                    }
                                }else{
                                    this.showList = 2;
                                }
                                break;
                            default:
                                break;
                        }
                    })
                }
                
                
            },

            
            //商品瀑布流加载
            goodshandleScroll () {
                let _this=this
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //滚动条到底部的条件
                if (scrollTop + windowHeight >= (scrollHeight-50)) {
                //写后台加载数据的函数
                    if(_this.lock == 0){
                        _this.lock = 1;
                        _this.$post('/?a=searchGoods',{
                            region_id : _this.obregionID,
                            title : _this.inputVal,
                            min : _this.min,
                            max : _this.max,
                            label_id : this.tagId,
                            page:_this.gpage,
                        }).then((res) => {
                            switch (res.code){
                                case 0:
                                    setTimeout(()=>{
                                        _this.lock = 0;
                                        _this.gpage+=1;
                                        if(res.data.list.length>0){
                                            _this.hotGoods=[..._this.hotGoods,...res.data.list];
                                        }
                                        if(res.data.list.length<10){
                                             _this.endMsg = '已经没有更多内容啦~';
                                            this.goodsListScroll.removeEventListener('scroll', this.goodshandleScroll)
                                        }
                                    },600)
                                    break;
                                case 1:
                                    _this.$toast(res.msg);
                                    break; 
                                default:
                                    break;
                            }
                        })
                    }
                }
            },
            //店铺瀑布流加载
            markethandleScroll () {
                let _this=this
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //滚动条到底部的条件
                if (scrollTop + windowHeight >= (scrollHeight-50)) {
                //写后台加载数据的函数
                    if(_this.lock == 0){
                        _this.lock = 1;
                        _this.$post('/?c=merchant&a=shopList2',{
                            region_id: _this.obregionID,
                            category_id: _this.category_id,
                            market_id: _this.market_id,
                            keywords:_this.inputVal,
                            page:_this.bpage,
                            type:_this.marketType,
                        }).then((res) => {
                            switch (res.code){
                                case 0:
                                    setTimeout(()=>{
                                        _this.lock = 0;
                                        _this.bpage+= 1;
                                        if(res.data.length<10){
                                            _this.businessBarList=[..._this.businessBarList,...res.data];
                                        }
                                        if(res.data.length<10){
                                            _this.endMsg = '已经没有更多内容啦~';
                                            this.goodsListScroll.removeEventListener('scroll', this.markethandleScroll)
                                        }                                      
                                    }, 600)
                                    break;
                                case 1:
                                    _this.$toast(res.msg);
                                    break; 
                                default:
                                    break;
                            }
                        })
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
                console.log(data);
                this.$refs.shoppingInCar.shoppingInCart(data);
            },
            toggleBtn(){
                if(this.toggleShow){
                    this.toggleShow = false;
                }else{
                    this.toggleShow = true;
                }
            },
            getShoppingCar(){
                localStorage.removeItem('shoppingCarCount')
                this.$cacheStorage(
                    'shoppingCarCount',
                    '/?c=cart&a=num',
                    'local',
                    {},
                    ((res)=>{
                        this.dropCount = res.data.num;
                    }),
                )
            },
        },
        activated(){
            const _this = this;

            this.getParams();
            //搜索
            this.$cacheStorage(
                'shoppingCarCount',
                '/?c=cart&a=num',
                'local',
                {},
                ((res)=>{
                    this.dropCount = res.data.num;
                }),
            )
            this.active = 0;
            this.$post('/?a=searchGoods',{
                //传值
                region_id:this.obregionID,
                title:this.inputVal,
                page:1,
            }).then((res)=> {
                switch(res.code){
                    case 0:
                        this.hotGoods = res.data.list;
                        let goodsListScroll = document.getElementById('goodsListScroll');
                        this.goodsListScroll = goodsListScroll;
                        if(res.data.list.length>0){
                            this.gpage += 1;
                            this.shoppingShow = true;
                            if(res.data.list.length>9){
                                goodsListScroll.addEventListener('scroll',this.goodshandleScroll);
                                // window.addEventListener('scroll', this.goodshandleScroll)
                            }
                        }else{
                            this.showList = 2;
                        }

                        break;
                    case 1:
                        this.showList = 0;
                        break;
                    default:
                        break;
                }
            });
            this.$cacheStorage(
                'getLabel',
                '/?a=getLabel',
                'session',
                {},
                ((res)=>{
                    let tagTitleInfo = res.data.list;
                    for(let key in tagTitleInfo){
                        tagTitleInfo[key] = {...tagTitleInfo[key],active:0}
                    }
                    this.tagTitleInfo = tagTitleInfo
                }),
            )
        },
        deactivated(){
            localStorage.removeItem('searchInputVal');
            sessionStorage.removeItem('searchInputVal');
        },
        components:{
            navbar,
            goodsLi,
            business,
            merchantDom,
            specialDom,
            searchNone,
            vloading,
            levitateCar,
            vantLoading,
            newGoodsLists,
            shoppingInCar,
        },
        destroyed () {
            this.goodsListScroll.removeEventListener('scroll', this.markethandleScroll)
            this.goodsListScroll.removeEventListener('scroll', this.goodshandleScroll)
        },
    }
</script>

<style scoped>
    .end-msg {
      font-size: 14px;
      text-align: center;
      color: #c9c9c9;
      line-height: 3em;
      margin: 0;
    }

    .goods-nav-bar{
        width: 100%;
        height: 3rem;
        position: fixed;
        z-index:1;
        line-height: 3rem;
        background-color: #fff;
        border-bottom: 1px solid #dadada;
    }
    .goods-left-button,
    .goods-right-search{
        text-align: center;
        font-size: 16px;
    }
    .goods-left-button i{
        font-size: 24px;
    }
    .goods-right-search{
        position: relative;
    }
    .goods-right-search input{
        width: 80%;
        height: 1.8rem;
        line-height: 1;
        border-radius: 10px;
        padding: 0 0.8rem;
        border: none;
        text-indent: 1rem;
        font-size: 14px;
        background-color: #eee;
    }
    .goods-right-search i{
        color: #777;
        top: 1rem;
        left: 1rem;
        position: absolute;
    }
    .recommend-bar{
        display: flex;
        flex-wrap: wrap;
    }
    .recommend-box{
        width: 50%;
        background-color: #fff;
        border-bottom: 1px solid #dadada;
    }
    .recommend-box:nth-child(odd){
        width: 49%;
        border-right: 1px solid #dadada;
    }
    .recommend-img{
        height: 10rem;
        overflow: hidden;
    }
    .recommend-trade{
        display: flex;
        padding: .3rem .4rem;
        justify-content: space-between;
        font-size: 12px;
    }
    .recommend-trade em{
        font-style: normal;
        color: #ec5151;
    }
    .recommend-sum{
        text-indent: .4rem;
    }
    .recommend-sum span{
        color: #ec5151;
    }
    .recommend-title{
        font-size: 14px;
        padding: .4rem;
    }
    /* 标签属性 */
    .label{
        padding: 0 .4rem
    }
    .label span {
        margin-left: 1px;
    }
    /* 筛选 */
    .screen{
        font-size: 14px;
        font-weight: bold;
        line-height: 2rem;
        padding: 0 .6rem;
        text-align: right;
        border-bottom: 1px solid #dadada;
    }
    .screen div{
        display: inline-block;
    }
    .screen-img{
        width:  1.2rem;
        position: relative;
        top: 4px;
        right: 6px;
        line-height: 2rem;
    }
    /* 弹出层盒子 */
    .overlay80vh{
        width: 40vh;
        height:100vh;
    }
    .popup-info-box{
        margin-top: .5rem;
        padding: 0 .6rem;
    }
    .section-title{
        font-size: 14px;
        font-weight: bold;
    }
    .section-titil-info{
        text-align: center;
        margin: 1rem 0;
    }
    .section-titil-info input{
        display: inline-block;
        width: 100%;
        border: none;
        text-align: center;
        background-color: #eee;
        border-radius: 1rem;
        text-indent: .5rem;
        font-size: 12px;
        padding: .4rem 0;
    }
    .tag-title{
        font-size: 14px;
        font-weight: bold;
    }

    .tag-title-info{
        display: flex;
        flex-wrap: wrap;
        justify-content: inherit;
    }

    .tag-title-info-box{
        width: 4rem;
        line-height: 1.5rem;
        margin: .5rem;
        padding: .4rem .6rem;
        border-radius: 1rem;
        text-align: center;
        background-color: #eee;
        border: 1px solid #eee;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .tag-title-info-box-selection{
        background-color: #fff;
        border: 1px solid #d1442b;
    }

    .poup-button{
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .cart-background{
        padding: 5rem 4rem;
        color: #777;
        text-align: center;
    }
    .wrap {
        height: 40px;
        font-size: 14px;
        padding: 0 .4rem;
        line-height: 20px;
        overflow: hidden;
    }

    .wrap .text {
        float: right;
        margin-left: -5px;
        width: 100%;
        word-break: break-all;
    }

    .wrap::before {
        float: left;
        width: 5px;
        content: '';
        height: 40px;
    }

    .wrap::after {
        float: right;
        content: "...";
        height: 20px;
        line-height: 20px;
        /* 为三个省略号的宽度 */
        width: 3em;
        /* 使盒子不占位置 */
        margin-left: -3em;
        /* 移动省略号位置 */
        position: relative;
        left: 100%;
        top: -20px;
        padding-right: 5px;
        background-color: #FFF;
    }
</style>


<style>
.van-tab{color: #424242;font-size: 12px;}
.van-tab--active{color: #EE2D2D;font-size: 14px;}
</style>
<style lang="less" scoped>
.screen-box{
    height:44px;
    background-color: #fff;
    position: fixed;
    width: 100%;
    z-index: 10;
    .screen-van-tabs{
        width: 100%;
        height: 100%;
        padding-top: 0;
    }
    .screen-van-tabs-right{
        flex:1;
        min-width: 25%;
        >div{
            margin: auto;
            margin-right: 0;
        }
        >img{
            margin: auto;
            margin-left: 5px;
            height: 14px;
            display: block;
        }
    }
    
}
.screen-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index: 10;
}
.end-msg {
    font-size: 14px;
    text-align: center;
    color: #c9c9c9;
    line-height: 3em;
    background-color: #f2f2f2;
    width: 100%;
    padding: 0 12px;
    margin: 0 0 0 -12px;
}
.business{
    width: 100%;
}
.screen-label{
    position: fixed;
    top: 90px;
    width: 100%;
    background-color: #fff;
    z-index: 11;
    border-top: 1px solid #d8d8d8;
    .screenLabel{
        padding: 0 12px 10px;
    }
    .goodsLi-title{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .price-points{
        input{
            width: 74px;
            height: 26px;
            line-height: 26px;
            border-radius: 5px;
            border:1px solid #d8d8d8;
            padding: 0;
            text-align: center;
        }
        span{
            padding: 0 5px;
            line-height: 30px;
        }
    }
    .tagTitleInfo{
        flex-wrap: wrap;
        .tag-title-list{
            min-width: 74px;
            height: 26px;
            border:1px solid #d8d8d8;
            border-radius: 5px;
            text-align: center;
            line-height: 26px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .tag-title-list.active{
            border:1px solid #EE4D4D;
            color: #EE4D4D;
        }
    }
    .goodsLi-screen-btn{
        .goodsLi-screen-button{
            border-top: 1px solid #d8d8d8;
            flex:1;
            text-align: center;
            height: 44px;
            line-height: 44px;
        }
        .goodsLi-screen-all{
            border-right: 1px solid #d8d8d8;
        }
    }
    .business-screen{
        padding-top: 20px;
        .market-title-list{
            min-width: 74px;
            height: 26px;
            border:1px solid #d8d8d8;
            border-radius: 5px;
            text-align: center;
            line-height: 26px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .market-title-list.active{
            border:1px solid #EE4D4D;
            color: #EE4D4D;
        }
    }
}
.recommend-bar{
    z-index: 9;
    .goodsLi{
        width: 100%;
        .goodsLiBox{
            padding: 0 12px;
            padding-top: 12px;
            width: calc(100% - 24px);
            background-color: #fff;
        }
        .goods-specialDom{
            width: 100%;
        }
    }
}

.merchant-none{
  margin: 20px auto;
  text-align: center;
  font-size: 14px;
  color: #808080;
}

/* loading */
.termNav-img{
  width: 10.65rem;
  margin: 100px auto 0;
  display: block;
}

.vantLoading{
    margin-top: -20px;
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 99;
    height: 100%;
    top: 0;
    left: 0;
}
@keyframes changePosition{
    0%{
        -webkit-transform: translate(-10.56rem);
    }
    50%{
        -webkit-transform: translate(0);
    }
    100%{
        -webkit-transform: translate(10.56rem);
    }
}
@-webkit-keyframes changePosition{
    0%{
        -webkit-transform: translate(-10.56rem);
    }
    50%{
        -webkit-transform: translate(0);
    }
    100%{
        -webkit-transform: translate(10.56rem);
    }
}
</style>
