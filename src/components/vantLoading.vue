<template>
	<div :class="['loading', {'loading-vertical': !vertical}]">
		<van-loading :size="size" :color="color" :type="type" />
		<p ref="text">{{text}}</p>
	</div>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: '17px'
		},
		color: {
			type: String,
			default: '#ee2d2d'
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
			default: '12px'
		},
		textColor: {
			type: String,
			default: '#ee2d2d'
		},
		//是否垂直排列图标和文字内容
		vertical: {
			type: Boolean,
			default: true
		}
	},
	mounted(){
		this.$refs.text.style.fontSize = this.textSize;
		this.$refs.text.style.color = this.textColor;
	}
}
</script>

<style scoped>
	.loading {
		text-align: center;
		display: flex;
		padding: 15px 0;
	}
	.loading .van-loading {
		display: block;
		margin: auto;
		margin-right: 10px;
		background-color: #fff;
		padding: 5px;
		border-radius: 50px;
		box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
	}
	.loading p {
		margin: auto;
		margin-left: 0;
	}

	.loading-vertical p {
		display: block;
	}

</style>