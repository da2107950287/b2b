<template>
    <div class='wholesale-dom'>
        <div class='wholesale-title dflex'>
            <div class="dflex title-input">
                <search @onsearch="onsearch" @searchval="searchval" :type="1"></search>
            </div>
            <div class="getPhone-box">
                <img src="../assets/img/redservice.png" alt="" @click="getPhone">
            </div>
        </div>
        <div class="wholesale-content dflex" :style="'height:'+innerHeight+'px'">
            <!-- 一级分类 -->
            
            <div class="wholesale-content-left-box" :style="'height:' +innerHeight+ 'px'">
                <div class="wholesale-content-left-li " @click="onChange(-1)">
                    <div class="dflex wholesale-li-active" v-if="active == -1">
                        <div class="wholesale-content-line"></div>
                        <div class="wholesale-content-name fz_16 color_212121">促销</div>
                    </div>
                    <div class="dflex" v-else>
                        <div class="wholesale-content-name fz_14 color_424242">促销</div>
                    </div>
                </div>
                <div class="wholesale-content-left-li " v-for="(cateItem,cateIndex) in list" :key="'cate-'+cateIndex" @click="onChange(cateIndex)">
                    <div class="dflex wholesale-li-active" v-if="active == cateIndex">
                        <div class="wholesale-content-line"></div>
                        <div class="wholesale-content-name fz_16 color_212121">{{cateItem.cat_name}}</div>
                    </div>
                    <div class="dflex" v-else>
                        <div class="wholesale-content-name fz_14 color_424242">{{cateItem.cat_name}}</div>
                    </div>
                </div>
            </div>
            <div class="wholesale-content-right-box">
                
                <div class="wholesale-content-rTop">
                    <!-- 二级分类 -->
                    <div class='right-title dflex' v-if="titlelist.length>0 && active >= 0">
                        <van-tabs type="card" class="right-title-tabs" v-model="activeKey" @click="rightTop">
                            <van-tab v-for="(items,indexs) in titlelist" :key="'title-'+indexs" :title="items.cat_name" ellipsis swipeable></van-tab>
                        </van-tabs>
                        <div class="right-title-img" v-if="titlelist.length && titlelist.length>3">
                            <img src="../assets/img/xiala.png" alt="" class="right-title-img-xiala" @click="down">
                        </div>
                    </div>
                    <!-- 下拉框 -->
                    <div v-show="show" class="right-down" @click.self="updown"  v-if="titlelist.length && titlelist.length>3">
                        <div class="right-down-item">
                            <div class="right-down-item-content" v-if="titlelist.length>0">
                                <div v-for="(items,indexs) in titlelist" :key="'title2-'+indexs">
                                    <div class="right-down-item-name" :class="{'selected': selectedIndex == indexs }" @click="rightTop(indexs)">{{items.cat_name}}</div>
                                </div>
                            </div>
                            <div class="right-down-arrows" @click="updown">
                                <img src="../assets/img/shouqi.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="wholesale-content-sort dflex">
                        <div class="synthesize-sort dflex">
                            <!-- 三级分类 -->
                            <div class="wholesale-sort-li fz_12" @click="sonToggle"  v-if="active >= 0 && sonList.length>0">
                                <div class="color_EE2D2D active dflex" v-if="sortActive == 1">
                                    {{sonListTitle}}
                                    <img v-show="!sonShow" src="../assets/img/sanjiaoxin.png" alt="">
                                    <img v-show="sonShow" class="imgActive" src="../assets/img/sanjiaoxin.png" alt="">
                                </div>
                                <div class="color_EE2D2D active  dflex" v-else>
                                    {{sonListTitle}}
                                    <img v-show="!sonShow" src="../assets/img/sanjiaoxin.png" alt="">
                                    <img v-show="sonShow" class="imgActive" src="../assets/img/sanjiaoxin.png" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- 下拉框 -->
                        <div v-show="sonShow" class="right-down">
                            <div class="right-down-bg" @click.stop="sonToggle" :style="'height:' +sortBgHeight+ 'px'"></div>
                            <div class="right-down-item">
                                <div class="right-down-item-content" >
                                    <div v-for="(sortItem,sortIndex) in sortList" :key="'sort-'+sortIndex" @click="changeSort(sortIndex)">
                                        <div class="right-down-item-name" :class="{'selected': sortActive == sortIndex }" >{{sortItem.name}}</div>
                                    </div>
                                    <template v-if="sonList.length>0">
                                        <div v-for="(sonListIems,sonListIndexs) in sonList" :key="'son-'+sonListIndexs">
                                            <div class="right-down-item-name" :class="{'selected': sonSelectedIndex == sonListIndexs }" @click="sonClick(sonListIems.cat_id,sonListIems.cat_name,sonListIndexs)">{{sonListIems.cat_name}}</div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <!-- 智能排序 -->
                        <div class="intellect-sort dflex" @click="sortToggle">
                            <div class="intellect-sort-text fz_12 color_EE2D2D">{{sortAlertActiveName}}</div>
                            <div class="intellect-sort-img sortShowTrue" v-if="sortShow"><img src="../assets/img/shang.png" alt=""></div>
                            <div class="intellect-sort-img sortShowFalse" v-else><img src="../assets/img/shangla.png" alt=""></div>
                        </div>
                        <div class="sort-alert" v-show="sortShow">
                            <div class="sort-alert-bg" :style="'height:'+innerHeight+'px'" @click="sortToggle"></div>
                            <div class="sort-alert-content">
                                <div class="sort-alert-li" v-for="(sortAlertItem,sortAlertIndex) in sortAlertList" :key="'sort-alert-'+sortAlertIndex" @click="changeAiSort(sortAlertItem.name,sortAlertIndex)">
                                    <div class="active fz_14 color_EE2D2D" v-if="sortAlertActive == sortAlertIndex">{{sortAlertItem.name}}</div>
                                    <div class="fz_14 color_424242" v-else>{{sortAlertItem.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 商品列表 -->
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
                            <searchNone :item="'newGoodsList'"></searchNone>
                        </div>
                        <div v-else class="vantLoading">
                            <vloading :vertical="false" text=""></vloading>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <shoppingInCar ref="shoppingInCar"></shoppingInCar>
    </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import "../assets/css/commonstyle.css";
const search = () => import('./component/search/search.vue');
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
            lists:[],//商品列表

            list:[],//一级分类
            titlelist:[],//二级分类
            sonList:[],//三级分类
            sortList:[{//综合排序
                name:'全部'
            }],
            sonListTitle:'类别',//三级分类默认名称
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

            active:-1,//一级分类标签索引
            activeKey:0,//二级分类标签索引
            sonActiveKey:0,//三级分类标签索引
            selectedIndex: 0, //当前选中标签的索引
            sonSelectedIndex:0,//三级分类选中标签索引
            sortActive:0, //当前选中排序标签
            sortAlertActive:0, //当前选中智能排序标签

            sortAlertActiveName:'智能排序',//智能排序选择后名称

            sortBgHeightBefore:innerHeight - 44 - 51 - 40,//不选择促销的高度
            sortBgHeightAfter:innerHeight - 44 - 51 - 41 - 40,//选择促销的高度
            innerHeight:innerHeight - 44 - 51,//去掉头尾高度
            sortBgHeight:innerHeight - 44 - 51 - 41 - 40,//商品列表高度

            sonShow:false,//三级分类下拉框开关
            show:false,//二级分类下拉框开关
            sortShow:false,//智能排序窗口显示开关

            toggleShow:false,//规格选择切换显示开关

            lock:0,//分页列表请求锁
            page:2,//页数
            endMsg:'',//

            rContentTop :0,//商品框距离顶部像素

            is_activity:0,//是否促销 0否 1是
            sort_evaluate:0,//1按好评排序
            sort_price:0,//1价格从小到大排 2价格从大到小排
            sort_num:0,//1按销量排序
            cat_id:0,//分类id

            secondary_id:0,//二级分类ID
            reclassify_id:0,//三级分类ID

            pageShow:0,//0默认显示loading 1显示列表 2显示占位图
            shoppingShow:false,
        }
    },
    components:{
        search,
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
        let cat_id = this.$route.query.id;
        this.$emit('toPage',{index:1,path:'/wholesale'})
        
        this.region = localStorage.getItem('wapres');
        if(this.region==undefined)this.region = 322;
        
        let wholesaleKey = sessionStorage.getItem('wholesaleKey');
        if(this.$appFunc.prototype.isEmpty(wholesaleKey)){
            wholesaleKey = -1;
        }
        this.$cacheStorage(
            'allCategory',
            '/?a=allCategory',
            'session',
            {region_id: this.region},
            ((res)=>{
                this.list = res.data;
                if(this.$appFunc.prototype.isEmpty(cat_id)){
                    this.onChange(wholesaleKey)
                }else{
                    this.onChange(cat_id)
                }
            }),
        );
    },
    mounted(){
        $('#app').css({
            'height':'auto'
        })
    },
    activated(){
        let rContent = document.getElementById('rContent');
        rContent.addEventListener('scroll',this.handleScroll);

        rContent.scrollTo(0,this.rContentTop)
    },
    methods:{
        getTop(){
            let rContent = $('#rContent');
            this.rContentTop = rContent.scrollTop() || 0
        },
        // 获取子组件
        onsearch(val){
            this.val = val
            console.log("1"+this.val)
            if(this.val != ''){
                this.searchval(this.val)
            }
        },
        searchval(val){
            console.log("2"+this.val)
            if(val == ''){
                this.$toast('搜索不能为空');
            }else if(val != ''){
                //====>页面之间传值
                sessionStorage.setItem('searchGoods',val);
                this.$router.push({
                    path:'/searchGoods',
                    query:{
                        'name': val,
                        'region':this.region,
                        'types':1,
                    }
                })
            }
        },
        // 获取电话
        getPhone() {
            window.location.href='tel:4001288566';
            this.dialogShow = false;
        },
        getDefault(){//清除选择项
            this.sortActive = 0;
            // this.sortAlertActive = 0;
            this.activeKey = 0;
            this.selectedIndex = 0;
            // this.sort_price = 0;
            // this.sort_evaluate = 0;
            // this.sort_num = 0;
            this.is_activity = 0;
            // this.sortAlertActiveName = '智能排序'
            this.endMsg = '';
            this.page = 2;

            this.sonListTitle = '类别';
            this.sonActiveKey = 0;
            this.sonSelectedIndex = 0;
            this.sonShow = false;

            this.sortShow = false;

            this.lists=[];
            this.pageShow = 0;
        },
        onChange(key){//选中一级分类
            this.getDefault();

            this.active = key;
            if(key >= 0){
                this.sortBgHeight = this.sortBgHeightAfter;
                if(this.list[key].son){
                    this.titlelist = this.list[key].son?this.list[key].son:[];
                    this.cat_id = this.list[key].son[0].cat_id;
                    this.secondary_id = this.list[key].son[0].cat_id
                    this.sonList = this.list[key].son[0].son?this.list[key].son[0].son:[];

                    if(this.sonList.length>0){
                        let son_cat_id = this.list[key].son[0].son[0].cat_id;
                        let son_cat_name = this.list[key].son[0].son[0].cat_name;
                        this.sonClick(son_cat_id,son_cat_name,0);
                    }else{
                        this.getGoodsList();
                    }
                }else{
                    this.titlelist = [];
                    this.sonList = [];
                    this.cat_id = 0;
                    this.pageShow = 2;
                }
            }else{
                this.sortBgHeight = this.sortBgHeightBefore;
                this.cat_id = 0;
                this.page = 2;
                this.lists=[];
                this.sonList = [];
                this.titlelist = [];
                this.pageShow = 0;

                this.is_activity = 1;
                this.getGoodsList();
            }
            sessionStorage.setItem("wholesaleKey",key);


            this.activeKey = 0;
            this.selectedIndex = 0;
            this.show = false;
            
        },
        rightTop(key){//选中二级分类
            this.getDefault();
            this.sonList = this.titlelist[key].son || [];

            this.activeKey = key;
            this.selectedIndex = key;
            this.show = false;
            this.cat_id = this.titlelist[key].cat_id;
            this.secondary_id = this.titlelist[key].cat_id;
            
            if(this.sonList.length>0){
                let son_cat_id = this.titlelist[key].son[0].cat_id;
                let son_cat_name = this.titlelist[key].son[0].cat_name;
                this.sonClick(son_cat_id,son_cat_name,0);
            }else{
                this.getGoodsList();
            }
        },

        sonClick(id,name,key){
            this.sortActive = 1;
            this.sonActiveKey = key;
            this.sonSelectedIndex = key;
            this.sonShow = false;
            this.cat_id = id;
            this.reclassify_id = id;
            this.sonListTitle = name;
            this.getGoodsList();
        },
        down(){//二级分类下拉
            this.show = true;
        },
        updown(){//二级分类收起
            this.show = false;
        },
        sonToggle(){//二级分类切换
            if(this.sonShow){
                this.sonShow = false;
            }else{
                this.sonShow = true;
            }
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

            this.sort_price = 0;
            this.sort_evaluate = 0;
            this.sort_num = 0;
            this.endMsg = '';

            this.page = 2;
            this.lists=[];
            this.pageShow = 0;
            
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
            this.endMsg = '';

            this.sonListTitle = '全部';
            this.sonActiveKey = 0;
            this.sonSelectedIndex = -1;
            this.cat_id = this.secondary_id;

            this.page = 2;
            this.lists = [];
            this.pageShow = 0;
            this.sonShow = false;

            if(index == 0){
                this.is_activity = 0;
            }else{
                this.is_activity = 1;
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
            
            this.$post("/?c=goods&a=wholesale", {
                region_id:this.region,
                cat_id:this.cat_id,
                sort_num:this.sort_num,
                sort_price:this.sort_price,
                sort_evaluate:this.sort_evaluate,
                is_activity:this.is_activity,
            }).then((res) => {
                if(res.code === 0){
                    if(res.data.length>0){
                        this.pageShow = 1;
                        this.lists=res.data;
                        this.shoppingShow = true;
                        this.$refs.shoppingInCar.setParabola();
                        if(res.data.length>9){
                            var scrollDiv = document.getElementById('rContent');
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
                    this.$post("/?c=goods&a=wholesale", {
                        region_id:this.region,
                        cat_id:this.cat_id,
                        sort_num:this.sort_num,
                        sort_price:this.sort_price,
                        sort_evaluate:this.sort_evaluate,
                        is_activity:this.is_activity,
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
    },
    destroyed () {
        this.page=2;
        this.endMsg="";
        $('#app').css({
            'height':'100%'
        })
        window.removeEventListener('scroll', this.handleScroll)
    }
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
                            max-height: 300px;
                            overflow: auto;
                            z-index: 103;
                            position: relative;
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
                    .right-down{
                        top: 40px;
                        .right-down-bg{
                            height: 100%;
                            width: 100%;
                            background-color: rgba(0, 0, 0, 0.3);
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 102;
                        }
                    }
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
                            img{
                                width: 7px;
                                margin: auto;
                                margin-left: 5px;
                            }
                            img.imgActive{
                                transform: rotate(180deg);
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