<template>
	<div :class="['loading', {'loading-vertical': !vertical}]">
		<van-loading :size="size" :color="color" :type="type" />
	</div>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: '24px'
		},
		color: {
			type: String,
			default: '#dd2e2e'
		},
		/*type 值可选 circular/spinner */ 
		type: {
			type: String,
			default: 'circular'
		},
		text: {
			type: String,
			default: '加载中...'
		},
		textSize: {
			type: String,
			default: '14px'
		},
		textColor: {
			type: String,
			default: '#c9c9c9'
		},
		//是否垂直排列图标和文字内容
		vertical: {
			type: Boolean,
			default: true
		}
	},
	mounted(){
		// this.$refs.text.style.fontSize = this.textSize;
		// this.$refs.text.style.color = this.textColor;
	}
}
</script>

<style scoped>
	.loading {
		text-align: center;
		margin: auto;
		background-color: #fff;
		padding: 5px;
		border-radius: 50px;
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
	}
	.loading .van-loading {
		display: block;
	}
	.loading p {
		margin: 0;
	    padding-top: 8px;
	}
</style>