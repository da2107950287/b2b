<template>
    <div class="wholeBox">
        <div v-if="show == 2">
            <div v-for="(item,index) in auctionList" :key="index" class="auctionLi">
                <div class="auctionList dflex" @click="wholeDetails(item,2)" v-if="item.user_id > 0">
                    <div class="auctionLeft">
                        <img :src="item.goods_img[0]" width="100%" class="auctionImg"/>
                    </div>
                    <div class="auctionRight">
                        <!-- 原本已有标题 -->
                        <!-- <p class="auctionRight-title">{{item.title}}&emsp;&emsp;<span>{{item.goods_number}}/{{item.unit}}</span></p> -->
                        <!-- 暂时不要标题 -->
                        <div class="auctionRight-title fz_16 color_424242">{{item.title}}</div>
                        <div class="auctionRight-number fz_16 color_EE2D2D">{{item.goods_number}}{{item.goods_unit}}</div>
                        <div class="auctionTime fz_14 color_424242">报价时限:<span :class="{'color_999':item.end_time < time/1000 , 'color_EE2D2D' : item.end_time >= time/1000}">{{item.end_time}}</span></div>
                        <div class="auctionTime fz_14 color_424242">交货时间:{{item.received_time}}</div>
                    </div>
                    <div v-if="item.bidding_number != 0" class="autionLabel fz_12"><span class="fz_16">{{(item.bidding_number>99)? '99+' :item.bidding_number}}</span></div>
                </div>
                <div class="auctionList dflex" @click="wholeDetails(item,1)" v-else>
                    <div class="auctionLeft">
                        <img :src="item.goods_img[0]" width="100%" class="auctionImg"/>
                    </div>
                    <div class="auctionRight">
                        <!-- 原本已有标题 -->
                        <!-- <p class="auctionRight-title">{{item.title}}&emsp;&emsp;<span>{{item.goods_number}}/{{item.unit}}</span></p> -->
                        <!-- 暂时不要标题 -->
                        <div class="auctionRight-title fz_16 color_424242">{{item.title}}</div>
                        <div class="auctionRight-number fz_16 color_EE2D2D">{{item.goods_number}}{{item.goods_unit}}</div>
                        <div class="auctionTime fz_14 color_424242">报价时限:<span :class="{'color_999':item.end_time < time/1000 , 'color_EE2D2D' : item.end_time >= time/1000}">{{item.end_time}}</span></div>
                        <div class="auctionTime fz_14 color_424242">交货时间:{{item.received_time}}</div>
                    </div>
                    <div v-if="item.bidding_number != 0" class="autionLabel fz_12"><span class="fz_16">{{(item.bidding_number>99)? '99+' :item.bidding_number}}</span></div>
                </div>
                <div class="wholeButton">
                    <van-button class='button' @click.stop="queryOrder(item)" v-if="item.status == 3">查看订单</van-button>
                    <van-button class='button' @click.stop="wholeDetails(item,2)" v-if="item.user_id > 0">查看详情</van-button>
                    <van-button class='button' @click.stop="wholeDetails(item,1)" v-else>查看详情</van-button>
                    <van-button class='button' @click.stop="wholeAnnul(item)" v-if="item.user_id > 0 && status == 0">撤销</van-button>
                </div>
            </div>
            <div v-if="clock===2" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
            <p class="end-msg">{{endMsg}}</p>

            <template v-if="piteraShow">
                <searchNone :item="'whole'"></searchNone>
            </template>
            <template v-if="specialShow">
                <special ></special>
            </template>
        </div>
        <div v-else-if="show == 1">
            <template v-if="piteraShow">
                <searchNone :item="'whole'"></searchNone>
            </template>
            <template v-if="specialShow">
                <special ></special>
            </template>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {HandleTime,post} from '../../assets/js/commonAPI.js';
    import '../../assets/css/commonstyle.css';
    import $ from 'jquery';
    Vue.prototype.$post = post;

    import searchNone from "./searchNone/searchNone.vue";
    import special from "./recommendComponent/special.vue";
    import vantLoading from '../vantLoading.vue'
    import vloading from '../vloading.vue'

    export default {
        props:['status','auctionList','specialShow','piteraShow',"show","endMsg","clock"],
        data() {
            return {
                // auctionList:[],
                // status:'',
                // clock:1,
                time:new Date().getTime(),
            }
        },
        created(){
            
        },
        filters:{
            receivedTime(date){
                return HandleTime(new Date(Number(date + '000')))
            }
        },
        mounted () {
        },
        methods:{
            //####=>订单
            queryOrder(item){
                this.$router.push({
                    path:'/seeDetails',
                    query:{
                        'sn':item.order_sn
                    }
                });
            },
            //####=>详情
            wholeDetails(item){
                let catid = item.purchase_id;
                this.$router.push({
                    path:'/orderInfo',
                    query:{
                        'catid':catid
                    }
                })
            },
            //####>取消
            wholeAnnul(item){
                this.$parent.$parent.$parent.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=sourcing&a=cancel',{
                    purchase_id:item.purchase_id
                })
                .then((res)=>{
                    this.$parent.$parent.$parent.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            this.$router.go(0);
                            this.$toast(res.msg);
                            break;
                        default:
                            break;
                    }
                })
            },
        },
        watch:{
            status:function(){
                this.status = this.status
            },
            auctionList:function(){
                if(this.auctionList.length>3){
                    this.$emit('specialShow',false);
                }else{
                    this.$emit('specialShow',true);
                }
                
            }
            
        },
        components:{
            special,
            searchNone,
            vantLoading,
            vloading
        }
    }
</script>

<style scoped lang="less">
    .auctionLi{
        margin: 10px 12px;
        background-color: #fff;
        border-radius: 15px;
    }
    .auctionList{
        flex-wrap: nowrap;
        padding: 15px 0;
        position: relative;
        .auctionLeft{
            max-width: 4.69rem;
            min-width: 4.69rem;
            width: 4.69rem;
            height: 4.69rem;
            overflow: hidden;
            border-radius: 5px;
            margin-right: 10px;
            margin-left: 12px;
            .auctionImg{
                display: block;
                width: 100%;
                height: 100%;
    }
    }
    .auctionRight{
            .auctionRight-number{
                margin-top: 3px;
    }
            .auctionTime{
                margin-top: 3px;
    }
    .auctionRight-title{
                max-height: 40px;
                line-height: 20px;
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
                overflow: hidden;
                padding-right: 12px;
                word-break: break-word;
    }
    }
        .autionLabel{
            height: 22px;
            background-color: #FFB912;
            color: #fff;
            padding: 5px 5px 5px 10px;
            border-radius: 15px 0 0 15px;
            margin: auto;
            margin-top: 0;
            margin-right: 0;
        }
    }
    .wholeButton{
        padding-right: 10px;
        padding-bottom: 15px;
        text-align: right;
        border-bottom: 1px solid #eee;
    }
    .wholeButton .button{
        height: 2rem;
        line-height: 2rem;
        border-radius: .3rem;
    }
    .pitera-img{
        margin-top: 30px;
        img{
            display: block;
            width: 5.07rem;
            margin: auto;
        }
        >div{
            margin: 12px auto;
            text-align: center;
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