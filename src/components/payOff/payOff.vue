<!-- 线下支付 -->
<template>
	<div class="contain">
		<!-- 标题栏 -->
        <van-nav-bar
            left-arrow
            title="线下支付"
            @click-left='goPreviousPage'
        > 
	        <div class="header-right" slot="right" @click="toTel">
		        <img src="../../assets/img/dianhua.png">
		        <span>联系客服</span>
	        </div>
    	</van-nav-bar>

    	<!-- 支付截止时间 -->
        <p class="endTime"><span>{{endtime}}</span> <br>请尽快完成支付，超时订单将自动取消</p>
		
		<!-- 提示部分 -->
		<div class="payoff-notice">
			<div>
				<span class="warning"></span>
				<p>1.由于该订单金额过大，需要手动线下支付订单金额</p>
				<p>2.如有疑问请联系平台客服</p>
				<p>3.打款时，备注请填写订单号</p>
			</div>
		</div>

		<!-- 收款方信息 -->
		<div class="payoff-info">
			<h4>收款方信息</h4>
			<p>账户名： 农联高科实业发展（成都）有限公司</p>
			<p>收款账户： 646131231316461313151613156</p>
			<p>开户行： 成都工行某某支行</p>
			<p v-if="offline_msg">平台备注：<span>{{offline_msg}}</span></p>
		</div>

		<!-- 订单号 -->
		<div class="payoff-info">
			<h4>订单号： <span>{{order_id}}</span></h4>
		</div>

		<!-- 上传打款凭证 -->
        <div class="payoff-info payoff-certify">
        	<div class="payoff-info-item">
	        	<h4>上传打款凭证</h4>
	            <uploadBox :imgList="imgList" :imgName="imgName" :count="1"></uploadBox>
        	</div>
			<div class="payoff-info-item">
				<h4>例<small>(点击查看大图)</small></h4>
				<img @click="show = true" :src="images[0]" alt="">
			</div>
        </div>

        <!-- 提交 -->
        <div class="payoff-btn">
			<van-button type="danger" size="large" @click="toSubmit">提交</van-button>
        </div>

		<!-- 大图查看打款凭证例图-->
		<van-image-preview
		  v-model="show"
		  :images="images"
		>
		</van-image-preview>
	</div>
</template>

<script>
import Vue from 'vue';
import {post} from '../../assets/js/commonAPI.js';
import uploadBox from '../upload/uploadBox.vue'

Vue.prototype.$post = post
export default {
	name: 'Payoff',
    components:{
        uploadBox
    },
	data(){
		return {
			//是否预览大图
			show: false,
			//打款凭证示例图
			images: [require('../../assets/img/payoffCertify.png')],

			//支付截止时间
			endtime:'',
			//订单号
			order_id: '',

			tel:'4001288566',
			//线下凭证
			imgList:[],
			offline_msg:'',//
			
			imgName: 'PaymentVouchers',
		}
	},
	created(){
		this.endtime = this.$route.query.endtime;
		this.order_id = this.$route.query.id;
		this.offline_msg = this.$route.query.offline_msg;
		if(this.$route.query.offline_img) {this.imgList[0] = this.$route.query.offline_img};
	},
	methods: {
        goPreviousPage(){
            if(this.$route.query.type == 'purchase'){
                this.$router.go(-1);
            }else{
                this.$router.push({
                    path:'/shoppingCart'
                });
            }   
        },
        // 联系客服
        toTel() {
            window.location.href="tel:" + this.tel
        },
        //线下支付
        toSubmit(){
            if(!this.imgList[0]) {
                return this.$toast('请上传打款凭证');
            }
			this.$parent.$refs.loading.style.display = 'flex'

            this.$post('/?c=order&a=payOffline',{
                order_sn: this.order_id,
                offline_img: this.imgList[0],
                total_amount: sessionStorage.getItem('wapPrice') || 0
            })
            .then((res)=>{
				this.$parent.$refs.loading.style.display = 'none'
                switch(res.code){
                    case 0:
                        //提交成功， 跳转到 我的订单页——待付款
                        this.$router.push({
                            path:'/comment',
                            query:{
                                id: 0,
                            }
                        });
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                    default:
                        break;
                }
            })
        }
	}
}
</script>

<style scoped>
.contain {
    background-color: #eee;
}
	.van-nav-bar {
		border-bottom: 1px solid #eee;
	}
	.van-nav-bar .van-icon {
	    color: #232323;
	}
	.header-right {
		
	}
	.header-right img {
		width: 18px;
		height: 18px;
		vertical-align: text-bottom;
	}
	.header-right span {
		font-size: 13px;
		color: #808080;
	}

    .endTime {
        color: #ffffff;
        font-size: 13px;
        text-align: center;
        background-color: rgba(238,45,45,0.3);
        padding: 9px 3rem;
        margin: 0;
    }
    .endTime span {
        color: #EE2D2D;
    }

    .payoff-notice {
    	color: #424242;
    	background-color: #ffffff;
    	padding: 20px 43px 20px 36px;	
    }
    .payoff-notice div {
    	padding-left: 20px;
    	position: relative;
    }
    .payoff-notice p {
    	margin: 0;
    	font-size: 12px;
    	line-height: 1.8em;
    }
    .payoff-notice .warning {
    	font-size: 0;
		position: absolute;
		left: 0;
		top: 3px;
    }
    .payoff-notice .warning:before {
	    content: "!";
	    display: inline-block;
	    width: 14px;
	    height: 14px;
	    text-align: center;
	    line-height: 1em;
	    font-size: small;
	    color: #ffffff;
	    background-color: red;
	    border-radius: 7px;
    }

    .payoff-info {
    	color: #424242;
    	background-color: #ffffff;
    	padding: 15px 12px 17px;
    	margin-top: 10px;
    }
    .payoff-info h4 {
	    font-size: 14px;
	    font-weight: 500;
	    margin: 0;
    }
    .payoff-info p {
    	font-size: 12px;
    	margin: 7px 0 0;
    }
    .payoff-info h4 span {
    	color: #ee2d2d;
    }
    .payoff-info span {
    	color: #ee2d2d;
    }

    .payoff-certify {
    	display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
    }
    .payoff-certify .payoff-info-item {
		width: 50%;
		-webkit-box-flex: 1;
    	-ms-flex: 1;
		flex: 1;
    }
    .payoff-certify .payoff-info-item img {
	    width: 84px;
	    height: 60px;
    	margin-top: 15px;
    	margin-bottom: 5px;
    }

    .payoff-btn {
    	padding: 26px 12px 17px;
    }
    .payoff-btn .van-button--large {
    	border-radius: 8px;
    }
</style>