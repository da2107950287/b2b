<template>
	<div class="main">
        <!-- 标题 -->
        <van-nav-bar
           title="分享金券"
           left-text="返回"
           fixed
           @click-left="onClickLeft"
       	>	
			<van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou_2.png" alt=""><span>返回</span></van-icon>
		</van-nav-bar>
        
        <div class="main-content">

            <!-- 需要长按保存的图片 -->
            <div class="share-img" ref="shareImg">
                <img class="tu" :src="shrareImg">
            </div>

        
            <!-- 合成图片部分 -->
            <div class="box" ref="box">
                <div class="box-share-bg"></div>
                <div class="box-ewm">
                    <div class="box-ewm-content">
                        <div class="box-ewm-title">
                            <h4>领取农联金券</h4>
                            <p>长按保存图片</p>
                        </div>
                        <div class="box-ewm-tu">
                            <!-- 二维码 -->
                            <div class="qrcode" id="qrcode"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

	</div>
</template>

<script>
//生成二维码
import QRCode from 'qrcodejs2';
//将html DOM元素或页面利用canvas画布生成图片
import html2canvas from 'html2canvas';

import {wxStart,wxShare} from '../../assets/js/wxjs.js';
import {is_wexin} from '../../assets/js/commonAPI.js';
import { Dialog } from 'vant';

export default {
	data(){
		return {
			//二维码
			shrareImg: '',
		}
	},
	created(){
		//分享金券
		let res = JSON.parse(this.$route.query.res);

		if(is_wexin()) {
			this.$parent.$refs.loading.style.display = 'flex';
			setTimeout(()=>{
				wxStart((status, msg)=>{
					this.$parent.$refs.loading.style.display = 'none';
					if(status == 'err') {
						this.$toast(msg);
					}else if(status == 'exception') {
						Dialog.alert({
						  message: msg
						}).then(() => {
							window.location.href = window.location.origin + '/mobile/m/index';
						  	// this.$router.push('/index');
						});
					}else {
						this.wxFun(res);
					}
				});
			},500);
		}

        this.$nextTick (() => {
           this.initQrcode(res);
        })
	},
	methods: {
		//返回前一页
		onClickLeft(){
            if(this.fromHerf == null){
                this.$router.push({
                    path:'/index'
                });
            }else{
                this.$router.go(-1);
            }
		},
        //二维码默认配置，清空
        initQrcode(res) {
          this.qrcode = new QRCode('qrcode', {  
              width: 115,  // 设置宽度 
              height: 115, // 设置高度
              text: window.location.origin+"/mobile/m/voucherDraw?share_id=" + res.share_id + "&code=" + res.code + '&money=' + res.money
          });

          html2canvas(this.$refs.box).then((canvas) => {
            this.shrareImg =  URL.createObjectURL(this.base64ToBlob(canvas.toDataURL()));
            this.$refs.box.style="display: none";
            this.$refs.shareImg.style = "display: block";
          }).catch(e=>{

          });
        },
        //base64转blob
        base64ToBlob(code){
          let parts = code.split(';base64,');
          let contentType = parts[0].split(':')[1];
          let raw = window.atob(parts[1]);
          let rawLength = raw.length;

          let uInt8Array = new Uint8Array(rawLength);

          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          return new Blob([uInt8Array], {type: contentType});
        },
		//微信相关分享方法
		wxFun(res){	
            //微信分享
            let datas = {
                urls : window.location.origin+"/mobile/m/voucherDraw?share_id=" + res.share_id + "&code=" + res.code + '&money=' + res.money,
                imgurls: window.location.origin + "/mobile/images/redPaper.png",
                title: "农联密码",
                desc: "选择更多 花钱更少！分享即得现金红包，农联贡菜邀您享礼！",
            };
        	//弹出
            wxShare(datas, res=>{
            });		

		},
		//默认微信分享方法
		defaultWxShare(){
            let data = {
                urls : window.location.origin,
                imgurls : "",
                title : "农联贡菜",
                desc : "",
            }
            wxShare(data, res=>{
                if(res == "success"){

                }else if(res == "cancel"){

                }
            });		
		}
	},
	destroyed(){
		this.$parent.$refs.loading.style.display = 'none';
		this.defaultWxShare();
	}
}
</script>

<style scoped>
    /*头部导航条*/
    .van-nav-bar {
        width: 100%;
        background-color: #ee3557;
    }
    .van-nav-bar .van-icon,
    .van-nav-bar__text,
    .van-nav-bar__title {
        color: #ffffff;
    }
    .van-nav-bar__text:active {
        background-color: #ee3557;
    }
    /*去掉头部导航条下面的白线样式*/
    [class*=van-hairline]::after {
        border: none;
    }
    /*重置导航左侧颜色*/

    .left-icon{
        margin: auto;
        font-size: 22px;
        line-height: 22px;
        display: flex;
    
    }
    .van-nav-bar__left {
        height: 100%;
        display: -ms-flexbox;
        display: flex;
    }
     .left-icon img{
        height: 15px;
        display: block;
        margin: auto;
        margin-right: 5px;
    }
    .left-icon span{
        font-size: 14px;
        display: block;
        margin: auto;
        padding-bottom: 2px;
    }

	.main {
    	height: 100%;
		position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 46px;
	}
    .main-content {
        width: 100%;
        height: 100%;
        position: relative; 
    }
    .share-img {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
	.tu {
		width: 100%;
        height: 100%;
	}
    .box, .share-img {
        width: 100%;
        height: 100%;
        background-color: #ee3557;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .box-share-bg {
        width: 100%;
        height: 49%;
        background: url("../../assets/img/voucher/share_bg.jpg") no-repeat;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;         
    }
    .box-ewm {
        height: 51%;
        min-height: 260px;
        position: relative;
    }
    .box-ewm-content {
        width: 250px;
        height: 250px;
        background-color: #ffffff;
        border-radius: 10px;
        margin: auto;
        position: relative;
    }
    .box-ewm-content:before {
        content: '';
        width: 15px;
        height: 15px;
        background-color: #ee3557;
        border-radius: 15px;
        position: absolute;
        left: -7px;
        top: 110px;
    } 
    .box-ewm-content:after {
        content: '';
        width: 15px;
        height: 15px;
        background-color: #ee3557;
        border-radius: 15px;
        position: absolute;
        right: -7px;
        top: 110px;
    }
    .box-ewm-title {
        padding: 12px 0;
        border-bottom: 1px dashed #999999;
    }
    .box-ewm-title h4, .box-ewm-title p {
        margin: 0;
    }
    .box-ewm-title h4 {
        font-size: 16px;
        font-weight: normal;
        text-align: center;
    }
    .box-ewm-title p {
        font-size: 12px;
        color: #999999;
        text-align: center;
        padding-top: 2px;
    }
    .box-ewm-tu {
        width: 115px;
        height: 115px;
        margin: 22px auto 0;
        background-color: red;
    }
</style>