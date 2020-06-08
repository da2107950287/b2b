<template>
    <div class="shop-dom">
        <!-- 顶部搜索 -->
        <navbar type="searchBoth" @search="searchvalTwo" @searchInput="onsearchTwo" @clickleft="colback" :value="val"></navbar>
        
        <div class="index-msg">
            <platformIsClose></platformIsClose>
        </div>
        <!-- 店铺标题 -->
        <div class="shop-head dflex" :style="'background-image: url('+backlogo+')'">
            <div class="shop-head-text">
                <div class="shop-head-div">
                    <div>
                        <div class="merchant_div">
                            <div class="merchant_goods dflex">
                                <div class="merchant_goods_img_box">
                                <img class="merchant_goods_img" src="../assets/img/merchant_default.jpg" width="100%" v-if="shopLogo == '/images/no_picture.gif' || shopLogo == ''" />
                                <img class="merchant_goods_img" :src="shopLogo" width="100%" v-else />

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
                                <div class="merchant_goods_content">
                                    <div class="merchant_goods_title">{{shopHeaderTitle}}</div>
                                    <div class="merchant_goods_grade dflex">
                                        <star v-if="score" :starValue="score"></star><span class="merchant_goods_grade-star">{{score}}</span>
                                    </div>
                                    <div class="merchant_goods_tag dflex merchant_goods_tags">
                                        <div class="merchant_tag_child active" v-if="market_name">{{market_name}}</div>
                                        <div class="merchant_tag_child merchant_tag_childs" v-for="(itemt,indext) in tag" :key="indext">{{itemt}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collect" @click="onClickRight">
                    {{rightText}}
                </div>
            </div>
            <div class="shop-head-mas"></div>
        </div>
       <!-- 商品联动 -->
        <div v-if="showFlag === 2" class="contents" :style="'height:'+innerHeight+'px'">
            <!-- 左侧滑动 -->
            <div class='wholesale-left' :style="'height:'+innerHeight+'px'">
                <ul class="content" v-if="wholist.length>0">
                    <van-badge-group :active-key="activeKey" @change="onChange" >
                        <div v-for="(item,index) in wholist" :key="'left'+index" class="left-div" @click="onChange(index,'',1)">
                            <van-badge :title="item.parent.cat_name" />
                        </div>
                        <div v-for="(wholistItem,wholistIndex) in wholist2" class="left-div" :key="wholistIndex" @click="onChange(wholistIndex+1,wholistItem.cat_id,2)">
                            <van-badge :title="wholistItem.cat_name" />
                        </div>
                    </van-badge-group>
                    <div class="btn"></div>
                </ul>
            </div>
            <!-- 右侧顶部 -->
            <div class='wholesale-right' :style="'height:'+innerHeight+'px'">
                <template >
                    <div class='right-title' v-if="titlelist.length>0" v-show="showLog == 0">
                        <van-tabs type="card" class="right-title-tabs" v-model="active" @click="rightTop">
                            <van-tab v-for="(items,indexs) in titlelist" :key="'rightTitle'+indexs" :title="items.cat_name" style="flex-basis:30%;" >
                            </van-tab>
                        </van-tabs>
                        <div class="right-title-img">
                            <img src="../assets/img/xiala.png" alt="" class="right-title-img-xiala" @click="down">
                        </div>
                    </div>
                    <!-- 下拉框 -->
                    <div v-show="show && showLog == 0" class="right-down" @click.self="updown">
                        <div class="right-down-item">
                            <div class="right-down-item-content" v-if="titlelist.length>0">
                                <div v-for="(items,indexs) in titlelist" :key="'rightTit'+indexs">
                                    <div class="right-down-item-name" :class="{selected: selectedIndex == indexs }" @click="upTop(indexs)">{{items.cat_name}}</div>
                                </div>
                            </div>
                            <div class="right-down-arrows" @click="updown">
                                <img src="../assets/img/shouqi.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class='right-content wrapper specialDiv right-content-1' ref="wrapper" v-show="showLog == 0">
                        <ul class="content" ref="itemList">
                            <div class="specialRecoommend" >
                                <template v-if="wholist.length > 0">
                                    <div v-for="(item,index) in wholist" :key="'wholist'+index">
                                        <template v-if="item.son.length > 0">
                                            <div v-for="(items,indexks) in item.son" :key="'wholistSon'+indexks" class="right-content-title" :style="'height:'+setHeight(items,indexks,item.son.length)+'px;'" :id="indexks">
                                                <div class="item-title">{{items.cat_name}}</div>
                                                <div class="specialbox" v-for="(itemi,indexi) in goodslist" :key="'goodslist'+indexi" data-collect="false">
                                                    <template v-if="items.cat_id == itemi.two_id">
                                                        <div class="specialcontent" >
                                                            <newGoodsLists 
                                                                :item="itemi"
                                                                :marketName="itemi.market_name" 
                                                                :tag="itemi.tag" 
                                                                :name="itemi.goods_name" 
                                                                :wid="itemi.wId" 
                                                                :imgThumb="itemi.goods_thumb" 
                                                                :img="itemi.goods_img" 
                                                                :unit="itemi.goods_unit" 
                                                                :goodsUnit="item.goods_unit || ''" 
                                                                :price="itemi.goods_price" 
                                                                :goods_price="item.goods_price" 
                                                                :sid="itemi.seller_id" 
                                                                :moq="itemi.moq"
                                                                :shopName="itemi.shop_name" 
                                                                :remark="itemi.remark" 
                                                                :priceType="itemi.price_model" 
                                                                :spec="itemi.spec?itemi.spec:[]"
                                                                :i="index"
                                                                :activeKey="'wholist'+index"
                                                                :is-activity="itemi.activity"
                                                                :is-promote="Number(item.is_promote)"
                                                                @showCart="shoppingInCart($event,itemi.res)"
                                                                @toggleBtn="toggleBtn"
                                                                :toggleShow="toggleShow"
                                                            ></newGoodsLists>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
                            <div class="specialDivbottom"></div>
                        </ul>
                    </div>
                </template>
                <template >
                    <div class='right-content wrapper specialDiv inCateParent' ref="wrapper2" v-show="showLog == 1">
                        <ul class="content" ref="itemList2">
                            <div class="specialRecoommend" >
                                <template v-if="goodslist2.length > 0">
                                    <div v-for="(item,index) in goodslist2" :key="'goods'+index">
                                        <div class="right-content-title inCate">
                                            <div class="specialbox">
                                                <div class="specialcontent">
                                                    <newGoodsLists 
                                                        :item="item"
                                                        :marketName="item.market_name" 
                                                        :tag="item.tag" 
                                                        :name="item.goods_name" 
                                                        :wid="item.wId" 
                                                        :imgThumb="item.goods_thumb" 
                                                        :img="item.goods_img" 
                                                        :unit="item.goods_unit" 
                                                        :goodsUnit="item.goods_unit || ''" 
                                                        :price="item.goods_price" 
                                                        :goods_price="item.goods_price" 
                                                        :sid="item.seller_id" 
                                                        :moq="item.moq"
                                                        :shopName="item.shop_name" 
                                                        :remark="item.remark" 
                                                        :priceType="item.price_model" 
                                                        :spec="item.spec?item.spec:[]"
                                                        :i="index"
                                                        :activeKey="'goods'+index"
                                                        :is-activity="item.activity"
                                                        :is-promote="Number(item.is_promote)"

                                                        @showCart="shoppingInCart($event,item.res)"
                                                        @toggleBtn="toggleBtn"
                                                        :toggleShow="toggleShow"
                                                    ></newGoodsLists>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </template>
                                <div v-else><searchNone item="shop" bg-color="#ffffff"></searchNone></div>
                            </div>
                            <div class="specialDivbottom"></div>
                        </ul>
                    </div>
                </template>
            </div>
            <!--  -->
        </div>
        <div v-else-if="showFlag === 1">
            <searchNone item="shop"/>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>

        <searchgoods v-if="goodflag" class="pop" :name='val' :region='region' :type='2' :index='seller_id' @goodflagclock="goodflagclock"></searchgoods>

        <shoppingInCar ref="shoppingInCar" :isLevitateCar="true"></shoppingInCar>
        <levitateCar :num="dropCount"></levitateCar>

    </div>
</template>

<script>
    import Vue from 'vue';
    import floor from './component/floor';
    import shopimg from '../assets/img/shopbag.png';
    import search from './component/search/search.vue'
    import navbar from './navbar/nav.vue'
    import star from '../components/goods/star'
    
    const searchgoods =  ()=>import("../components/searchGoods/searchGoods.vue");
    const searchNone =  ()=>import("./component/searchNone/searchNone.vue");
    const vantLoading =  ()=>import("./vantLoading.vue");
    const vloading =  ()=>import("./vloading.vue");
    const platformIsClose =  ()=>import("./component/platformIsClose.vue");
    const newGoodsLists = () => import('./component/newGoodsLists/newGoodsLists.vue');
    const shoppingInCar = () => import('./shoppingInCar/shoppingInCar.vue');
    const levitateCar = () => import('./component/levitateCar.vue');

    import BScroll from "better-scroll";
    import img from '../assets/img/shangchuantupian.png'
    import $ from 'jquery';
    import 'font-awesome/css/font-awesome.css';
    export default {
        data() {
            return {
                showFlag: 0,

                wholist:[],                  //列表   
                wholist2:[],                  //列表   
                titlelist:[],
                activeKey:'',                 //默认激活类
                activeKey2:-1,                 //默认激活类
                goodslist:[] , 
                goodslist2:[] , 
                shopHeaderTitle:"",            //商家名称
                shopLogo:'',                   //商家图片
                goodflag:false,
                market_name:'',                 //店家市场
                score:'',                       //评分
                tag:[],                         //标签
                leftWrapper:{},        //左侧内容滚动容器
                rightWrapper:{},        //右侧内容滚动
                innerHeight:window.innerHeight - 10 - 110 - 44,
                selectedIndex:'', //当前选中标签的索引
                rightText:'',       //默认
                backlogo:shopimg,        //背景图
                val:'',             //输入框的值
                heightArr:[],
                active:'',
                show:false,
                seller_id:'',
                shopTab:[],

                showLog:0,          //0 默认右侧显示平台分类 1 显示商家分类
                
                
                goodsImage:'',
                goods_name:'',
                goods_price:'',
                measure_unit:'',
                pricemode:'',
                
                
                shoppingCartClock : 0,
                dataInfo : '',
                dataInfodata:'',
                getcuTitle:'',

                isReceivedTiem : false,

                follow:0,               //是否关注 1关注 0未关注
                is_close:-1,               //店铺状态 1正常 0关闭 2打烊



                toggleShow:false,//规格选择切换显示开关
                shoppingShow:false,

                dropCount:0,//购物车数量
            }
        },
        watch:{
            shoppingShow(res){
                if(res){
                    setTimeout(()=>{
                        this.$refs.shoppingInCar.setParabola();
                    },1000)
                }
            }
        },
        created(){
            // 获取地址栏中的值
            this.seller_id = this.$route.query.index;
            // 获取header
            this.shopHeaderTitle = this.$route.query.businessHeadTitle;
            // 获取LOGO
            this.shopLogo = localStorage.getItem('merchantsLogo')
            
            this.region = localStorage.getItem('wapres');

            //获取商家的信息
            this.$post('/?c=merchant&a=shopInfo',{
                seller_id:this.seller_id
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.shopHeaderTitle = res.data.name;
                        if(res.data.shop_logo){
                            this.backlogo = res.data.shop_logo
                        }
                            this.shopLogo = res.data.logo_thumb;
                        this.score = Number(res.data.rate.score.value);
                        this.market_name = res.data.market_name;
                        this.tag = res.data.tag
                        this.follow = res.data.is_attention;

                        this.is_close = res.data.shop_close ? res.data.shop_close : 1;

                        if(res.data.is_attention==0){
                            this.rightText = '+关注';
                        }else{
                            this.rightText = '已关注';
                        }
                        break;
                    case 1:
                        break;
                    
                }
            })

            // 获取平台分类
            this.$post('/?c=merchant&a=getCategory',{
                seller_id:this.seller_id,
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        /*this.wholist = res.data

                        if(this.wholist.length) {
                            this.showFlag = 2;
                        }else {
                            this.showFlag = 1;
                        }*/
                        // this.onChange(0,'',1)
                        this.getGoods(res.data, this.seller_id)
                        break;
                    case 1:
                        break;
                    default:
                        break;
                 }
            });
            // 获取商家分类
            this.$post('/?c=merchant&a=sellerCategory',{
                seller_id:this.seller_id,
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.wholist2 = res.data
                        break;
                    case 1:

                        break;
                 }
            });

            this.getShoppingCar();
        },
        mounted(){
            /* this.rightWrapper = new BScroll(".specialDiv", {
                probeType: 3 ,//实施派发滚动事件
                click: true //允许点击
            });
            //监听滚动事件，并进行坐标计算
            this.rightWrapper.on("scroll", obj => {
                let totalHeight = 0;
                this.heightArr = this.$refs.itemList.getElementsByClassName("right-content-title")
                // console.log(this.heightArr)
                for (let i = 0; i < this.heightArr.length; i++) {
                    let curDivHeight = this.heightArr[i].offsetHeight; //当前DIV高度
                     //每循环一次，累计总高度
                    totalHeight += curDivHeight;
                    // console.log(i)
                    let _y = Math.abs(obj.y);
                    //进行第一个格子的特殊判断
                    if (_y < this.heightArr[0].offsetHeight) {
                        this.activeKey = 0;
                        this.selectedIndex = 0;
                    // 进行后面的判断
                    } else if (_y >= totalHeight) {
                        this.selectedIndex = i + 1;
                        this.activeKey = i + 1;
                        continue;
                    }
                }
               
            }); */
        },
        activated(){

            if(this.$route.query.index != this.seller_id){
                this.getDefault();
                // 获取地址栏中的值
                this.seller_id = this.$route.query.index;
                // 获取header
                this.shopHeaderTitle = this.$route.query.businessHeadTitle;
                // 获取LOGO
                this.shopLogo = localStorage.getItem('merchantsLogo')
                this.region = localStorage.getItem('wapres');
                
                // 获取平台分类
                this.$post('/?c=merchant&a=getCategory',{
                    seller_id:this.seller_id,
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            // this.wholist = res.data

                            // if(this.wholist.length) {
                            //     this.showFlag = 2;
                            // }else {
                            //     this.showFlag = 1;
                            // }
                            // this.onChange(0,'',1)
                            this.getGoods(res.data, this.seller_id)
                            break;
                        case 1:
                            break;
                        default:
                            break;
                    }
                });
                // 获取商家分类
                this.$post('/?c=merchant&a=sellerCategory',{
                    seller_id:this.seller_id,
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            this.wholist2 = res.data
                            break;
                        case 1:

                            break;
                    }
                });

                this.getShoppingCar();
            }
            //获取商家的信息
            this.$post('/?c=merchant&a=shopInfo',{
                seller_id:this.$route.query.index
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.shopHeaderTitle = res.data.name;
                        if(res.data.shop_logo){
                            this.backlogo = res.data.shop_logo
                        }
                            this.shopLogo = res.data.logo_thumb;
                        this.score = Number(res.data.rate.score.value);
                        this.market_name = res.data.market_name;
                        this.tag = res.data.tag
                        this.follow = res.data.is_attention;

                        this.is_close = res.data.shop_close ? res.data.shop_close : 1;

                        if(res.data.is_attention==0){
                            this.rightText = '+关注';
                        }else{
                            this.rightText = '已关注';
                        }
                        break;
                    case 1:
                        break;
                    
                }
            })

        },
        updated() {
            // 初始化高度数组，只执行1次！！！一定要加此判断！！否则会不断运行下面代码，内存泄漏
            if (this.heightArr.length == 0) {
            //获取右侧儿子DIV的所有高度
                for (let i = 0; i < this.goodslist.length; i++) {
                    let elt = document.getElementById(i);
                    // console.log("=======================")
                    // console.log(elt.offsetHeight)
                    // this.heightArr.push(elt.offsetHeight); //元素的实际显示高度
                }
            }
        },
        methods:{
            getDefault(){//设置默认值
                this.showFlag = 0;
                this.wholist = [];  
                this.wholist2 = [];  
                this.shopLogo = '';

                this.seller_id = '';
                this.shopHeaderTitle = '';
                this.shopLogo = '';
                this.region = '';
                this.shopHeaderTitle = '';
                this.backlogo = '';
                this.shopLogo = '';
                this.score = '';
                this.market_name = '';
                this.tag = [];
                this.follow = 0;
                this.is_close = -1;
                this.rightText = '';

                this.dropCount = 0;
                this.shoppingShow = false;

                this.goodslist = [];
                this.goodslist2 = [];
                this.titlelist = [];

                this.activeKey = '';
                this.active = '';
                this.selectedIndex = '';
                this.show = false;
            },
            toggleBtn(){
                if(this.toggleShow){
                    this.toggleShow = false;
                }else{
                    this.toggleShow = true;
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

            colback(){
                this.$router.go(-1);
            },
            //获取店铺下的商品
            getGoods(wholist, seller_id){
                this.$post('/?c=goods&a=goodsInShopCategory',{
                    seller_id:seller_id,
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            this.wholist = wholist

                            if(this.wholist.length) {
                                this.showFlag = 2;
                            }else {
                                this.showFlag = 1;
                            } 

                            this.goodslist = res.data;
                            this.onChange(0,'',1)
                            this.shoppingShow = true;
                            // c测试
                            if(this.wholist.length && this.goodslist.length) {
                                this.$nextTick(() => { 
                                    this._scrollInit()
                                    this.rightTop()                                       
                                }) 
                            } 
                        break;

                    }
                })                
            },
            setHeight(item,sid,maxKey){
                let height = 0;
                let count = 0;
                let data = [];
                for(let key in this.goodslist){
                    if(item.cat_id == this.goodslist[key].two_id){
                        count++;
                        data['count'] = count;
                    }
                }
                if(data.count<=4){
                    if(sid+1 == maxKey){
                        height = this.innerHeight - 55;
                        return height;
                    }
                }
            },
            // 关注商家
            onClickRight(){
                /*this.ReceivedTiem = true;*/
                if(this.follow == 0){
                    // 关注
                    this.$post('/?c=merchant&a=follow',{
                        id:this.seller_id,
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                this.rightText = '已关注';
                                this.follow = 1;
                                this.$toast('关注成功!');
                                break;
                            default:
                                break;
                        }
                    })
                }else{
                    // 取消
                    this.$post('/?c=merchant&a=unFollow',{
                        id:this.seller_id,
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                this.rightText = '+关注';
                                this.follow = 0;
                                this.$toast('取消成功!');
                                break;
                            default:
                                break;
                        }
                    })
                }
                

            },
            onClick(index,title){
                switch(index){
                    case 0:
                        this.$post('/?c=goods&a=goodsInShop',{
                            seller_id:this.seller_id,
                            recommend:2,
                            page:1,
                            category_id:0,
                            page_size:10
                        })
                        .then((res)=>{
                            switch(res.code){
                                case 0:
                                    this.recommend = res.data.list;
                                    if(!res.data.list.length){
                                        this.noGoods = 1;
                                    }else{
                                        this.noGoods = 0
                                    }
                                    break;
                                default:
                                    break;
                            }
                        });
                        break;
                    case 1:
                        this.$post('/?c=goods&a=goodsInShop',{
                            seller_id:this.seller_id,
                            recommend:0,
                            page:1,
                            category_id:0,
                            page_size:10
                        })
                        .then((res)=>{
                            switch(res.code){
                                case 0:
                                    this.allGoods = res.data.list;
                                    if(!res.data.list.length){
                                        this.noGoods = 1;
                                    }else{
                                        this.noGoods = 0
                                    }
                                    break;
                            }
                        });
                        break;
                    default:
                        this.$post('/?c=goods&a=goodsInShop',{
                                seller_id:this.seller_id,
                                recommend:0,
                                page:1,
                                category_id: $(event.toElement).attr('data-index'),
                                page_size:10
                            })
                            .then((res)=>{
                                switch(res.code){
                                    case 0:
                                        this.purchase = res.data.list;
                                        if(!res.data.list.length){
                                            this.noGoods = 1;
                                        }else{
                                            this.noGoods = 0
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            });
                        break;
                }
            },
            // 购物
            goshoppingCart(item){
                this.$router.push({
                    path:'/goods',
                    query:{
                        'goods':item.wId,
                        'index':this.seller_id,
                    }
                })
            },
            //收藏
            CollectionBox(){
                this.$post('/?c=user&a=addSupplier',{
                    seller_id:this.seller_id,
                })
                .then((res)=>{
                    // console.log(res);
                })
            },
            // 搜索框传值
            // 获取子组件
            onsearchTwo(val){
                console.log(val);
                this.val = val
            },
            searchvalTwo(val){
                console.log(val);
                if(val == ''){
                    this.$toast('搜索不能为空');
                }else if(this.val && this.val!= ''){
                    sessionStorage.setItem('searchGoods',val);
                    // this.goodflag = true;
                    this.$router.push({
                        path:'/searchGoods',
                        query:{
                            'index': this.seller_id,
                            'value': val,
                            'region':this.region,
                            'types':2,
                        }
                    })
                }
            },
            
            // 查看详情
            redmsg(code){
                console.log('1')
                this.$router.push({
                    path:'/goods',
                    query:{
                        goods:code
                    }
                })
            },
            changename(key){
                console.log(key)
                let div = document.getElementById(key);
                console.log(div)
                this.rightWrapper.scrollToElement(div,200);
                this.activeKey = key;
            },
            goodflagclock(val){
                this.goodflag=val
                console.log(val)
            },
            
            _scrollInit(){
                this.rightWrapper = new BScroll(".right-content", {
                    probeType: 3 ,//实施派发滚动事件
                    click: true //允许点击
                });
                // 监听滚动事件
                //监听滚动事件，并进行坐标计算
                this.rightWrapper.on("scroll", obj => {
                let totalHeight = 0;
                this.heightArr = this.$refs.itemList.getElementsByClassName("right-content-title")
                for (let i = 0; i < this.heightArr.length; i++) {
                        // let curDivHeight = this.heightArr[i]
                        let curDivHeight = this.heightArr[i].offsetHeight; //当前DIV高度
                        // console.log('当前div高度'+curDivHeight)
                        //每循环一次，累计总高度
                        totalHeight += curDivHeight;
                        let _y = Math.abs(obj.y);
                        //进行第一个格子的特殊判断
                        // if (_y < this.heightArr[0]) {
                        if (_y < this.heightArr[0].offsetHeight) {
                        this.active = 0;
                        this.selectedIndex = 0;
                        // 进行后面的判断
                        } else if (_y >= totalHeight) {
                        this.active = i + 1;
                        this.selectedIndex = i + 1;
                        continue;
                        }
                    }
                });

            },
            onChange(key,id,type) {
                this.activeKey = key;
                let n = 0;
                this.goodslist2 = [];
                if(type == '1'){
                    this.showLog = 0;
                if(this.wholist[key] && this.wholist[key].son){
                    /*for(let item in this.wholist[key].son) {
                        this.titlelist[n++] = this.wholist[key].son[item];
                    }*/
                    this.titlelist = this.wholist[key].son;
                }else{
                    this.titlelist = [];
                }
                this.active = 0;
                this.selectedIndex = 0;
                this.show = false;
                }else if(type == '2'){
                    this.showLog = 1;
                    this.$post('/?c=goods&a=goodsInCategory',{
                        seller_id:this.seller_id,
                        category_id:id,
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                this.$refs.shoppingInCar.setParabola();
                                this.goodslist2 = res.data
                                break;
                            case 1:

                                break;
                        }
                    });
                }
            },
            down(){
                this.show = true;
            },
            updown(){
                this.show = false;
            },
            // 右侧点击滚动事件
            rightTop(index, title){
                // 初始化
                this.leftWrapper = new BScroll(".wholesale-left", {
                    click: true //允许点击
                });
                //点击标题，滚动到右侧对应的DIV上！
                let div = document.getElementById(index);
                //调用API函数滚动到指定DIV上
                this.rightWrapper.scrollToElement(div,200);
            },
            // 下拉框点击滚动事件
            upTop(index){
                this.show = false;
                 //点击标题，滚动到右侧对应的DIV上！
                let div = document.getElementById(index);
                //调用API函数滚动到指定DIV上
                this.rightWrapper.scrollToElement(div,200);
            },
        },
        components:{
            floor,
            search,
            star,
            searchgoods,
            searchNone,
            vantLoading,
            vloading,
            navbar,
            platformIsClose,
            newGoodsLists,
            shoppingInCar,
            levitateCar
        },
        // beforeRouteEnter(to, from, next) {
        //     // console.log(from);
        //     if(from.name != 'searchGoods' && from.name != null){
        //         let data = {
        //             path:from.name,
        //             query:from.query,
        //         }
        //         let afrom = JSON.stringify(data)
        //         localStorage.setItem('backto',afrom);
        //     }
        //     next();
        // }
    }
</script>

<style lang="less" scoped>
.pop{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1006;
    width:100%;
    height:100%;
    background-color: #fff;
    overflow: auto;
}
.btn{
    height: 44px;
}
.selected{
    border-left: 3px solid #EE2D2D;
}
.dflex{
    display:flex;
}
.shop-head{
    padding: 20px 12px 20px 12px;
    background-size: 100% auto;
    overflow: hidden;
    padding: 20px 12px 20px 12px;
    position: relative;
    .collect{
            min-width: 55px;
            height: 24px;
            line-height: 24px;
            background: #EE2D2D;
            color: #fff;
            text-align: center;
            font-size: 14px;
            border-radius: 5px;
    }
    .shop-head-text{
        width: 100%;
        display: flex;
        position: relative;
        z-index: 1;
        .shop-head-div{
            flex-grow: 1;
            .merchant_div{
                flex-grow: 1;
                .merchant_goods{
                    .merchant_goods_img_box{
                        position: relative;
                        max-width: 60px;
                        min-width: 60px;
                        height: 60px;
                        overflow: hidden;
                        margin-right: 10px;
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
                    .merchant_goods_img{
                        width:60px;
                        height:60px;
                        border-radius:5px;
                        margin-right: 10px;
                    }
                    .merchant_goods_content{
                        flex-grow: 1;
                        .merchant_goods_title{
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            /*! autoprefixer: off */
                            -webkit-box-orient: vertical;
                            /* autoprefixer: on */
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            word-break: break-word;
                            font-size: 16px;
                            font-weight: 500;
                            color: rgba(51,51,51,1);
                            color:#fff;
                        }
                        .merchant_goods_grade{
                            margin-top: 5px;
                            .merchant_goods_grade-star{
                                font-size: 14px;
                                color:#EE2D2D;
                            }
                        }
                        .merchant_goods_tag{
                            flex-direction: column;
                            .merchant_tag_child{
                                font-size: 12px;
                                text-align: center;
                                border: 1px solid #FDA341;
                                color: #FDA341;
                                border-radius: 3px;
                                margin-top: 5px;
                                margin-right: 5px;
                                padding:0 5px;
                            }
                            .merchant_tag_childs{
                                border:1px solid #fff;
                                color:#fff;
                                flex-direction: initial;
                            }
                            .merchant_tag_child.active{
                                color: #fff;
                                background-color: #FDA341;
                            }
                        }
                        .merchant_goods_tags{
                            flex-direction: inherit;
                            flex-wrap: wrap;

                        }
                    }
                }
            }
        }
    }
    .shop-head-mas{
        top: 0px;
        left: 0;
        background: rgba(46,0,0,0.5);
        height: 160px;
        width: 100%;
        position: absolute;
    }
    
}
.contents{
    display:flex;
    margin-top:10px;
    overflow: hidden;
    .wholesale{
        min-width: 90px;
        max-width: 90px;
        background-color: #FAFAFA;
        .left-div{
            background-color: #FAFAFA;
            font-size: 14px;
            text-align: center;
            padding: 20px 0;
        }
    }
}


.specialDiv{
    background: #fff;
    flex-grow:1;
    overflow: hidden;
    .specialRecoommend{
        margin:0;
        .item-title{
            font-size:14px;
            padding:10px 0 0 10px;
        }
        .specialbox{
            .specialcontent{
                 position: relative;
                // padding: 20px 10px 20px 10px;
                .specialcontent_img{
                    width: 74px;
                    height: 74px;
                    border-radius: 5px;
                    margin-right: 8px;
                    >img{
                        width: 74px;
                        height: 74px;
                        border-radius: 5px;
                    }
                }
                .specialcontentSize {
                    width: calc(100% - 80px);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    .noongTitles{
                        margin: 0;
                        padding: 0;
                        font-size: 14px;
                        line-height: 20px;
                        color: #424242;
                        font-weight: 400;
                        margin-bottom: 4.5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        /*! autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */
                        -webkit-line-clamp: 2;
                    }
                    .specialtwocontentStandard{
                        font-size: 12px;
                        border: 1px solid #999;
                        color: #999;
                        text-align: center;
                        margin-right: 5px;
                        border-radius: 5px;
                        padding: 3px 7px;
                    }
                    .djust{
                        width: 100%;
                        position: absolute;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        .djust-text{
                            margin: auto;
                            margin-right: 0;
                            font-size: 12px;
                            .djust-Img{
                                width:20px;
                                height:20px;
                                margin-left:4px;
                                display: block;
                            }
                            span {
                                background-color: #DD2E2E;
                                color: #fff;
                                border-radius: 5px;
                                padding: 2px 5px;
                                text-align: center;
                                min-width: 36px;                                
                            }
                        }
                    }
                    .shop{
                        display: flex;
                        line-height: 12px;
                        font-size: 12px;
                        align-self: stretch;
                        color:#424242;
                        position: absolute;
                        bottom: 0;
                        .shop-content>img{
                            width:5px;
                            height: 7px
                        }
                        .shop-name{
                            color: #808080;
                            margin-right: 10px;
                        }
                    }
                    .noonglians{
                        margin:0;
                        padding:0;
                        font-size: .7rem;
                        font-size: 12px;
                        color: rgba(238,45,45,1);
                        font-weight: 400;
                        margin: auto;
                        margin-left: 0;
                        .noonglians_price{
                            font-size:16px;
                        }
                    }
                }
                .refund_icon {
                    font-size: 12px;
                    color: #ffffff;
                    overflow: hidden;
                    position: absolute;
                    left: 10px;
                    bottom: 0;          
                }
                .refund_icon .red {
                    padding: 1px 3px;
                    background: url('../assets/img/button-bg.png') repeat;
                    -webkit-background-size: auto 100%;
                    background-size: auto 100%;
                    border-radius: 5px;
                    float: left;
                    margin-right: 5px;        
                }
                .refund_icon .yellow {
                    padding: 1px 3px;
                    background: url('../assets/img/button-bg-yellow.png') repeat;
                    -webkit-background-size: auto 100%;
                    background-size: auto 100%;
                    border-radius: 5px;   
                    float: left;   
                }
            }
        }
        >.specialbox:last-child{
            padding-bottom: 20px;
        }
    }
}
.specialDivbottom{
    height:44px;
}
.iconRight{
  text-align: right;
  padding-right: 4px;
}
.no-login-icon-box{width: 100%;}
.no-login-icon-box img{display: block;margin: auto;}


.contents{
    display:flex;
    .wholesale-left{
        flex: 1;
        min-width: 90px;
        max-width: 90px;
        background-color: #FAFAFA;
        overflow: auto;
        .content{
            .left-div{
                background-color: #FAFAFA;
                .van-badge{
                    padding:0;
                    padding: 15px 0 15px 0;
                    border: 0;
                    background: #FAFAFA;
                    color:#424242;
                }
            }
        }
    
    }
    .wholesale-right{
        flex-grow: 1;
        // display:flex;
        flex-direction: column;
        flex: 1;
        position: relative;
        overflow: hidden;
        // 下拉框
        .right-down{
            height: 100%;
            width: 100%;
            background-color:rgba(0, 0, 0, 0.3);
            position: absolute;
            top:0;
            left:0;
            z-index:102;
            .right-down-item{
                display: flex;
                background-color: #FFF;
                padding:0 0 0 12px;
                .right-down-item-content{
                    display:flex;
                    font-size:12px;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom:5px;
                    >div{
                        display: flex;
                    }
                    .right-down-item-name{
                        padding: 3px 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        margin: 5px auto;
                        margin-right: 7px;
                    }
                    .right-down-item-name:nth-child(3n){
                        margin-right:0;
                    }

                }
                .right-down-arrows{
                    display: flex;
                    margin: 5px auto;
                    margin-right:12px;
                    height:24px;
                    >img{
                        height:24px;
                    }
                }
            }
            
        }
        .right-title{
                display: flex;
                background: #fff;
                position: relative;
                top:0;
                left:0;
                z-index:102;
                .right-title-img{
                        height: 24px;
                    margin: 5px auto;
                        position: absolute;
                    right: 12px;
                    z-index: 103;
                    .right-title-img-xiala{
                        height:24px;
                    }
                }
        .right-title-tabs{
                height: 24px;
                background: #fff;
                padding: 8px 0;
                flex: 1;
                margin-left: 10px;
                margin-right: 32px;
        }
        }
        .right-content{
            padding:0px 10px 0 10px;
            flex-grow: 1;
            height:calc(100% - 40px);
            margin-top:15px;
            
            .right-content-title{
                margin-top:15px;
                .right-content-title-name{
                    background: #f2f2f2;
                    padding-bottom: 10px;
                    font-size: 14px;
                }
                .right-content-item{
                    font-size: 12px;
                    padding: 0 15px;
                    text-align: center;
                    padding-bottom: 20px;
                    border-radius:10px;
                    background-color: #fff;
                    overflow: hidden;
                    .content-item-div{
                        >img{
                            width:75px;
                            height:75px;
                            display: block;
                            margin: auto;
                        }
                    }
                    
                }
            }
            .right-content-title.inCate{
                margin-top: 0;
        }
    }
        .right-content-1 {
            margin-top: 0px;
            border-top: 1px solid #D8D8D8;
            padding: 0;
        }
        .right-content.inCateParent{
            margin-top: 0;
            overflow: auto;
            height: 100%;
}
    }
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
</style>

<style lang="less">

    #app{
        .shop-dom{
            .contents{
                .wholesale-left{
                    .left-div{
                        .van-badge__text{
                            border-left: 3px solid transparent;
                            padding: 0 12px 0 9px;
                        }
                        .van-badge.van-badge--select{
                            color: #EE2D2D;
                            background-color: #fff;
                            font-weight: 500;
                            .van-badge__text{
                                border-color: #EE2D2D;
                            }
                        }
                    }
                }
            }
            .van-tabs__nav--card .van-tab.van-tab--active{
                border-radius: 29px;
            }
            .van-tabs__nav--card{
                border:none;
                margin:0;
                height: 24px;
                // margin:8px 0;
            }
            .van-tabs__nav--card .van-tab{
                border:none;
                color:#808080;
            }
            .van-tabs__nav--card .van-tab.van-tab--active{
                color:#fff;
            }
            .van-tab{
                min-width: 28%;
                max-width:28%;
                font-size: 12px;
                line-height: 24px;
            }
            .van-tabs--card>.van-tabs__wrap{
                height:24px;
                padding:8px 0;
            }
        }
    }
    
</style>
