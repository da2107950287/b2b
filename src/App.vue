<template>
  <div id="app" >
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    
    </router-view> 
    
    <div ref="loading" class="vantLoading">
        <vloading :vertical="false" text=""></vloading>
    </div>
  </div>
</template>

<script>

import { is_wexin } from './assets/js/commonAPI.js'
import { wxStart } from './assets/js/wxjs.js'

const vloading =  ()=>import("./components/vloading.vue");

export default {
  name: 'App',
  data(){
    return {
    }
  },
  created(){
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(is_wexin() && isiOS){
      let pathname = location.href.split('#')[0];
      if(pathname.substr(pathname.length-1,1) == "/") {
        pathname = pathname + 'index';
      }
      sessionStorage.setItem('pathname',pathname)
    }

    //移除页面渲染的初始动画
    if(document.getElementById("indexDefaultLoading")) {
      const indexDefaultLoading = document.getElementById("indexDefaultLoading");
      document.body.removeChild(indexDefaultLoading);
    }
  },
  methods:{
  },
  components:{
    vloading
  }
}
</script>

<style>
html,
body{
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
#app{
  height: 100%;
  
}
</style>

<style lang="less" scoped>
.vantLoading{
    margin-top: -20px;
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 9999;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
}
</style>
