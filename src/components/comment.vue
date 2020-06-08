<template>
    <div class="comment">
        <!-- 评论标题 -->
        <navbar class="comment-bar" type="left" :title="title" @clickleft="goPreviousPage"></navbar>
        <!-- 评论切换栏 -->

        <div class="comment-conent">
            <van-tabs v-model="active" @change="clickButton" title-active-color="#EE2D2D">
                <van-tab title="全部">
                    <order-all v-if="active === 0" :status='99' @loadingBoxShow="loadingBoxShow"></order-all>
                </van-tab>
                <van-tab title="待付款">
                    <wait-pay-order v-if="active === 1" :status='100'  @loadingBoxShow="loadingBoxShow"></wait-pay-order>
                </van-tab>
                <van-tab title="待发货">
                    <order-deliver-goods v-if="active === 2" :status='101' @loadingBoxShow="loadingBoxShow"></order-deliver-goods>
                </van-tab>
                <van-tab title="待收货">
                    <order-received-goods v-if="active === 3" :status='103' @loadingBoxShow="loadingBoxShow"></order-received-goods>
                </van-tab>
                <van-tab title="已完成">
                    <order-done v-if="active === 4" :status='102'></order-done>
                </van-tab>
            </van-tabs>
        </div>
        
        <div class="vantLoading" v-if="loadingShow">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
        
</template>

<script>
    const waitPayOrder = ()=>import("./order/waitPayOrder.vue");//待付款组件

    //全部订单
    const orderAll = () => import('./order/orderAll.vue');
    //待发货
    const orderDeliverGoods = () => import('./order/orderDeliverGoods.vue');
    //待收货
    const orderReceivedGoods = () => import('./order/orderReceivedGoods.vue');
    //已完成
    const orderDone = () => import('./order/orderDone.vue');     

    const navbar = ()=>import("./navbar/nav.vue");
    const vloading = ()=>import("./vloading.vue");

    export default {
        data() {
            return {
                active: 0,
                title:'我的订单',
                isEvaluate:'',
                loadingShow:false,
            }
        },
        created(){
            let _this = this;
            this.active = this.$route.query.id;
        },
        methods:{
            goPreviousPage(){
                this.$router.push({
                    path:'/personal'
                })
            },
            clickButton(){
                let _this = this;
                this.$router.push({
                    query:{id:this.active}
                })
            },
            loadingBoxShow(status){
                this.loadingShow = status;
            },
        },
        components:{
            orderAll,
            orderDeliverGoods,
            orderReceivedGoods,
            orderDone,
            waitPayOrder,
            navbar,
            vloading,
        },
    }
</script>

<style scoped>
    .comment-bar{
        border-bottom: 1px solid #eee;
        height: 2.35rem;
    }
    .vantLoading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        z-index: 1000;
    }    
</style>

<style lang="less" scoped>
    .van-dialog{
        color:#ccc;
        .van-dialog__header{
            color:#424242;
        }
    }
    .van-tab--active{
        color: #EE2D2D;
        font-size: 16px;
    }
    .van-dialog .van-button.van-dialog__confirm{
        color: #EE2D2D;
    }
</style>