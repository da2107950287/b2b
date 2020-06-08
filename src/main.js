// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SvgIcon from 'vue-svgicon'
import './assets/svg'   //引入svg-icon
import $ from 'jquery'
import _config from '../static/config.json'

import {
  Row,
  Col,
  Search,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Lazyload,
  Loading,
  Toast,
  Field,
  Button,
  Uploader,
  Tag,
  Tab,
  Tabs,
  List,
  Step,
  CellGroup,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  DatetimePicker,
  Actionsheet,
  Picker,
  RadioGroup,
  Radio,
  Area,
  SwipeCell,
  Rate,
  Cell,
  Switch,
  SwitchCell,
  Steps,
  Popup,
  Collapse, 
  CollapseItem,
  Dialog,
  Badge,
  BadgeGroup,
  TreeSelect,
  ImagePreview,
  NoticeBar
} from 'vant';
Vue.use(Row)
   .use(Col)
   .use(Search)
   .use(Swipe)
   .use(SwipeItem)
   .use(Tabbar)
   .use(TabbarItem)
   .use(NavBar)
   .use(Icon)
   .use(Lazyload)
   .use(Loading)
   .use(Toast)
   .use(Field)
   .use(Button)
   .use(Uploader)
   .use(Tag)
   .use(Tab)
   .use(Tabs)
   .use(List)
   .use(Step)
   .use(Steps)
   .use(CellGroup)
   .use(SubmitBar)
   .use(Checkbox)
   .use(CheckboxGroup)
   .use(Stepper)
   .use(GoodsAction)
   .use(GoodsActionBigBtn)
   .use(GoodsActionMiniBtn)
   .use(DatetimePicker)
   .use(Actionsheet)
   .use(Picker)
   .use(RadioGroup)
   .use(Radio)
   .use(Area)
   .use(SwipeCell)
   .use(Rate)
   .use(Cell)
   .use(Switch)
   .use(SwitchCell)
   .use(Popup)
   .use(Collapse)
   .use(CollapseItem)
   .use(Dialog)
   .use(Badge)
   .use(BadgeGroup)
   .use(TreeSelect)
   .use(ImagePreview)
   .use(NoticeBar)
  ;
  Vue.use(SvgIcon, {
    tagName: 'svgicon'
  })
Vue.config.productionTip = false;
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
// import {post,appFunc,setPOST} from './assets/js/commonAPI'
import Public from './assets/js/commonAPI'

Vue.prototype.$post = Public.post;
Vue.prototype.$appFunc = Public.appFunc;
Vue.prototype.$getCode = Public.getCode;
import {cacheStorage} from './assets/js/cache.js'
Vue.prototype.$cacheStorage = cacheStorage;
import {parabola} from './assets/js/parabola.js'
Vue.prototype.$parabola = parabola;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

// import Axios from "axios";
// const CancelToken = Axios.CancelToken;
// store = {
//     source: {
//         token: null,
//         cancel: null
//   }
// }

import Axios from "axios";
let pending = [];
let cancelToken = Axios.CancelToken;
let cancelPending = (config) => {
  const len = pending.length - 1;
  let index = len;
  for(; index >= 0; index--) {
    if(!!config) {
      //清除重复请求
      if(pending[index].u == config.url) {
        pending[index].f(); //取消操作
        pending.splice(index, 1); //将这条记录从数组中删除
      }
    }else {
      //页面跳转时， 清除所有正在进行的请求
      pending[index].f(); //取消操作
      pending.splice(index, 1); //将这条记录从数组中删除            
    }
  }
};

//axios 请求拦截器
Axios.interceptors.request.use(config => {
    if(localStorage.getItem('b2bTokenId')) {
      // Axios.defaults.headers.common['Token'] = localStorage.getItem('b2bTokenId');
      config.headers.Token = localStorage.getItem('b2bTokenId');
    }
    cancelPending(config);
    config.cancelToken = new cancelToken((c) => {
      pending.push({'u': config.url, 'f': c});
    });
    return config;
  }, err => {
    return Promise.reject(err);
  }
);
//响应拦截器
Axios.interceptors.response.use(response => {
    cancelPending(response.config);
    return response;
  }, error => {
  if (error.response) {
  }
  return {data: {}}; // 返回接口返回的错误信息（这里返回空对象是为了避免控制台报错）
});

router.beforeEach((to, from, next) => {
  cancelPending();
  next();
});
router.afterEach( ( to, from, next ) => {
  Vue.prototype.fromHerf = from.name;
  // window.scroll(0, 0);
  function getClass(tagName,aClass){
    let aEle = document.getElementsByTagName(tagName);　　  
    let result = []; 
    let className = '';
　　for(let i=0;i<aEle.length;i++){  
        if(aEle[i].className != ''){
          className = aEle[i].className;
          if(className.indexOf(aClass) > -1){
            result.push(aEle[i])
          }else{
            if(aEle[i].className == aClass){   
              result.push(aEle[i]) 
            }
          }
        }
　　}
　　return result
  }
  setTimeout(()=>{
    let _hmt = _hmt || [];
    (function() {
      //每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
      let hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?"+_config.baiduID;
      hm.id = "baidu_tj";
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },0);

  setTimeout(()=>{
    let _hmt = _hmt || [];
    (function() {
      //重加载环信
      let easemobimPromptWrapper = getClass("div","easemobim-prompt-wrapper");
      if(easemobimPromptWrapper.length > 0){
          for(let i=0;i<easemobimPromptWrapper.length;i++){
            easemobimPromptWrapper[i].remove();
          }
      }
      let easemobimMobile = getClass("iframe","easemobim-mobile");
      if(easemobimMobile.length > 0){
        for(let i=0;i<easemobimMobile.length;i++){
          easemobimMobile[i].remove();
        }
      }

      document.getElementById('kefuEasemob') && document.getElementById('kefuEasemob').remove();
      let hm = document.createElement("script");
      hm.src = "//kefu.easemob.com/webim/easemob.js";
      hm.id = "kefuEasemob";
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);

      $('body').removeClass('easemobim-mobile-body')
    })();
  },0);
} );
