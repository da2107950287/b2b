<template>
	<div>
        <!-- 顶部导航栏 -->
        <van-nav-bar 
            title="生意圈"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
		<!-- 无内容 -->
		<searchNone :item="'businessCircle'"></searchNone>
	</div>
</template>
<script>
import searchNone from "./component/searchNone/searchNone.vue";	
export default {
	components: {
		searchNone
	},
	methods: {
	    onClickLeft() {
	      this.$router.go(-1)
	    }
	}
}
</script>

<style scoped>
	.van-nav-bar .van-icon {
		color: #333333;
	}
	.van-nav-bar__text {
		color: #808080;
	}
</style>