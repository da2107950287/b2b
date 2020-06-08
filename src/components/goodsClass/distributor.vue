<template>
	<div>
 		<navbar type="left" title="选择配送方式" @clickleft="onClickLeft"></navbar>

		<van-radio-group v-model="radio">
	 		<van-cell-group>
			    <van-cell v-if="radio === '1'" title="自送" clickable @click="radio = '1'">
			        <template #right-icon>
			            <van-radio checked-color="#EE2D2D" name="1" /></template>
			    </van-cell>
			    <van-cell v-else-if="radio === '2'" title="农联物流" clickable @click="radio = '2'">
			        <template #right-icon>
			            <van-radio checked-color="#EE2D2D" name="2" /></template>
			    </van-cell>
			</van-cell-group>
		</van-radio-group>
	</div>
</template>

<script>
	const navbar =  ()=>import("../navbar/nav.vue");
	export default {
		components: {
			navbar
		},
		data(){
			return{
				radio: '0'
			}
		},
		created(){
			let markData = JSON.parse(localStorage.getItem('marketData'));

			switch(markData.type.id) {
				case '5':
					//配送商-自送
					this.radio = '1';
					break;
				default:
					//其他-农联物流
					this.radio = '2';
			}			
		},
		methods: {
	        onClickLeft(){
	            this.$emit('onClickClose')
	        }
		}
	}
</script>

<style scoped>

</style>