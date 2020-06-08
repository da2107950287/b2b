<template>
	<div class="main">
        <!-- 标题 -->
        <van-nav-bar
           title="领取金券"
       	/>
		
		<!-- 解决导航头遮挡内容 -->
		<div style="height: 46px;"></div>

       	<!-- 内容部分 -->
       	<div class="bg-one"></div>

       	<!-- 金额部分 -->
       	<div class="bg-two">
			<div class="money">
				<span>{{money}}</span>元
			</div>
       	</div>

       	<div class="bg-three"></div>

       	<!-- 立即领取按钮部分 -->
       	<div class="bg-four">
			<div class="draw-btn" @click="drawVoucher"></div>
       	</div>

       	<div class="bg-five"></div>

       	<!-- 规则部分 -->
		<div class="rules">
			<div class="rules-title"></div>
			<div class="rules-content">
				<p>农联金券是农联贡菜用户发放的现金抵用券，仅可在农联贡菜使用，仅农联星级买家可使用，可直接用于支付农联贡菜订单，在消费时一张农联金券可抵10元现金使用，金券支付订单最多可抵扣至0.01元。</p>
				<p>使用说明：</p>
				<p>1.在确认订单页面选择“使用金券支付”，选择对应数量的金券，即可减免相应付款金额。</p>
				<p>2.提交订单时，农联金券优选抵扣商品。</p>
				<p>3.农联金券不能支付活动商品，不能与新手优惠券共同使用。</p>
				<p>4.农联金券金额大于订单金额，则差额不予退回；如农联金券金额小于订单金额，则需由客户支付差额。</p>
				<p>5.使用农联金券支付的订单，发生退货由用户自行承担运费，退款结算按照实际结算金额退款。</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {

			//领券码
			code: '',
			//分享id
			share_id: '',
			//分享金额
			money: 0,
		}
	},
	created(){
		//相关数据
		let query = this.$route.query;
		this.code = query.code;
		this.share_id = query.share_id;
		this.money = query.money;
	},
	methods: {
		//领取金券
		drawVoucher(){
			this.$parent.$refs.loading.style.display = 'flex';
            this.$post('/?c=wholesaleCouponMoney&a=receive',{
            	code: this.code,
                share_id:this.share_id
            })
            .then((res)=>{
            	this.$parent.$refs.loading.style.display = 'none';
            	if(res.code == 0) {
            		this.$toast('领取成功');
            		//延时，保证 领取成功等效果在本页展示
            		setTimeout(()=>{
	            		if(res.data.is_enterprise == 1) {
	            			//星级买家，跳转到优惠券列表
	            			this.$router.replace('/coupon');
	            		}else {
	            			//其他跳转到 发放金券页
	            			this.$router.replace('/voucherGrant');
	            		}
            		},300);
            	}else {
            		this.$toast(res.msg);
            	}            		
            })
		}
	}
}
</script>

<style scoped>
    /*头部导航条*/
    .van-nav-bar {
        width: 100%;
        background-color: #ee3557;
        position: fixed;
        top: 0;
        left: 0;
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

    .main {
    	min-height: 100%;
		background: url("../../assets/img/voucher/bg.png") repeat-y;
		-webkit-background-size: 100% auto; 
		background-size: 100% auto;
    }

    .bg-one {
        width: 100%;
        padding-bottom: 52%;
        background: url("../../assets/img/voucher/bg_01.jpg") no-repeat;
        background-position: center top;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;          
        margin-bottom: -2px;   	
    }
    .bg-two {
        width: 100%;
        background: url("../../assets/img/voucher/bg_02.jpg") no-repeat;
        background-position: center top;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;          
        margin-bottom: -1px;

        position: relative;
        text-align: center; 
    }
    .bg-three {
        width: 100%;
        padding-bottom: 16%;
        background: url("../../assets/img/voucher/bg_03.jpg") no-repeat;
        background-position: center top;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;          
        margin-bottom: -4px;        	
    }
    .bg-four {
        width: 100%;
        padding-bottom: 12px;
        background: url("../../assets/img/voucher/bg_04.jpg") no-repeat;
        background-position: center top;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;          
        margin-bottom: -4px;

        position: relative;
        text-align: center; 
    }
    .bg-five {
        width: 100%;
        padding-bottom: 15.8%;
        background: url("../../assets/img/voucher/bg_05.jpg") no-repeat;
        background-position: center top;
        -webkit-background-size: 100% 100%; 
        background-size: 100% 100%;          
        margin-bottom: -1px;        	
    }

	.bg-two .money {
		font-size: 13px;
		color: #d1302d;
		padding-left: 16px;
	}
	.bg-two .money span {
		font-size: 53px;
		line-height: 1em;
	}
	.bg-four .draw-btn {
	    display: inline-block;
	    width: 120px;
		height: 36px;
		background: url("../../assets/img/voucher/v_btn.png") no-repeat;
		-webkit-background-size: 120px 26px; 
		background-size: 120px 36px;
	    background-position: center top;
	}

	.rules {
		width: 100%;
		position: relative;		

        -moz-box-sizing:border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
		padding: 0 15px 20px;
	}
	.rules-title {
		width: 100%;
		height: 18px;
		background: url("../../assets/img/voucher/rule.png") no-repeat;
		-webkit-background-size: 116px 18px; 
		background-size: 116px 18px;		
	}
	.rules-content {
		font-size: 0.6rem;
		color: #ffffff;
		line-height: 1.4em;
		padding-top: 15px;
	    padding-left: 2px;
	}
	.rules-content p {
		margin: 0;
	}
</style>