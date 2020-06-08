<template>
    <div id="goodsListScroll" class="search-goods" style="position: relative;overflow-x: hidden;height:100%;">
        <navbar type="searchBoth" @search="searchSbumit" @searchInput="onsearchTwo" @clickleft="colback" :value="val"></navbar>

        <div class="search-content">
            <div class="specialRecoommend" v-if="show === 2">
                <div  v-for="(item,index) in goodslist" :key="index">
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
                        :spec="item.spec"
                        :i="index"
                        parentPath="index"

                        :is-activity="item.activity"
                        :is-promote="Number(item.is_promote)"

                        @showCart="shoppingInCart($event,item.res)"
                        @toggleBtn="toggleBtn"
                        :toggleShow="toggleShow"
                    ></newGoodsLists>
                </div>
                <div v-if="lock===1" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div> 
                <p class="end-msg">{{endMsg}}</p>
            </div>
            <div v-else-if="show === 1" class="search-none">
                <searchNone item="goodsList"></searchNone>
                <special></special>
            </div>
            <div v-else>
                <vant-loading></vant-loading>
            </div>
        </div>
        <shoppingInCar ref="shoppingInCar"></shoppingInCar>
        <levitateCar :num="dropCount"></levitateCar>
    </div>
</template>
<script>
import Vue from 'vue'
import search from '../component/search/search.vue'
import navbar from '../navbar/nav'
import special from '../component/recommendComponent/special.vue'

import searchNone from '../component/searchNone/searchNone.vue'


const levitateCar = () => import('../component/levitateCar.vue');
const vantLoading = () => import('../vantLoading.vue');
const newGoodsLists = () => import('../component/newGoodsLists/newGoodsLists.vue');
const shoppingInCar = () => import('../shoppingInCar/shoppingInCar.vue');

export default {
    props:['value','region','type','index'],
    data(){
        return{
            val:'',         //搜索的值
            regionId:'',       //获取id
            types:'',            //跳转地址
            goodslist:[],        //商品列表
            seller_id:'',        //商家id

            show: 0,
            gpage: 1,    //当前列表请求页码
            lock: 0,     //是否可以进行加载更多 0-未锁定，可以。 1-已锁定正在请求中，不可以
            endMsg: '',   //列表加载结束提示语

            dropCount:0,            //购物车商品数量
            
            toggleShow:false,//规格选择切换显示开关
            shoppingShow:false,

            goodsListScroll:'',
        }
    },
    created(){
        // 获取地址栏中的值
        let seller_id = this.$route.query.index;
        let regionId = this.$route.query.region;
        let types = this.$route.query.types;

        let seller_id1 = this.index
        let regionId1 = this.region
        let types1 = this.type

        this.types = types1?types1:types;
        this.regionId = regionId1?regionId1:regionId;
        this.seller_id = seller_id1?seller_id1:seller_id;
        
        let val = sessionStorage.getItem('searchGoods')
        if(val){
            this.val = val;
        }else{
            this.val = this.$route.query.value;
        }
        
        this.$cacheStorage(
          'shoppingCarCount',
          '/?c=cart&a=num',
          'local',
          {},
          ((res)=>{
            this.dropCount = res.data.num;
          }),
        )
        this.searchSbumit()
    },
    watch:{
        shoppingShow(res){
            if(res){
                setTimeout(()=>{
                    this.show = 2;
                },10)
                this.$refs.shoppingInCar.setParabola();
            }
        }
    },
    methods:{
        //商品瀑布流加载
        scrollLoad(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= (scrollHeight - 50))  { 
                //已锁定，则不继续请求加载
                if(this.lock == 1) {
                    return
                }
                this.lock = 1;                    

                if(this.type==2){
                    // 如果是店铺的请求
                    this.$post('/?a=wholesaleByCategory', {
                        seller_id:this.index,
                        region_id:this.regionId,
                        keywords:this.val,
                        page: this.gpage
                    }).then((res) => {
                        switch (res.code) {
                            case 0:
                                setTimeout(()=>{
                                    if(res.data.list.length > 0){
                                        this.goodslist=[...this.goodslist,...res.data.list];
                                        this.gpage+=1
                                    }
                                    if(res.data.list.length < 10){
                                        this.endMsg = '已经没有更多内容啦~';
                                        this.goodsListScroll.removeEventListener('scroll', this.scrollLoad)
                                    }
                                    this.lock = 0;                                    
                                }, 600)
                                break;
                            default:
                                this.$toast(res.msg);
                                break;
                        }
                    });
                }else{
                    this.$post('/?a=wholesaleByCategory', {
                        region_id:this.regionId,
                        keywords:this.val,
                        page: this.gpage
                    }).then((res) => {
                        switch (res.code) {
                            case 0:
                                setTimeout(()=>{
                                    if(res.data.list.length > 0){
                                        this.goodslist=[...this.goodslist,...res.data.list];
                                        this.gpage+=1
                                    }
                                    if(res.data.list.length < 10){
                                        this.endMsg = '已经没有更多内容啦~';
                                        this.goodsListScroll.removeEventListener('scroll', this.scrollLoad)
                                    }
                                    this.lock = 0;                                    
                                }, 600)
                                break;
                            default:
                                this.$toast(res.msg);
                                break;
                        }
                    });
                }
            }
        },
        // 进入商品详情
        goShpping(item) {
            this.$router.push({
                path: "/goods",
                query: {
                goods: item.wId
                }
            });
        },
        //进入店铺
        goShop(sellerId) {
            this.$router.push({
                path: '/shop',
                query: {
                    index: sellerId,
                }
            })
        },
        // 返回上一页
        colback(){
            if(this.types == 2){
                this.$router.go(-1);
            }else if(this.types == 1){
                this.$router.push({
                    path:'/wholesale'
                })
            }
            
        },
        // 再次搜索
        searchSbumit(val){
            //重置部分变量值
            this.gpage = 1;
            this.endMsg = '';
            this.goodslist = [];
            this.show = 0;
            this.lock = 0; 

            if(val) {
                this.val = val
            }

            // 如果是店铺的请求
            if(this.types==2){
                this.$post('/?a=wholesaleByCategory', {
                    seller_id:this.seller_id,
                    region_id:this.regionId,
                    keywords:this.val,
                    page: this.gpage
                }).then((res) => {
                    switch (res.code) {
                        case 0:
                            this.goodslist = res.data.list;
                            let goodsListScroll = document.getElementById('goodsListScroll');
                            this.goodsListScroll = goodsListScroll;
                            if(this.goodslist.length > 0) {
                                this.show = 2;
                                this.shoppingShow = true;
                                this.gpage += 1;
                                //初次请求且请求得到的数据条数大于limit数，则可以加载更多
                                if(res.data.list.length>9){
                                    goodsListScroll.addEventListener('scroll', this.scrollLoad)
                                }
                            }else {
                                this.show = 1;
                            }
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                });
            }else{
                this.$post('/?a=wholesaleByCategory', {
                    region_id:this.regionId,
                    keywords:this.val,
                    page: this.gpage
                }).then((res) => {
                    switch (res.code) {
                        case 0:
                            this.goodslist = res.data.list;
                            let goodsListScroll = document.getElementById('goodsListScroll');
                            this.goodsListScroll = goodsListScroll;
                            if(this.goodslist.length > 0) {
                                this.show = 2;
                                this.shoppingShow = true;
                                this.gpage += 1;
                                //初次请求且请求得到的数据条数大于limit数，则可以加载更多
                                if(res.data.list.length>9){
                                    this.goodsListScroll.addEventListener('scroll', this.scrollLoad)
                                }
                            }else {
                                this.show = 1;
                            }
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                });
            }
        },
        onsearchTwo(val){
            this.val = val
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
    destroyed(){
        this.goodsListScroll.removeEventListener('scroll', this.scrollLoad)
    },
    components: {
        search,
        special,
        searchNone,
        vantLoading,
        navbar,

        levitateCar,
        vantLoading,
        newGoodsLists,
        shoppingInCar,
    },
}
</script>
<style lang="less" scoped>
.end-msg {
    width: 100%;
    padding: 0 12px 20px;
    margin-left: -12px;
    background: #f2f2f2; 
    font-size: 14px;
    text-align: center;
    color: #c9c9c9;
    line-height: 3em;
    margin: 0 0 0 -12px;
}
.business-loading {
    width: 100%;
    padding: 0 12px 20px;
    margin-left: -12px;
    background: #f2f2f2;      
}
.search-div{
    display: flex;
    padding: 7px 0 7px 13px;
    align-items: center;
    background-color: #fff;
    .search-img{
        font-size: 12px;
        display:flex;
        align-items: center;
        color:#808080;
        >img{
            width: 8px;
            height: 15px;
            margin-right: 6px;
        };
    }
    .search-from{
        border: none;
        margin-left: 15px;
        display: flex;
        background: #f2f2f2;
        margin-right: 46px;
        flex-grow: 1;
        align-items: center;
        height: 30px;
        border-radius: 5px;
        .fa{
            height: 17px;
            margin-right: 7px;
            margin-left: 5px;
        }
        .search_in{
            border: none;
            font-size: 14px;
            background: #f2f2f2;
            width: 100%;
        }
    }
}
.search-content{
    padding: 5px 0 12px 0;
    background-color: #f4f4f4;
    .specialRecoommend{
        margin:0;
        background: #ffffff;
        padding: 0 12px;
        .specialbox{
                position: relative;
                padding: 20px 0;
                border-bottom: 1px solid #f2f2f2;
            .specialcontent{
                .specialcontentSize {
                    width: calc(100% - 80px);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    .noongTitles{
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        line-height:20px;
                        color: #424242;
                        font-weight: 400;
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
                        line-height: 12px;
                        margin-top:5px;
                    }
                    .specialtwocontentStandards{
                        font-size: 12px;
                        border: 1px solid #FFB912;
                        color: #fff;
                        text-align: center;
                        margin-right: 5px;
                        border-radius: 5px;
                        padding: 3px 7px;
                        line-height: 12px;
                        background: #FFB912;
                        margin-top:5px;
                    }
                    .noonglianLabel{
                        margin-top: 0;
                        display: flex;
                        margin-bottom: 4.5px;
                        flex-wrap: wrap;
                    }
                    .djust{
                        width: 100%;
                        position: absolute;
                        bottom: 15px;
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
                        .noonglians_price{
                            font-size:16px;
                        }

                    }
                }
            }
            .specialcontent .specialcontent_img{
                width: 118px;
                height: 118px;
                border-radius: 5px;
                margin-right: 10px;
                >img{
                    width: 118px;
                    height: 118px;
                    border-radius: 5px;
                }
                .refund_icon {
                    font-size: 12px;
                    color: #ffffff;
                    padding: 1px 3px;
                    background: url('../../assets/img/button-bg.png') repeat;
                    -webkit-background-size: auto 100%;
                    background-size: auto 100%;
                    border-radius: 5px;
                    position: absolute;
                    left: 0;
                    bottom: 3px;
                }
            }
        }
        >.specialbox:last-child{
            padding-bottom: 20px;
            border:none;
        }
    }
    .search-none {
        position: absolute;
        left: 0;
        top: 44px;
        width: 100%;
    }
}
.iconRight{
  text-align: right;
  padding-right: 4px;
}
</style>


