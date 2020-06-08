<template>
    <div style="position: relative;overflow-x: hidden;height:100%;">
        <navbar type="searchBoth" @search="search" @searchInput="searchInput" :value="inputVal" @clickleft="onClickLeft"></navbar>
        <goodsTermNav :termShow="termShow" :type="type" @onTermShow="onTermShow" @postDistrict="postDistrict" @postSort="postSort" @confirmCategory="confirmCategory" @allCategory="allCategory"></goodsTermNav>
        <div class="new-goods-box">
            <div v-if="showList == 1">
                <div v-for="(item,index) in goodsList" :key="index">
                    <newGoodsLists
                        :item="item"
                        :marketName="item.market_name"
                        :tag="item.tag"
                        :name="item.goods_name"
                        :wid="item.wId"
                        :imgThumb="item.goods_thumb"
                        :img="item.goods_img"
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
                    <div v-show="lock===1"  class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
                    <div class="end-msg">{{endMsg}}</div>
                </div>
            </div>
            <div v-else-if="showList == 2" class="search-none">
                <searchNone :item="'goods'"></searchNone>
                <!-- <div class="merchant-none">暂无商品</div> -->
                <specialDom></specialDom>
            </div>
            <div v-else class="vantLoading">
                <vloading :vertical="false" text=""></vloading>
            </div>
        </div>

        <shoppingInCar ref="shoppingInCar"></shoppingInCar>
        <levitateCar :num="dropCount"></levitateCar>
    </div>
</template>

<script>
import Vue from "vue"
import $ from "jquery"
import {post,appFunc} from "../../assets/js/commonAPI.js"
import {parabola} from "../../assets/js/parabola.js"
import {position} from "../../assets/js/position.js"
import {cacheStorage} from "../../assets/js/cache.js"
import goodsTermNav from "../component/termNav/goodsTermNav.vue"
import goodsLi from "../component/goodsLi/goodsLi.vue"
import goodsSpecItem from '../component/priceSpec/goodsSpec.vue';
import goodsPriceSpecItem from '../component/priceSpec/goodsPriceSpec.vue';
import specialDom from '../component/recommendComponent/special.vue';
import navbar from '../navbar/nav.vue';
import vloading from '../vloading.vue'

import searchNone from "../component/searchNone/searchNone.vue";


const levitateCar = () => import('../component/levitateCar.vue');
const vantLoading = () => import('../vantLoading.vue');
const newGoodsLists = () => import('../component/newGoodsLists/newGoodsLists.vue');
const shoppingInCar = () => import('../shoppingInCar/shoppingInCar.vue');

Vue.prototype.$post = post;
Vue.prototype.$appFunc = appFunc;
Vue.prototype.$position = position;
Vue.prototype.$cacheStorage = cacheStorage;
Vue.prototype.$parabola = parabola;
export default {
    data(){
        return{
            termShow:0,
            type:2,

            regionID:0,
            region_id:0,

            goodsList: [], //====>商品列表


            /* 购物车参数 */
            shoppingCartClock : 0,
            dataInfo : [],
            dataInfodata:[],
            getcuTitle:[],
            isReceivedTiem:false,
            goodsImage:'',
            goods_name:'',
            goods_price:'',
            measure_unit:'',        

            indexID:0,              //身份ID
            pricemode:-1,           //筛选显示状态
            cat_id:0,               //分类ID
            showList:-1,            //列表显示状态 1查出数据 2未查出数据 其他loading
            sort_price:0,           //价格排序
            sort_num:0,             //销量排序
            gpage:2,
            lock:0,

            endMsg:'',

            inputVal:'',            //搜索内容
            dropCount:0,            //购物车商品数量

            myParabola:'',          //抛物线函数
            eleFlyElement:'',       //抛物线起点
            eleShopCart:'',         //抛物线终点
            eleParabolaImg:'',      //抛物线图片
            is_animate:true,        //动画开关

            
            toggleShow:false,//规格选择切换显示开关
            shoppingShow:false,
        }
    },
    created(){
        let data = localStorage.getItem("wapres");
        if(this.$appFunc.prototype.isEmpty(data)){
            this.$position((res)=>{
                this.regionID = res.region;
                this.region_id = res.region;
            })
        }else{
            this.regionID = data;
            this.region_id = data;
        }

        this.getParams();
        this.$cacheStorage(
          'shoppingCarCount',
          '/?c=cart&a=num',
          'local',
          {},
          ((res)=>{
            this.dropCount = res.data.num;
          }),
        )
        // 获取市场信息
        this.$cacheStorage(
            'marketList',
            '/?a=marketList',
            'session',
            {
                region_id: this.regionID,
                type: this.type,
            },
            ((res)=>{
                this.marketList = res.data.list;
            }),
        )
        // 全部分类
        this.$cacheStorage(
            'allCategory',
            '/?a=allCategory',
            'session',
            {
                region_id: this.regionID,
            },
            ((res)=>{
                this.category = res.data;
            }),
        )
        this.$post("/?c=wholesaleSurplus&a=list", {
            region_id: this.region_id,
            type_id:this.indexID,
            keywords: this.inputVal,
        }).then(res => {
            switch (res.code) {
                case 0:
                    this.goodsList = res.data.list;

                    if(res.data.list.length > 0){
                        this.shoppingShow = true;

                        this.showList = 1;
                        if(res.data.list.length>9){
                            window.addEventListener('scroll', this.goodshandleScroll)
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
    watch:{
        shoppingShow(res){
            if(res){
                setTimeout(()=>{
                    this.$refs.shoppingInCar.setParabola();
                },1000)
            }
        }
    },
    methods:{
        setParabola(){
            // 元素以及其他一些变量
            let _this = this;
            let eleFlyElement = document.querySelector("#flyItem");
            let eleShopCart = document.querySelector("#shopCart");
            let numberItem = 0;
            // 抛物线运动
            let myParabola = this.$parabola.prototype.parabola(eleFlyElement, eleShopCart, {
                speed: 100, //抛物线速度
                curvature: 0.009, //控制抛物线弧度
                complete: function() {
                    eleFlyElement.style.visibility = "hidden";
                    // eleShopCart.querySelector("span").innerHTML = 10;
                    $('#flyItem img').css({
                        "visibility": "hidden",
                    }).removeClass('degAnimate');
                    _this.eleParabolaImg = "";
                    _this.is_animate = true;
                }
            });
            this.eleFlyElement = eleFlyElement;
            this.eleShopCart = eleShopCart;
            this.myParabola = myParabola;
        },
        getParams(){
            // 接收路由带过来的参数
            let searchVal = sessionStorage.getItem('searchInputVal');
            let name = this.$route.query.name;
            if(searchVal != '' && searchVal != null){
                this.inputVal = searchVal;
            }else{
                this.inputVal = name;
            }
        },
        substr(val,num){
            if(val.length>num){
                val = val.substr(0,num-1) + '...';
            }else{
                val = val;
            }
            return val;
        },
        onTermShow(type){
            this.termShow = type;
        },
        allCategory(){
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.termShow = 0;
            this.cat_id = 0;
            this.showList = 0;
            this.gpage = 2;
            this.$post("/?c=wholesaleSurplus&a=list", {
                region_id: this.region_id,
                cat_id: this.cat_id,
                type_id:this.indexID,
                keywords: this.inputVal,
            }).then(res => {
                switch (res.code) {
                    case 0:
                        this.goodsList = res.data.list;
                        if(res.data.list.length > 0){
                            this.showList = 1;
                            if(res.data.list.length>9){
                                window.addEventListener('scroll', this.goodshandleScroll)
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
        confirmCategory(id){
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.termShow = 0;
            this.cat_id = id;
            this.showList = 0;
            this.gpage = 2;
            this.$post("/?c=wholesaleSurplus&a=list", {
                region_id: this.region_id,
                cat_id:this.cat_id,
                type_id:this.indexID,
                keywords: this.inputVal,
            }).then(res => {
                switch (res.code) {
                case 0:
                    this.goodsList = res.data.list;
                    console.log(res.data.list.length);
                    if(res.data.list.length > 0){
                        this.showList = 1;
                        if(res.data.list.length>9){
                            window.addEventListener('scroll', this.goodshandleScroll)
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
        postDistrict(id){
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.termShow = 0;
            this.showList = 0;
            this.gpage = 2;
                
            this.indexID = id;
            this.$post("/?c=wholesaleSurplus&a=list", {
                region_id: this.region_id,
                cat_id: this.cat_id,
                type_id:this.indexID,
                keywords: this.inputVal,
            }).then(res => {
                switch (res.code) {
                    case 0:
                    this.goodsList = res.data.list;
                    if(res.data.list.length > 0){
                        this.showList = 1;
                        if(res.data.list.length>9){
                            window.addEventListener('scroll', this.goodshandleScroll)
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
        postSort(data){
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.termShow = 0;
            this.showList = 0;
            this.gpage = 2;
            if(data.type =='sort_price_desc'){
                this.sort_price = 2;
                this.sort_num = 0;
            }else if(data.type =='sort_price_asc'){
                this.sort_price = 1;
                this.sort_num = 0;
            }else if(data.type == "sort_num"){
                this.sort_num = 1;
                this.sort_price = 0;
            }
            this.$post("/?c=wholesaleSurplus&a=list", {
                region_id: this.region_id,
                cat_id: this.cat_id,
                type_id:this.indexID,
                is_new:1,
                sort_price:this.sort_price,
                sort_num:this.sort_num,
            }).then(res => {
                switch (res.code) {
                case 0:
                    this.goodsList = res.data.list;
                    
                    if(res.data.list.length > 0){
                        this.showList = 1;
                        if(res.data.list.length>9){
                            window.addEventListener('scroll', this.goodshandleScroll)
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
        /* priceBtn(id){
            //价格筛选
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.showList = 0;
            this.sort_price = id;
            this.gpage = 2;
            if(id == 1){
                this.termShow = 2;
                this.market_id = 0;
                this.$post("/?c=wholesaleSurplus&a=list", {
                    region_id: this.region_id,
                    cat_id: this.cat_id,
                    sort_price:id,
                    type_id:this.indexID,
                    keywords: this.inputVal,
                }).then(res => {
                switch (res.code) {
                    case 0:
                    this.goodsList = res.data.list;
                    if(res.data.list.length > 0){
                        this.showList = 1;
                        if(res.data.list.length>9){
                            window.addEventListener('scroll', this.goodshandleScroll)
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
                this.termShow = 0;
                this.market_id = id;
                this.$post("/?c=wholesaleSurplus&a=list", {
                    region_id: this.region_id,
                    cat_id: this.cat_id,
                    sort_price:id,
                    type_id:this.indexID,
                    keywords: this.inputVal,
                }).then(res => {
                    switch (res.code) {
                        case 0:
                        this.goodsList = res.data.list;
                        if(res.data.list.length > 0){
                            this.showList = 1;
                            if(res.data.list.length>9){
                                window.addEventListener('scroll', this.goodshandleScroll)
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
        }, */
        onsearchTwo(){
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.gpage = 2;
            this.$post("/?c=wholesaleSurplus&a=list", {
                    region_id: this.region_id,
                    cat_id: this.cat_id,
                    type_id:this.indexID,
                    keywords: this.inputVal,
            }).then(res => {
                switch (res.code) {
                case 0:
                    this.goodsList = res.data.list;
                    
                    if(res.data.list.length > 0){
                        this.showList = 1;
                        if(res.data.list.length>9){
                            window.addEventListener('scroll', this.goodshandleScroll)
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
        showShopcart(data){
            this.goods_id = data.goods_id;
            this.id = data.wId;
            this.$post('/?c=goods&a=detail', {
                id: data.wId
            })
            .then((res) => {
                this.goodsImage = res.data.goods_img
                this.goods_name = res.data.goods_name
                this.goods_price = res.data.goods_price
                this.measure_unit = res.data.measure_unit
                this.pricemode = res.data.price_model
            })

            this.$post('/?c=goods&a=spec', {
                id: data.goods_id
            })
            .then((res) => {
                this.shoppingCartClock = 1;
                this.dataInfo = res;
                this.dataInfodata=res.data.spe;
                this.getcuTitle=res.data.pro;

                this.isReceivedTiem = true;
            })
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
        onClickLeft(){
            this.$router.go(-1)
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
                    _this.$post('/?c=wholesaleSurplus&a=list',{
                        region_id: _this.region_id,
                        cat_id: _this.cat_id,
                        sort_price:_this.sort_price,
                        type_id:_this.indexID,
                        page:_this.gpage,
                        keywords: this.inputVal,
                    }).then((res) => {
                        switch (res.code){
                            case 0:
                                if(res.data.list.length > 0){
                                    _this.goodsList=[..._this.goodsList,...res.data.list];
                                    _this.gpage+=1
                                }
                                if(res.data.list.length < 10){
                                    window.removeEventListener('scroll', this.goodshandleScroll)
                                    _this.endMsg = '已经没有更多内容啦~';
                                }
                                _this.lock = 0;
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
        search(val){
            //搜索
            this.showList = -1;
            this.gpage = 1;
            window.removeEventListener('scroll', this.goodshandleScroll)
            this.$post('/?c=wholesaleSurplus&a=list',{
                //传值
                region_id:this.region_id,
                keywords:this.inputVal,
                type_id:0,
                page:1,
            }).then((res)=> {
                switch(res.code){
                    case 0:
                        this.goodsList = res.data.list
                        if(res.data.list.length>0){
                            this.showList = 1;
                            this.gpage += 1;
                            
                            if(res.data.list.length>9){
                                window.addEventListener('scroll', this.goodshandleScroll)
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
        },
        searchInput(val){
            sessionStorage.setItem('searchInputVal',val);
            this.inputVal = val;
        },
    },
    components:{
        goodsTermNav,
        goodsLi,
        goodsSpecItem,
        goodsPriceSpecItem,
        navbar,
        specialDom,
        levitateCar,
        searchNone,
        vloading,

        vantLoading,
        newGoodsLists,
        shoppingInCar,
    },
    destroyed () {
        window.removeEventListener('scroll', this.goodshandleScroll)
    },
}
</script>


<style lang="less" scoped>
/* loading */
.new-goods-box{
    padding:0 12px;
    background-color: #fff;
    position: relative;
    margin-top: 52px;
    .search-none {
        width: 100%;
        position: absolute;
        left: 0;
        top: -20px;
        background-color: #f2f2f2;
    }
    .goodsLi:first-child{
        padding-top: 20px;
    }
}
.termNav-img{
  width: 10.65rem;
  margin: 100px auto 0;
  display: block;
}
/* .loading{
    width: 10.56rem;
    height: 4px;
    border-radius: 4px;
    margin: 0 auto;
    margin-top:0;
    margin-bottom: 100px;
    position: relative;
    background: #f2f2f2;
    overflow: hidden;
    span{
        display:block;
        width: 2.64rem;
        height: 100%;
        margin: auto;
        border-radius: 3px;
        background: #fac2d2;
        animation: changePosition 4s linear infinite;
    }
} */
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

@keyframes degAnimate{
    0%{
        transform:scale(1) translate(-50%,-50%);
        transform-origin: 0 0 0;
    }
    100%{
        width: 20px;
        height: 20px;
        /* transform:scale(.2) translate(-50%,-50%); */
        transform-origin: 0 0 0;
    }
}
@-webkit-keyframes degAnimate{
    0%{
        -webkit-transform:scale(1) translate(-50%,-50%);
        -webkit-transform-origin: 0 0 0;
    }
    100%{
        width: 20px;
        height: 20px;
        // -webkit-transform:scale(.1) translate(-50%,-50%);
        -webkit-transform-origin: 0 0 0;
    }
}

.degAnimate {
    animation: degAnimate .6s linear ;
    -webkit-animation: degAnimate .6s linear ;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
}

#flyItem{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    z-index: 1005;
    visibility: hidden;
    top: 0;
    left: 0;
    img{
        display: block;
        position: relative;
        visibility: hidden;
    }
}
.vantLoading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1000;
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
</style>
