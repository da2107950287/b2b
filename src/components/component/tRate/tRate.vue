<!-- 自定义 五星评分组件 -->
<template>
	<div class="box">
		<!-- 第一颗星 -->
		<img v-if="rate>=1" src="../../../assets/img/star.png" alt="">
		<img v-else-if="rate == 0.5" src="../../../assets/img/star1.png" alt="">
		<img v-else src="../../../assets/img/star2.png" alt="">
		
		<!-- 第二颗星 -->
		<img v-if="rate>=2" src="../../../assets/img/star.png" alt="">
		<img v-else-if="rate == 1.5" src="../../../assets/img/star1.png" alt="">
		<img v-else src="../../../assets/img/star2.png" alt="">

		<!-- 第三颗星 -->
		<img v-if="rate>=3" src="../../../assets/img/star.png" alt="">
		<img v-else-if="rate == 2.5" src="../../../assets/img/star1.png" alt="">
		<img v-else src="../../../assets/img/star2.png" alt="">

		<!-- 第二颗星 -->
		<img v-if="rate>=4" src="../../../assets/img/star.png" alt="">
		<img v-else-if="rate == 3.5" src="../../../assets/img/star1.png" alt="">
		<img v-else src="../../../assets/img/star2.png" alt="">

		<!-- 第二颗星 -->
		<img v-if="rate==5" src="../../../assets/img/star.png" alt="">
		<img v-else-if="rate == 4.5" src="../../../assets/img/star1.png" alt="">
		<img v-else src="../../../assets/img/star2.png" alt="">
	</div>
</template>

<script>
export default {
	props:{
		rate:{
			type: Number,
			default: 0
		}
	}
}
</script>

<style scoped>
	.box {
	    display: table;
	    font-size: 0;
	}
	.box img {
		width: 16px;
		height: 16px;
		margin-right: 5px;
	}
</style>