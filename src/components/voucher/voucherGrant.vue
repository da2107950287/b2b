<template>
	<div>
		<!-- 头部导航 -->
		<navbar title="发放金券" type="left" @clickleft="onClickLeft"></navbar>
		
		<div v-if="list.length">
	        <!-- 金券列表部分 -->
			<div class="list">
				<h4 class="list-title">发放：{{selected.length}}张<span>（共{{list.length}}张）</span></h4>
				<!-- <div class="list-item">
					<div class="money">
						<p>&yen;<span>10</span></p>
						<p>无门槛</p>
					</div>
					<div class="text">
						<h1>农联金券</h1>
						<p>可在农联商品购买商品时抵扣金额 ，最多可抵扣至0.01元</p>
					</div>
					<div class="tu">
						<div @click="checkVoucher($event, '1')"></div>
					</div>
					<span class="list-right">首次券</span>
				</div> -->

				<div class="list-item" v-for="(item, index) in list" :key="index">
					<div class="money">
						<p>&yen;<span>{{item.discount_money}}</span></p>
						<p>无门槛</p>
					</div>
					<div class="text">
						<h1>{{item.name}}<span v-if="item.level == 1">（分享券）</span></h1>
						<p>{{item.describe}}</p>
					</div>
					<div class="tu">
						<div @click="checkVoucher($event, item.money_id)"></div>
					</div>
					<span v-show="item.wxShared" class="list-right">未领取</span>
				</div>
			</div>

			<!-- 最底部按钮 -->
			<div class="btns">
				<div @click="sure">确定</div>
			</div>
		</div>
		<div v-else>
			<searchNone :item="'voucher'" t-type="true"></searchNone>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		navbar: ()=> import('../navbar/nav.vue'),
		searchNone: ()=>import("../component/searchNone/searchNone.vue")
	},
	data(){
		return {
            //金券列表数据,
            list: [],
            //被选中的数据id
            selected: [],
		}
	},
	created(){
		this.getVoucherList();
	},
	methods: {
		//返回前一页
		onClickLeft(){
			//
            if(this.fromHerf == null){
                this.$router.push({
                    path:'/index'
                });
            }else{
                this.$router.go(-1);
            }
		},
		//切换金券选中状态
		checkVoucher(ev, id){
			let target = ev.target || window.event.srcElement;
			//判断此券是否被选中
			let i = this.selected.findIndex(value=> value==id);

			//未被选中，则选中此值
			if(i === -1) {
				//最多只能选择10张优惠券分享
				if(this.selected.length == 10) {
					return this.$toast('最多可选择10张');
				}
				target.className = 'selected';
				this.selected.push(id);
			}else {
				//之前已被选中，则取消选中
				target.className = '';
				this.selected.splice(i, 1);
			}
			// console.log(this.selected)
		},
		//获取能分享的金券列表
		getVoucherList(){
            this.$post('/?c=wholesaleCouponMoney&a=shareList',{})
            .then((res)=>{
            	if(res.code == 0) {
            		this.list = res.data;
            		//存放在本地的分享过的数据
            		let fenxs = localStorage.getItem('WXSHARW_getVouchers');
            		let index = -1;
            		if(fenxs) {
            			fenxs = fenxs.split(',');
            			for(var key in this.list) {
            				//再本地数据中查询是否分享过此id的数据
            				index = fenxs.findIndex(value=> value==this.list[key].money_id);
            				if(index != -1) {
            					//分享过此数据，则标记一个wxShared 属性为true， 然后在渲染时显示 “未领取”标签
            					this.list[key].wxShared = true;
            				}
            			}
            			
            		}
            	}else {
            		this.$toast(res.msg);
            	}
            })			
		},
		//确定
		sure(){
			this.$parent.$refs.loading.style.display = 'flex';
            this.$post('/?c=wholesaleCouponMoney&a=share',{
            	money_ids: this.selected.join(',')
            })
            .then((res)=>{
            	this.$parent.$refs.loading.style.display = 'none';
            	if(res.code == 0) {
            		//保存标签状态
        			let arr = [];
        			let index = -1;
        			for(var key in this.list) {
        				//本地数据中查询是否分享过此id的数据
        				index = this.selected.findIndex(value=> value==this.list[key].money_id);
        				if(index != -1) {
        					this.list[key].wxShared = true;
        					//手动更新当前被改变的数据，使其视图及时更新
        					this.list.splice(key, 1, this.list[key]);
        				}

        				if(this.list[key].wxShared) {
        					arr.push(this.list[key].money_id);
        				}
        			}
                	//分享成功，将被分享的金券数据存放在本地
    				localStorage.setItem('WXSHARW_getVouchers', arr.join(','));

					//进入分享金券二维码页
					this.$router.push({path: '/vouchEwm', query: {res: JSON.stringify(res.data)}})
            	}else {
            		this.$toast(res.msg);
            	}
            })
		}
	}
}
</script>

<style scoped>
	/*重置部分通用样式*/
	.van-cell-group .van-cell {
		padding-left: 10px;
		padding-right: 10px;
	}

    .wallet-profit {
        font-size: 12px;
        line-height: 1.5em;
        color: #808080;
        background-color: #ffffff;
        padding: 0.8rem 0;
        margin-bottom: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .wallet-profit div {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;    	
    }
    .wallet-profit div span {
    	font-size: 14px;
    }
    .wallet-profit-line {
        display: inline-block;
        width: 2px;
        height: 35px;
        background-color: #f2f2f2;
    }

	.list {
		padding: 0 10px 50px;
		color: #424242;
	}
	.list-title {
		font-size: 14px;
		font-weight: normal;
        margin: 0;
        padding: 9px 0 8px;
	}
	.list-title span {
		font-size: 12px;
	}
	.list-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        min-height: 70px; 
        padding: 15px 0 10px; 
        background-color: #ffffff;
        border-radius: 5px;
        margin-bottom: 10px;
        position: relative;
	}
	.list-item .money {
		width: 106px;
		text-align: center;
		border-right: 1px dashed #c1c1c1;
	}
	.list-item .money p {
		font-size: 13px;
		color: #ee2d2d;
		margin: 0;
	}
	.list-item .money p:first-child {
		font-weight: bold;
	}
	.list-item .money p span {
		font-size: 28px;
	}
	.list-item .text {
	    -webkit-box-flex: 1;
    	-ms-flex: 1;
		flex: 1;
		padding-left: 15px;	
    	padding-right: 3px;
	}
	.list-item .text h1 {
		font-size: 16px;
		font-weight: normal;
		word-break: break-all;
    	white-space: normal;
		margin: 0;
		padding-bottom: 3px;
	}
	.list-item .text h1 span {
		font-size: 12px;
		word-break: break-all;
    	white-space: normal;		
	}
	.list-item .text p {
		font-size: 12px;
		word-break: break-all;
    	white-space: normal;
		margin: 0;
	}
	.list-item .tu {
		padding: 22px 10px 0;
	}
	.list-item .tu div {
		width: 18px;
		height: 18px;
		font-size: 0;
		background: url('../../assets/img/voucher/no-selected.png') no-repeat;
		-webkit-background-size: 100% 100%; 
		background-size: 100% 100%;
		position: relative;
	}
	.list-item .tu div.selected {
		background: url('../../assets/img/voucher/selected.png') no-repeat;
		-webkit-background-size: 100% 100%; 
		background-size: 100% 100%;
	}
	.list-item .list-right {
		font-size: 12px;
		color: #ffffff;
		background-color: #ee2d2d;
	    padding: 1px 3px 1px 5px;
	    border-top-left-radius: 5px;
	    border-bottom-left-radius: 5px;
		position: absolute;
		top: 6px;
		right: 0;
	}

	.btns {
		width: 100%;
		padding: 5px 23px;
		background-color: #ffffff;
	    -webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.btns div {
		font-size: 16px;
		text-align: center;
		color: #fff;
		background-color: #ee2d2d;	
		border-radius: 5px;
		padding: 9px 0;	
	}
	.btns div.active {
		background-color: #e7e7e7;
	}
</style>