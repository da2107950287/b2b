import Axios from "axios";
import { api } from './apiHeader.js';
import {apiUrl} from './apiHeader.js';
import {post,appFunc} from './commonAPI.js';
import $ from 'jquery';
import { fromByteArray } from "ipaddr.js";

/* 完成微信图片上传，返回图片地址
*   type 100 上传图片多图保存localStorage
*/

let url = '';  //分享的文章地址
let appId = '';
let timestamp = '';
let nonceStr = '';
let signature = '';



function startConfig(config){
    wx.config({
        debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名
        jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getLocation',
            'chooseWXPay',
            "onMenuShareTimeline", 
            "onMenuShareAppMessage",
            "onMenuShareQQ"
        ] // 必填，需要使用的JS接口列表
    });
}

/**
 * 
 * @param {object} config jssdk config配置
 * @param {object} _this 当前调用时的DOM
 * @param {string} name localStorage存储键名
 * @param {int} type 
 * @param {object} callback 成功回调
 * @param {object} uploadImageCancel 取消回调
 */
export function wxUpload(config,_this,name,sourceType,callback,uploadImageCancel){//微信单图片上传
    
    function afterUploadToWx(serverId){
        _this.$post('/?c=wechat&a=downloadImage',{
            "serverId":serverId
        })
        .then((res)=> {
            if(res.code === 0){
                localStorage.setItem(name,res.data.thumb);
                callback(res.data.thumb);
            }else if(res.code === 1){
                _this.imgLock = 0;
                localStorage.setItem(name,'');
                _this.$toast(res.msg);
            }else{
                localStorage.setItem(name,'');
                _this.$toast('上传失败!error:downloadImage');
            }
        });
    }
    if(!appFunc.prototype.isEmptyObject(config)){
        startConfig(config)
    }
    
    /* wx.config({
        debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名
        jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getLocation',
            'chooseWXPay',
        ] // 必填，需要使用的JS接口列表
    }); */
    if(!appFunc.prototype.isEmpty(sourceType) && sourceType != 100){
        sourceType = sourceType;
    }else{
        sourceType = ['album', 'camera']
    }
    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: [
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ],
            success: function (res) {
                if (res.checkResult.getLocation == false) {
                    _this.$toast('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    return;
                }else{
                    //调用 拍照或从手机相册中选图接口
                    wx.chooseImage({
                        count: 1,
                        sourceType: sourceType, 
                        success: function(res) {
                            //返回选定照片的本地ID列表
                            //上传图片函数
                            wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProcess: 1,   // 默认为1，显示进度提示
                                success: function(res) {
                                    //返回图片的服务器端ID res.serverId,然后调用wxImgCallback函数进行下载图片操作
                                    afterUploadToWx(res.serverId);  // 返回图片的服务器端ID
                                },
                                fail: function(res) {
                                    uploadImageCancel();
                                    _this.$toast('上传失败!error:uploadImage');
                                }
                            });
                        },
                        fail: function(res){
                            uploadImageCancel();
                            _this.$toast('上传失败!error:chooseImage');
                        },
                        cancel:function(){
                            uploadImageCancel();
                        }
                    });
                }
            }
        });
    });
}
/**
 * 
 * @param {array} config 微信jssdk config配置
 * @param {array} _this dom节点
 * @param {string} name 缓存名称
 * @param {number} type 上传图片类型
 * @param {array} callback 成功回调
 * @param {number} count 上传图片数量
 * @param {array} uploadImageBeforCall 上传前回调处理
 * @param {array} uploadImageCancel 取消上传回调处理
 */
export function wxMoreUpload(config,_this,name,sourceType,callback,count=1,uploadImageBeforCall,failUploadImageCall,uploadImageCancel){ //微信多图上传
    /**
     * 
     * @param {String} serverId 微信返回图片serverId
     */
    function afterUploadToWx(serverId){//
        let newDate = new Date().getTime()
        _this.$post('/?c=wechat&a=downloadImage&t='+ newDate,{//微信上传成功一次 调用一次接口上传图片
            "serverId":serverId
        }).then((res)=> {
            if(res.code === 0){
                callback(res.data.thumb);
            }else if(res.code === 1){
                _this.imgLock = 0;
                localStorage.setItem(name,'');
                _this.$toast(res.msg);
            }else{
                localStorage.setItem(name,'');
                uploadImageCancel();
                _this.$toast('上传失败!error:downloadImage');
            }
        }).catch((error)=>{
            // 处理 getJSON 和 前一个回调函数运行时发生的错误
            failUploadImageCall(error);
            console.log('发生错误！', error);
        });
    }
    if(!appFunc.prototype.isEmptyObject(config)){
        startConfig(config)
    }
    /* wx.config({
        debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名
        jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getLocation',
            'chooseWXPay',
        ] // 必填，需要使用的JS接口列表
    }); */
    if(!appFunc.prototype.isEmpty(sourceType) && sourceType != 100){
        sourceType = sourceType;
    }else{
        sourceType = ['album', 'camera']
    }
    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: [
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ],
            success: function (res) {
                if (res.checkResult.getLocation == false) {
                    _this.$toast('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    return;
                }else{
                    chooseImage();//上传一张请求一次 
                }
            }
        });
    });
    function chooseImage(call){
        wx.chooseImage({
            count: count,
            sourceType:sourceType,
            success: function(res) {
                //返回选定照片的本地ID列表
                //上传图片函数
                var localIds = res.localIds;
                uploadImageBeforCall(localIds);
                uploadImage(localIds)
            },
            cancel:function(){
                uploadImageCancel();
            },
            fail: function(res){
                uploadImageCancel();
                _this.$toast('上传失败!error:chooseImage');
            },
        });
    };

    function uploadImage(localIds){
        let isShowProgressTips = 0
        if(localIds.length == 0){
			//所选图全部上传成功了
			console.log("全部上传成功");
		}else{
            // var localId = localIds.pop();
            for(let key in localIds){
                wx.uploadImage({
                    localId: localIds[key], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: isShowProgressTips, // 默认为1，显示进度提示
                    success: function (res) {
                        afterUploadToWx(res.serverId)
                    },
                    fail: function(res) {
                        uploadImageCancel();
                        _this.$toast('上传失败!error:uploadImage');
                    }
                });
            }
		}
    };
}

/* 微信获取定位 */
export function getLocation(config,_this){
    if(!appFunc.prototype.isEmptyObject(config)){
        startConfig(config)
    }

    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: [
                'getLocation',
            ],
            success: function (res) {
                if (res.checkResult.getLocation == false) {
                    _this.$toast('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    return;
                }else{
                    //调用 地理位置
                    
                    wx.getLocation({
                        type:'wgs84',
                        success: function (res) {
                            let data = {
                                latitude : res.latitude,    // 纬度，浮点数，范围为90 ~ -90
                                longitude : res.longitude,  // 经度，浮点数，范围为180 ~ -180。
                            }
                            localStorage.setItem('wxPoint',JSON.stringify(data));

                            _this.$post("/?a=regionSnByName",data).then((res)=>{
                                switch (res.code){
                                    case 0:
                                        localStorage.setItem('getLocation',JSON.stringify(res.data))
                                    break;
                                    default:
                                    break;
                                }
                            })
                        },
                        cancel: function (res) {
                            alert('用户拒绝授权获取地理位置');
                        }
                    });

                }
            }
        });
    });
}

// 微信支付 (仅支持支付页面调用）
export function wxPay(config,_this,orderId){

    function pay(signData){
        wx.chooseWXPay({
            timestamp: signData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: signData.nonceStr, // 支付签名随机串，不长于 32 位
            package: signData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: signData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: signData.paySign, // 支付签名
            success: function (res) {
                // getRealOrders(orderSn);
                _this.successAfterPay();
            },
            fail: function (error) {
                _this.$toast('支付失败!');
                console.log('check api fail:', err)
            }
        });
    }
    if(!appFunc.prototype.isEmptyObject(config)){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appId, // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature,// 必填，签名
            jsApiList: [
                'chooseWXPay'
            ] // 必填，需要使用的JS接口列表
        });
    }

    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: [
                'chooseWXPay'
            ],
            success: function (res) {
                if (res.checkResult.getLocation == false) {
                    alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    return;
                }else{
                    _this.$post('/?c=wechat&a=pay',{
                        order_sn:orderId.order_sn
                    })
                    .then((res)=>{
                        if(res.code === 0) {
                            pay(res.data);
                        }else{
                            _this.$toast('您的支付失败，请联系平台客服!');
                        }
                    });
                }
            }
        });
    });
}

// 微信分享
export function wxShare(data,callback){
    let urls = data.urls;
    let imgurls = data.imgurls;
    let title = data.title;
    let desc = data.desc;

    wx.ready(function(){
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: urls, // 分享链接
            imgUrl: imgurls, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callback('success');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                callback('cancel');
            }
        });
         
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: urls, // 分享链接
            imgUrl: imgurls, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                callback('success');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                callback('cancel');
            }
        });
         
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: urls, // 分享链接
            imgUrl: imgurls, // 分享图标
            success: function () {
               // 用户确认分享后执行的回调函数
               callback('success');
            },
            cancel: function () {
               // 用户取消分享后执行的回调函数
               callback('cancel');
            }
        });
    });
}

//errN: 每次调用wxStart的总次数， 每次重复调用wx.error 满2次，则中断 此方法中的操作   
export function wxStart(callback, errN = 2, errUrl = ""){   
    //判断 是否进入微信配置错误
    let isErr = false;

    let href = location.origin;
    let url = location.href.split('#')[0];  
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if(sessionStorage.getItem('pathname') && isiOS){
        url = `${sessionStorage.getItem('pathname')}`;
    }
    if(errUrl != ""){
        url = errUrl;
    }

    post('/?c=wechat&a=jssdk',{
        url:url
    })
    .then((res)=>{
        if(res.code == 0){
            let data = {
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
            }
            // alert(url+"=========="+`${sessionStorage.getItem('pathname')}`+"=========="+res.data.url);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: [
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getLocation',
                    'chooseWXPay',
                    "onMenuShareTimeline", 
                    "onMenuShareAppMessage",
                    "onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(()=>{
                if(!isErr) {
                    if(callback){
                        callback('success');
                    }
                }
            })

            wx.error((res)=>{
                isErr = true;    
                if(errN > 0) {
                    wxStart(callback, --errN, location.href.split('#')[0])
                }else if(callback){
                    callback('exception', '微信服务异常，请稍后再试~');
                }   
            })

        }else {
            if(callback){
                callback('err', res.msg);
            }            
        }
    })
}

class wxApi{}
Object.assign(wxApi.prototype,{
    wxUpload,
    wxMoreUpload,
    getLocation,
    wxPay,
    wxStart,
    wxShare,
})
const wxapi = new wxApi();
export default wxapi;