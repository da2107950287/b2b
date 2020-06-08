<template>
    <div>
        <div class="goods-list">
            <div class="goods-list-box dflex" @click="toGood(wid)">
                <div :id="'goods-list-img-'+wid+'-'+activeKey" :class="[{'parent-index': parentPath=='index'},'goods-list-img']" :style="[{'border-radius':imgRadius},{'max-width':imgStyle},{'min-width':imgStyle},{'max-height':imgStyle},{'min-height':imgStyle}]">
                    <img v-if="imgThumb" :error="noPicture" v-lazy="imgThumb">
                    <img v-else-if="img" :error="noPicture" v-lazy="img">
                    <img v-else src="../../../assets/img/no_picture.gif" alt="">  
                </div>
                <div class="refund_icon">
                    <span class="red" v-if="isActivity[0] == 1">抢购</span>
                    <span class="yellow" v-else-if="isActivity[0] == 2">团购</span>
                    <span class="yellow" v-if="isPromote == 1">限时</span>
                </div>
                <div class="goods-list-right">
                    <div :class="[{'parent-index-title': parentPath=='index'},'goods-list-title fz_14 color_424242']" v-show="checked.goods_title" :style="{'font-weight':textStyle}">{{name}}</div>
                    <div class="goods-tag dflex fz_12" v-show="checked.goods_tag">
                        <div class="goods-tag-child active" v-if="marketName != null && marketName != ''">{{substr(marketName,6)}}</div>
                        <div v-for="(jItem,jIndex) in tag" :key="jIndex">
                            <div class="goods-tag-child" v-if="marketName!='' && jIndex < 2">{{substr(jItem,4)}}</div>
                            <div class="goods-tag-child" v-else-if="marketName=='' && jIndex < 3">{{substr(jItem,4)}}</div>
                        </div>
                    </div>
                    <div class="goods-list-ramake fz_12 color_808080" v-if="remark && checked.goods_remake">{{remark}}</div>
                    <div class="goods-list-price-box dflex" v-show="checked.goods_price">
                        <div class="goods-list-price color_EE2D2D dflex" >
                            <div class="fz_12">&yen;</div>
                            <div class="fz_16" v-if="isActivity[0] == 2 && goods_price !=null">{{goods_price}}</div>
                            <div class="fz_16" v-else-if="goods_price != ''">{{goods_price}}</div>
                            <div class="fz_16" v-else>{{price}}</div>
                            <div class="fz_12" >
                                <span v-if="unit || goodsUnit">/{{unit || goodsUnit}}</span>
                            </div>
                        </div>
                        <div v-if="isActivity[0] == 2 && checked.buy_button" class="addShop">
                            <div class="add-attr-btn flex fz_12 " @click.stop="toGood(wid)">
                                <div class="add-attr-text">详情</div>
                            </div>
                        </div>
                        <div v-else class="addShop" v-show="checked.buy_button">
                            <div class="add-shop-img" v-if="priceType == 1" @click.stop="showCart($event,spec,moq,wid,activeKey,item)">
                                <img src="../../../assets/img/cart.png" alt="">
                            </div>
                            <div class="add-shop-img" v-else-if="spec.length==1" @click.stop="showCart($event,spec[0].spec,moq,wid,activeKey,item)">
                                <img src="../../../assets/img/cart.png" alt="">
                            </div>
                            <div class="add-attr-btn flex fz_12 " v-else-if="spec.length>1" @click.stop="attrToggle(i)">
                                <div class="add-attr-text" v-if="!attrBtnShow">选规格</div>
                                <div class="add-attr-text" v-else>收起</div>
                            </div>
                            <div class="add-shop-img" v-else @click.stop="showCart($event,spec,moq,wid,activeKey,item)">
                                <img src="../../../assets/img/cart.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="goods-list-store-box dflex" v-if="sid && checked.to_shop" v-show="!attrBtnShow" @click.stop="toShop(sid)">
                        <div class="goods-list-store-name fz_12 color_808080">{{shopName}}</div>
                        <div class="goods-list-store-link fz_12 color_424242 dflex">
                            <div class="store-link-label">进店</div>
                            <img class="store-link-img" src="../../../assets/img/gostopright.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[{'attrShow':attrBtnShow},'toggle-box','attrShow-box'+i]" v-show="attrBtnShow && checked.buy_button">
                <div class='goods-attr-box' v-if="spec.length>0">
                    <div class="goods-attr-li" v-for="(specItem,specIndex) in spec" :key="specIndex" >
                        <div class="goods-attr-name fz_12 color_424242">{{specItem.attr_value}}</div>
                        <div class="goods-attr-price-box dflex" @click.stop="showCart($event,specItem.spec,moq,wid,activeKey,item)">
                            <div class="goods-attr-price dflex color_EE2D2D">
                                <div class="fz_12">&yen;</div>
                                <div class="fz_16">{{specItem.product_price}}</div>
                                <div class="fz_16" v-if="specItem.unit">/{{specItem.unit}}</div>
                            </div>
                            <div class="add-shop-img">
                                <img src="../../../assets/img/cart.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import "../../../assets/css/commonstyle.css";
import noPicture from "../../../assets/img/no_picture.gif";

export default {
	props:{
        item:{
            type : Object,//
            default:{},
        },
		marketName: {
            type: String, //来源
            default: ''
		},
		tag: {
			type: Array, //商品标签
            default: []
		},
		name: {
			type: String, //商品名称
            default: []
		},
		priceType: {
			type: String, //规格类型 1 阶梯 ；2 规格
            default: ''
		},
		remark: {
			type: String, //描述
            default: ''
		},
		shopName: {
			type: String, //店铺名称
            default: ''
		},
		sid: {
			type: String, //商家ID
            default: ''
		},
		wid: {
			type: String, //商品id
            default: ''
		},
		goods_price: {
			type: String, //团购商品金额
            default: ''
		},
		price_str: {
			type: String, //商品金额
            default: ''
		},
		price: {
			type: String, //商品金额
            default: ''
		},
		imgThumb: {
			type: String, //商品缩略图
            default: ''
		},
		img: {
			type: String, //商品图
            default: ''
		},
		unit: {
			type: String, //单位
            default: ''
		},
		goodsUnit: {
			type: String, //单位
            default: ''
		},
		moq: {
			type: String, //起订量
            default: '1'
		},
		i: {
            type: Number, //key值
            default: 0,
		},
		activeKey: {
            type: String, //商家分类选中key值
            default: "g",
		},
		toggleShow: {
			type: Boolean, //
            default: false,
        },
		spec: {
			type: Array, //
            default: ()=>{
                return []
            },
        },
        parentPath:{
            type: String, //来源页面
            default: 'wholesale'
        },
        //是否是团购商品  1-是
        isActivity:{
            type: Array,
            default: []
        },
        //是否是限时抢购商品 1-是
        isPromote: {
            type: Number,
            default: 0
        },
        imgRadius:{
            type : String,//
            default:"5px",
        },
        imgStyle:{
            type : String,//
            default:"100px",
        },
        textStyle:{
            type : String,//
            default:"normal",
        },
        checked:{
            type : Object,//
            default:()=>{
                return{
                    buy_button: true,
                    goods_price: true,
                    goods_remake: true,
                    goods_tag: true,
                    goods_title: true,
                    market_price: "",
                    to_shop: true
                }
            },
        },
    },
    data(){
        return{
            attrBtnShow:false,
            noPicture:noPicture,
        }
    },
    components:{
    },
    created(){
        
    },
    methods:{
        attrToggle(i){
            if(this.attrBtnShow){
                this.$emit('toggleBtn');
                console.log(this.toggleShow);
                this.attrBtnShow = false;
                /* $('.attrShow-box'+i).css({
                    'height': 0
                }) */
            }else{
                this.$emit('toggleBtn');
                this.attrBtnShow = true;
                /* $('.toggle-box').css({
                    'height':0
                })
                $('.attrShow-box'+i).css({
                    'height': (this.spec.length * 48) + (this.spec.length-1) * 13 + 30
                }) */
            }
        },
        //进入团购商品详情页
        toGroupBuying(wid){
            //商品, 相关判断
            localStorage.setItem('goods_about_status', JSON.stringify({
                activity_id: '',
                minimumNumber: '',
                value: 1,
                goods_name: this.name,
                goods_attr: this.specItem[0].attr_value,
                price: this.goods_price,
                sellerIds: this.sid,
                shop_name: this.shopName,
                goods_thumb: this.imgThumb || this.img,
            }));
            this.$router.push({
                path: '/GrouyBuyingConfirmAnOrder'
            });
            // this.$router.push({path: '/groupBuyingGoods', query:{goods: wid}})
        },
        substr(val,num){
            if(val.length>num){
                val = val.substr(0,num-1) + '...';
            }else{
                val = val;
            }
            return val;
        },
        //跳转商家
        toShop(sid){
            console.log(sid);
            this.$router.push({
                path:'/shop',
                query:{
                    index: sid,
                }
            })
        },
        //跳转商品
        toGood(wid){
            if(this.$parent.$el.className == 'wholesale-dom'){
                this.$parent.getTop();
            }else{
                sessionStorage.setItem('scrollTop',window.scrollY);
            }
            if(this.isActivity[0] == 2) {
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
        //添加购物车
        showCart(event,spec,moq,wid,key,res){
            this.$emit('showCart',{event,spec,moq,wid,key,res});
        }
    },
}
</script>

<style lang="less" scoped>
.goods-list{
    .add-shop-img{
        width: 22px;
        overflow: hidden;
        img{
            display: block;
            width: 100%;
        }
    }
    .toggle-box{
        // height: 0;
        overflow: hidden;
        transition: height 1s linear;
        .goods-attr-box{
            background-color: #fafafa;
            margin-top: 15px;
            margin-left: 10px;
            padding: 0;
            border-radius: 5px 0 0 5px;
            padding:15px 12px 15px 10px;
            overflow: hidden;
            .goods-attr-li{
                margin-bottom: 13px;
                .goods-attr-name{
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                }
                .goods-attr-price-box{
                    justify-content:space-between;
                    .goods-attr-price{
                        align-items: baseline;
                    }
                }
            }
            .goods-attr-li:last-child{
                margin-bottom: 0;
            }
        }
    }
    .toggle-box.attrShow{
        // height:auto;
    }
    
}
.goods-list-box{
    padding: 20px 12px 0;
    position: relative;
    .goods-list-img{
        /* max-width: 74px;
        min-width: 74px;
        height: 74px; */
        max-width: 65px;
        min-width: 65px;
        height: 65px;
        overflow: hidden;
        border-radius: 5px;
        margin-right: 5px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .refund_icon {
        font-size: 12px;
        color: #ffffff;
        overflow: hidden;
        position: absolute;
        left: 12px;
        top: 20px;          
    }
    .refund_icon .red {
        padding: 1px 3px;
        background-color: #ee2d2d;
        // background: url('../../../assets/img/button-bg.png') repeat;
        // -webkit-background-size: auto 100%;
        // background-size: auto 100%;
        border-radius: 5px;
        float: left;
        margin-right: 5px;        
        overflow: hidden;
    }
    .refund_icon .yellow {
        padding: 1px 3px;
        background-color: #FDA341;
        // background: url('../../../assets/img/button-bg-yellow.png') repeat;
        // -webkit-background-size: auto 100%;
        // background-size: auto 100%;
        border-radius: 5px;   
        float: left;   
        overflow: hidden;
    }
    .goods-list-img.parent-index{
        max-width: 100px;
        min-width: 100px;
        height: 100px;
        margin-right: 10px;
    }
    .goods-list-right{
        width: calc(100% - 70px);
        // min-height: 120px;
        position: relative;
        .goods-list-title{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            margin-bottom: 5px;
        }
        .goods-list-title.parent-index-title{
            -webkit-line-clamp: 2;
        }
        .goods-tag{
            flex-wrap: wrap;
            margin-bottom: 5px;
            .goods-tag-child{
                width: auto;
                padding: 2px 3px;
                text-align: center;
                border: 1px solid #999;
                color: #999;
                border-radius: 3px;
                margin-right: 5px;
            }
            .goods-tag-child.active{
                color: #fff;
                background-color: #FDA341;
                border: 1px solid #FDA341;
            }
        }
        .goods-list-ramake{
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            line-height: normal;
        }
        .goods-list-price-box{
            justify-content: space-between;
            margin-top: 15px;
            .goods-list-price{
                justify-content: flex-start;
                align-items: baseline;
                flex-wrap: wrap;
            }
            .addShop{
                .add-attr-btn{
                    justify-content: center;
                    .add-attr-text{
                        background-color: #DD2E2E;
                        color: #fff;
                        border-radius: 5px;
                        padding: 2px 5px;
                        text-align: center;
                        min-width: 36px;
                    }
                }
            }
        }
        .goods-list-store-box{
            margin-top: 10px;
            margin-bottom: 10px;
            .goods-list-store-name{
                margin-right: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
            }
            .goods-list-store-link{
                line-height: .64rem;
                justify-content: flex-end;
                .store-link-label{
                    margin: auto 0;
                    margin-right: 5px;
                    min-width: 30px;
                    text-align: right;
                }
                .store-link-img{
                    display: block;
                    height: 8px;
                    margin: auto 0;
                }
            }
        }
        .goods-list-store-box.hidden{
            opacity: 0;
        }
    }
    
}
</style>