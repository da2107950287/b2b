<!-- 自定义 进度条组件 -->
<template>
	<div class="progress">
		<div class="box">
			<div ref="pro" class="active"></div>
			<div class="wenzi">{{curNum}}/{{totalNum}}{{unit}}</div>
		</div>
		<div class="percent">{{percent}}</div>
	</div>
</template>

<script>
export default {
	props:{
		// 总数据
		totalNum: Number,
		//当前活动数据
		curNum: Number,
		//数据 单位
		unit: {
			type: String,
			default: ''
		}
	},
	data(){
		return {
			percent: '0%'
		}
	},
	mounted(){
		let n = Math.ceil(this.curNum*100/this.totalNum);
		if(n > 100) {n = 100;}
		let per = n + '%';
		this.$refs.pro.style = 'width: '+ per +';';
		this.percent = per;
	}
}
</script>

<style scoped>
	.progress {
		width: 100%;
	    display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
		font-size: 12px;
	}
	.progress .box {
		-webkit-box-flex: 3;
    	-ms-flex: 3;
		flex: 3;
		height: 18px;
		line-height: 17px;
		color: #ffffff;
		text-indent: 6px;
		background-color: #ececec;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	.progress .box .active {
		width: 0;
		height: 100%;
		background-color: #ee2d2d;
		border-radius: 10px;
	}
	.progress .box .wenzi {
		position: absolute;
		left: 0;
		top: 0;		
	}
	.progress .percent {
		-webkit-box-flex: 1;
    	-ms-flex: 1;
		flex: 1;
		line-height: 14px;
	    padding-left: 12px;
	}
</style>