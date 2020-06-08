<template>
  <div style="height:100%">
    <div>
      <!-- 顶部导航栏 -->
      <navbar type="searchBoth" @search="onsearchTwo" @searchInput="searchInput" :value="valueTwo" @clickleft="goRegre"></navbar>
    </div>
    <div>
      <!-- 条件搜索栏 -->
      <div class="termNav">
        <termNav @allCategory="allCategory" @confirmCategory="confirmCategory" @postMarket="postMarket" @postDistrict="postDistrict" @onTermShow="onTermShow" @postSort="postSort" :termShow="termShow" :type="indexID"></termNav>
      </div>
      <div style="height:52px;"></div>
    </div>
    <div v-if="showList == 1">
      <business v-for="(item,index) in businessBarList" :key="index" :index="index" :item="item" :lock="lock" :page="page"></business>
      <p class="end-msg">{{endMsg}}</p>
    </div>
    <div v-else-if="showList == 2">
      <!-- 您当前搜索的店铺不存在~ -->
      <!-- <div class="merchant-none">您当前搜索的店铺不存在</div> -->
      <searchNone :item="'businessList'"></searchNone>
      <merchantDom></merchantDom>
    </div>
    <div v-else class="vantLoading">
        <vloading :vertical="false" text=""></vloading>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import "../assets/css/animate.css";
import "font-awesome/css/font-awesome.css";
import "../assets/css/commonstyle.css"
import { post } from "../assets/js/commonAPI.js";
import {cacheStorage} from '../assets/js/cache.js'

import business from "./component/business/business.vue"
import search from "./component/search/search.vue"
import termNav from "./component/termNav/termNav.vue"
import merchantDom from "./component/recommendComponent/merchant.vue"
import navbar from './navbar/nav.vue';

import searchNone from "./component/searchNone/searchNone.vue";
import vantLoading from './vantLoading.vue'
import vloading from './vloading.vue'

Vue.prototype.$post = post;
Vue.prototype.$cacheStorage = cacheStorage;
export default {
  data() {
    return {
      titel: "", //====>标题
      indexID: "", //====>身份id
      showIndex: 0, //====>显示与隐藏
      showID: 0, //====>点击索引
      seachTitle: "", //====>搜索标题
      choice: 0, //====>
      checkID: 0, //====>选中索引
      businessBarList: [], //====>商家列表
      showList: 0, //====>商家列表提示信息
      regionID: 322, //====>附近ID
      classification:'',
      ascription:'',
      address:'',

      termShow:0,

      region_id:0,
      category_id: 0,
      market_id: 0,
      sort_evaluate:0,

      valueTwo:'',
      page:2,

      lock:0,
      endMsg: ''   //列表加载结束提示语

    };
  },
  created() {
    let data = sessionStorage.getItem("data");
    if(data != null){
      data = JSON.parse(data)
      this.title = data.data.name;
      this.indexID = this.$route.query.id;
      this.regionID = data.region;
      this.region_id = data.region;
    }else{
      let wapres = localStorage.getItem("wapres");
      this.regionID = wapres;
      this.region_id = wapres;
      this.indexID = 0;
    }


    //====>商家列表
    this.$post("/?c=merchant&a=shopList2", {
      category_id: this.category_id,
      market_id: this.market_id,
      region_id: this.regionID,
        type:this.indexID
    }).then(res => {
      switch (res.code) {
        case 0:
          this.businessBarList = res.data;
          if(res.data.length > 0){
            this.showList = 1;
            if(res.data.length>9){
                window.addEventListener('scroll', this.handleScroll)
            }
          }else{
            this.showList = 2;
          }
          break;
        default:
          break;
      }
    });
  },
  methods: {
    //====>回退
    searchInput(val){
        sessionStorage.setItem('searchInputVal',val);
        this.valueTwo = val;
    },
    goRegre() {
      sessionStorage.removeItem('searchInputVal');
      this.$router.go(-1);
    },
    //====>跳转商家
    shop() {
      let even = event.srcElement?event.srcElement:event.target;
      this.$router.push({
        path: "/shop",
        query: {
          index: $(even).parents(".business-title").attr("data-index"),
          region: this.regionID,
          businessHeadTitle: $(even).parents(".business-title").find(".businessHeadTitle").text()
        }
      });
    },
    allCategory(){
      window.removeEventListener('scroll', this.handleScroll)

      this.termShow = 0;
      this.category_id = 0;
      this.showList = 0;
      this.page = 2;
      this.lock = 0;
      this.endMsg = "";
      this.$post("/?c=merchant&a=shopList2", {
        region_id: this.region_id,
        category_id: this.category_id,
        market_id: this.market_id,
        keywords:this.valueTwo,
          type:this.indexID
      }).then(res => {
        switch (res.code) {
          case 0:
            this.businessBarList = res.data;
            if(res.data.length > 0){
              this.showList = 1;
              if(res.data.length>9){
                window.addEventListener('scroll', this.handleScroll)
              }
            }else{
              this.showList = 2;
            }
            break;
          default:
            break;
        }
      });
    },
    confirmCategory(id){
      window.removeEventListener('scroll', this.handleScroll)

      this.termShow = 0;
      this.category_id = id;
      this.showList = 0;
      this.page = 2;
      this.lock = 0;
      this.endMsg = "";
      this.$post("/?c=merchant&a=shopList2", {
        region_id: this.region_id,
        category_id: this.category_id,
        market_id: this.market_id,
        keywords:this.valueTwo,
        type:this.indexID
      }).then(res => {
        switch (res.code) {
          case 0:
            this.businessBarList = res.data;
            if(res.data.length > 0){
              this.showList = 1;
              if(res.data.length>9){
                window.addEventListener('scroll', this.handleScroll)
              }
            }else{
              this.showList = 2;
            }
            break;
          default:
            break;
        }
      });
    },
    postDistrict(id){
      window.removeEventListener('scroll', this.handleScroll)

      this.termShow = 0;
      this.showList = 0;
      this.page = 2;
      this.lock = 0;
      this.endMsg = "";
      if(id == 'all'){
        this.region_id = this.regionID;
        this.$post("/?c=merchant&a=shopList2", {
          region_id: this.region_id,
          category_id: this.category_id,
          market_id: this.market_id,
          keywords:this.valueTwo,
            type:this.indexID
        }).then(res => {
          switch (res.code) {
            case 0:
              this.businessBarList = res.data;
              if(res.data.length > 0){
                this.showList = 1;
                if(res.data.length>9){
                  window.addEventListener('scroll', this.handleScroll)
                }
              }else{
                this.showList = 2;
              }
              break;
            default:
              break;
          }
        });
      }else{
        this.region_id = id;
        this.$post("/?c=merchant&a=shopList2", {
          region_id: this.region_id,
          category_id: this.category_id,
          market_id: this.market_id,
          keywords:this.valueTwo,
            type:this.indexID
        }).then(res => {
          switch (res.code) {
            case 0:
              this.businessBarList = res.data;
              if(res.data.length > 0){
                this.showList = 1;
                if(res.data.length>9){
                  window.addEventListener('scroll', this.handleScroll)
                }
              }else{
                this.showList = 2;
              }
              break;
            default:
              break;
          }
        });
      }
    },
    postMarket(id){
      window.removeEventListener('scroll', this.handleScroll)

      this.termShow = 0;
      this.showList = 0;
      this.page = 2;
      this.lock = 0;
      this.endMsg = "";
      if(id == 'all'){
        this.market_id = 0;
        this.$post("/?c=merchant&a=shopList2", {
          region_id: this.region_id,
          category_id: this.category_id,
          market_id: this.market_id,
          keywords:this.valueTwo,
            type:this.indexID
        }).then(res => {
          switch (res.code) {
            case 0:
              this.businessBarList = res.data;
              if(res.data.length > 0){
                this.showList = 1;
                if(res.data.length>9){
                  window.addEventListener('scroll', this.handleScroll)
                }
              }else{
                this.showList = 2;
              }
              break;
            default:
              break;
          }
        });
      }else{
        this.market_id = id;
        this.$post("/?c=merchant&a=shopList2", {
          region_id: this.region_id,
          category_id: this.category_id,
          market_id: this.market_id,
          keywords:this.valueTwo,
            type:this.indexID
        }).then(res => {
          switch (res.code) {
            case 0:
              this.businessBarList = res.data;
              if(res.data.length > 0){
                this.showList = 1;
                if(res.data.length>9){
                  window.addEventListener('scroll', this.handleScroll)
                }
              }else{
                this.showList = 2;
              }
              break;
            default:
              break;
          }
        });
      }

    },
    postSort(data){
      window.removeEventListener('scroll', this.handleScroll)
      this.termShow = 0;
      this.showList = 0;
      this.page = 2;
      this.endMsg = "";
      if(data.type =='sort_evaluate'){
        this.sort_evaluate = 1;
      }else if(data.type =='all'){
        this.sort_evaluate = 0;
      }
      this.$post("/?c=merchant&a=shopList2", {
          region_id: this.region_id,
          category_id: this.category_id,
          market_id: this.market_id,
          keywords:this.valueTwo,
          type:this.indexID,
          sort_evaluate:this.sort_evaluate,
      }).then(res => {
        switch (res.code) {
          case 0:
            this.businessBarList = res.data;
            
            if(res.data.length > 0){
              this.showList = 1;
              if(res.data.length>9){
                window.addEventListener('scroll', this.handleScroll)
              }
            }else{
              this.showList = 2;
            }
            break;
          default:
            break;
        }
      });
    },
    onTermShow(type){
      this.termShow = type
    },
    onsearchTwo(){
      window.removeEventListener('scroll', this.handleScroll)

      this.$post("/?c=merchant&a=shopList2", {
        region_id: this.region_id,
        category_id: this.category_id,
        market_id: this.market_id,
        keywords:this.valueTwo,
          type:this.indexID
      }).then(res => {
        switch (res.code) {
          case 0:
            this.businessBarList = res.data;

            if(res.data.length > 0){
              this.showList = 1;
              if(res.data.length>9){
                window.addEventListener('scroll', this.handleScroll)
              }
            }else{
              this.showList = 2;
            }
            break;
          default:
            break;
        }
      });
    },
    //店铺瀑布流加载
    handleScroll () {
        let _this=this
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        if (scrollTop + windowHeight >= (scrollHeight-50)) {
        //写后台加载数据的函数
            if(_this.lock == 0){
                _this.lock = 1;
                _this.$post('/?c=merchant&a=shopList2',{
                    region_id: _this.region_id,
                    category_id: _this.category_id,
                    market_id: _this.market_id,
                    keywords:_this.inputVal,
                    page:_this.page,
                    type:_this.indexID,
                    sort_evaluate:this.sort_evaluate,
                }).then((res) => {
                    switch (res.code){
                        case 0:
                          setTimeout(()=>{

                            if(res.data.length>0){
                              _this.businessBarList=[..._this.businessBarList,...res.data];
                            }
                            if(res.data.length<10){
                                  _this.endMsg = '已经没有更多内容啦~';
                                window.removeEventListener('scroll', this.handleScroll)
                            }
                              _this.lock = 0
                            _this.page+=1
                            },600)
                            break;
                        case 1:
                            _this.$toast(res.msg);
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    },
  },
  components:{
    business,
    termNav,
    search,
    merchantDom,
    searchNone,
    navbar,
    vantLoading,
    vloading
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
};
</script>

<style scoped>
.termNav{
  position: fixed;
  width: 100%;
  top: 44px;
  z-index: 10;
}
.termNav-img{
  width: 10.65rem;
  margin: 100px auto 0;
  display: block;
}

/* 蒙层 */
.mongoLia {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
}
/* 搜索内容 */
.selectionBox {
  width: 80%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: #fff;
}
.selectionTitle {
  font-size: 14px;
  padding: 1rem 1rem 0.5rem;
  color: #777;
}
.selectionFn {
  padding: 0.5rem 1rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -o-flex-wrap: wrap;
}
.selectionClick {
  width: 29%;
  height: 1.6rem;
  line-height: 1.6rem;
  margin: 0.2rem;
  border: 1px solid #ececec;
  border-radius: 0.4rem;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  background-color: #ececec;
}
/* 确定按钮与取消按钮 */
.selectionButton {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.selectionButton > a {
  width: 50%;
  height: 3rem;

  line-height: 3rem;
  text-align: center;
  color: #fff;
  background-color: #2b2b2b;
  display: inline-block;
}
.selectionButton > a:nth-child(2) {
  background-color: #ec5151;
}
/* 搜索条件选择 */
.checkList {
  border: 1px solid #ec5151;
}
/* 商家列表样式 */
.businessList {
  border-bottom: 2px solid #eaeaea;
  padding: 1rem 1.6rem 0.6rem 1.6rem;
  background-color: #fff;
}
.businessInfo p:nth-child(1) {
  font-weight: bold;
}
.businessInfo p:nth-child(2) {
  color: #ec5151;
  font-size: 12px;
}
.businessInfo p:nth-child(3) {
  font-size: 14px;
  color: #777;
}

.business-logo {
  width: 2.8rem;
  height: 2.8rem;
  line-height: 2.8rem;
  text-align: center;
  border-radius: 100%;
  overflow: hidden;
}
.business-head {
  padding-left: 0.6rem;
}
.business-title p:nth-child(1) {
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
}
.business-title p:nth-child(2) {
  margin: 0;
  margin-bottom: 0.3rem;
  color: #ec9d49;
  font-size: 12px;
}
.business-img {
  padding: 0.3rem;
}
.business-img-info {
  height: 4rem;
  overflow: hidden;
}
.title-index {
  font-size: 14px;
  color: #777;
  text-align: center;
}
.merchant-none{
  margin: 20px auto;
  text-align: center;
  font-size: 14px;
  color: #808080;
}
</style>

<style lang="less" scoped>
.end-msg {
  font-size: 14px;
  text-align: center;
  color: #c9c9c9;
  line-height: 3em;
  margin: 0;
}
.vantLoading{
    margin-top: 20px;
    width: 100%;
    display: flex;
}

@keyframes changePosition{
    0%{
        -webkit-transform: translate(-10.56rem);
    }
    50%{
        -webkit-transform: translate(0);
    }
    100%{
        -webkit-transform: translate(10.56rem);
    }
}
@-webkit-keyframes changePosition{
    0%{
        -webkit-transform: translate(-10.56rem);
    }
    50%{
        -webkit-transform: translate(0);
    }
    100%{
        -webkit-transform: translate(10.56rem);
    }
}
.search-div{
    display: flex;
    padding: 7px 0 7px 13px;
    align-items: center;
    background-color: #fff;
    position: fixed;
    width: calc(100% - 13px);
    z-index: 10;

    .search-img{
        font-size: 12px;
        display:flex;
        align-items: center;
        color:#808080;
        >img{
            width: 8px;
            height: 15px;
            margin-right: 6px;
        };
    }
    .search-from{
        border: none;
        margin-left: 15px;
        display: flex;
        background: #f2f2f2;
        margin-right: 46px;
        flex-grow: 1;
        align-items: center;
        height: 30px;
        border-radius:5px;
        .fa{
            height: 17px;
            margin-right: 7px;
            margin-left: 5px;
        }
        .search_in{
            border: none;
            font-size: 14px;
            background: #f2f2f2;
            width: 100%;
        }
    }
}
</style>
