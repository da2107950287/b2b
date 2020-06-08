<template>
    <div class='wholesale-dom'>
        <navbar type="clear" title="常用清单"></navbar>
        <div class="wholesale-content dflex" :style="'height:'+innerHeight+'px'">
            <template v-if="usedShow === 1">
                <div id="wContent" class="wholesale-content-left-box" :style="'height:' +innerHeight+ 'px'">
                    <div class="wholesale-content-left-li " v-for="(cateItem,cateIndex) in list" :key="cateIndex" @click="onChange(cateIndex)">
                        <div class="dflex wholesale-li-active" v-if="active == cateIndex">
                            <div class="wholesale-content-line"></div>
                            <div class="wholesale-content-name fz_16 color_212121">{{cateItem.cat_name}}</div>
                        </div>
                        <div class="dflex" v-else>
                            <div class="wholesale-content-name fz_14 color_424242">{{cateItem.cat_name}}</div>
                        </div>
                    </div>
                    <div v-show="cateLock===1"  class="business-loading"><vant-loading :vertical="false" text=""></vant-loading></div>
                    <div class="cate-end-msg"></div>
                </div>
                <div class="wholesale-content-right-box">
                    <div class="wholesale-content-sort dflex">
                        <div class="synthesize-sort dflex">
                            <div class="wholesale-sort-li fz_12" v-for="(sortItem,sortIndex) in sortList" :key="sortIndex" @click="changeSort(sortIndex)">
                                <div class="color_EE2D2D active" v-if="sortActive == sortIndex">{{sortItem.name}}</div>
                                <div class="color_999" v-else>{{sortItem.name}}</div>
                            </div>
                        </div>
                        <div class="intellect-sort dflex" @click="sortToggle">
                            <div class="intellect-sort-text fz_12 color_EE2D2D">{{sortAlertActiveName}}</div>
                            <div class="intellect-sort-img sortShowTrue" v-if="sortShow"><img src="../assets/img/shang.png" alt=""></div>
                            <div class="intellect-sort-img sortShowFalse" v-else><img src="../assets/img/shangla.png" alt=""></div>
                        </div>
                        <div class="sort-alert" v-show="sortShow">
                            <div class="sort-alert-bg" :style="'height:'+innerHeight+'px'" @click="sortToggle"></div>
                            <div class="sort-alert-content">
                                <div class="sort-alert-li" v-for="(sortAlertItem,sortAlertIndex) in sortAlertList" :key="sortAlertIndex" @click="changeAiSort(sortAlertItem.name,sortAlertIndex)">
                                    <div class="active fz_14 color_EE2D2D" v-if="sortAlertActive == sortAlertIndex">{{sortAlertItem.name}}</div>
                                    <div class="fz_14 color_424242" v-else>{{sortAlertItem.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="rContent" class="wholesale-content-rContent" :style="'height:' +sortBgHeight+ 'px'">
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
                            <searchNone :item="'usedList'"></searchNone>
                        </div>
                        <div v-else class="vantLoading">
                            <vloading :vertical="false" text=""></vloading>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="usedShow === 2">
                <div style="height:100%;width: 100%;background-color:#f2f2f2;">
                    <searchNone :item="'usedList'"></searchNone>
                </div>
            </template>
            <template v-else>
                <div class="vantLoading">
                    <vloading :vertical="false" text=""></vloading>
                </div>
            </template>
        </div>
        <shoppingInCar ref="shoppingInCar"></shoppingInCar>
    </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import "../assets/css/commonstyle.css";
const navbar = () => import('./navbar/nav.vue');
const newGoodsLists = () => import('./component/newGoodsLists/newGoodsLists.vue');
const vantLoading = () => import('./vantLoading.vue');
const vloading = () => import('./vloading.vue'); 
const searchNone = () => import('./component/searchNone/searchNone.vue');
const shoppingInCar = () => import('./shoppingInCar/shoppingInCar.vue');
const innerHeight = window.innerHeight;
export default {
    data(){
        return{
            region:'',//默认地址
            val:'',//搜索的值
            tel:'4001288566', //客服id以及电话
            lists:[],//商品列表

            list:[],//一级分类
            sortList:[{//综合排序
                name:'综合'
            },{
                name:'已购买'
            },{
                name:'已关注'
            }],
            sortAlertList:[{//智能排序
                name:'智能排序'
            },{//智能排序
                name:'低价优先'
            },{
                name:'高价优先'
            },{
                name:'好评优先'
            },{
                name:'销量优先'
            }],

            active:0,//一级分类标签索引
            sortActive:0, //当前选中排序标签
            sortAlertActive:0, //当前选中智能排序标签

            sortAlertActiveName:'智能排序',//智能排序选择后名称

            innerHeight:innerHeight - 46 - 51,//去掉头尾高度
            sortBgHeight:innerHeight - 46 - 51 - 40,//商品列表高度

            sortShow:false,//智能排序窗口显示开关

            toggleShow:false,//规格选择切换显示开关

            lock:0,//分页列表请求锁
            page:2,//页数
            cateLock:0,//分类分页列表请求锁
            catePage:2,//分类页数
            endMsg:'',//


            is_buy:0,//是否购买 0否 1是
            is_collect:0,//是否收藏 0否 1是
            sort_evaluate:0,//1按好评排序
            sort_price:0,//1价格从小到大排 2价格从大到小排
            sort_num:0,//1按销量排序
            cat_id:0,//分类id

            rContentTop :0,//商品框距离顶部像素
            wContentTop :0,//分类框距离顶部像素

            pageShow:0,//0默认显示loading 1显示列表 2显示占位图
            usedShow:0,//0默认显示loading 1显示列表 2显示占位图
            shoppingShow:false,
        }
    },
    components:{
        navbar,
        newGoodsLists,
        vantLoading,
        vloading,
        searchNone,
        shoppingInCar
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
        this.$emit('toPage',{index:2,path:'/usedList'})
        this.region = localStorage.getItem('wapres');
        if(this.region==undefined)this.region = 322;
        
        let cat_id = this.$route.query.id;
        let usedListKey = sessionStorage.getItem('usedListKey');
        if(this.$appFunc.prototype.isEmpty(usedListKey)){
            usedListKey = 0;
        }

        

        this.$cacheStorage(
            'alwaysCategory',
            '/?c=goods&a=alwaysCategory',
            'session',
            {region_id: this.region},
            ((res)=>{
                if(res.code == 0){
                    this.list = res.data;
                    if(res.data.length>0){
                        this.usedShow = 1;
                        
                        if(this.$appFunc.prototype.isEmpty(cat_id)){
                            this.onChange(usedListKey)
                        }else{
                            this.onChange(cat_id)
                        }
                        
                    }else{
                        this.usedShow = 2;
                    }
                }else if(res.code == 1){
                    this.pageShow = 2;
                    this.usedShow = 2;
                }
            }),
        );
    },
    mounted(){
        if(this.list.length>20 && this.usedShow == 1){
            let scrollDiv = document.getElementById('wContent');
            if(scrollDiv){
                scrollDiv.addEventListener('scroll',this.cateHandleScroll);
            }
        }
    },
    activated(){
        let rContent = document.getElementById('rContent');
        rContent.addEventListener('scroll',this.handleScroll);
        let wContent = document.getElementById('wContent');
        wContent.addEventListener('scroll',this.cateHandleScroll);

        rContent.scrollTo(0,this.rContentTop)
        wContent.scrollTo(0,this.wContentTop)
    },
    methods:{
        getTop(){
            let rContent = $('#rContent');
            let wContent = $('#wContent');
            this.rContentTop = rContent.scrollTop() || 0
            this.wContentTop = wContent.scrollTop() || 0
        },
        getDefault(){//清除选择项
            this.sortActive = 0;
            // this.sortAlertActive = 0;
            // this.sort_price = 0;
            // this.sort_evaluate = 0;
            // this.sort_num = 0;

            this.is_collect = 0;
            this.is_buy = 0;
            
            // this.sortAlertActiveName = '智能排序'
            this.endMsg = '';
            this.page = 2;

            this.sortShow = false;

            this.lists=[];
            this.pageShow = 0;
        },
        onChange(key){//选中一级分类
            this.getDefault();
            this.active = key;
            this.cat_id = this.list[key].cat_id
            this.getGoodsList();
            sessionStorage.setItem("usedListKey",key);
        },
        sortToggle(){//智能排序切换
            if(this.sortShow){
                this.sortShow = false;
            }else{
                this.sortShow = true;
            }
        },
        changeAiSort(name,index){//选中智能排序
            this.sortAlertActive = index;
            this.sortAlertActiveName = name;
            this.sortShow = false;
            this.endMsg = '';

            this.page = 2;
            this.sort_price = 0;
            this.sort_evaluate = 0;
            this.sort_num = 0;
            if(index == 0){
            }else if(index == 1){
                this.sort_price = 1;
            }else if(index == 2){
                this.sort_price = 2;
            }else if(index == 3){
                this.sort_evaluate = 1;
            }else if(index == 4){
                this.sort_num = 1;
            }
            this.getGoodsList();
        },
        changeSort(index){//选中排序条件
            this.sortActive = index;
            this.sortShow = false;
            this.page = 2;
            this.endMsg = '';
            
            this.lists=[];
            this.pageShow = 0;

            this.is_collect = 0;
            this.is_buy = 0;
            if(index == 0){
            }else if(index == 1){
                this.is_buy = 1;
            }else if(index == 2){
                this.is_collect = 1;
            }
            this.getGoodsList();
        },

        toggleBtn(){
            if(this.toggleShow){
                this.toggleShow = false;
            }else{
                this.toggleShow = true;
            }
        },
        getGoodsList(){//列表请求
            this.lock = 1;
            this.$post("/?c=goods&a=alwaysWholesale", {
                region_id:this.region,
                cat_id:this.cat_id,
                sort_num:this.sort_num,
                sort_price:this.sort_price,
                sort_evaluate:this.sort_evaluate,
                is_buy:this.is_buy,
                is_collect:this.is_collect,
            }).then((res) => {
                if(res.code === 0){
                    if(res.data.length>0){
                        this.pageShow = 1;
                        this.lists=res.data;
                        this.lock = 0;
                        this.shoppingShow = true;
                        this.$refs.shoppingInCar.setParabola();
                        if(res.data.length>9){
                            let scrollDiv = document.getElementById('rContent');
                            scrollDiv.addEventListener('scroll',this.handleScroll);
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
        //瀑布流加载
        handleScroll () {
            let loadBottom = $('.end-msg')[0].getBoundingClientRect().bottom;
            let toBottom = innerHeight - 51;
            if( loadBottom < toBottom + 100){
                //写后台加载数据的函数
                if(this.lock == 0){
                    this.lock = 1;
                    this.$post("/?c=goods&a=alwaysWholesale", {
                        region_id:this.region,
                        cat_id:this.cat_id,
                        sort_num:this.sort_num,
                        sort_price:this.sort_price,
                        sort_evaluate:this.sort_evaluate,
                        is_buy:this.is_buy,
                        is_collect:this.is_collect,
                        page:this.page,
                    }).then((res) => {
                        if(res.code === 0){
                            if(res.data.length>0){
                                this.lists=[...this.lists,...res.data];
                            }
                            if(res.data.length<10){
                                this.endMsg = '已经没有更多内容啦~';
                                let scrollDiv = document.getElementById('rContent');
                                scrollDiv.removeEventListener('scroll', this.handleScroll)
                            }
                            this.lock = 0;
                            this.page+=1
                        }else if(res.code === 1){
                            this.lock = 0;
                            this.$toast(res.msg);
                        }
                    });
                }
            }
        },
        cateHandleScroll(){
            let loadBottom = $('.cate-end-msg')[0].getBoundingClientRect().bottom;
            let toBottom = innerHeight - 51;
            if( loadBottom < toBottom + 100){
                //写后台加载数据的函数
                if(this.cateLock == 0){
                    this.cateLock = 1;
                    this.$post("/?c=goods&a=alwaysCategory", {
                        region_id:this.region,
                        page:this.catePage,
                    }).then((res) => {
                        if(res.code === 0){
                            if(res.data.length>0){
                                this.list=[...this.list,...res.data];
                            }
                            if(res.data.length<10){
                                let scrollDiv = document.getElementById('wContent');
                                scrollDiv.removeEventListener('scroll', this.cateHandleScroll)
                            }
                            this.cateLock = 0;
                            this.catePage+=1
                        }else if(res.code === 1){
                            this.cateLock = 0;
                            this.$toast(res.msg);
                        }else{
                            this.cateLock = 0;
                        }
                    });
                }
            }
        },
    },
    
    destroyed () {
        sessionStorage.removeItem('scrollTop');
    },
}
</script>
<style lang="less">
    .wholesale-dom{
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
        .van-tabs__nav--card .van-tab:last-child{
            margin-right: 20px;
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
</style>
<style lang="less" scoped>
    .wholesale-dom{
        .wholesale-title{
            padding: 7px 12px;
            background: #fff;
            border-radius: 5px;
            position: relative;
            top:0;
            left:0;
            z-index:102;
            align-items: center;
            .title-input{
                width: 100%;
                height: 30px;
                font-size: 14px;
                margin: auto;
                background: #f2f2f2;
                >div{
                    width:100%;
                    .search-div{
                        .search-from{
                            margin-right:0;
                        }
                    }
                    
                }
                .search-from{
                    width:100%;
                    .search{
                        border: none;
                        height: 100%;
                        width: 100%;
                        background: #f2f2f2;
                    }
                }
                
                .title-svg{
                    width: 18px;
                    margin-left: 10px;
                    margin-right: 7px;
                }
                >input{
                    border: none;
                    background: #f2f2f2;
                }
            }
            .getPhone-box {
                width: 24px;
                margin: auto;
                margin-left: 12px;
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
        .wholesale-content{
            background-color: #fafafa;
            .wholesale-content-left-box{
                width: 84px;
                overflow: auto;
                .wholesale-content-left-li{
                    >div{
                        height: 50px;
                        width: 100%;
                        position: relative;
                        .wholesale-content-name{
                            margin: auto;
                            text-align: center;
                            line-height: 16px;
                        }
                        .wholesale-content-line{
                            margin: auto;
                            background-color: #ee2d2d;
                            width: 6px;
                            height: 16px;
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                        }
                    }
                    .wholesale-li-active{
                        background-color: #fff;
                    }
                }
            }
            .wholesale-content-right-box{
                flex-grow: 1;
                // display:flex;
                flex-direction: column;
                flex: 1;
                position: relative;
                overflow: hidden;
                width: calc(100% - 90px);
                overflow: auto;
                .wholesale-content-rTop{
                    position: relative;
                    border-bottom: 1px solid #d8d8d8;
                    .right-title{
                        display: flex;
                        background: #fff;
                        position: relative;
                        top:0;
                        left:0;
                        z-index:102;
                        width: 100%;
                        .right-title-img{
                            height:24px;
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
                            border-bottom: 1px solid #d8d8d8;
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
                                .right-down-item-name.selected{
                                    border-color: #ee2d2d;
                                    color: #ee2d2d;
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
                }
                .wholesale-content-sort{
                    justify-content: space-between;
                    padding: 8px 12px 8px 10px;
                    position: relative;
                    .synthesize-sort{
                        .wholesale-sort-li {
                            margin-right: 10px;
                            div{
                                border-radius: 3px;
                                padding: 3px 5px;
                                border: 1px solid #999;
                            }
                            .active{
                                border: 1px solid #ee2d2d;
                            }
                        }
                        .wholesale-sort-li:last-child{
                            margin-right: 0;
                        }
                    }
                    .intellect-sort{
                        .intellect-sort-text{
                            margin: auto;
                            margin-right: 5px;
                        }
                        .intellect-sort-img{
                            width: 8px;
                            margin: auto;
                            img{
                                display: block;
                                width: 100%;
                            }
                        }
                        .sortShowFalse{
                            transform: rotate(180deg);
                        }
                    }
                    .sort-alert{
                        position: absolute;
                        left: 0;
                        top: 40px;
                        background-color: #fff;
                        width: 100%;
                        .sort-alert-bg{
                            background-color: rgba(0,0,0,0.4);
                            position: absolute;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            z-index: 99;
                        }
                        .sort-alert-content{
                            padding: 15px 28px;
                            position: relative;
                            z-index: 100;
                            background-color: #fff;
                            .sort-alert-li{
                                margin-bottom: 30px;
                            }
                            .sort-alert-li:last-child{
                                margin-bottom: 0;
                            }
                        }
                    }
                }
                .wholesale-content-rContent{
                    background-color: #fff;
                    overflow: auto;
                }
            }
        }
    }

    .vantLoading{
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
</style>