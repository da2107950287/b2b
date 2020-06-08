import Vue from "vue";
import Axios from "axios";
import { api } from './apiHeader.js';
import {apiUrl} from './apiHeader.js';
import router from '../../router'
import $ from 'jquery';
import { fromByteArray } from "ipaddr.js";

/*
    post方法请求
*/
var headerApi = new api();
let _this = Vue.prototype;
export function post(url,data={}){
    return new Promise((resolve,reject) => {
        Axios.post(new apiUrl().apiUrl+url,data,{headers:headerApi})
            .then(response => {
                switch (response.data.code){
                    case 10:
                        let wechatToUpdateDate = localStorage.getItem('wechatToUpdateDate');
                        let sendMsgNum = localStorage.getItem('sendMsgNum');
                        let sendMsgTime = localStorage.getItem('sendMsgTime');
                        let indexAlertTime = localStorage.getItem('indexAlertTime');
                        let region = localStorage.getItem('wapres');
                        let wxPoint = localStorage.getItem('wxPoint');
                        let getLocation = localStorage.getItem('getLocation')
                        let cityInfo = localStorage.getItem('cityInfo')

                        localStorage.clear();
                        sessionStorage.clear();
                        if(cityInfo){
                            localStorage.setItem('cityInfo',cityInfo);
                        }
                        if(region){
                            localStorage.setItem('wapres',region);
                        }
                        if(wxPoint){
                            localStorage.setItem('wxPoint',wxPoint);
                        }
                        if(getLocation){
                            localStorage.setItem('getLocation',getLocation);
                        }
                        if(indexAlertTime){
                            localStorage.setItem('indexAlertTime',indexAlertTime);
                        }
                        if(wechatToUpdateDate){
                            localStorage.setItem('wechatToUpdateDate',wechatToUpdateDate);
                        }
                        if(sendMsgNum>0){
                            localStorage.setItem('sendMsgNum',sendMsgNum);
                            localStorage.setItem('sendMsgTime',sendMsgTime);
                        }
                        if(is_wexin()){
                            _this.$toast('账号未登录，请登录!');
                            // router.push({
                            //     path:'/wechatLogin'
                            // });
                            window.location.href = `${apiUrl().apiUrl}/m/wechatLogin?t=${new Date().getTime()}`
                        }else{
                            _this.$toast('账号未登录，请登录!');
                            // router.push({
                            //     path:'/login'
                            // });
                            window.location.href = `${apiUrl().apiUrl}/m/login?t=${new Date().getTime()}`
                        }
                        break;
                    case 11:
                        _this.$toast('当前为普通用户，请升级为企业用户!');
                        router.push({
                            path:'/wechat/toUpdate'
                        });
                        break;
                    case 12:
                        _this.$toast('当前企业用户正在审核中!');
                        router.push({
                            path:'/wechat/login?review=1&status=' + response.data.state
                        });
                        break;
                }
                resolve(response.data);
            }),err => {
                console.log(err);
                reject(err);
            }
    }).catch(res => {
        console.log(res);
    });
}
// 测试请求
export function getCode(url,data={}){
    return new Promise((resolve,reject) => {
        Axios.post(new apiUrl().apiUrl+url,data,{headers:headerApi,responseType: "arraybuffer"})
        // Axios.post(url,data)
            .then(response => {
                switch (response.data.code){
                    case 10:
                        _this.$toast('账号未登录，请登录!');
                        router.push({
                            path:'/login'
                        });
                        break;
                    case 11:
                        _this.$toast('当前为普通用户，请升级为企业用户!');
                        router.push({
                            path:'/wechat/toUpdate'
                        });
                        break;
                    case 12:
                        _this.$toast('当前企业用户正在审核中!');
                        router.push({
                            path:'/wechat/login?review=1&status=' + response.data.state
                        });
                        break;
                }
                resolve(response.data);
            }),err => {
                reject(err);
            }
    }).catch(res => {
        console.log(res);
    });;
}

/*
    定位方法
*/
export function location(){
    let geolocation = new BMap.Geolocation();
    return new Promise((resolve,reject)=> {
        geolocation.getCurrentPosition(function getinfo(position){
            resolve(position);
        }, function(e) {
            reject(e)
        }, {provider: 'baidu'});
    })
}
/*
    时间处理方法
*/
export function HandleTime(date){
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    var myHours = date.getHours();
    var myMinutes = date.getMinutes();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    if (myHours < 10) {
        myHours = "0" + myHours;
    }
    if (myMinutes < 10) {
        myMinutes = "0" + myMinutes;
    }

    return (myyear + "-" + mymonth + "-" + myweekday + " " +myHours + ":" +myMinutes);
}

/* 计算时间天数 */
export function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
    let dateSpan,iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
};
/*
    处理多属性
*/
export function HandleData(data){
    // const Alldata = JSON.parse('{"data":{"pro":[],"spe":{"a48":{"attr_type":"1","name":"\u989c\u8272","id":"48","values":{"0":{"label":"\u7ea2\u8272","img_flie":"","checked":"0","attr_sort":"66","combo_checked":0,"id":"66"},"1":{"label":"\u9ec4\u8272","img_flie":"","checked":"0","attr_sort":"67","combo_checked":0,"id":"67"},"2":{"label":"\u84dd\u8272","img_flie":"","checked":"0","attr_sort":"68","combo_checked":0,"id":"68"}}},"a79":{"attr_type":"1","name":"\u8f9e\u804c","id":"79","values":{"0":{"label":"xl","img_flie":"","checked":"0","attr_sort":"1","combo_checked":0,"id":"63"},"1":{"label":"sl","img_flie":"","checked":"0","attr_sort":"2","combo_checked":0,"id":"64"},"2":{"label":"ssl","img_flie":"","checked":"0","attr_sort":"3","combo_checked":0,"id":"65"}}},"a95":{"attr_type":"1","name":"\u5c5e\u6027\u4e09","id":"95","values":{"0":{"label":"\u5c5e\u60271","img_flie":"","checked":"0","attr_sort":"69","combo_checked":0,"id":"69"},"1":{"label":"\u5c5e\u60272","img_flie":"","checked":"0","attr_sort":"70","combo_checked":0,"id":"70"},"2":{"label":"\u5c5e\u60273","img_flie":"","checked":"0","attr_sort":"71","combo_checked":0,"id":"71"}}},"a96":{"attr_type":"1","name":"\u5c5e\u60274","id":"96","values":{"0":{"label":"\u5c5e\u60274-1","img_flie":"","checked":"0","attr_sort":"0","combo_checked":0,"id":"72"},"1":{"label":"\u5c5e\u60274-2","img_flie":"","checked":"0","attr_sort":"74","combo_checked":0,"id":"74"},"2":{"label":"\u5c5e\u60274-3","img_flie":"","checked":"0","attr_sort":"76","combo_checked":0,"id":"76"}}},"a97":{"attr_type":"1","name":"\u5c5e\u60275","id":"97","values":{"0":{"label":"\u5c5e\u60275-1","img_flie":"","checked":"0","attr_sort":"73","combo_checked":0,"id":"73"},"1":{"label":"\u5c5e\u60275-2","img_flie":"","checked":"0","attr_sort":"75","combo_checked":0,"id":"75"},"2":{"label":"\u5c5e\u60275-3","img_flie":"","checked":"0","attr_sort":"77","combo_checked":0,"id":"77"}}}},"lnk":[]},"msg":"\u5df2\u83b7\u53d6\u6570\u636e","code":0}');
    // let data = Alldata.data.spe;
    let info = {
        infoOne:[],
        infoTwo:[],
    };
    let length= Object.getOwnPropertyNames(data).length-1;
    let index = 0;
    for(let name in data){
        if(index < length -1){
            info.infoOne.push(data[name]);
        }else{
            info.infoTwo.push(data[name]);
        }
        index++;
    }
    console.log(info);
    return info;
}
/* 获取价格 */
export function getPrice(val){
    let cartValue = {};
    //当前商品属性ID
    const goodsID = val.parents('.shoppingCart-goods-title-info').attr('data-id');
    //当前商品属性数量
    const goodsSum = val.parents('.shoppingCart-goods-title-info').find('input[type="text"]').val();
    //商家ID
    const seller_id = val.parents('.pang-row').attr('sid');
    //方案ID
    const wholesale_id = val.parents('.pang-row').attr('wid');
    cartValue.c = goodsID;
    cartValue.n = goodsSum;

    return{
        cartValue:[cartValue],
        seller_id:seller_id,
        wholesale_id:wholesale_id
    }
}
/* 判断是否是微信 */
export function is_wexin(){
    let  ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    }
    return false;
}
/* 常用公共方法 */
export function appFunc() {}
let func = {
    //数组根据str字段 合并
    sortArr:function(arr, str){
        // 传入一个数组
        // 按照特定方式格式化
        var _arr = [],
            _t = [],
            // 临时的变量
            _tmp;

        // 按照特定的参数将数组排序将具有相同值得排在一起
        arr = arr.sort(function(a, b) {
            var s = a[str],
                t = b[str];

            return s > t ? -1 : 1;
        });

        if ( arr.length ){
            _tmp = arr[0][str];
        }
        // console.log( arr );
        // 将相同类别的对象添加到统一个数组
        for (var i in arr) {
            if ( arr[i][str] === _tmp ){
                _t.push( arr[i] );
            } else {
                _tmp = arr[i][str];
                _arr.push( _t );
                _t = [arr[i]];
            }
        }
        // 将最后的内容推出新数组
        _arr.push( _t );
        return _arr;
    },
    //验证手机号
    isPhone:function(phone){
        let isPhone = /^[1][0-9][0-9]{9}$/;//手机号码
        if(!isPhone.test(phone)){
            return false;
        };
        return true;
    },
    //判断空
    isEmpty:function(str){
        if (typeof(str) != "undefined" && str != null && str != '') {
            return false;
        }
        return true;
    },
    //判断方法是否为空
    isEmptyObject: function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },
    //截取字符省略号
    cutString:function(str,num=20){
        var len = str.length;
        var strlen = 0;
        var s = "";
        for(var i = 0;i < str.length; i++) {
            s = s + str.charAt(i);
            strlen = strlen + 1;
            if(strlen >= num){
                return s.substring(0,s.length-2) + "...";
            }
        }
        return s;
    },
    //拷贝数组
    copy:function(obj){
        let objcopy = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === "object") {
                        objcopy[key] = copy(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objcopy[key] = obj[key];
                    }
                }
            }
        }
        return objcopy;
    },
    
    //判断是否是function
    isFunction: function(source) {
        // chrome下,'function' == typeof /a/ 为true.
        return '[object Function]' == Object.prototype.toString.call(source);
    },

    //记录短信数量方法
    getSednMsgNum:function(){
        return true;
        let sendMsgNum = localStorage.getItem('sendMsgNum') ? localStorage.getItem('sendMsgNum') : 0;
        let sendMsgTime = localStorage.getItem('sendMsgTime');
        var timestamp= new Date().getTime();
        /* if(!Number(sendMsgTime)){
            localStorage.setItem('sendMsgTime',timestamp);
            return true;
        }else{
            if(Number(sendMsgTime) + 3600000 > Number(timestamp)){
                if(sendMsgNum > 10){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        } */
    },
    setSendMsgNum:function(){
        return true;
        let sendMsgNum = localStorage.getItem('sendMsgNum') ? localStorage.getItem('sendMsgNum') : 0;

        var timestamp= new Date().getTime();
        let sendMsgTime = localStorage.getItem('sendMsgTime');
        /* if(!sendMsgTime){
            localStorage.setItem('sendMsgNum',1);
            localStorage.setItem('sendMsgTime',timestamp);
        }else{
            if(Number(sendMsgTime) + 3600000 < Number(timestamp)){
                localStorage.setItem('sendMsgTime',timestamp);
                localStorage.setItem('sendMsgNum',1);
            }else{
                sendMsgNum++ ;
                localStorage.setItem('sendMsgNum',sendMsgNum);
            }
        } */
    },

    stripscript:(value)=>{
	    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
        if(value.replace(pattern)){
            console.log(value);
        }
    },
    
    setCache:()=>{//清除缓存
        let wechatToUpdateDate = localStorage.getItem('wechatToUpdateDate');
        let sendMsgNum = localStorage.getItem('sendMsgNum');
        let sendMsgTime = localStorage.getItem('sendMsgTime');
        let indexAlertTime = localStorage.getItem('indexAlertTime');
        let region = localStorage.getItem('wapres');
        let wxPoint = localStorage.getItem('wxPoint');
        let getLocation = localStorage.getItem('getLocation')
        let cityInfo = localStorage.getItem('cityInfo')

        localStorage.clear();
        sessionStorage.clear();
        if(cityInfo){
            localStorage.setItem('cityInfo',cityInfo);
        }
        if(region){
            localStorage.setItem('wapres',region);
        }
        if(wxPoint){
            localStorage.setItem('wxPoint',wxPoint);
        }
        if(getLocation){
            localStorage.setItem('getLocation',getLocation);
        }
        if(indexAlertTime){
            localStorage.setItem('indexAlertTime',indexAlertTime);
        }
        if(wechatToUpdateDate){
            localStorage.setItem('wechatToUpdateDate',wechatToUpdateDate);
        }
        if(sendMsgNum>0){
            localStorage.setItem('sendMsgNum',sendMsgNum);
            localStorage.setItem('sendMsgTime',sendMsgTime);
        }
    },
};
appFunc.prototype = func;



class Public{}
Object.assign(Public.prototype,{
    appFunc,
    getPrice,
    HandleData,
    is_wexin,
    datedifference,
    HandleTime,
    location,
    getCode,
    post,
})
let pubilc = new Public();
export default pubilc;