<template>
	<div>
		<!-- 头部导航 -->
        <van-nav-bar
          title="推广账户"
          left-text="返回"
          fixed
          :z-index="12"
          @click-left="onClickLeft"
          @click-right="$router.push('/voucherGrant')"
		>
			<van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
	        <van-icon name="arrow-right" slot="right" class="right-icon"><span>发放金券</span></van-icon>
		</van-nav-bar>
		<div style="height: 46px; width: 100%;"></div>

		<!-- 内容部分- 金额部分 -->
		<div class="one">
			<h6>总金额</h6>
			<div class="money">{{wallet_info.commission_money_now}}</div>
			<p>累计收益 {{wallet_info.all_commission_money}}</p>
		</div>

        <!-- -->
        <div class="wallet-profit">
            <!-- <h1>推广</h1> -->
            <div class="wallet-profit-content">
                <div>推广金<span>{{wallet_info.commission_money}}</span></div>
                <span class="wallet-profit-line"></span>
                <div>平台补贴<span>{{wallet_info.commission_money_extra}}</span> </div>
            </div>
        </div>

        <!-- 统计部分 -->
        <div class="vital">
			<h6>本月分成统计</h6>
			<div class="vital-box">
				<div class="vital-left">{{wallet_info.month_money}}</div>
				<div class="vital-content">
					<div class="vital-p" @click="$router.push('/extendAccountBuyer')">
						<p><span class="span-one">下级采购商</span>分成<span class="span-two">{{wallet_info.month_money_promotion}}</span> <van-icon name="arrow"/></p>
						<p><span class="span-one"></span>人数<span class="span-two">{{wallet_info.promotionNumber}}</span></p>
					</div>
					<div class="vital-p" @click="$router.push('/extendAccountPartner')">
						<p><span class="span-one">下级合伙人</span>分成<span class="span-two">{{wallet_info.month_money_promotion_not}}</span> <van-icon name="arrow"/></p>
						<p><span class="span-one"></span>人数<span class="span-two">{{wallet_info.noPromotionNumber}}</span></p>
					</div>
				</div>
			</div>
        </div>
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			//先关数据
            wallet_info: ''
		}
	},
    created(){
        this.wallet_info = JSON.parse(sessionStorage.getItem('wallet_info'));
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
	}
}
</script>

<style scoped>
    /*重置导航左侧颜色*/
    .van-nav-bar .van-icon,
    .van-nav-bar__text {
        color: #323233;
    }
    .left-icon,.right-icon{
        margin: auto;
        font-size: 22px;
        line-height: 22px;
        color: #333;
        display: flex;

    }
    .van-nav-bar__left, .van-nav-bar__right {
        height: 100%;
        display: -ms-flexbox;
        display: flex;
    }
     .left-icon img,.right-icon img{
        height: 15px;
        display: block;
        margin: auto;
        transform:rotate(180deg);
        margin-right: 5px;
    }
    .left-icon span,.right-icon span{
        font-size: 14px;
        color: #333;
        display: block;
        margin: auto;
    }


	.one {
        padding: 45px 0;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background-image: url('../../assets/img/walletBg.jpg');
        background-size: 100% 100%;
        position: relative;
	}
	.one h6 {
		margin: 0;
		font-size: 14px;
		font-weight: normal;
	}
	.one div {
		font-size: 30px;
		line-height: 1.5em;
	}
	.one p {
		margin: 0;
		font-size: 12px;
	}

    .wallet-profit {
        background-color: #ffffff;
        margin-bottom: 10px;
    }
    .wallet-profit h1 {
        font-size: 14px;
        font-weight: normal;
        color: #ee2d2d;
        padding: 7px 15px;
        margin: 0;
    }
    .wallet-profit-content {
        font-size: 12px;
        line-height: 1.5em;
        color: #808080; 
        padding: 20px 0 12px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .wallet-profit-content div {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-left: 15px;
    }
    .wallet-profit-content .wallet-profit-line {
        display: inline-block;
        width: 2px;
        height: 22px;
        background-color: #f2f2f2;
    }
    .wallet-profit-content div span {
        font-size: 14px;
        color: #ee2d2d;
        padding-left: 15px;
    }

    .vital {
    	background-color: #ffffff;
		padding: 14px 0 20px 12px;
    	margin-top: 10px;
    }
    .vital h6 {
    	font-size: 14px;
    	font-weight: normal;
    	margin: 0;
    }
    .vital-box {
		display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
    }
    .vital-left {
-webkit-box-flex: 2;
    -ms-flex: 2;
    	flex: 2;
	    font-size: 24px;
	    word-break: break-all;
	    white-space: normal;
	    padding-right: 10px;
	    top: 0;
	    bottom: 0;
	    margin: auto;
    }
    .vital-content {
-webkit-box-flex: 3;
    -ms-flex: 3;
    	flex: 3;
    	padding-left: 15px;
    	border-left: 1px solid #f8f8f8;
    }
    .vital-content .vital-p {
		font-size: 14px;
		color: #808080;
    }
    .vital-content .vital-p:first-child {
    	margin-bottom: 18px;
    }
    .vital-content .vital-p p {
    	margin: 0;
    }
    .vital-content .vital-p p .span-one {
    	display: inline-block;
    	width: 76px;
    }
    .vital-content .vital-p p .span-two {
    	display: inline-block;
    	padding-left: 6px;
    	color: #424242;
    }
    .vital-content .vital-p p .van-icon {
    	float: right;
    	font-size: 16px;
    	color: #999999;
    	padding: 0 12px 0 0;
    	line-height: 1.2em;
    }
    @media screen and (max-width: 350px) {
	    .vital-left {
	-webkit-box-flex: 2;
	    -ms-flex: 2;
	    	flex: 2;
	    }
	    .vital-content {
	-webkit-box-flex: 5;
	    -ms-flex: 5;
	    	flex: 5;
	    }    	
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
.business-loading {
    padding: 10px;       
}
.end-msg {
  font-size: 14px;
  text-align: center;
  color: #c9c9c9;
  line-height: 3em;
  margin: 0;
}
</style>