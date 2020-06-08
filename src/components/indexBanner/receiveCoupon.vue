<template>
	<div class="main">
		<div class="top">
			<van-nav-bar
	          title="领取结果"
	          left-text="返回"
	          left-arrow
	          fixed
	          :style="{'backgroundColor': backgroundColor}"
	          :border="false"
	          :z-index="12"
	          @click-left="goPreviousPage"
			/>
			<div style="height: 46px; width: 100%;"></div>
		</div>
        <!-- 结果文字显示区 -->
        <div class="wenzi">
			<p v-if="msg || lock == 2">{{msg}}</p>
			<p v-else><vant-loading :vertical="false" text="努力加载中..."></vant-loading></p>
        </div>
		<!-- 按钮区 -->
		<div class="btns">
			<div class="btn btn_1" @click.stop="goPreviousPage">继续领取</div>
			<div class="btns_space"></div>
			<div class="btn btn_2" v-if="isSuccess" @click.stop="toUse">立即使用</div>
			<div class="btn btn_2" v-else @click.stop="toSee">查看优惠券</div>
		</div>
		<!-- 图 -->
		<div class="bottom"></div>
		<!-- 活动说明 -->
		<div class="explain">
			<div>
				活动说明：<br>
				1、如出现不可抗力或情势变更的情况，如自然灾害事件等，农联贡菜可免于承担责任；<br>
				2、请在【农联贡菜-个人中心-优惠券】中查看采购券的详情使用规则，在有限期内及时使用；<br>
				3、有任何相关领取、使用的疑问，请拨打VIP客服热线：<a href="tel:400-128-8566">400-128-8566</a>。
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    components:{
			vantLoading: () => import('../vantLoading.vue')
	    },
		data(){
			return {
				//导航条背景色
				backgroundColor: 'transparent',
				msg: '',
				//劵id
				coupon_id: '',
				//劵类型 >0 为 指定商品劵
				limit_type: '',

				lock: 1,  //1-请求中 2-请求结束
				//领取状态 是否成功
				isSuccess: false
			}
		},
		created(){
			//领取优惠券
            this.$post("/?c=wholesaleCoupon&a=receiveCoupon", {full_id: this.$route.query.full_id}).then(res => {
            	this.lock = 2;
                switch (res.code) {
	                case 0:
	                    //领取成功
	                    this.isSuccess = true;
	                    this.msg = res.msg;
	                    this.coupon_id = res.data.coupon_id;
	                    this.limit_type = res.data.limit_type;
	                    break;
	                default:
	                    this.msg = res.msg;
	                    break;
                }
            }).catch(()=>{
            	this.lock = 2;
            	this.$toast('请求失败');
            });
		},
		mounted(){
			window.addEventListener('scroll', this.handleSrcoll)
		},
		methods: {
            goPreviousPage(){
            	window.history.length > 1 ? window.history.go(-1) : this.$router.push('/index'); 
            },
            //立即使用
            toUse() {
	            if (this.limit_type && this.limit_type > 0) {
	                //进入指定券专用商品列表页
	                this.$router.push({ path: '/couponAssign', query: { coupon_id: this.coupon_id } });
	            }else {
	                this.$router.push({
	                    path: '/wholesale'
	                })
	            }
            },
            //查看优惠券
            toSee(){
            	this.$router.push({
                    path: '/coupon'
                })
            },
            handleSrcoll() {
            	const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            	if(scrollTop > 20) {
            		this.backgroundColor = '#fe982c';
            	}else {
            		this.backgroundColor = 'transparent';
            	}
            }
		}
	}
</script>

<style scoped>
	p {
		margin: 0;
	}
	.main {
		min-height: 100%;
		background-color: #ffffff;
	}

    /*重置导航左侧颜色*/
    .van-nav-bar .van-icon,
    .van-nav-bar__text {
        color: #ffffff;
    }
    .van-nav-bar__text:active {
    	background-color: transparent;
    }
    .van-nav-bar__title {
		color: #ffffff;
    }
    .van-nav-bar__arrow+.van-nav-bar__text {
    	padding-left: 20px;
    }

	.top {
		width: 100%;
		height: 0;
		padding-bottom: 59%;
		background: url('../../assets/img/receive/1.jpg') no-repeat top;
		background-size: cover;
	}

	.wenzi {
		width: 100%;
		height: 0;
		padding-bottom: 18%;
		background: url('../../assets/img/receive/2.jpg') no-repeat top;
		background-size: cover;
		position: relative;	
	}
	.wenzi p {
		width: 100%;
		font-family: 'Microsoft YaHei';
		font-size: 16px;
		text-align: center;
		font-weight: bold;
		color: #ff5b4c;
		padding: 25px 0;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.btns {
		padding: 10px 0;
		display: flex;
    	justify-content: center;
	}
	.btns_space {
		width: 20px;
	}
	.btns .btn {
		font-size: 16px;
	    padding: 8px 25px;
		border-radius: 20px;
	}
	.btn_1 {
		color: #333;
		border: 1px solid #333;
	}
	.btn_2 {
		color: #ffffff;
		background-image: linear-gradient(to right , #ee2d2d, #ff8fac);
		border: 1px solid #ffffff;
	}

	.bottom {
		width: 100%;
		height: 0;
		padding-bottom: 80%;
		background: url('../../assets/img/receive/3.jpg') no-repeat top;
		background-size: cover;		
	}

	.explain {
		padding: 0 15px 20px;
	    margin-top: -20px;
	}
	.explain div {
		font-size: 12px;
		color: #333;
		line-height: 1.6em;
		word-break: break-all;
    	white-space: normal;
		background-color: #ffeceb;
		border-radius: 10px;
		padding: 10px;
	}
</style>