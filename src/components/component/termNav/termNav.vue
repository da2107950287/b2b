<template>
<!-- 店铺筛选框区域组件 -->
    <div class="">
      <div class="termNav-alert-bg" v-show="termShow != 0" @click="closeAlert"></div>
      <div class="dflex termBox fz_14">
          <div class="nearbyBox term-li">
              <div class="dflex" :class="{'color_EE2D2D':termShow == 1}"  @click.stop="nearbyBtn">
                  <div class="term-li-title">{{nearbyTitle}}</div>
                  <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 1">
                  <img src="../../../assets/img/xia.png" alt="" v-else>
              </div>
              <div class="nearby-ul term-box-ul dflex fz_12" v-show="termShow == 1">
                  <div class="nearby-li" :class="{'active':districtId == 'all'}" @click="postDistrict('all','区域')">全部地区</div>
                  <div class="nearby-li" :class="{'active':districtId == districtItem.region_id}" v-for="(districtItem,districtIndex) in getDistrict" :key="districtIndex" @click="postDistrict(districtItem.region_id,districtItem.region_name)">{{districtItem.region_name}}</div>
              </div>
          </div>
          <div class="sortBox term-li">
              <div class="dflex" :class="{'color_EE2D2D':termShow == 4}"  @click.stop="priceBtn">
                  <div class="term-li-title">{{sortTitle}}</div>
                  <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 4">
                  <img src="../../../assets/img/xia.png" alt="" v-else>
              </div>
              <div class="sort-ul term-box-ul" v-show="termShow == 4">
                    <div class="fz_12">
                        <div class="sort-title-list fz_14 color_808080">
                            <div :class="{'active' : sortActive == 0}" @click="changeSort('智能排序',0,'all')">智能排序</div>
                        </div>
                        <div class="sort-title-list fz_14 color_808080" v-for="(sortItem,sortIndex) in sortLists" :key="sortIndex">
                            <div :class="{'active' : sortActive == sortItem.active}" @click="changeSort(sortItem.title,sortItem.active,sortItem.type)">{{sortItem.title}}</div>
                        </div>
                    </div>
              </div>
          </div>
          <div class="classifyBox term-li">
              <div class="dflex" :class="{'color_EE2D2D':termShow == 2}" @click.stop="classifyBtn">
                  <div class="term-li-title">{{classifyTitle}}</div>
                  <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 2">
                  <img src="../../../assets/img/xia.png" alt="" v-else>
              </div>
              <div class="classify-ul term-box-ul" v-show="termShow == 2">
                  <div class="dflex">
                      <div class="classify-left-box">
                        <div class="classify-left-li" v-for="(category,categoryIndex) in category" :key="categoryIndex" @click="parClick(category.cat_id,category.cat_name)" :class="{'color_EE2D2D':parActive == category.cat_id}">{{category.cat_name}}</div>
                      </div>
                      <div class="classify-right-box">
                        <div class="" v-for="(categoryItem,categoryIndex) in category" :key="categoryIndex">
                          <div v-for="(cate,cateIndex) in categoryItem.son" :key="cateIndex" @click="sonClick(cate.cat_id,cate.cat_name)" :class="{'color_EE2D2D':sonActive == cate.cat_id}">
                            <div class="classify-right-li" v-if="cate.parent_id == parActive">{{cate.cat_name}}</div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div class="dflex category-button fz_16 color_666">
                      <div class="category-all-button" @click="allCategory"><span>全部项目</span></div>
                      <div class="category-confirm-button color_EE2D2D" @click="confirmCategory"><span>确认</span></div>
                  </div>
              </div>
          </div>
          <div class="allMarketBox term-li">
              <div class="dflex" :class="{'color_EE2D2D':termShow == 3}" @click.stop="allMarketBtn">
                  <div class="term-li-title">{{allMarketTitle}}</div>
                  <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 3">
                  <img src="../../../assets/img/xia.png" alt="" v-else>
              </div>
              <div class="allMarket-ul term-box-ul dflex fz_12" v-show="termShow == 3">
                  <div class="allMarket-li" :class="{'active':marketId == 'all'}" @click="postMarket('all','来源')">全部</div>
                  <div class="allMarket-li" :class="{'active':marketId == marketItem.market_id}" v-for="(marketItem,marketIndex) in marketList" :key="marketIndex" @click="postMarket(marketItem.market_id,marketItem.market_name)">{{(marketItem.market_name).substr(0,6)}}</div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import "../../../assets/css/commonstyle.css"
import { post } from "../../../assets/js/commonAPI.js";
import {cacheStorage} from '../../../assets/js/cache.js'
Vue.prototype.$post = post;
Vue.prototype.$cacheStorage = cacheStorage;
export default {
    props:['termShow','type'],
    data(){
        return{
            showIndex:0,
            showID:0,
            seachTitle:'',

            indexID:'',
            regionID:'',
            title:'',

            getDistrict:[],
            category:[],
            marketList:[],
            
            sortTitle:'智能排序',
            sortActive:0,
            sortLists:[{
                title:'好评优先',
                type:'sort_evaluate',
                active:1,
            }],

            parActive:-1,
            sonActive:-1,

            districtId:-1, //所选区域ID
            nearbyTitle:'区域',//所选区域


            classifyTitle:'主营项目',
            sonTitle:'',

            marketId:-1,//所选市场ID
            allMarketTitle:'来源',


            districtLock:true,
            classifyLock:true,
            marketLock:true,
            priceLock:true,
        }
    },
    created(){
        let data = sessionStorage.getItem("data");
        if(data != null){
            data = JSON.parse(data)
            this.title = data.data.name;
            this.regionID = data.region;
        }else{
            let wapres = localStorage.getItem("wapres");
            this.regionID = wapres;
        }
        // 获取附近信息
        this.$cacheStorage(
            'district',
            '/?a=getDistrict',
            'session',
            {
                region_id: this.regionID,
            },
            ((res)=>{
                this.getDistrict = res.data;
            }),
        )
        // 获取市场信息
        this.$cacheStorage(
            'marketList'+ this.type,
            '/?a=marketList',
            'session',
            {
                region_id: this.regionID,
                type: this.type,
            },
            ((res)=>{
                this.marketList = res.data.list;
            }),
        )
        // 全部分类
        this.$cacheStorage(
            'allCategory',
            '/?a=allCategory',
            'session',
            {
                region_id: this.regionID,
            },
            ((res)=>{
                this.category = res.data;
            }),
        )
    },
    methods:{
        //关闭筛选
        closeAlert(){
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;
            this.$emit('onTermShow',0)
        },
        //====>价格排序
        priceBtn() {
            if(this.priceLock){
                this.priceLock = false;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',4);
            }else{
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',0);
            }
        },
        changeSort(title,key,type){
            
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;

            this.sortTitle = title;
            this.sortActive = key;
            
            let data = {
                'type' : type,
                'key' : key,
            }
            this.$emit('postSort',data);
        },
        //====>附近
        nearbyBtn() {
            if(this.districtLock){
                this.priceLock = true;
                this.districtLock = false;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',1)
            }else{
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',0)
            }
        },
        //====>分类
        classifyBtn() {
            if(this.classifyLock){
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = false;
                this.marketLock = true;
                this.$emit('onTermShow',2)
            }else{
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',0)
            }
        },
        //====>所有市场
        allMarketBtn() {
            if(this.marketLock){
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = false;
                this.$emit('onTermShow',3)
            }else{
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',0)
            }
        },
        
        parClick(key,name){
            this.sonTitle = name;
            this.parActive = key;
            this.sonActive = key;
        },
        sonClick(key,name){
            this.sonTitle = name;
            this.sonActive = key;
        },
        allCategory(){
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;
            this.parActive = -1;
            this.sonActive = -1;
            this.classifyTitle = '主营项目';
            this.$emit('allCategory');
        },
        confirmCategory(){
            
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;
            if(this.parActive != -1){
                this.$emit('confirmCategory',this.sonActive);
                this.classifyTitle = this.sonTitle;
            }else{
                this.$toast('请选择二级项目')
            }
        },
        postDistrict(id,name){
            this.districtId = id;
            this.nearbyTitle = name;
            
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;
            if(id == 'all'){
                this.$emit('postDistrict','all');
            }else{
                this.$emit('postDistrict',id);
            }
        },
        postMarket(id,name){
            this.marketId = id;
            this.allMarketTitle = name;
            
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;
            if(id == 'all'){
                this.$emit('postMarket','all');
            }else{
                this.$emit('postMarket',id);
            }
        },
    },
}
</script>
<style lang="less" scoped>
.termNav-alert-bg{
  background-color: rgba(0,0,0,0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.termBox{
    margin-bottom: 10px;
    height: 40px;
    text-align: center;
    color: #777;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    background-color: #fff;
    position: relative;
    z-index: 5;
    .term-li{
        margin: auto 0;
        flex: 1;
        text-align: center;
        .term-li-title{
          margin: auto;
          margin-right: 0;
        }
        img{
          margin: auto;
          margin-left: 5px;
          height: 7px;
          display: block;
        }
    }
    .term-box-ul{
      width: 100%;
      position: absolute;
      top: 40px;
      left: 0;
      background-color: #fff;
      border-top: 1px solid #d8d8d8;
      .classify-left-box{
        max-height: 255px;
        overflow-y: auto;
        max-width: 110px;
        min-width: 110px;
        .classify-left-li{
          padding: 15px 0;
        }
      }
      .classify-right-box{
        max-height: 255px;
        flex: 1;
        overflow-y: auto;
        text-align: left;
        background-color: #f2f2f2;
        .classify-right-li{
          padding: 15px 30px;
        }
      }
      .category-button{
        height: 44px;
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
        >div{
          width: 50%;
          height: 100%;
          margin: auto 0;
          line-height: 44px;
        }
        .category-all-button{
          span{
            border-right: 1px solid #d8d8d8;
            display: block;
            height: 100%;
          }
        }
      }
    } 
    .nearby-ul{
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 20px 12px 10px;
        width: calc(100% - 24px);
        .nearby-li{
            min-width: 4.05rem;
            max-width: 4.05rem;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            margin-right: .533rem;
            margin-bottom: 10px;
        }
        .nearby-li:nth-child(4n){
            margin-right: 0;
        }
        .nearby-li.active{
            border-color: #EE2D2D;
            color: #EE2D2D;
        }
        .nearby-title-list{
            text-align: left;
        }
        .nearby-title-list.active{
            color: #EE2D2D;
        }
    }
    .sort-ul{
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 15px 12px;
        width: calc(100% - 24px);
        .sort-title-list{
            text-align: left;
            margin-bottom: 15px;
        }
        .sort-title-list:last-child{
            margin-bottom: 0;
        }
        .sort-title-list .active{
            color: #EE2D2D;
        }
    }
    .allMarket-ul{
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 20px 12px 10px;
      width: calc(100% - 24px);
      .allMarket-li{
        padding: 0 5px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8d8d8;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
      }
      /* .allMarket-li:nth-child(4n){
        margin-right: 0;
      } */
      .allMarket-li.active{
          border-color: #EE2D2D;
          color: #EE2D2D;
      }
    }
}
</style>
