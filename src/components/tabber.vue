<template>
  <div>
    <div class="main-div" style="overflow-x:hidden;">
        <router-view @toPage="toPage" @removeShoppingCar="removeShoppingCar" @getShoppingCar="getShoppingCar" :indexAlertShow="indexAlertShow" />
    </div>
    <van-tabbar v-model="active" class="tabbar-bar" @change="activeTabber">
      <van-tabbar-item >
        <div class="active" slot-scope="props" v-if="props.active">
              <img class="svg" src="../assets/img/sy1.png" alt="">
              <div>首页</div>
        </div>
        <div class="" v-else>
              <img class="svg" src="../assets/img/sy.png" alt="">
              <div>首页</div>
        </div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div class="active" slot-scope="props" v-if="props.active">
              <img class="svg" src="../assets/img/fl1.png" alt="">
              <div>批发分类</div>
        </div>
        <div class="" v-else>
              <img class="svg" src="../assets/img/fl.png" alt="">
              <div>批发分类</div>
        </div>
      </van-tabbar-item>
      
      <van-tabbar-item>
        <div class="active" slot-scope="props" v-if="props.active">
              <img class="svg" src="../assets/img/usedList1.png" alt="">
              <div>常用清单</div>
        </div>
        <div class="" v-else>
              <img class="svg" src="../assets/img/usedList.png" alt="">
              <div>常用清单</div>
        </div>
      </van-tabbar-item>

      <van-tabbar-item id="shopCart">
        <div class="active" slot-scope="props" v-if="props.active">
              <img class="svg" src="../assets/img/gwc1.png" alt="">
              <div>购物车</div>
        </div>
        <div class="" v-else>
              <img class="svg" src="../assets/img/gwc.png" alt="">
              <div>购物车</div>
              <span class="tabber-dot" v-if="showDot">{{shoppingNum}}</span>
        </div>
      </van-tabbar-item>
      <van-tabbar-item >
        <div class="active" slot-scope="props" v-if="props.active">
              <img class="svg" src="../assets/img/me1.png" alt="">
              <div>个人中心</div>
        </div>
        <div class="" v-else>
              <img class="svg" src="../assets/img/me.png" alt="">
              <div>个人中心</div>
        </div>
      </van-tabbar-item>
    </van-tabbar>

    <loading v-if="loadingShow == 'true'"></loading>
  </div>
</template>

<script>
  import Vue from 'vue'
  import '../assets/font/iconfont.css'
  import '../assets/fonts/iconfont.css'
  import loading from './loading.vue'
  import {cacheStorage} from '../assets/js/cache.js'
  Vue.prototype.$cacheStorage = cacheStorage;
  
  export default {
    data() {
      return {
        active: 0,
        nowPath: '',
        loadingShow:'true',
        showDot:false,
        shoppingNum:0,

        indexAlertShow:false,//首页弹窗
      }
    },
    components:{
        loading,
    },
    created(){
      // 获取购物车数量
      this.$cacheStorage(
          'shoppingCarCount',
          '/?c=cart&a=num',
          'local',
          {},
          ((res)=>{
              if(res.data && res.data.num && res.data.num>0){
                this.showDot = true;
                this.shoppingNum = res.data.num;
              }
          }),
      )
    },
    mounted(){
      this.changTabBarActive();
      
      if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('loading'))){
        this.loadingShow = localStorage.getItem('loading');
      }else{
        let num = localStorage.getItem('loadingNumber') || 0;
        if(num >= 1){
          this.loadingShow = 'false';
          localStorage.setItem('loading','false')
        }else{
          num++
          localStorage.setItem('loadingNumber',num);
          this.loadingShow = 'true';
        }
      }
    },
    // updated(){
    //   console.log('updated');
    //   this.changTabBarActive();
    //   if(this.nowPath == '/'){
    //     this.activeTabber(this.active);
    //   }
    // },
    methods:{
      toPage(item){
        this.active = item.index
        this.nowPath = item.path
        this.activeTabber(item.index,item.query);
      },
      getShoppingCar(){
        this.$cacheStorage(
          'shoppingCarCount',
          '/?c=cart&a=num',
          'local',
          {},
          ((res)=>{
            if(res.code == 0){
              this.indexAlertShow = true;
              if(res.data.num>0){
                this.showDot = true;
                this.shoppingNum = res.data.num;
              }else{
                this.showDot = false;
                this.shoppingNum = 0;
              }
            }
          }),
        )
      },
      removeShoppingCar(){
        this.showDot = false;
        this.shoppingNum = 0;
      },
      changTabBarActive(){
        this.nowPath = this.$route.path;
        if(this.nowPath == '/wholesale'){
          this.active = 1
        }else if(this.nowPath == '/usedList'){
          this.active = 2
        }else if(this.nowPath == '/shoppingCart'){
          this.active = 3
        }else if(this.nowPath == '/personal'){
          this.active = 4
        }else if(this.nowPath == '/index'){
          this.active = 0
        }else if(this.nowPath == '/'){
          this.$router.push({path:'index'});
        }
      },
      activeTabber(index,query){
        switch(index){
          case 0:
            this.$router.push({path:'/index'});
            break;
          case 1:
            this.$router.push({path:'/wholesale'});
            break;
          case 2:
            this.$router.push({path:'/usedList'});
            break;
          case 3:
            this.$router.push({path:'/shoppingCart',query:query});
            break;
          case 4:
            this.$router.push({path:'/personal'});
            break;
          default:
            break;
        }
      }
    },
    activated(){
      this.getShoppingCar();
      this.changTabBarActive();
    },
  }
</script>

<style scoped>
  /* 修改默认选中样式 */
  .van-tabbar-item{
    position: relative;
  }
  .van-tabbar-item--active{
    color: #EE2D2D;
  }
  .tabber-dot{
    position: absolute;
    font-size: 12px;
    background-color: #EE2D2D;
    border-radius: 15px;
    top: 0;
    left: 55%;
    color: #fff;
    text-align: center;
    padding: 0px 5px;
    line-height: normal;
  }
  /* .tabber-dot{
    position: absolute;
    font-size: 18px;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
  .tabber-dot::after{
    top: 5px;
    right: -25px;
    width: 10px;
    height: 10px;
    left: 0;
    margin: auto;
    content: ' ';
    position: absolute;
    border-radius: 100%;
    background-color: #EE2D2D;
  } */
  .tabbar-bar{
    border-top: 1px solid #d0d0d0;
    z-index:99999 !important;
  }
  /* 图标大小 */
  .tabbar-bar i{
    font-size: 22px;
  }
  .tabbar-bar .hiuse{
    color:#EE2D2D;
  }
  .tabbar-bar img{
    height: 22px;
    margin:  0 auto 5px;
    display: block;
  }

</style>