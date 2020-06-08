<template>
    <div class="group-row-box marketsClass">
       <!-- 顶部 -->
        <navbar type="left" title="选择市场" @clickleft="onClickLeft"></navbar>
        <div class="type-list-box">
            <div class="dflex type-list-ul">
                <div class="type-list-li" v-for="(item,index) in typeList" :key="index" @click="changeType(item.id,index)">
                    <div class="dflex" v-if="activeKey == index">
                        <img class="type-list-li-img" :src="item.iconActive" alt="">
                        <div class="type-list-li-text fz_16 color_EE2D2D">{{item.text}}</div>
                    </div>
                    <div class="dflex" v-else>
                        <img class="type-list-li-img" :src="item.icon" alt="" >
                        <div class="type-list-li-text fz_14">{{item.text}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="markets-list-box">
            <div class="markets-list-ul dflex" v-if="marketsList.length > 0">
                <div class="markets-list-li dflex" v-for="(mItem,mIndex) in marketsList" :key="mIndex" @click="checkMarkets(mItem)">
                    <div class="markets-list-name fz_14 dflex">
                        <span>{{mItem.market_name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import $ from "jquery";
// import {post,appFunc} from '../../assets/js/commonAPI.js';
import Vue from 'vue';
import {Badge, BadgeGroup,RadioGroup, Radio} from 'vant';
// import '../../assets/css/resetiu.css'

import gongchang from '../../assets/img/gongchang.png'
import gongchang1 from '../../assets/img/gongchang2.png'
import jidi from '../../assets/img/jidi.png'
import jidi1 from '../../assets/img/jidi2.png'
import shichang from '../../assets/img/shichang.png'
import shichang1 from '../../assets/img/shichang2.png'
import distributor from '../../assets/img/distributor.png'
import distributor1 from '../../assets/img/distributor2.png'
// Vue.prototype.$post = post;
// Vue.prototype.$appFunc = appFunc;

import navbar from '../navbar/nav.vue'

export default {
    props:['chose'],
    data(){
        return {
            activeKey: 0,       //默认第一个激活
            typeList:[{         //来源市场类别
                icon:gongchang,
                iconActive:gongchang1,
                text:'工厂',
                id:'4',
            },{
                icon:jidi,
                iconActive:jidi1,
                text:'基地',
                id:'3',
            },{
                icon:shichang,
                iconActive:shichang1,
                text:'市场',
                id:'2',
            },{
                icon:distributor,
                iconActive:distributor1,
                text:'配送商',
                id:'5',
            }],
            marketsList:[],
            region_id:'',
            city_code:'',
        };

    },
    created() {
        this.city_code = localStorage.getItem('city_code');
        let marketList = sessionStorage.getItem('factoryMarket');
        let region = localStorage.getItem('wapres');
        if(this.$appFunc.prototype.isEmpty(region)){
            this.region_id = 322;
        }else{
            this.region_id = region;
        }

        
        if(!this.$appFunc.prototype.isEmpty(marketList)){
            this.marketsList = JSON.parse(marketList);
        }else{
            this.$post('/?a=marketList',{
                region_id:this.region_id,
                region_sn:this.city_code,
                type:4,
                limit:0,
            }).then((res)=>{
                if(res.code == 0){
                    this.marketsList = res.data.list;
                    sessionStorage.setItem('factoryMarket',JSON.stringify(res.data.list));
                }
            });
        } 
    },
    mounted(){
    },
    methods:{
        onClickLeft(){
            this.$emit('onClickClose')
        },
        checkMarkets(item){
            let data = {
                type : this.typeList[this.activeKey],
                item : item,
            }
            this.$emit('onClickClose',data)
        },
        changeType(id,key){
            let marketList = '';
            if(id == 4){
                marketList = sessionStorage.getItem('factoryMarket');
            }else if(id == 3){
                marketList = sessionStorage.getItem('baseMarket');
            }else if(id == 2){
                marketList = sessionStorage.getItem('bazaarMarket');
            }else if(id == 5) {
                marketList = sessionStorage.getItem('distributorMarket');
            }
            this.$emit('listLoadingShow')
            if(!this.$appFunc.prototype.isEmpty(marketList)){
                this.$emit('listLoadingHide')
                this.marketsList = JSON.parse(marketList);
            }else{
                this.$post('/?a=marketList',{
                    region_id:this.region_id,
                    region_sn:this.city_code,
                    type:id,
                    limit:0,
                }).then((res)=>{
                    this.$emit('listLoadingHide')
                    if(res.code == 0){
                        if(id == 4){
                            sessionStorage.setItem('factoryMarket',JSON.stringify(res.data.list));
                        }else if(id == 3){
                            sessionStorage.setItem('baseMarket',JSON.stringify(res.data.list));
                        }else if(id == 2){
                            sessionStorage.setItem('bazaarMarket',JSON.stringify(res.data.list));
                        }else if(id == 5) {
                            sessionStorage.setItem('distributorMarket',JSON.stringify(res.data.list));
                        }
                        this.marketsList = res.data.list;
                    }
                });
            }
            this.activeKey = key;
        },
    },
    components:{
        navbar,
    }
}
</script>
<style scoped lang="less">

    .goodsBox{background-color: #f2f2f2;}
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;line-height: 12px;}
    .fz_14{font-size: 14px;line-height: 14px;}
    .fz_16{font-size: 16px;line-height: 16px;}
    .dflex{display: flex;}
    .van-nav-bar{border-bottom: 1px solid #f2f2f2;}
    .van-nav-bar .van-icon{color: #232323;}
    .van-button{border: none;}

    .type-list-box{
        overflow-x: auto;
        .type-list-ul{
            min-width:350px;
            height: 40px;
            background-color: #fff;
            .type-list-li{
                flex: 1;
                margin: auto;
                justify-content:space-between;
                .type-list-li-img{
                    margin: auto 0;
                    height: 17px;
                    display: block;
                    margin-left: auto;
                    margin-right: 10px;
                }
                .type-list-li-text{
                    margin: auto 0;
                    margin-right: auto;
                }
            }
        }
    }

    .markets-list-box{
        margin-top: 10px;
        background-color: #fff;
        .markets-list-ul{
            flex-direction: row;
            padding: 5px 12px;
            flex-wrap: wrap;
            .markets-list-li{
                width: calc(100%/3 - 10px / 3);
                margin-right: 5px;
                height: 35px;
                overflow: hidden;
                margin-bottom: 5px;
                margin-top: 5px;
                .markets-list-name{
                    border: 1px solid #7f7f7f;
                    border-radius: 5px;
                    width: calc(100% - 12px);
                    height: calc(100% - 2px);
                    padding: 0 5px;
                    span{
                        margin: auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                        white-space: nowrap;
                        text-align: center;
                    }
                }
            }
            .markets-list-li:nth-child(3n){
                margin-right: 0;
            }
        }
    }
</style>


