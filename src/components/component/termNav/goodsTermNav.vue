<template>
<!-- 商品筛选框区域组件 -->
    <div class="termNav-box" >
      <div class="termNav-alert-bg" v-show="termShow != 0" @click="closeAlert"></div>
      <div class="dflex termBox fz_14">
          <div class="classifyBox term-li">
              <div class="term-title-box dflex" :class="{'color_EE2D2D':termShow == 1}" @click.stop="classifyBtn">
                  <div class="term-li-title">{{classifyTitle}}</div>
                  <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 1">
                  <img src="../../../assets/img/xia.png" alt="" v-else>
              </div>
              <div class="classify-ul term-box-ul" v-show="termShow == 1">
                  <div class="dflex">
                      <div class="classify-left-box">
                        <div class="classify-left-li parAllClick" @click="parAllClick(0,'全部')">全部</div>
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
                  <!-- <div class="dflex category-button fz_16 color_666">
                      <div class="category-all-button" @click="allCategory"><span>全部项目</span></div>
                      <div class="category-confirm-button color_EE2D2D" @click="confirmCategory"><span>确认</span></div>
                  </div> -->
              </div>
          </div>
          <div class="allMarketBox term-li">
                <div class="term-title-box dflex" :class="{'color_EE2D2D':termShow == 3}" @click.stop="allMarketBtn">
                    <div class="term-li-title">{{allMarketTitle}}</div>
                    <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 3">
                    <img src="../../../assets/img/xia.png" alt="" v-else>
                </div>
                <div class="allMarket-ul term-box-ul" v-show="termShow == 3">
                    <div class="allMarket-label fz_16 color_424242">来源</div>
                    <div class="dflex fz_12">
                        <div v-for="(mItem,mIndex) in marketLabel" :key="mIndex">
                            <div class="market-title-list fz_12 color_808080" :class="{'active':mItem.active == 1}" @click="changeMarket(mItem,mIndex)">{{mItem.title}}</div>
                        </div>
                    </div>
                </div>
          </div>
          <div class="sortBox term-li">
                <div class="term-title-box dflex" :class="{'color_EE2D2D':termShow == 2}"  @click.stop="priceBtn">
                    <div class="term-li-title">{{sortTitle}}</div>
                    <img src="../../../assets/img/shang.png" alt="" v-if="termShow == 2">
                    <img src="../../../assets/img/xia.png" alt="" v-else>
                </div>
                <div class="sort-ul term-box-ul" v-show="termShow == 2">
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
            
            parActive:-1,
            sonActive:-1,

            districtId:-1, //所选区域ID
            nearbyTitle:'区域',//所选区域

            marketLabel:[
                {
                    title:'全部',
                    active:0,
                    type:0,
                },
                {
                    title:'市场',
                    active:0,
                    type:2,
                },
                {
                    title:'基地',
                    active:0,
                    type:3,
                },
                {
                    title:'工厂',
                    active:0,
                    type:4,
                },
            ],


            sortActive:0,
            sortTitle:'智能排序',
            sortLists:[{
                title:'低价优先',
                type:'sort_price_asc',
                active:1,
            },{
                title:'高价优先',
                type:'sort_price_desc',
                active:2,
            },{
                title:'销量优先',
                type:'sort_num',
                active:3,
            }],
            classifyTitle:'主营项目',
            sonTitle:'',

            marketId:-1,//所选市场ID
            allMarketTitle:'筛选',


            priceLock:true,
            districtLock:true,
            classifyLock:true,
            marketLock:true,
        }
    },
    created(){
        let data = localStorage.getItem("wapres");
        this.regionID = data;
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
            'marketList',
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
                this.$emit('onTermShow',2);
            }else{
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = true;
                this.marketLock = true;
                this.$emit('onTermShow',0);
            }
        },
        //====>分类
        classifyBtn() {
            if(this.classifyLock){
                this.priceLock = true;
                this.districtLock = true;
                this.classifyLock = false;
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
        
        parAllClick(key,name){
            this.sonTitle = "主营项目";
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;
            this.parActive = -1;
            this.sonActive = -1;
            
            this.$emit('confirmCategory',key);
            this.classifyTitle = this.sonTitle;
        },
        parClick(key,name){
            this.sonTitle = name;
            this.parActive = key;
            this.sonActive = key;
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
        sonClick(key,name){
            this.sonTitle = name;
            this.sonActive = key;
            
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;

            this.$emit('confirmCategory',this.sonActive);
            this.classifyTitle = this.sonTitle;
        },
        postDistrict(id,name){
            this.districtId = id;
            this.nearbyTitle = name;
            
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;

            if(id == 'all'){
                this.$emit('confirmCategory',id);
            }else{
                this.$emit('allCategory',id);
            }
        },
        //切换身份
        changeMarket(item,index){
            this.marketType = item.type;
            let marketLabel = this.marketLabel;
            if(item.title == "全部"){
                this.allMarketTitle = "筛选"
            }else{
                this.allMarketTitle = item.title;
            }
            this.priceLock = true;
            this.districtLock = true;
            this.classifyLock = true;
            this.marketLock = true;

            for(let key in marketLabel){
                marketLabel[key].active = 0
            }
            item.active = 1;
            this.$emit('postDistrict',item.type);

        },
    },
}
</script>
<style lang="less" scoped>
.termNav-box{
    margin-bottom: 10px;
    position: fixed;
    top: 46px;
    width: 100%;
    height: 42px;
    z-index: 1000;
}
.termNav-alert-bg{
  background-color: rgba(0,0,0,0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1001;
}
.termBox{
    text-align: center;
    color: #777;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    background-color: #fff;
    position: relative;
    z-index: 1001;
    .term-li{
        margin: auto 0;
        flex: 1;
        text-align: center;
        .term-title-box{
            height: 40px;
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
        
    }
    .term-box-ul{
      width: 100%;
      position: fixed;
      top: 88px;
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
        padding: 20px 12px 10px;
        padding-top: 20px;
        .allMarket-label{
            text-align: left;
            margin-bottom: 10px;
        }
        .market-title-list{
            min-width: 74px;
            height: 26px;
            border:1px solid #d8d8d8;
            border-radius: 5px;
            text-align: center;
            line-height: 26px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .market-title-list.active{
            border:1px solid #EE4D4D;
            color: #EE4D4D;
        }
    }
}
</style>
