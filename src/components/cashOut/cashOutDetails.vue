<template>
	<div>
        <!-- 标题 -->
        <navbar type="left" title="提现明细" @clickleft="goPreviousPage"></navbar>	
		<!-- 提现中 样式 -->
		<div class="detail" v-if="details.status == 0">
			<h2>
				{{details.money}}
				<small class="yellow">{{details.status_zh}}</small>
			</h2>
			<div class="list">
				<p><span>审核单号：</span> {{details.id}}</p>
				<p><span>提现到：</span> {{details.bank_name}}（{{details.account_number.slice(-4)}}）</p>
				<p><span>提现时间：</span> {{details.add_time}}</p>
				<!-- <p><span>预计到账：</span> {{details.may_time}}</p> -->
				<p><span>备注信息：</span> {{details.remark}}</p>
				<p v-if="details.img"><span>打款凭证：</span> {{details.img}}</p>
			</div>
		</div>
		
		<!-- 已驳回 -->
		<div class="detail" v-if="details.status == 2">
			<h2>
				{{details.money}}
				<small class="danger">{{details.status_zh}}<span v-if="details.is_right == 0">，银行账号信息错误</span></small>
				<p v-if="details.is_right == 0 && is_right == 0" class="to-edit" @click="toEdit"><span>去修改</span></p>
			</h2>
			<div class="list">
				<p><span>审核单号：</span> {{details.id}}</p>
				<p><span>提现到：</span> {{details.bank_name}}（{{details.account_number.slice(-4)}}）</p>
				<p><span>提现时间：</span> {{details.add_time}}</p>
				<p><span>审核时间：</span> {{details.review_time}}</p>
				<p><span>备注信息：</span> {{details.remark}}</p>
				<p v-if="details.img"><span>打款凭证：</span> {{details.img}}</p>
			</div>
		</div>

		<!-- 已完成 -->
		<div class="detail" v-if="details.status == 1">
			<h2>
				{{details.money}}
				<small>{{details.status_zh}}</small>
			</h2>
			<div class="list">
				<p><span>审核单号：</span> {{details.id}}</p>
				<p><span>提现到：</span> {{details.bank_name}}（{{details.account_number.slice(-4)}}）</p>
				<p><span>提现时间：</span> {{details.add_time}}</p>
				<p><span>打款时间：</span> {{details.review_time}}</p>
				<p><span>备注信息：</span> {{details.remark}}</p>
				<p v-if="details.img"><span>打款凭证：</span> <i><img :src="details.img" alt="打款凭证" @click="preView(details.img)"></i></p>
			</div>
		</div>

	</div>
</template>

<script>
	import { ImagePreview } from 'vant';
    import navbar from '../navbar/nav.vue'
	export default {
        components:{
            navbar
        },
		data(){
			return {			
				details: {},
				is_right: '1',  // 1-正常情况 0-不正常，需要修改银行卡信息
			}
		},
		created(){
			//status 0未审核 进行中 1审核通过 已完成 2审核驳回
			this.details = JSON.parse(this.$route.query.details);
			//银行卡信息
			this.is_right = this.$route.query.is_right;
		},
		methods:{
            //####=>返回上一页
            goPreviousPage(){
                this.$router.go(-1);
            },	
            //预览图片
            preView(imgSrc) {
            	ImagePreview([imgSrc]);
            },
            //去修改银行卡信息
            toEdit(){
            	this.$router.push({path: '/bindingBankCard', query:{info: JSON.stringify(this.details)}});
            }	
		}
	}
</script>

<style lang="less" scoped>
	h2, p {
		margin: 0;
	}
	.detail {
		background-color: #ffffff;
		h2 {
			font-size: 28px;
			color: #424242;
			text-align: center;
		    padding: 30px 0 17px;
			small {
				display: block;
				font-size: 12px;
				&.yellow {
					color: #ffb912;
				}
				&.danger {
					color: #ee2d2d;
				}
			}
			.to-edit {
				text-align: center;
				span {
					font-size: 14px;
					color: #ffffff;
					background-color: #ee2d2d;
					padding: 5px 19px;
					border-radius: 5px;
				}
			}
		}

		.list {
			height: 230px;
			padding: 0 12px;
			p {
				font-size: 14px;
				color: #808080;
				line-height: 2em;
				span {
					display: inline-block;
					width: 70px;
				}
				i {
					display: inline-block;
					width: 62px;
					height: 62px;
					background-color: #ffc4d4;
					border-radius: 10px;
					overflow: hidden;
				    vertical-align: top;
					position: relative;
					img {
						min-width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>