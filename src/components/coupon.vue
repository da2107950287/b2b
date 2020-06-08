<template>
	<div>
        <!-- 顶部导航栏 -->
		<navbar type="left" title="优惠券" @clickleft="onClickLeft"></navbar>
        <!-- 领券 -->
        <van-tabs v-model="active" @change="onClick" :lineWidth="50" title-active-color="#ee2d2d" title-inactive-color="#424242">
		  	<van-tab title="未使用" >
				<!-- 无内容 -->
				<template v-if="show == 1">
					<couponLi v-for="(item , index) in coupon" :key="index" :active="active" :item="item" :lock="lock" :index="index"></couponLi>
				</template>
				<template v-else-if="show == 2">
					<searchNone :item="'coupon'"></searchNone>
					<!-- <div class="btn"><van-button size="small" type="danger">前去领劵</van-button></div> -->
				</template>
				<div v-else class="vantLoading">
					<vloading :vertical="false" text=""></vloading>
				</div>
		  	</van-tab>
		  	<van-tab title="已失效">
				<!-- 无内容 -->
				<template v-if="show == 1">
					<couponLi v-for="(item , index) in coupon" :key="index" :active="active" :item="item" :lock="lock" :index="index"></couponLi>
				</template>
				<template v-else-if="show == 2">
					<searchNone :item="'coupon'"></searchNone>
					<!-- <div class="btn"><van-button size="small" type="danger">前去领劵</van-button></div> -->
				</template>
				<div v-else class="vantLoading">
					<vloading :vertical="false" text=""></vloading>
				</div>
		  	</van-tab>
		</van-tabs>

	</div>
</template>
<script>
import couponLi from "./component/coupon/couponLi.vue";	
import searchNone from "./component/searchNone/searchNone.vue";	

import navbar from "./navbar/nav.vue";	
import vloading from "./vloading.vue";	
export default {
	components: {
		searchNone,
		couponLi,
		navbar,
		vloading,
	},
	data(){
		return{
			active:0,
			coupon:[],
			show:0,
			endMsg:'',

			lock:0,
		}
	},
	created(){
		this.active = this.$route.query.index?this.$route.query.index:0
		let status = 0;
		if(this.active == 1){
			status = 3;
		}else{
			status = 1;
		}

		this.getList(status);
	},
	methods: {
		handleScroll(){

		},
	    onClickLeft() {
	      	this.$router.push({
                path:'/personal',
            })
	    },
	    onClick(name, title) {
			this.coupon = [];
			this.show = 0;
			this.endMsg = '';

			let index = 0;
			let status = 1;
			if(this.active == 1){
				index = 1;
				status = 3;
			}
			this.$router.push({
				query:{
					index:index
				}
			});
			this.getList(status);
	    },
	    //请求优惠券列表
	    getList(status) {
	    	//氢气中
	    	if(this.lock == 1) {
	    		return;
	    	}
	    	this.lock = 1;
	        this.$post('/?c=wholesaleCoupon&a=list232',{
	            status:status,
	        }).then((res)=>{
	        	this.lock = 0;
	            if(res.code == 0){
	            	let arrs = [];

	                //农联金券， 金券排在前面
	                if(res.data.money.length) {
	                    arrs = res.data.money;
	                    //为保持样式一致， 增加一个coupon_id
	                    for(var item in arrs) {
	                    	// console.log('item===',item)
	                    	arrs[item].coupon_id = arrs[item].money_id;
	                    }
	                }

	                //平台优惠券
	                if(res.data.full.length){
	                    arrs = [...arrs, ...res.data.full];
	                }

					if(arrs && arrs.length > 0){
						this.show = 1;
					}else{
						this.show = 2;
					}

	                this.coupon = arrs;
	                // console.log('arrs==', arrs)
	                
	            }else if(res.code == 1){
	                this.$toast(res.msg)
	            }
	        });	    	
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

	.btn {
		text-align: center;
	}
	.btn .van-button {
		border-radius: 5px;
	}
	
.vantLoading{
    margin-top: 20px;
    width: 100%;
    display: flex;
}
.end-msg {
  font-size: 14px;
  text-align: center;
  color: #c9c9c9;
  line-height: 3em;
  margin: 0;
}
</style>