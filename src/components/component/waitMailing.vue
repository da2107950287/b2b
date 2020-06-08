<template>
    <div>
        <div v-for="(item,index) in data" :key="index" class="order-box" @click="orderPary(item)">
            <div class="order-title">
                <van-row>
                    <van-col span='12'></van-col>
                    <van-col span='12'>{{item.status}}</van-col>
                </van-row>
            </div>
            <div class="order-info">
                <div class="order-info-title">
                    <p><span>订单号：</span>{{item.order_sn}}</p>
                </div>
                <div class="order-info-img-box">
                    <van-row>
                        <van-col span='8' class="order-info-img">
                            <img :src="item.goods_img"  width="100%"/>
                        </van-col>
                        <van-col span='16' class="order-info-content">
                            
                            {{item.goods_name}}
                        </van-col>
                    </van-row>
                </div>
                <div class="order-info-buttom">
                    共1款商品&nbsp;合计：<span class="order-info-buttom-price">{{item.total_fee}}</span>
                </div>
            </div>
            <div class="order-buttom">
                <a href="javascript:;">{{item.status}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                data:[]
            }
        },
        created(){
            this.$post('/?c=order&a=list',{
                status:99,
                page:1,
                page_size:5
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.data = res.data.list;
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{

        }
    }
</script>

<style scoped>
.order-box{
    border-bottom: 1px solid #eee;
    padding: .6rem 0;
}
/* 订单样式 */
.order-info-title{
    font-size: 14px;
}
.order-info-title span{
    color: #777;
}
.order-info-content{
    font-size: 14px;
    padding: 0 .6rem;
}
.order-info-buttom{
    font-size: 14px;
    text-align: right;
    color: #666;
}
.order-info-buttom span{
    color: #ec5151;
}
.order-buttom{
    text-align: right;
    padding: .6rem 0;
}
.order-buttom a{
    display: inline-block;
    color: #fff;
    font-size: 14px;
    padding: .4rem .6rem;
    border-radius: .4rem;
    background-color: #7AC49F;
}
</style>