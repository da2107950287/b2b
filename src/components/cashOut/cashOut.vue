<template>
	<div v-show="isShow">
        <!-- 标题 -->
        <navbar type="left" title="提现" @clickleft="goPreviousPage"></navbar>
		
		<!-- 银行卡信息 -->
		<div class="bank" @click="toEdit">
			<img src="../../assets/img/bankCard.png" alt="银行卡">
			<div class="bank-info">
				{{bank_name}}（{{account_number.slice(-4)}}）
				<p v-if="is_right === '0'">银行账号<span>异常</span>，请修改银行账号信息</p>
			</div>
			<i v-if="is_right === '0'" class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
		</div>

		<!-- 金额部分 -->
		<div class="money">
			<van-cell-group>
			  	<van-field v-model="money" label="提现金额：" placeholder="请输入提现金额" :error-message="moneyErrMsg" @input="handleNum" @blur="handleBlur"/>  
			</van-cell-group>
			<div class="total">可提现金额<span class="total-money">￥{{moneyTotal}}</span> <!-- <span class="total-btn" @click="getTotal">全部提现</span> --></div>
		</div>

		<!-- 提示语 -->
		<div class="notice">
			<img src="../../assets/img/danger.png" alt="提示">
			<div>可提现金额满{{withdrawal_money}}及以上可提现，一个月可提现{{withdrawal_num}}次</div>
		</div>

		<!-- 提交 -->
		<van-button type="danger" class="merbtn" @click="submit">提现</van-button>
		
        <van-popup @close="closePassWord" v-model="open" position="bottom" :style="{ height: '70%'}" style="border-radius: 15px 15px 0 0">
            <payPassWord class="cash-out" @yuePay="yuePay" @closePassWord="closePassWord" :no_psw="isSetPsw" :inputDisable="inputDisable"></payPassWord>
        </van-popup>
		
        <div v-if="inputDisable" class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
	</div>
</template>
<script>
import $ from 'jquery';
import Vue from 'vue'
import {post,appFunc} from '../../assets/js/commonAPI.js'
const navbar = () => import('../navbar/nav.vue');
const payPassWord =  ()=>import("../Cashier/payPassWord.vue");
const vloading =  ()=>import("../vloading.vue");

const innerHeight = $(window).height();
export default {
	components:{
		navbar,
		payPassWord,
		vloading
	},
	data(){
		return {
			//是否显示内容
			isShow: false,

			//银行卡相关信息
			account_number: '',
			bank_name: '',
			bankId: '',
			is_right: '1',  //0-账户信息错误 1-账户信息正常

			money: '',  //提现金额
			moneyErrMsg: '', //提现金额部分错误提示语
			moneyTotal: 0,  //全部可提现金额
			withdrawal_money: 0, //最低可提现金额
			withdrawal_num: 0, //可提现次数

			//银行卡所有信息
			bankInfo: null,


			show:'',
			clock:'on',
			innerHeight : innerHeight,
			open:false,
			inputDisable:false,
			isSetPsw:-1,    //  是否设置支付密码 0 未设置 1已设置 -1默认
		}
	},
	created(){
		this.moneyTotal = this.$route.query.amount;

		let cashOutConfig = JSON.parse(this.$route.query.cashOutConfig);
		this.withdrawal_money = cashOutConfig.withdrawal_money;
		this.withdrawal_num = cashOutConfig.withdrawal_num;

		this.$post('/?c=user&a=isSetPassWrod',{
		})
		.then((res)=>{
			switch(res.code){
				case 0:
					this.isSetPsw = res.data;
					break;
				case 1:
					// this.$toast(res.msg)
					break;
				default:
					break;
			}
		})
		this.getBankInfo();
	},
	mounted(){

	},
	methods:{
        //####=>返回上一页
        goPreviousPage(){
            this.$router.push('/wallet');
        },
        //点击 全部提现， 使最大金额自动填充到金额栏的操作
        getTotal(){
        	this.money = this.moneyTotal;
        },
        //去修改银行卡信息
        toEdit(){
        	if(this.is_right === '0') {
        		this.$router.push({path: '/bindingBankCard', query:{info: JSON.stringify(this.bankInfo)}});
        	}	
        },	
        //控制输入金额最多只有两位小数
        handleNum(){
        	//去除首尾非数字符号
        	// let num = this.money.replace(/(^\D+)|(\D+$)/g,'');
        	//去除首尾空白字符
        	this.money.replace(/(^\s+)|(\s+$)/g,'');
        	//去除开头的非数字字符
        	let num = this.money.replace(/(^\D+)/g,'');

        	if(!num) return this.money = '';

        	this.money = '';

        	num = num.split('.');
        	//去除整数部分非数字字符
        	num[0] = num[0].replace(/(\D+)/g,'');

        	num[0] = Number(num[0]);

			if(num.length>2) {
				num = num.slice(0,2);
			}
        	if(num.length == 2 && num[1].length>2) {
        		num[1] = num[1].slice(0,2);
        	}
        	//去除小数部分非数字字符
        	if(num[1]) {
        		num[1] = num[1].replace(/(\D+)/g,'');
        	}
        	this.money = num.join('.');
        },
        //失去焦点时，若输入金额结尾有小数点，则去掉小数点
        handleBlur(){
        	//去除对结尾非数字字符
        	this.money = this.money.replace(/(\D+$)/g,'');
        },
        //获取银行卡信息
        getBankInfo(){
            this.$post('/?c=user&a=bank',{})
            .then((res)=>{
                switch(res.code){
                    case 0:
                        //未绑定银行卡，进入绑卡页
                        if(!res.data) {
                            this.$router.push({path: '/bindingBankCard', query:{amount: this.moneyTotal, cashOutConfig: this.$route.query.cashOutConfig}});
                        }else {
                            //已绑定银行卡，则跳转到提现页面
                            this.account_number = res.data.account_number;
							this.bank_name = res.data.bank_name;
							this.bankId = res.data.bank_id;
							this.is_right = res.data.is_right;

							this.bankInfo = res.data;
                        }
                        this.isShow = true;
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                    default:
                        break;
                }
            }) 
        },
        //提现申请
        submit(){
        	if(Number(this.money) < Number(this.withdrawal_money)) {
        		return this.$toast('满'+this.withdrawal_money+'及以上才可提现');
			}
			
			this.openPayPassWord();
		},
		yuePay(password){
			let money = Number(this.money).toFixed(2).toString();

			if(this.inputDisable == false){
				this.inputDisable = true;
				this.$post('/?c=user&a=withdrawal',{
					bank_id: this.bankId,
					money: money,
					password:password,
				})
				.then((res)=>{
					switch(res.code){
						case 0:
							this.$toast('提现成功');
							this.clock = 'on'
							this.inputDisable = false;
							//到提现列表
							this.$router.push('/cashOutRecord');
							break;
						case 1:
							this.inputDisable = false;
							this.$toast(res.msg);
							break;                    
						default:
							this.$toast("系统错误，请刷新后重试！")
							break;
					}
				}) 
			}
			
		},
		/* yuePay(password){
			if(this.inputDisable == false){
				this.inputDisable = true;
				this.$post('/?c=user&a=checkPayPassWrod',{
					passWrod : password,
				})
				.then((res)=>{
					switch(res.code){
						case 0:
							this.yePay(res.data);
							break;
						case 1:
							this.$toast(res.msg);
							this.inputDisable = false;
							break;
						default:
							this.$toast("系统错误，请刷新后重试！")
							break;
					}
				})
			}
		}, */
		closePassWord(){
			$('.contain').attr('style','');
			this.open = false;
		},
		openPayPassWord(){
			$('.contain').css({
				height:this.innerHeight,
			});
			this.open = true;
		},
	}
}
</script>
<style lang="less" scoped>
	.van-cell {
		padding: 10px 12px;
	}
	.bank {
		display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
	    padding: 23px 12px;
	    background-color: #ffffff;
	    /*border-top: 1px solid #d8d8d8;*/

		img {
			width: 25px;
			height: 25px;
		}
		.bank-info {
			-webkit-box-flex: 1;
    		-ms-flex: 1;
			flex: 1;
			font-size: 16px;
			line-height: 1.5em;
			padding-left: 8px;
			position: relative;
			p {
				font-size: 12px;
				margin: 0;
				position: absolute;
				bottom: -18px;
				left: 8px;
				span {
					color: #ee2d2d;
				}
			}
		}
	}

	.money {
		margin-top: 10px;
		.total {
			font-size: 12px;
			background-color: #ffffff;
			padding: 7px 12px;
			margin: 0;
			.total-btn {
				color: #ee2d2d;
			    margin-left: 10px;
			}
		}
	}

	.notice {
		display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;	
		padding: 10px 12px;	
		img {
			width: 14px;
			height: 14px;
		}
		div {
			-webkit-box-flex: 1;
    		-ms-flex: 1;
			flex: 1;
			font-size: 12px;
			padding-left: 6px;
		}
	}

    .merbtn{
        width:95%;
        margin-left:2.5%;
        margin-top:10px;
        border-radius:5px;
	}
	
.vantLoading{
    margin-top: -20px;
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 9999;
    height: 100%;
    top: 0;
    left: 0;
}
</style>