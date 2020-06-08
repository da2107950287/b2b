<template>
    <div style="">
        <div class="commodity-box">
            <template v-if="isListStyle == '1'">
                <div class="commodity-images" :style="[{'padding':`${htmlPadding}`},{'background-color':commodityBgColor}]">
                    <div class="commodity-link dflex flex-start" :style="[{'margin':`0 0 ${goodsUnit}px 0`},{'border-radius':imgRadius}]" v-for="(item,index) in goodsList" :key="index" >
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

                            :checked="checked"
                            :imgRadius="imgRadius"
                            :imgStyle="imgStyle"
                            :textStyle="textStyle"
                        ></newGoodsLists>

                        <!-- <div class="commodity-img" :style="[{'border-radius':imgRadius},{'max-width':imgStyle},{'min-width':imgStyle},{'max-height':imgStyle},{'min-height':imgStyle}]"><img src="" alt=""></div>
                        <div class="commodity-attr" :style="[{'width': `calc(100% - ${imgStyle} - 10px)`}]">
                            <div class="commodity-title fz16" :style="[{'font-weight':textStyle}]" v-show="checked.goods_title">{{item.goods_name}}</div>
                            <div class="commodity-tag dflex flex-start" v-show="checked.goods_tag">
                                <div class="remake-tag fz12">{{item.market_name}}</div>
                                <div class="goods-tag fz12" v-for="(tagItem,tagIndex) in item.tag" :key="tagIndex">{{tagItem}}</div>
                            </div>
                            <div class="commodity-remake fz12" v-show="checked.goods_remake">{{item.remark}}</div>
                            <div class="commodity-price-box">
                                    <div class="commodity-price market-price" v-if="checked.market_price && item.market_price">
                                        <span class="fz12">&yen;</span>
                                        <span class="fz12">{{item.market_price}}</span>
                                        <span class="fz12" v-if="item.measure_unit">/{{item.measure_unit}}</span>
                                    </div>
                                </div>
                            <div class="commodity-price-box dflex space-between" v-show="checked.goods_price">
                                <div class="commodity-price">
                                    <span class="fz12">&yen;</span>
                                    <span class="fz16">{{item.goods_price}}</span>
                                    <span class="fz14" v-if="item.measure_unit">/{{item.measure_unit}}</span>
                                </div>
                                <div class="add-car fz12 dflex align-center justify-center" v-show="checked.buy_button">选规格</div>
                            </div>
                            <div class="commodity-shop dflex flex-start fz12" v-show="checked.to_shop">
                                <div class="commodity-shop-name">{{item.shop_name}}</div>
                                <div class="commodity-to-shop dflex flex-start align-center"><span>进店</span><img src="../../../assets/img/gostopright.png" alt=""></div>
                            </div>
                        </div> -->
                    </div>
                    <!-- <template v-if="cat_id > 0">
                        分类列表
                    </template> -->
                </div>
            </template>
            <template v-else-if="isListStyle == '2'">
                <div class="commodity-images" :style="[{'font-weight':textStyle},{'background-color':commodityBgColor}]">
                    <swiper :options='swiperOption'>
                        <swiper-slide v-for="(item , index) in goodsList" :key="index">
                            <div class="commodity-slide-link" @click="toGood(item.wId,item.activity)">
                                <div class="commodity-slide-img dflex align-center justify-center" :style="[{'border-radius':`${imgRadius} ${imgRadius} 0 0 `}]"><img error="../../../assets/img/no_picture.gif" v-lazy="item.goods_thumb"></div>
                                <div class="commodity-slide-attr">
                                    <div class="commodity-title fz14" v-show="checked.goods_title">{{item.goods_name}}</div>
                                    <div class="commodity-price-box fz12">
                                        <div class="commodity-price market-price" v-show="checked.market_price && item.market_price">
                                            <span>&yen;</span>    
                                            <span>{{item.market_price}}</span>
                                            <span v-if="item.goods_unit">/{{item.goods_unit}}</span>    
                                        </div>
                                        <div class="commodity-price goods-price" v-show="checked.goods_price">
                                            <span>&yen;</span>    
                                            <span>{{item.goods_price}}</span>
                                            <span v-if="item.goods_unit">/{{item.goods_unit}}</span>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </template>
        </div>
        
        <shoppingInCar ref="shoppingInCar" :isLevitateCar="true" v-if="this.isListStyle == '1' && this.checked.buy_button == true"></shoppingInCar>
        <levitateCar :num="dropCount" v-if="this.isListStyle == '1' && this.checked.buy_button == true"></levitateCar>
    </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import 'swiper/dist/css/swiper.css'
import "../css/style.less"
import {swiper, swiperSlide} from 'vue-awesome-swiper'

const newGoodsLists = () => import('../../component/newGoodsLists/newGoodsLists.vue');
const shoppingInCar = ()=> import("../../shoppingInCar/shoppingInCar.vue")
const levitateCar = ()=> import("../../component/levitateCar.vue")
export default {
    props :{
        data:{
			type: Object,
			default: undefined
        },

    },
    components:{
        swiper, 
        swiperSlide,
        newGoodsLists,
        levitateCar,
        shoppingInCar
    },
    data () {
        return {
            isHtmlPadding:'',
            htmlPadding:'10px 12px',

            goodsList:[],//商品列表
            
            checked:{},

            modelListType:"",//商品来源
            isListStyle:"",//列表样式
            goodsUnit:"",//商品间距
            isImgRadius:"",//图片倒角
            isTextStyle:"",//文本样式
            isImgStyle:"",//图片样式
            commodityBgColor:"",//背景颜色

            imgRadius:'',//图片圆角
            textStyle:'',//文本样式
            imgStyle:'',//图片样式
            
            swiperOption:{
                slidesPerView:3,
                spaceBetween: 8,
                slidesOffsetBefore : 15,
            },

            toggleShow:false,//规格选择切换显示开关
            dropCount:0,//购物车数量
            shoppingShow:false,

            cat_id:0,
            page:1,
            lock:0,
        }
    },
    created(){
        if(this.data){
            this.goodsList=this.data.datalist;//商品列表
            
            this.checked=this.data.checked;
            this.modelListType=this.data.modelListType;//商品来源
            this.isListStyle=this.data.isListStyle;//列表样式
            this.goodsUnit=this.data.goodsUnit;//商品间距
            this.isImgRadius=this.data.isImgRadius;//图片倒角
            this.isTextStyle=this.data.isTextStyle;//文本样式
            this.isImgStyle=this.data.isImgStyle;//图片样式
            this.commodityBgColor=this.data.commodityBgColor;//背景颜色

            if(this.isListStyle == '1' && this.checked.buy_button == true){
                this.shoppingShow = true;
                this.getShoppingCar();
            }
            if(!this.data.datalist){
                this.cat_id = this.data.cat_id;//分类id
                this.$parent.getGoods(this.data.cat_id);
            }
        }
    },
    mounted(){
        const slideWidth = $('.commodity-slide-img').width();
        $('.commodity-slide-img').css({
            height:slideWidth,
        })
    },
    computed:{
    },
    watch:{
        shoppingShow(res){
            if(res){
                setTimeout(()=>{
                    this.$refs.shoppingInCar.setParabola();
                },1000)
            }
        },
        data(res){
            if(this.data){
                this.goodsList=res.datalist;//商品列表
                
                this.checked=res.checked;

                this.modelListType=res.modelListType;//商品来源
                this.isListStyle=res.isListStyle;//列表样式
                this.goodsUnit=res.goodsUnit;//商品间距
                this.isImgRadius=res.isImgRadius;//图片倒角
                this.isTextStyle=res.isTextStyle;//文本样式
                this.isImgStyle=res.isImgStyle;//图片样式
                this.commodityBgColor=res.commodityBgColor;//背景颜色
                
                if(!this.data.datalist){
                    this.cat_id = res.cat_id;//分类id
                    this.getGoods(res.cat_id);
                }
            }
        },
        isHtmlPadding(res){
            if(this.isHtmlPadding == "1"){
                this.htmlPadding = "10px 12px";
            }else{
                this.htmlPadding = "0px";
            }
        },
        isImgRadius(res){
            if(this.isImgRadius == "2"){
                this.imgRadius = "5px";
            }else{
                this.imgRadius = "0px";
            }
        },
        isTextStyle(res){
            if(this.isTextStyle == "2"){
                this.textStyle = "800";
            }else{
                this.textStyle = "400";
            }
        },
        isImgStyle(res){
            if(this.isImgStyle == "1"){
                this.imgStyle = "100px";
            }else{
                this.imgStyle = "75px";
            }
        },
    },
    methods:{
        
        toGood(wid,isActivity){
            if(isActivity[0] == 1) {
                this.$router.push({path: '/groupBuyingGoods', query:{goods: wid}})
            }else {
                this.$router.push({
                    path:'/goods',
                    query:{
                        goods: wid,
                    }
                })                
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
                    if(res.code == 0){
                        this.dropCount = parseInt(res.data.num);
                    }
                }),
            )
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
    },
}
</script>
<style lang="less" scoped>
.commodity-box{
}
.commodity-images{
    background-color: #f2f2f2;
    .commodity-link{
        background-color: #fff;
        padding: 10px;
        >div{
            width: 100%;
        }
        .commodity-img{
            overflow: hidden;
            max-width: 100px;
            min-width: 100px;
            min-height: 100px;
            max-height: 100px;
            margin-right: 10px;
            background-color: #ccc;
            img{
                min-height: 50px;
                display: block;
                width: 100%;
            }
        }
        .commodity-attr{
            width: calc(100% - 110px);
            .commodity-title{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                margin-bottom: 5px;
            }
            .commodity-tag{
                margin-bottom: 5px;
                >div{
                    border-radius: 3px;
                    border-style:solid;
                    border-width: 1px;
                    margin-right: 5px;
                    padding: 0 3px;
                }
                .remake-tag{
                    background-color: #ffb912;
                    border-color: #ffb912;
                    color: #fff;
                }
                .goods-tag{
                    background-color: #fff;
                    border-color: #999;
                    color: #999;
                }
            }
            .commodity-remake{
                margin-bottom: 5px;
                color: #808080;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
            }
            .commodity-price-box{
                margin-bottom: 5px;
                .commodity-price{
                    color: #ee2d2d;
                }
                .commodity-price.market-price{
                    color: #999;
                    text-decoration: line-through;
                }
                .add-car{
                    background-color: #ee2d2d;
                    border-radius: 3px;
                    color:#fff;
                    line-height: 0;
                    padding: 0px 5px;
                }
                .add-car-img{
                    width: 22px;
                    height: 22px;
                    background-color: #ee2d2d;
                    border-radius: 50%;
                    line-height: 0;
                    color:#fff;
                }
            }
            .commodity-shop{
                line-height: 1;
                .commodity-shop-name{
                    margin-right: 10px;
                    color: #808080;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                }
                .commodity-to-shop{
                    color: #424242;
                    span{
                        margin-right: 5px;
                        min-width: 24px;
                    }
                    img{
                        display: block;
                        height: 10px;
                    }
                }
            }
        }
    }
    .commodity-link:first-child{
        margin-top: 0;
    }
    .commodity-link:last-child{
        margin-top: 0;
    }
    .commodity-slide-link{
        .commodity-slide-img{
            min-height: 110px;
            background-color: #e9f2fa;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
            }
        }
        .commodity-slide-attr{
            background-color: #fff;
            padding: 5px;
            .commodity-title{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                margin-bottom: 5px;
                min-height: 38px;
            }
            .commodity-price-box{
                .commodity-price{
                    color: #ee2d2d;
                }
                .commodity-price.market-price{
                    color: #999;
                    text-decoration: line-through;
                }
                .add-car{
                    background-color: #ee2d2d;
                    border-radius: 3px;
                    color:#fff;
                    line-height: 0;
                    padding: 0px 5px;
                }
                .add-car-img{
                    width: 22px;
                    height: 22px;
                    background-color: #ee2d2d;
                    border-radius: 50%;
                    line-height: 0;
                    color:#fff;
                }
            }
        }
    }
}
</style>