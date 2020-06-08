<template>
    <div>
        <!-- 属性框 -->
        <div class="goods-order-box">
            <!-- 单属性 -->
            <div class="goods-order-spe" v-show="show == 1">
                <div class="dflex">
                    <div v-for="(item,index) in goodsOrderTwo.values" :key="index">
                        <div class="goods-order-spe-li dflex" v-if="index<2">
                            <div class="goods-order-spe-label color_424242 fz_14">{{item.label}} <!-- {{parseFloat(item.format)}}{{measure_unit}}/{{item.unit}} --></div>
                            <div class="goods-order-spe-price fz_14">
                                <span class="color_EE2D2D"><span class="fz_12">&yen;</span>{{item.attr_price}}</span>
                                <span class="color_424242">/{{item.unit}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="goodsOrderTwo.values.length>2" class="goods-order-spe-more">
                        <div class="goods-order-spe-li color_424242 fz_14 dflex">
                            <span>更多</span>
                            <div class="fa fa-angle-right checkMore" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="goods-order-spe" v-show="show == 2">
                <div class="dflex">
                    <div v-for="(item,index) in goodsOrderOne.values" :key="index" class="goods-order-spe-li">
                        <div class="goods-order-spe-label">{{item.label}}</div>
                        <div class="goods-order-spe-price"><span>{{item.attr_price}}</span><span>/{{item.unit}}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $ from "jquery";
    import {post,HandleData} from '../../assets/js/commonAPI.js';
    Vue.prototype.$post = post
    export default {
        props:['data','measure_unit'],
        data() {
            return {
                goodsOrderTwo:[],               //单属性
                goodsOrderOne:[],               //多属性
                show:0,
            }
        },
        created(){
            let goodsOrderName = [];
            console.log(this.data);
            for(let name in this.data){
                goodsOrderName.push(name);
            }
            if(goodsOrderName.length > 1){
                this.show = 2;
                this.goodsOrderOne = HandleData(this.data);
            }else if(goodsOrderName.length <= 1){
                this.show = 1;
                this.goodsOrderTwo = this.data[goodsOrderName[0]];
            }
        },
        methods:{
        },
        mounted(){
        },
        watch:{
        }
    }
</script>

<style scoped lang="less">
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: .64rem;line-height: .64rem;}
    .fz_14{font-size: .75rem;line-height: .75rem;}
    .fz_16{font-size: .85rem;line-height: .85rem;}
    .fz_18{font-size: .96rem;line-height: .96rem;}
    .fw_bolder{font-weight: bolder;}
    .van-nav-bar{border-bottom: 1px solid #f2f2f2;}
    .van-nav-bar .van-icon{color: #232323;}
    .van-button{border: none;}
    .dflex{display: flex;justify-content: flex-start;}

    .goods-order-box{
        .goods-order-spe{
            .goods-order-spe-li{
                text-align: center;
                margin-right: 5px;
                height: 58px;
                flex-direction: column;
                border-radius: 5px;
                background-color: #f2f2f2;
                max-width: 116px;
                min-width: 116px;
                overflow: hidden;
                .goods-order-spe-label{
                    margin: auto;
                    margin-bottom: 0;
                    margin-left: 5px;
                    margin-right: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                    white-space: nowrap;
                    color: #424242;
                    line-height: normal;
                }
                .goods-order-spe-price{
                    margin: auto;
                    margin-top: 0;
                    margin-left: 0;
                    margin-right: 0;
                    text-align: center;
                    line-height: normal;
                }
            }
            .goods-order-spe-more{
                .goods-order-spe-li{
                    padding: 0;
                    max-width: 67px;
                    min-width: 67px;
                    height: 58px;
                    margin-right: 0;
                    flex-direction: unset;
                    span{
                        margin: auto;
                        margin-right: 0;
                    }
                    .checkMore{
                        margin: auto;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>