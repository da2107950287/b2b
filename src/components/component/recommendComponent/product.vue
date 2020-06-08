<template>
    <div class="specialRecoommends">
        <div class="specialbox" v-for="(item,index) in speciallist" :key="index">
            <div class="specialcontent">
                <img :src="item.goods_thumb">
                <p class="itemtitle retract">{{item.cat_name}}</p>
                <p class="specialprice retract">
                <!-- <img src="../../assets/img/icxon.png" class="without"> -->
                <!-- <svgicon name="label_3x" class="without"></svgicon> -->
                <img src="../../../assets/img/label_3x.png" alt="" class="without">
                <!-- <svgicon name="label_3x" class="without"></svgicon> -->
                ¥{{item.price}}
                <span v-show="item.measure_unit">/{{item.measure_unit}}</span>
                </p>
                <van-collapse v-model="activeNames" :border="false" class="specialtwo">
                <van-collapse-item :name="index" :border="false">
                    <div slot="title" class="specialtwoTitle" id="special">
                    <span>最低价</span>
                    <span>已溯源</span>
                    <span>放心购</span>
                    </div>
                    <div
                    class="specialtwocontent"
                    v-for="(it,iIndex) in item.seller"
                    :key="iIndex"
                    @click="goShops(it.shop_name,it.ru_id)"
                    >
                    <van-row class="specialtwocontent_firsttag">
                        <van-col span="15" class="specialtwocontentTitle">{{it.shop_name}}</van-col>
                        <van-col span="7">
                        <star :starValue="it.score"></star>
                        </van-col>
                        <van-col span="2" class="scoreVal">{{it.score}}</van-col>
                    </van-row>
                        <div v-show="it.label.length?true:false" class="specialtag dflex">
                        <div class="special_tag_child" v-for="(specs,jIndex ) in it.label" :key="jIndex">{{specs}}</div>
                        </div>
                        <van-row class="specialtwotag">
                        <van-col
                            span="8"
                            class="specialtwocontentPrice"
                        >¥{{it.min_price}}-{{it.max_price}}<span v-show="item.measure_unit">/{{item.measure_unit}}</span></van-col>
                        <van-col span="16">
                            <div class="dflex">
                            <div class="special_twotag_child" v-for="(spec,jIndex ) in it.spec" :key="jIndex">{{spec}}</div>
                            </div>
                            <!-- <van-tag
                            plain
                            round
                            class="specialtwocontentStandard"
                            v-for="(spec,jIndex ) in it.spec"
                            :key="jIndex"
                            >{{spec}}</van-tag> -->
                        </van-col>
                        </van-row>
                    </div>
                </van-collapse-item>
                </van-collapse>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import $ from "jquery";
import {
  post,
  setPOST,
  HandleTime,
  datedifference,
  appFunc
} from "../../assets/js/commonAPI.js";
Vue.prototype.$post = post;
Vue.prototype.$setPOST = setPOST;
Vue.prototype.$appFunc = appFunc;
export default {
    props:["speciallist"],
    data(){
        return{
            activeNames: ["1", 0],
        }
    },
    methods:{
        goShops(title, id) {
        // localStorage.setItem("merchantsLogo", this.goodsLogn);
        this.$router.push({
                path: "/shop",
                query: {
                businessHeadTitle: title,
                index: id,
                region: this.region
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
.specialRecoommends {
    background: #fff;
  margin: 0 12px;
  margin-top: 5px;
}
.specialRecoommends .specialtitle {
  width: 5rem;
  height: 1.375rem;
  text-align: center;
  font-size: 0.857rem;
  line-height: 1.375rem;
  color: #df413a;
  margin-bottom: 1px;
}
.specialRecoommends .specialbox {
  position: relative;
  margin-top: 10px;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.specialRecoommends .specialbox .specialcontent .itemtitle {
  width: 9rem;
  color: #27221f;
}
.specialRecoommends .specialbox .specialcontent > img {
    width: 70px;
    height: 70px;
    position: absolute;
    z-index: 1;
}
.specialRecoommends .specialbox .specialcontent .specialtag{
  width: 100%;
  margin-bottom: 15px;
}
.specialRecoommends .specialbox .specialcontent .specialtag .special_tag_child{
    font-size: 12px;
    width: 58px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border: 1px solid #FDA341;
    color: #FDA341;
    border-radius: 3px;
    margin-top: 5px;
    margin-right: 5px;
}
.specialRecoommends .specialbox .retract {
  height: 1rem;
  padding: 0;
  margin: 0;
  text-indent: 81px;
  z-index: 1;
  font-size: .857rem;
}
.specialRecoommends .specialbox .specialprice .without {
  width: 1rem;
  padding: 0 0.1rem;
  height: 1rem;
}
.specialRecoommends .specialbox .specialprice {
    padding-top: 10px;
    position: relative;
    z-index: 1;
    color: #db2921;
    font-weight: 700;
}

.specialRecoommends .specialbox .specialtwo .specialtwoTitle {
  text-indent: 4rem;
  height: 2rem;
  font-size: 0.625rem;
}

.specialRecoommends .specialbox .specialtwo .specialtwocontent {
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid #F5F5F5;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent .specialtwotag{
  display: flex;
  width: 100%;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent .specialtwotag .special_twotag_child{
    font-size: 12px;
    width: 58px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border: 1px solid #999999;
    color: #999999;
    border-radius: 3px;
    margin-right: 5px;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent .specialtwocontent_firsttag{
  height: 15px;
  margin-bottom: 10px;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent:first-child{
  border-top: 1px solid #F5F5F5;
}
.specialRecoommends
  .specialbox
  .specialtwo
  .specialtwocontent
  .specialtwocontentTitle {
  font-size: .85rem;
  color: #333;
  margin-bottom: 10px;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent .start {
  color: #f2b784;
}
.specialRecoommends
  .specialbox
  .specialtwo
  .specialtwocontent
  .specialtwocontentPrice {
  font-size: 0.625rem;
  color: #dc322b;
  font-weight: bold;
  margin: auto;
}
.specialRecoommends
  .specialbox
  .specialtwo
  .specialtwocontent
  .specialtwocontentStandard {
  width: 2rem;
  height: 0.625rem;
  margin-right: 0.3rem;
  font-size: 0.5rem;
  text-align: center;
  line-height: 0.625rem;
  color:#999999FF;
}
.specialRecoommends
  .specialbox
  .specialtwo
  .specialtwocontent
  .specialtwocontentmerchant {
  margin-right: 0.2rem;
  margin-bottom: 0.3rem;
}
.specialRecoommends
  .specialbox
  .specialtwo
  .specialtwocontent
  .specialtwocontentdiscount {
  margin-right: 0.25rem;
}
.specialRecoommends .specialbox .specialtwo .specialtwoTitle > span {
  margin: 0 0.5rem;
}

</style>

