<template>
    <div>
        <div class="goods-box dflex" @click="toGoods(item.wId)">
            <div class="goods-img" v-if="item.goods_thumb"><img :src="item.goods_thumb"></div>
            <div class="goods-img" v-else><img :src="item.thumb"></div>
            <div class="goods-content">
                <div class="goods-title fz_16 color_424242">{{item.goods_name}}</div>
                <div class="goods-tag dflex fz_12">
                    <div class="goods-tag-child active" v-if="item.market_name != null && item.market_name != ''">{{substr(item.market_name,6)}}</div>
                    <div v-for="(spec,jIndex) in item.tag" :key="jIndex">
                        <div class="goods-tag-child" v-if="item.market_name!='' && jIndex < 2">{{substr(spec,4)}}</div>
                        <div class="goods-tag-child" v-else-if="item.market_name=='' && jIndex < 3">{{substr(spec,4)}}</div>
                    </div>
                </div>
                <div class="goods-attr fz_12 color_424242">
                    {{item.attr_value}}
                </div>
                <div class="goods-price-box dflex">
                    <div class="goods-price dflex">
                        <div class="fz_12 color_EE2D2D before-price">
                            <span>&yen;</span>
                            <span class="fz_16">{{item.product_price}}</span>
                            <span v-if="item.unit != ''">/{{item.unit}}</span>
                        </div>
                        <div class="fz_12 color_808080 after-price" v-if="type == 'recommendGoods'">
                            <span>&yen;</span>
                            <span >{{(item.market_price).toFixed(2)}}</span>
                            <span v-if="item.unit != ''">/{{item.unit}}</span>
                        </div>
                    </div>
                    <div class="add-cart-box dflex btnCart" @click.stop="showCart($event,item)" v-if="is_index == 0">
                        <img src="../../../assets/img/add.png" alt="">
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
import "../../../assets/css/commonstyle.css"
import vantLoading from '../../vantLoading.vue'

export default {
    props:{
        item: Object,
        type: String,
        is_index: {
            type: Number,
            default: 0
        },
        page:{
            type:Number,
            default:2,
        },
        lock:{
            type:Number,
            default:0,
        },
        index:{
            type:Number,
        }
    },
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        substr(val,num){
            if(val.length>num){
                val = val.substr(0,num-1) + '...';
            }else{
                val = val;
            }
            return val;
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

        showCart(event,item){
            this.$emit('showCart',{event,item});
        }
    },
    components:{
        vantLoading
    }
}
</script>

<style lang="less" scoped>


.goods-box{
    border-bottom: 1px solid #f2f2f2;
    position: relative;
    margin-bottom: 20px;
    width: 100%;
    padding-bottom: 40px;
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
        img{
            display: block;
            width: 100%;
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
        }
        .goods-tag-child.active{
            color: #fff;
            background-color: #FDA341;
        }
    }
    .goods-price-box{
        justify-content: space-between;
        position: absolute;
        bottom:0;
        width: 100%;
        .goods-price{
            justify-content: flex-start;
            flex-wrap: wrap;
            .before-price{
                margin: auto 0;
                margin-right: 5px;
            }
            .after-price{
                margin: auto 0;
                text-decoration:line-through;
            }
        }   
        .add-cart-box{
            min-width: 24px;
            max-width: 24px;
            height: 24px;
            overflow: hidden;
            margin: auto;
            margin-right: 0;
            img{
                width: 100%;
                display: block;
            }
        }
    }
    .shop-box{
        position: absolute;
        bottom:-20px;
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
}
.goods-box:last-child{
    margin-bottom: 0;
    border-bottom: 0;
}
</style>
