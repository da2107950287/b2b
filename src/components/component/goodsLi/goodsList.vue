<template>
    <div class="goods-box">
        <div class="goods-box-li dflex" @click="toGoods(item.wId)">
            <div class="goods-img">
                <img :src="item.thumb">
                <div>
                    <div class="close_text_box" v-if="item.shop_close == 0">
                        <div class="close_text close_bg" >店铺关闭</div>
                    </div>
                    <div class="" v-else-if="item.shop_close == 1">
                        <div class="close_text " ></div>
                    </div>
                    <div class="close_text_box" v-else-if="item.shop_close == 2">
                        <div class="close_text close_bg" >店铺打烊</div>
                    </div>
                </div>
            </div>
            <div class="refund_icon">
                <span class="red" v-if="item.activity[0] == 1">抢购</span>
                <span class="yellow" v-else-if="item.activity[0] == 2">团购</span>
            </div>
            <div class="goods-content">
                <div class="goods-title fz_16 color_424242">{{item.goods_name}}</div>
                <div class="goods-tag dflex fz_12">
                    <div class="goods-tag-child active" v-if="item.market_name != '' && item.market_name">{{substr(item.market_name,6)}}</div>
                    <div v-for="(spec,jIndex) in item.tag" :key="jIndex">
                        <div class="goods-tag-child" v-if="item.market_name!='' && jIndex < 2">{{substr(spec,4)}}</div>
                        <div class="goods-tag-child" v-else-if="item.market_name=='' && jIndex < 3">{{substr(spec,4)}}</div>
                    </div>
                </div>
                <div class="goods-list-ramake fz_12 color_808080" v-if="item.remark">{{item.remark}}</div>
                <div class="goods-attr fz_12 color_424242">
                    {{item.attr_value}}
                </div>
                <div class="goods-price dflex">
                    <div class="fz_12 color_EE2D2D before-price">
                        <span>&yen;</span>
                        <span class="fz_16">{{item.goods_price}}</span>
                        <span v-if="item.goods_unit != ''">/{{item.goods_unit}}</span>
                    </div>
                </div>
                <div class="shop-box dflex" @click.stop="goShops(item.seller_id)">
                    <div class="shop-title fz_12 color_808080">{{substr(item.shop_name,12)}}</div>
                    <div class="to-shop fz_12 color_424242 dflex">
                        <div class="to-shop-label">进店</div>
                        <img class="to-shop-img" src="../../../assets/img/gostopright.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="lock===1 && (index - 9)%10 === 0 && (index - 9)/10 === (page-2)" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>  
    </div>
</template>


<script>
import Vue from 'vue'
import "../../../assets/css/commonstyle.css"
import {appFunc} from '../../../assets/js/commonAPI.js'
import vantLoading from '../../vantLoading.vue'
Vue.prototype.$appFunc = appFunc;
export default {
    props: {
        item: Object,
        index: {
            type: Number,
            default: 0
        },
        lock:{
            type: Number,
            default: 0
        },
        page:{
            type: Number,
            default: 1,
        }
    },
    components: {
        vantLoading
    },
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        substr(val,num){
            if(!this.$appFunc.prototype.isEmpty(val)){
                if(val.length>num){
                    val = val.substr(0,num-1) + '...';
                }else{
                    val = val;
                }
                return val;
            }else{
                return '';
            }
        },
        goShops(id) {
            this.$router.push({
                path: "/shop",
                query: {
                    index: id,
                }
            });
        },
        toGoods(id) {
            this.$router.push({
                path: "/goods",
                query: {
                    goods: id,
                }
            });
        },
    },
}
</script>

<style lang="less" scoped>

.goods-box{
    .goods-box-li{
        border-bottom: 1px solid #f2f2f2;
        position: relative;
        margin-bottom: 20px;
        width: 100%;
        padding-bottom: 20px;
        .goods-title{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
        }
        .goods-img{
            max-width: 6.29rem;
            min-width: 6.29rem;
            height: 6.29rem;
            flex:1;
            border-radius: 10px;
            margin-right: 10px;
            overflow: hidden;
            position: relative;
            img{
                display: block;
                width: 100%;
            }
            
            .close_text_box{
                position: absolute;
                height: 24px;
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
        .goods-attr{
            margin-top: 5px;
        }
        .goods-content{
            flex:1;
            position: relative;
        }
        
        .goods-tag{
            flex-wrap: wrap;
            .goods-tag-child{
                width: auto;
                padding: 0 5px;
                height: 16px;
                text-align: center;
                border: 1px solid #FDA341;
                color: #FDA341;
                border-radius: 3px;
                margin-right: 5px;
                margin-top: 5px;
                line-height: 16px;
            }
            .goods-tag-child.active{
                color: #fff;
                background-color: #FDA341;
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
        .goods-price{
            justify-content: flex-start;
            position: absolute;
            bottom:20px;
            .before-price{
                margin: auto 0;
                margin-right: 5px;
            }
            .after-price{
                margin: auto 0;
            }
        }
        .shop-box{
            position: absolute;
            bottom:0;
            .shop-title{
                margin-right: 10px;
                max-width: 75%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
            }
            .to-shop{
                line-height: .64rem;
                min-width: 25%;
                .to-shop-label{
                    margin: auto 0;
                    margin-right: 5px;
                }
                .to-shop-img{
                    display: block;
                    height: 8px;
                    margin: auto 0;
                }
            }
        }
        .add-cart-box{
            position: absolute;
            right: 0;
            bottom: 20px;
            width: 24px;
            height: 24px;
            border-radius: 50px;
            overflow: hidden;
            background-color: #EE2D2D;
        }
        .refund_icon {
            font-size: 12px;
            color: #ffffff;
            overflow: hidden;
            position: absolute;
            left: 0;
            bottom: 3px;        
        }
        .refund_icon .red {
            padding: 1px 3px;
            background: url('../../../assets/img/button-bg.png') repeat;
            -webkit-background-size: auto 100%;
            background-size: auto 100%;
            border-radius: 5px;
            float: left;
            margin-right: 5px;        
        }
        .refund_icon .yellow {
            padding: 1px 3px;
            background: url('../../../assets/img/button-bg-yellow.png') repeat;
            -webkit-background-size: auto 100%;
            background-size: auto 100%;
            border-radius: 5px;   
            float: left;   
        }
    }
}
.goods-box:last-child{
    .goods-box-li{
        margin-bottom: 0;
        border-bottom: 0;
    }
}
.business-loading {
    background-color: #f2f2f2;
    width: 100%;
    padding: 0 12px 20px; 
    margin: -22px 0 20px -12px; 
}
</style>
