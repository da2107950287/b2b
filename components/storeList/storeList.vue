<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="search-div">
        <div class="search-img" @click="goRegre">
            <img src="../assets/img/fanhui.png" alt=""><div>返回</div>
        </div>
        <div>推荐店铺</div>
    </div>
    <div v-if="showList == 1">
      <business v-for="(item,index) in businessBarList" :key="index" :item="item"></business>
    </div>
    <div v-else-if="showList == 2">
      <!-- 您当前搜索的店铺不存在~ -->
      <div class="merchant-none">您当前搜索的店铺不存在</div>
      <merchantDom></merchantDom>
    </div>
    <div v-else>
      <!-- loading -->
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
import merchantDom from "./component/recommendComponent/merchant.vue"
Vue.prototype.$post = post;
Vue.prototype.$cacheStorage = cacheStorage;
export default {
  data() {
    return {
      titel: "", //====>标题
      indexID: "", //====>索引
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
      clock:1,              //分页请求开关
    };
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.title = data.data.name;
    this.indexID = data.data.nav_id;
    this.regionID = data.region;
    this.region_id = data.region;
    
    // 首次获取数据
    this.$cacheStorage(
        'merchantList',
        '/?c=merchant&a=recommend',
        'local',
        {
            page: 1,
            limit:10,
        },
        ((res)=>{
            this.businessBarList = res.data;
            if(res.data.length > 0){
                this.showList = 1;
            }else{
                this.showList = 2;
            }
            if(res.data.length>9){
                window.addEventListener('scroll',this.handleScroll)
            }
        }),
    )

  },
mounted () {
    if(this.data.length > 9){
        window.addEventListener('scroll', this.handleScroll)
    }
},
methods: {
    //====>回退
    goRegre() {
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
    //瀑布流加载
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
        if (scrollTop + windowHeight == scrollHeight) {
        //写后台加载数据的函数
            if(_this.clock == 1){
                _this.clock = 2;
                _this.$post('/?c=merchant&a=recommend',{
                    page:_this.page,
                    limit:10,
                    }).then((res) => {
                    switch (res.code){
                        case 0:
                            if(res.data.length>0){
                               this.businessBarList = res.data;
                            }
                            if(res.data.length<10){
                              window.removeEventListener('scroll', this.handleScroll)
                            }
                            _this.clock = 1;
                            _this.page+=1
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
destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
},
components:{
business,
merchantDom,
}
};
</script>

<style scoped>
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
.search-div{
    display: flex;
    padding: 7px 0 7px 13px;
    align-items: center;
    background-color: #fff;
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
