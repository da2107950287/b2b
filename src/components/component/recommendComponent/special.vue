<template>
    <div v-if="factoryGoods.length > 0">
        <div class="speciaTitle">
            <img src="../../../assets/img/tuijian.png" alt="">
            <span>推荐商品</span>
        </div>
        <div class="specialDiv">
            <div class="specialRecoommend" >
                <div
                    class="specialbox"
                    v-for="(item,index) in factoryGoods"
                    :key="index"
                    data-collect="false"
                >
                    <div class="specialcontent" @click="goShpping(item)">
                        <div class="dflex">
                            <div class="specialcontent_img">
                                <img :src="item.thumb" class="nongImg">
                            </div>
                            <div class="specialcontentSize">
                                <!-- 名字 -->
                                <p class="noongTitles">{{item.goods_name}}</p>
                                <!-- 标签 -->
                                <div class="noonglianLabel">
                                    <div v-if="item.market_name" class="specialtwocontentStandard">{{substr(item.market_name,6)}}</div>
                                    <div v-for="(spec,jIndex ) in item.tag" :key="jIndex">
                                    <div class="specialtwocontentStandard" v-if="item.market_name!='' && jIndex < 2">{{spec}}</div>
                                    <div class="specialtwocontentStandard" v-else-if="item.market_name=='' && jIndex < 3">{{spec}}</div>
                                    </div>
                                    <div v-if="item.tag.length>0?false:true" class="itemTagDiv">&nbsp;</div>
                                </div>
                                <!-- 价格以及收藏 -->
                                <div class="djust">
                                    <p class="noonglians">¥<span class="noonglians_price">{{item.goods_price}}</span>
                                        <span v-show="item.goods_unit !='' && item.goods_unit !=null">/{{item.goods_unit}}</span>
                                    </p>
                                </div>
                                <!-- 店铺名称 -->
                                <div class="shop" @click.stop="goShop(item.seller_id)">
                                    <div class="shop-name" v-if="item.shop_name != ''">{{item.shop_name}}</div>
                                    <div class="shop-content">
                                        进店
                                        <img src="../../../assets/img/jiantou.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import $ from "jquery";
export default {
    data(){
        return{
            region:'',
            regionID:'',
            factoryGoods:[],
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
            'recommendList',
            '/?c=goods&a=recommend',
            'session',
            {
                region_id: this.regionID,
            },
            ((res)=>{
                console.log(res);
                this.factoryGoods = res.data.list;
            }),
        )
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
        // 进入商品详情
        goShpping(item) {
            this.$router.push({
                path: "/goods",
                query: {
                goods: item.wId
                }
            });
        },
        //进入店铺
        goShop(sellerId) {
            this.$router.push({
                path: '/shop',
                query: {
                    index: sellerId,
                }
            })
        },
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
    >img{
        width:18px;
        height: 18px;
        margin-right: 5px;
    }
}
/* 第一个版块 */
.specialDiv{
  background: #fff;
  margin-top: 10px;
  border-radius: 14px 14px 0px 0px;
}
.specialDiv .specialRecoommend{
  margin:0;
}
.specialDiv .specialRecoommend .specialbox{
  position: relative;
  padding: 20px 15px 0 15px;
}
.specialDiv .specialRecoommend>.specialbox:last-child{
    padding-bottom: 20px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontent_img{
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-right: 10px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontent_img>img{
    width: 80px;
    height: 80px;
    border-radius: 5px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize {
    width: calc(100% - 80px);
    position: relative;
    display: flex;
    flex-direction: column;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .noongTitles{
    margin: 0;
    padding: 0;
    font-size: 14px;
    height: auto;
    color: #424242;
    margin-bottom: 4.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 1;
    text-align:left;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .specialtwocontentStandard{
    font-size: 12px;
    border: 1px solid #999;
    color: #999;
    text-align: center;
    margin-right: 5px;
    border-radius: 5px;
    padding: 3px 7px;
    line-height: 12px;
    height: 12px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .noonglianLabel{
    margin-top: 0;
    display: flex;
    margin-bottom: 4.5px;
    /* flex-wrap: wrap; */
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .djust{
    width: 100%;
    position: absolute;
    bottom: 15px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .shop{
    display: flex;
    line-height: 12px;
    font-size: 12px;
    align-self: stretch;
    color:#424242;
    position: absolute;
    bottom: 0;
    
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .shop .shop-content>img{
    width:5px;
    height: 7px
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .shop .shop-name{
    color: #808080;
    margin-right: 10px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .noonglians{
    margin:0;
    padding:0;
    font-size: .7rem;
    font-size: 12px;
    color: rgba(238,45,45,1);
    font-weight: 400;
    
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .noonglians .noonglians_price{
  font-size:16px;
}

.iconRight{
  text-align: right;
  padding-right: 4px;
}
.no-login-icon-box img{
    display: block;
    margin: auto;
}
</style>


