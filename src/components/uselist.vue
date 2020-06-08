<template>
  <div>
      <navbar type="left" title="收藏列表" @clickleft="onClickLeft"></navbar>
      <div v-if="show === 2" class="contain">
        <van-swipe-cell :right-width="88" class="specialbox" v-for="(item,index) in favoritelist" :key="index">
            <div @click="toGoodsItem(item.wholesale_id)">
                <van-cell-group class="specialcontent">
                    <div class="userImg">
                        <img v-if="item.goods_thumb" :src="item.goods_thumb" width="100%" class="nongImg"/>
                        <img v-else src="../assets/img/no_picture.gif" width="100%" class="nongImg"/>
                    </div>
                    <div class="refund_icon" v-if='item.activity'>
                        <span class="red" v-if="item.activity[0] == 1">抢购</span>
                        <span class="yellow" v-else-if="item.activity[0] == 2">团购</span>
                    </div>
                    <div class="userContent  fz_16">
                      <div class="noongTitle">{{item.goods_name}}</div>
                      <div class="noongTitle fz_12 color_999">{{item.collectCount}}人收藏</div>
                      <div class="noonglian-attr-box">
                          <div class="noonglianBox">
                          <div class='noonglian color_EE2D2D'>
                            <span class="fz_12">&yen;</span>
                            <span>{{item.goods_price}}</span>
                            <span class="fz_12" v-show="item.goods_unit">/{{item.goods_unit}}</span>
                          </div>
                          </div>
                        <div class="toShop dflex fz_12" @click.stop="toShop(item.ru_id)">
                          <div class="color_808080">{{item.shop_name}}</div>
                          <div class="to-shop fz_12 color_424242 dflex">
                            <div class="to-shop-label">进店</div>
                            <img class="to-shop-img" src="../assets/img/gostopright.png" alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                </van-cell-group>
            </div>
            <van-button slot="right" type='danger' @click="deleteGoods(item)" >取消<br>收藏</van-button>
        </van-swipe-cell>
        <div v-if="lock===1" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
        <p class="end-msg">{{endMsg}}</p>
        <div v-if="!endMsg" style="height: 100px;"></div>
      </div>
      <div v-else-if="show === 1">
          <searchNone item="uselist"></searchNone>
          <special></special>
      </div>
      <div v-else class="vantLoading">
          <vloading :vertical="false" text=""></vloading>
      </div>
  </div>
</template>

<script>
import $ from "jquery";

import "../assets/css/commonstyle.css"
import special from "./component/recommendComponent/special.vue";
import searchNone from "./component/searchNone/searchNone.vue";
import vantLoading from "./vantLoading.vue";
import vloading from "./vloading.vue";
import navbar from "./navbar/nav.vue";
export default {
    components:{
        special,
        searchNone,
        navbar,
        vantLoading,
        vloading
    },
    data(){
      return{
          show: 0,
          favoritelist:[],
          page:2,
          endMsg:'',
          lock:0,
      }
    },
    created(){
      console.log(this.$parent);
      this.$post('/?c=goods&a=getCollect',{
          page:1,
          limit:10,
      }).then((res)=>{
          this.favoritelist = res.data;
          if(this.favoritelist.length) {
            this.show = 2;
            if(res.data.length>9){
              window.addEventListener('scroll', this.handleScroll)
            }
          }else {
            this.show =1;
          }

      });

    },
    methods:{
        toShop(sid){
          this.$router.push({
              path:'/shop',
              query:{index:sid}
          })
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        deleteGoods(item){
          this.$parent.$refs.loading.style.display = 'flex'
          //  获取当前点击项
          const eve = event.srcElement ? event.srcElement : event.target;
          //当前商品
          const parent = $(eve).parents('.specialcontent')

          this.$post("/?c=goods&a=delCollect", {
              // 接口传值
            wholesale_id: item.wholesale_id
          }).then((res) => {
            this.$parent.$refs.loading.style.display = 'none'
            if(res.code==0){
              let n = 0;
              for(;n < this.favoritelist.length; n++) {
                if(this.favoritelist[n].wholesale_id === item.wholesale_id) {
                  this.favoritelist.splice(n ,1)
                  break
                }
              }
              if(!this.favoritelist.length) {this.show = 1}
              this.$toast('取消成功');
            }else{
            }
          });
        },
        toGoodsItem(id){
          console.log(id)
          this.$router.push({
              path:'/goods',
              query:{goods:id}
          })
        },
        //商品瀑布流加载
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
                    _this.$post('/?c=goods&a=getCollect',{
                        page:_this.page,
                    }).then((res) => {
                        switch (res.code){
                            case 0:
                                _this.lock = 0;
                                _this.page+=1;
                                if(res.data.length>0){
                                    _this.favoritelist=[..._this.favoritelist,...res.data];
                                }
                                if(res.data.length<10){
                                    _this.endMsg = '已经没有更多内容啦~';
                                    window.removeEventListener('scroll', this.handleScroll)
                                }
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
}
</script>
<style scoped lang="less">
.specialbox{
    background-color: #ffffff;
  .specialcontent{
    display: flex;
    padding: 10px 12px;
.userImg{
      margin: auto 0;
      max-width: 6.29rem;
      min-width: 6.29rem;
      max-height: 6.29rem;
      min-height: 6.29rem;
      border-radius: 10px;
      overflow: hidden;
      img{
        max-width: 100%;
    display: block;
}
    }
.userContent{
      margin: 0;
      margin-left: 10px;
      position: relative;
      width: calc(100% - 6.29rem - 10px);
      .noongTitle{
        margin-bottom: 5px;
        
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      .noonglian-attr-box{
        position: absolute;
        bottom: 0;
      }
    }
    .toShop{
      margin-top: 6px;
      .to-shop{
          margin-left: 5px;
          line-height: .64rem;
          .to-shop-label{
              margin: auto 0;
              margin-right: 5px;
              word-break: break-word;
              max-width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
              /* autoprefixer: on */
          }
          .to-shop-img{
              display: block;
              height: 8px;
              margin: auto 0;
          }
      }
    }
  }
}

.van-button{
  height: 100%;
  line-height: normal;
  padding: 0 29px;
}
.vantLoading{
    margin-top: 20px;
    width: 100%;
  display: flex;
}
.business-loading {
    padding: 10px;       
}
.noonglianBox{
  display: flex;
}

.refund_icon {
  font-size: 12px;
  color: #ffffff;
  overflow: hidden;
  position: absolute;
  left: 12px;
  top: 10px;
}
.refund_icon .red {
  padding: 1px 3px;
  background-color: #ee2d2d;
  // background: url('../../../assets/img/button-bg.png') repeat;
  // -webkit-background-size: auto 100%;
  // background-size: auto 100%;
  border-radius: 5px;
  float: left;
  margin-right: 5px;        
  overflow: hidden;
}
.refund_icon .yellow {
  padding: 1px 3px;
  background-color: #FDA341;
  // background: url('../../../assets/img/button-bg-yellow.png') repeat;
  // -webkit-background-size: auto 100%;
  // background-size: auto 100%;
  border-radius: 5px;   
  float: left;   
  overflow: hidden;
}
.end-msg {
  font-size: 14px;
  text-align: center;
  color: #c9c9c9;
  line-height: 3em;
  margin: 0;
}
</style>