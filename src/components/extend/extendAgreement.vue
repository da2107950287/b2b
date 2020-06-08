<template>
	<div>
		<div v-if="isShow">
			<!-- 头部导航 -->
			<navbar title="推广协议" type="left" @clickleft="onClickLeft"></navbar>
			
			<!-- 协议内容 -->
			<div class="content" v-html="innerHtml"></div>

			<!-- 按钮 -->
			<div :class="['btns',{'active':isBottom}]" @click="agree">同意</div>
		</div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>	
	</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	components: {
		navbar: ()=>import("../navbar/nav.vue"),
		vloading: ()=>import("../vloading.vue")
	},
	data(){
		return {
			//是否滚动到底部
			isBottom: false,
			//判断是否显示推广协议
			isShow: false,

			//协议文件
			innerHtml: ''
		}
	},
	created(){
	},
	mounted(){
        //判断是否显示推广协议   agree_commission_time  0-未同意 1-同意
        if(sessionStorage.getItem('userInfo')) {
	        const userinfo = JSON.parse(sessionStorage.getItem('userInfo'));
	        let promotion1 = userinfo.promotion || 0;
	        if(promotion1 == 1) {
		        this.isShow = userinfo.agree_commission_time == 0 && true || false;

		        if(this.isShow) {
			      	//获取服务器的协议文件内容
			      	this.getInitData();
			      	// this.title = this.readFile('../../../static/title.txt');
		        }else {
		        	//进入二维码页
					this.$router.replace('/extendScan');
		        }
	        }else {
            	//无权进入二维码页
            	this.$router.replace('/personal');
	        }
        }else {
            this.$post('/?c=user&a=info',).then(res => {
                switch (res.code) {
                    case 0:
                        sessionStorage.setItem('userInfo',JSON.stringify(res.data));

                        const userinfo = res.data;
                        let promotion1 = userinfo.promotion || 0;   
                        if(promotion1 == 1) {
                        	//可进入二维码页
                        	this.isShow = userinfo.agree_commission_time == 0 && true || false; 
                	        if(this.isShow) {
						      	//获取服务器的协议文件内容
						      	this.getInitData();
						      	// this.title = this.readFile('../../../static/title.txt');
					        }else {
					        	//进入二维码页
								this.$router.replace('/extendScan');
					        }
                        }else {
                        	//无权进入二维码页
                        	this.$router.replace('/personal');
                        }                 
                        break;
                    default:
                    	this.$toast(res.msg);
                        break;
                }
            });
        }
	},
	methods: {
		//####=>返回上一页， 若无上一页， 则进入个人中心
		onClickLeft(){
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/personal');
		},
		//获取协议文件内容
		getInitData(){
            this.$post('/?c=wholesaleCommission&a=contract',{})
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.innerHtml = res.data.content;
				      	// 添加滚动事件，检测滚动到页面底部
				      	window.addEventListener('scroll', this.scrollBottom)
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break; 
                    default:
                    	this.$toast(res.msg);
                        break;
                }
            });
		},
		//读取本地文件内容
		/*readFile(filePath) {
		    // 创建一个新的xhr对象
		    let xhr = null
		    if (window.XMLHttpRequest) {
		        xhr = new XMLHttpRequest()
		    } else {
		        // eslint-disable-next-line
		        xhr = new ActiveXObject('Microsoft.XMLHTTP')
		    }
		    const okStatus = document.location.protocol === 'file' ? 0 : 200;
		    xhr.open('GET', filePath, false);
		    xhr.overrideMimeType('text/html;charset=utf-8');
		    xhr.send(null);
		    return xhr.status === okStatus ? xhr.responseText: null;
		},*/

		//滚动监听方法
		scrollBottom(){
			var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
		   	var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
		   	var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
		   	// console.log(scr, clientHeight, scrHeight)
		   	if(scr + clientHeight + 10 >= scrHeight){
		     	this.isBottom = true;
		   	}
		},
		//同意协议
		agree(){
			if(!this.isBottom) {return}

			//接口请求
            this.$post('/?c=wholesaleCommission&a=agreeContract',{})
            .then((res)=>{
                switch(res.code){
                    case 0:
                    	//请求成功
                        //更新本地缓存的 推广协议是否同意 个人信息
                        const userinfo = JSON.parse(sessionStorage.getItem('userInfo'));
                        userinfo.agree_commission_time = '1';
                        sessionStorage.setItem('userInfo',JSON.stringify(userinfo));

						Dialog.alert({
						  title: '提示',
						  message: '你已同意本协议，马上开始推广吧~'
						}).then(() => {
							// 跳转到二维码推广页
							this.$router.replace('/extendScan');						  
						});
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break; 
                    default:
                    	this.$toast(res.msg);
                        break;
                }
            });			

		}	
	},
	destroyed(){
		if(this.isShow) {
			window.removeEventListener('scroll', this.scrollBottom);
		}
	}
}
</script>

<style scoped>
	.content {
		font-size: 14px;
		word-break: break-all;
		white-space: normal;
		padding: 10px 12px;
    	margin-bottom: 54px;
		background-color: #ffffff;
	}
	.btns {
		width: 100%;
		background-color: #d9d9d9;
		font-size: 16px;
		color: #ffffff;
		text-align: center;
		padding: 11px 0;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.btns.active {
		background-color: #ee2d2d;
	}

    .vantLoading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        z-index: 1000;
    }
</style>