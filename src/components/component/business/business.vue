<template>
<!-- 商家 单个商家模板组件 -->
    <div class="business-zon" ref="box">
        <div class="business-box dflex">
            <div v-if="store==1" class="business-img" @click="goShops(item.seller_id)">
                <img src="../../../assets/img/no_picture.gif" width="100%" v-if="item.shop_logo == '/images/no_picture.gif' || item.shop_logo == ''" />
                <img :src="item.shop_logo" width="100%" v-else />
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
            <div v-else class="business-img" @click="goShops(item.seller_id)">
                <img src="../../../assets/img/no_picture.gif" width="100%" v-if="item.thumb == '/images/no_picture.gif' || item.thumb == ''" />
                <img :src="item.thumb" width="100%" v-else />
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
            <div class="business-content">
                <div @click="goShops(item.seller_id)">
                    <div v-if="store==1" class="business-goods-title fz_16">{{item.shop_name}}</div>
                    <div v-else class="business-goods-title fz_16">{{item.name}}</div>
                    <div v-if="store==1" class="dflex fz_14 color_EE2D2D">
                        <star :starValue="item.score"></star><span>{{item.score}}</span>
                    </div>
                    <div v-else class="dflex fz_14 color_EE2D2D">
                        <star :starValue="item.rate.score.value"></star><span>{{item.rate.score.value}}</span>
                    </div>
                    <div v-if="store==1" class="business-goods-tag dflex fz_12">
                        <div class="business-tag-child active" v-if="item.market_name != null">{{substr(item.market_name,6)}}</div>
                        <div v-for="(tag,key) in item.label" :key="key">
                            <div class="business-tag-child" v-if="item.market_name!='' && key < 2">{{substr(tag,4)}}</div>
                            <div class="business-tag-child" v-else-if="item.market_name=='' && key < 3">{{substr(tag,4)}}</div>
                        </div>
                    </div>
                    <div v-else class="business-goods-tag dflex fz_12">
                        <div class="business-tag-child active" v-if="item.market_name != null">{{substr(item.market_name,6)}}</div>
                        <div v-for="(tag,key) in item.tag" :key="key">
                            <div class="business-tag-child" v-if="item.market_name!='' && key < 2">{{substr(tag,4)}}</div>
                            <div class="business-tag-child" v-else-if="item.market_name=='' && key < 3">{{substr(tag,4)}}</div>
                        </div>
                    </div>
                </div>
                <div class="recommend-box" v-if="item.goods.length > 0">
                    <div class="recommend-title color_EE2D2D fz_14">推荐商品</div>
                    <div class="recommend-img-box dflex">
                        <div class="recommend-img" v-for="(goods,gIndex) in item.goods" :key="gIndex" @click="toGoods(goods.wId)"><img :src="goods.thumb" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="lock===1 && (index - 9)%10 === 0 && (index - 9)/10 === (page-2)" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
    </div> 
</template>
<script>
import "../../../assets/css/commonstyle.css"
import star from "../../goods/star.vue";
import vantLoading from '../../vantLoading.vue'
export default {
    props: {
        item: Object,
        store: Number,
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
    data(){
        return{
            show: false
        }
    },
    computer(){
        
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
    },
    components:{
        star,
        vantLoading
    }
}
</script>

<style lang="less" scoped>
    .dflex{justify-content: flex-start;}
    .business-box{
        padding: 22px 12px;
        margin-bottom: 10px;
        background-color: #fff;
        position: relative;
        .business-img{
            max-width: 60px;
            min-width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 5px;
            margin-right: 10px;
            flex:1;
            position: relative;
            img{
                width: 100%;
                min-height: 100%;
                display: block;
                background-color: #f2f2f2;
            }
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
        .business-content{
            flex:1;
        }
        .business-goods-title{
            color: #212121;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
        }
        .business-goods-tag{
            flex-wrap: wrap;
            .business-tag-child{
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
            .business-tag-child.active{
                color: #fff;
                background-color: #FDA341;
            }
        }
        .recommend-box{
            margin-top: 15px;
            .recommend-title{
                margin-bottom: 10px;
            }
            .recommend-img-box{
                .recommend-img{
                    width: 60px;
                    height: 60px;
                    overflow: hidden;
                    border-radius: 5px;
                    margin-right: 10px;
                    img{
                        min-height: 100%;
                        width: 100%;
                        display: block;
                        background-color: #f2f2f2;
                    }
                }
                .recommend-img:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .business-loading {
        margin-top: -15px;
        padding-bottom: 20px;       
    }
</style>
