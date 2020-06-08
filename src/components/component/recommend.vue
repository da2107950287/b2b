<template>
  <div class="specialDiv">
    <van-tabs v-model="active" @change="changeTab(active)">
      <!-- 农联特推 -->
      <van-tab title="农联特推" >
        <div class="specialRecoommend" v-if="show == 1">
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
                            <div
                              class="specialtwocontentStandard"
                              v-for="(spec,jIndex ) in item.tag"
                              :key="jIndex"
                            >
                              {{spec}}
                            </div>
                          <!-- <div v-if="item.tag.length>0?false:true" class="itemTagDiv">&nbsp;</div> -->
                        </div>
                        <!-- 起批 -->
                        <p class="nooglianSpecs">{{item.moq}}{{item.moq_unit}}起批</p>
                        <!-- 价格以及收藏 -->
                        <div class="djust">
                          <p class="noonglians">¥<span class="noonglians_price">{{item.goods_price}}</span>
                            <span v-show="item.goods_unit">/{{item.goods_unit}}</span>
                          </p>
                          <div class="iconRight shoucang-img-box" @click.stop="changeicon(index,item)">
                              <img class="shoucangIcon shoucangIconAfter" :class="{'active':item.is_collect == 1}" src="../../assets/img/shouchang.png" alt="" >
                              <img class="qushoucangIcon shoucangIconAfter" :class="{'active':item.is_collect == 0}"  src="../../assets/img/qushoucang.png" alt="" >
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div v-else-if="show == 2">
          <searchNone item="specialRecoommend"></searchNone>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
      </van-tab>
      <!-- 商家推荐 -->
      <van-tab title="商户推荐">
        <div v-if="show == 1">
          <div v-for="(item,index) in merchant" :key="index" >
            <div class="merchant_div">
                <div class="merchant_goods dflex" @click="gomerchant(item)">
                    <img class="merchant_goods_img" src="../../assets/img/no_picture.gif" v-if="item.shop_logo == '/images/no_picture.gif' || item.shop_logo == ''" alt="">
                    <img class="merchant_goods_img" :src="item.shop_logo" v-else alt="">
                    <div class="merchant_goods_content">
                        <div class="merchant_goods_title">{{item.shop_name}}</div>
                        <div class="merchant_goods_grade">
                          <star :starValue="item.score"></star>
                        </div>
                        <div class="merchant_goods_tag dflex">
                          <div class="merchant_tag_child active" v-if="item.market_name != null">{{item.market_name}}</div>
                          <div class="merchant_tag_child" v-for="(itemt,indext) in item.label" :key="indext">{{itemt}}</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div v-else-if="show == 2">
          <searchNone item="supplierRecoommend"></searchNone>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
      </van-tab>
      <!-- 产品推荐 -->
      <van-tab v-if="specialtitle != ''" :title="specialtitle+'特荐'">
        <div v-if="show == 1" class="specialRecoommends">
          <div class="specialbox" v-for="(item,index) in speciallist" :key="index">
            <div class="specialcontent">
              <img :src="item.goods_thumb" >

              <div class="itemtitle retract"><p>{{item.cat_name}}</p></div>
              <!-- <p class="itemtitle retract">{{item.cat_name}}</p> -->
              <p class="specialprice retract">
                <!-- <img src="../../assets/img/icxon.png" class="without"> -->
                <!-- <svgicon name="label_3x" class="without"></svgicon> -->
                <img src="../../assets/img/label_3x.png" alt="" class="without">
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
                      <van-col span="14" class="specialtwocontentTitle">{{it.shop_name}}</van-col>
                      <van-col span="10" class="specialtwocontentStar">
                        <star :starValue="it.score"></star> <span class="scoreVal">{{it.score}}</span>
                      </van-col>
                      <!-- <van-col span="2" class="scoreVal">{{it.score}}</van-col> -->
                    </van-row>
                      <div v-show="it.label.length?true:false" class="specialtag dflex">
                        <div class="special_tag_child" v-for="(specs,jIndex ) in it.label" :key="jIndex">{{specs}}</div>
                      </div>
                      <div class="specialtwotag">
                        <div class="specialtwocontentPrice">
                          ¥{{it.min_price}}-{{it.max_price}}<span v-show="item.measure_unit">/{{item.measure_unit}}</span>
                        </div>
                        <div>
                          <div class="dflex">
                            <div class="special_twotag_child" v-for="(spec,jIndex ) in it.spec" :key="jIndex">{{spec}}</div>
                          </div>
                        </div> 
                      </div>
                      <!-- <van-row class="specialtwotag">
                        <van-col
                          span="8"
                          class="specialtwocontentPrice"
                        >¥{{it.min_price}}-{{it.max_price}}<span v-show="item.measure_unit">/{{item.measure_unit}}</span></van-col>
                        <van-col span="16">
                          <div class="dflex">
                            <div class="special_twotag_child" v-for="(spec,jIndex ) in it.spec" :key="jIndex">{{spec}}</div>
                          </div>
                          <van-tag
                            plain
                            round
                            class="specialtwocontentStandard"
                            v-for="(spec,jIndex ) in it.spec"
                            :key="jIndex"
                          >{{spec}}</van-tag>
                        </van-col>
                      </van-row> -->
                    </div>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </div>
        <div v-else-if="show == 2">
          <searchNone item="specialRecoommend"></searchNone>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import '../../assets/css/commonstyle.css'
import star from '../goods/star'
import {
  HandleTime,
  datedifference,
} from "../../assets/js/commonAPI.js";
import "../../assets/css/resetiu.css";

import shoucang from '../../assets/img/shouchang.png'
import qushoucang from '../../assets/img/qushoucang.png'

import searchNone from "./searchNone/searchNone.vue"; 
import vloading from "../vloading.vue"

export default {
  data() {
    return {
      active:'',
      region: 322,
      uctList: {},
      speciallist: [],
      activeNames: ["1", 0],
      price: 0,
      specialtitle: '',
      factoryGoods: [], //推荐的数据
      isicon: "", //切换收藏
      isicons: 1, //取消收藏
      addClock:0,    //添加收藏限制请求开关 0可以请求 1不可以请求
      delClock:0,    //删除收藏限制请求开关 0可以请求 1不可以请求
      flag: true,
      starts:'',   //判断是否收藏
      merchant:[],           //商家推荐列表

      show:0,
    };
  },
  
  
  created() {
    const _this = this;
    let region = localStorage.getItem("wapres");
    this.region = region;
    let specialtitle = localStorage.getItem('specialtitle')
    if(this.$appFunc.prototype.isEmpty(specialtitle)){
      this.specialtitle = '';
    }else{
      this.specialtitle = specialtitle;
    }
    // 推荐

    localStorage.removeItem('recommendList');
    this.$cacheStorage(
      'recommendList',
      '/?c=goods&a=recommend',
      'session',
      {
        region_id: region == undefined ? 322 : region,
        type: "0",
        market_id: 0,
        page: 1
      },
      ((res)=>{
        this.factoryGoods = res.data.list;
        if(res.data.list.length>0){
          this.show = 1;
        }else{
          this.show = 2;
        }
      }),
    )
  },
  methods: {
    goShops(title, id) {
      // console.log('去商家');
      localStorage.setItem("merchantsLogo", this.goodsLogn);
      this.$router.push({
        path: "/shop",
        query: {
          businessHeadTitle: title,
          index: id,
          region: this.region
        }
      });
    },
    // 跳转进入特别推荐的详细页面（已写页面）
    // goSpecialRecommend(){
    //     this.$router.push({
    //         path:'/specialRecommend'
    //     })
    // }
    // 收藏
    changeicon(index, item) {
      // 收藏以后发送id
      let time = new Date().getTime();
      const eve = event.target;
      if(item.is_collect == 0){
        if(this.addClock == 0){
          this.addClock = 1;
          this.$post("/?c=goods&a=addCollect&t="+time, {
            // 接口传值
            wholesale_id: item.wId
          }).then(res => {
            if (res.code == 0) {
              item.is_collect = 1;
              $(eve).parent().find('shoucangIcon').addClass('active');
              $(eve).parent().find('qushoucangIcon').removeClass('active');
              // $(eve).attr('src',shoucang);
              // console.log($(eve));
              console.log("=======收藏成功======");
              // this.$toast("收藏成功");
              this.delClock = 0;
              this.addClock = 0;
            }
          });
        }
      }else{
        if(this.delClock == 0){
          this.delClock == 1;
          this.$post("/?c=goods&a=delCollect&t="+time, {
            // 接口传值
            wholesale_id: item.wId
          }).then(res => {
            if (res.code == 0) {
              item.is_collect = 0;
              $(eve).parent().find('shoucangIcon').removeClass('active');
              $(eve).parent().find('qushoucangIcon').addClass('active');
              // $(eve).attr('src',qushoucang);
              // console.log($(eve));
              console.log("=======取消收藏======");
              this.delClock = 0;
              this.addClock = 0;
            }
          });
        }
        
      }
      
    },
    // 取消收藏
    changeiconChange( index, item) {
        //取消
        // 取消收藏以后发送id
        this.$post("/?c=goods&a=delCollect", {
          // 接口传值
          wholesale_id: item.wId
        }).then(res => {
          if (res.code == 0) {
            this.$toast("取消收藏");
          }
        });
    },
    goShpping(item) {
      this.$router.push({
        path: "/goods",
        query: {
          goods: item.wId
        }
      });
    },
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
    changeTab(key){
      this.show = 0;
      if(key == 0){
        // 推荐
        localStorage.removeItem('recommendList');
        this.$cacheStorage(
          'recommendList',
          '/?c=goods&a=recommend',
          'session',
          {
            region_id: this.region == undefined ? 322 : this.region,
            type: "0",
            market_id: 0,
            page: 1
          },
          ((res)=>{
            this.factoryGoods = res.data.list;
            if(res.data.list.length>0){
              this.show = 1;
            }else{
              this.show = 2;
            }
          }),
        )
      }else if(key == 1){
        // 商家推荐
        this.$cacheStorage(
          'merchantList',
          '/?c=merchant&a=recommend',
          'session',
          {
            page: 1,
            limit:10,
          },
          ((res)=>{
            this.merchant = res.data;
            if(res.data.length>0){
              this.show = 1;
            }else{
              this.show = 2;
            }
          }),
        )
      }else if(key == 2){
        
        this.$cacheStorage(
          'userRecommendList',
          '/?c=goods&a=getUserRecommend',
          'session',
          {
            region_id: this.region == undefined ? "322" : String(this.region),
            page: 1,
            limit: 10
          },
          ((res)=>{
            this.speciallist = res.data.data;
            this.specialtitle = res.data.label_name;
            this.price = res.data.price;

            if(res.data.data.length>0){
              this.show = 1;
            }else{
              this.show = 2;
            }
          }),
        )
      }
    }
  },
  components:{
    star,
    searchNone,
    vloading,
  }
};
</script>
<style>
.specialDiv .van-tab.van-tab--active{
  color: #dc322b;
}
.specialDiv .van-collapse-item__content .scoreVal{
  color: #EE2D2D;
}
</style>
<style scoped>
/* 特别推荐 */
.specialRecoommends {
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
  padding-bottom: 12px;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.specialRecoommends .specialbox .specialcontent .itemtitle {
  /*width: 9rem;*/
  width: calc(100% - 112px);
  height: 2.3rem;
  color: #27221f;
  padding-left: 104px;
  text-indent: initial;
  position: relative;
}
.specialRecoommends .specialbox .specialcontent .itemtitle p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  word-wrap: break-word;
  word-break: break-all;  
}
.specialRecoommends .specialbox .specialcontent > img {
    width: 92px;
    height: 92px;
    position: absolute;
    z-index: 1;
}
.specialRecoommends .specialbox .specialcontent .specialtag{
  width: 100%;
  margin-bottom: 15px;
  flex-wrap: wrap;
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
  /*height: 2.3rem;*/
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
    padding-left: 102px;
    position: relative;
    z-index: 1;
    text-indent: initial;
    color: #db2921;
    font-weight: 700;
}
/* .specialRecoommends .specialtwo .van-cell {
  height: 2rem;
}
.specialRecoommends .specialtwo .van-collapse-item .van-cell {
  margin-top: 3px;
  margin-left: 28px;
} */
.specialRecoommends .specialbox .specialtwo .specialtwoTitle {
  text-indent: 4rem;
  height: 1rem;
  font-size: 0.625rem;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontentStar {
  position: relative;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontentStar>div:first-child {
  float: right;
  padding-right: 18px;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontentStar .scoreVal {
  position: absolute;
  right: 0;
  top: 0;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent {
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid #F5F5F5;
}
.specialRecoommends .specialbox .specialtwo .specialtwocontent .specialtwotag{
  display: block;
  width: 100%;
  overflow: hidden;
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

  float: left;
  padding-right: 12px;
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

/* 农联推荐 */

.shoucang {
  font-size: 32px;
}
.shoucang.active {
  color: red;
}
.itemTagDiv {
  width: 1px;
}
.likeo {
  color: #ccc;
}
.shoucangIcon{
  width: 22px;
  height: 18px;
}
.iconRight{
  text-align: right;
  padding-right: 4px;
}

.shoucangIconAfter{
    width: 22px;
    height: 18px;
    display: none;
}
.shoucangIcon.active{
    display: block;
}
.qushoucangIcon.active{
    display: block;
}


/* 第一个版块 */
.specialDiv{
  background: #fff;
  margin-top: 10px;
}
.specialDiv .specialRecoommend{
  margin:0;
}
.specialDiv .specialRecoommend .specialbox{
  position: relative;
  padding: 20px 15px;
  height: 100px;
  border-bottom: 1px solid #f2f2f2;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontent_img{
    /*width: 70px;
    height: 70px;*/

    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontent_img>img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize {
    width: calc(100% - 80px);
    position: relative;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .noongTitles{
    margin: -3px 0 0;
    padding: 0;
    font-size: 16px;
    color: #333;
    font-weight: 400;
    line-height: 1.2em;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*display: block;
    white-space: nowrap;*/

    /*标题变为两行*/
    display: -webkit-box;
    -webkit-line-clamp: 2;
    word-wrap: break-word;
    word-break: break-all;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .specialtwocontentStandard{
    width: 50px;
    height: 18px;
    font-size: 12px;
    border: 1px solid #999;
    color: #999;
    text-align: center;
    margin-right: 5px;
    border-radius: 5px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .noonglianLabel{
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .nooglianSpecs {
  font-size: 12px;
  color: #424242;
  margin: 0;
  padding: 3px 0 5px;
}
.specialDiv .specialRecoommend .specialbox .specialcontent .specialcontentSize .djust{
  position: absolute;
  bottom: -3px;
  width: 100%;
  height: 20px;
  line-height: 20px;
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

/* 第三个版块 */
.merchant_div{
  height: 100px;
}
.merchant_div .merchant_goods{
  padding:20px 0 20px 12px
}
.merchant_div .merchant_goods .merchant_goods_img{
  width:60px;
  height:60px;
  border-radius:5px;
  margin-right: 10px;
}
.merchant_div .merchant_goods .merchant_goods_content .merchant_goods_title{
    font-size: 16px;
    font-weight: 500;
    color: rgba(51,51,51,1);
    height: 15px;
}
.merchant_div .merchant_goods .merchant_goods_content .merchant_goods_grade{
  margin-top: 5px;
}
.merchant_div .merchant_goods .merchant_goods_content .merchant_goods_tag{
  flex-wrap: wrap;
}
.merchant_div .merchant_goods .merchant_goods_content .merchant_goods_tag .merchant_tag_child{
    font-size: 12px;
    width: 58px;
    height: 16px;
    text-align: center;
    border: 1px solid #FDA341;
    color: #FDA341;
    border-radius: 3px;
    margin-top: 5px;
    margin-right: 5px;
}
.merchant_div .merchant_goods .merchant_goods_content .merchant_goods_tag .merchant_tag_child.active{
  color: #fff;
  background-color: #FDA341;
}



.no-login-icon-box{width: 100%;}
.no-login-icon-box img{display: block;margin: auto;}

.vantLoading{
    margin-top: 20px;
    width: 100%;
    display: flex;
}
</style>
