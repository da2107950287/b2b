<template>
    <div>
        <div v-if="merchantlist.length > 0">
            <div class="speciaTitle">
                <img src="../../../assets/img/tuijian.png" alt="">
                <span>推荐商家</span>
            </div>
            <div class="specialDiv">
                <businessRecoment v-for="(item,index) in merchantlist" :key="index" :item="item" class="special-li"></businessRecoment>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import $ from "jquery";
import star from './../../goods/star'
import {
  HandleTime,
  datedifference,
} from "../../../assets/js/commonAPI";
import businessRecoment from "../business/businessRecoment.vue"
export default {
    data(){
        return{
            regionID:0,
            merchantlist:[],           //商家推荐列表
        }
    },
    created(){
        let regionID = localStorage.getItem('wapres');
        let region = this.$route.query.region
        if(regionID){
            this.regionID = regionID;
        }else{
            this.regionID = region;
        }
        this.$cacheStorage(
            'merchantList',
            '/?c=merchant&a=recommend',
            'session',
            {
                region_id: this.regionID,
            },
            ((res)=>{
                this.merchantlist = res.data;
            }),
        )
    },
    methods:{
        // 跳转商家
        gomerchant(items){
        this.$router.push({
            path: '/shop',
            query: {
                businessHeadTitle: items.shop_name,
                index: items.seller_id,
                region: this.region
            }
        })
        },
    },
    components:{
        star,
        businessRecoment,
    }
}
</script>
<style lang="less" scoped>
.speciaTitle{
    font-size: 16px;
    color: #ee2d2d;
    margin-left: 12px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    >img{
        width:18px;
        height: 18px;
        margin-right: 5px;
    }
}
.specialDiv{
    border-radius: 15px 15px 0 0;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 10px;
    .special-li{
        border-bottom: 1px solid #d8d8d8;
        margin-bottom: 0;
        margin: 0 12px;
        padding: 20px 0;
    }
    .special-li:last-child{
        border-bottom: 0;
    }
}
</style>

