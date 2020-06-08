<template>
	<div>
		<div class="list" v-if="show == 2">
			<!-- 每一个商品样式 
			<div class="box" @click="goToGoods1)">
				 左侧 商品图
				<div class="box-img">
					<img src="http://pic22.nipic.com/20120620/9644879_220135570113_2.jpg" alt="">
				</div>
				 右侧 商品相关介绍
				<div class="box-container">
					商品名 
					<h2>集鲜锋梨约3-10斤陕西蒲城生鲜酥梨水果新鲜梨子非库尔勒梨水果新鲜梨子非库尔勒梨水果新鲜梨子非库尔勒</h2>
					标签 
					<div class="box-tags">
						<span class="yellow">白家市场</span>
						<span>放心购</span>
						<span>已溯源</span>
						<span>放心购</span>
					</div>
					 商品描述
					<p class="box-describe">这里是商品描述啊，哈哈哈哈哈哈哈哈哈</p>
					进度条，自定义子组件
					<t-progress :totalNum="100" :curNum="50" unit="箱"></t-progress>
					价格 人数
					<div class="box-price">
						<div class="box-price-left">
							￥<span>54.5</span>/斤
						</div>
						<div>6人</div>
					</div>
					 店铺名称 与 进店
					<div class="box-store">
						<span>某某某店</span>
						<router-link :to="{path: '/shop', query:{index: 1}}">进店<van-icon name="arrow"/></router-link>
					</div>
				</div>
			</div>-->

			<div class="box" v-for="(item, index) in dataList" :key="index" @click="goToGoods(item.wId)">
				<!-- 左侧 商品图 -->
				<div class="box-img">
					<img :src="item.imgList[0] && item.imgList[0].thumb_url">
				</div>
				<!-- 右侧 商品相关介绍 -->
				<div class="box-container">
					<!-- 商品名 -->
					<h2>{{item.goods_name}}</h2>
					<!-- 标签 -->
					<div class="box-tags" v-if="item.market_name">
						<span class="yellow">{{item.market_name}}</span>
						<span v-for="(tag,ind) in item.tags" :key="ind" v-if="ind < 2">{{tag}}</span>
					</div>
					<div class="box-tags" v-else>
						<span v-for="(tag,ind) in item.tags" :key="ind" v-if="ind < 3">{{tag}}</span>
					</div>
					<!-- 商品描述 -->
					<p class="box-describe">{{item.remark}}</p>
					<!-- 进度条，自定义子组件 -->
					<t-progress :totalNum="Number(item.total_number)" :curNum="Number(item.buy_number)" :unit="item.unit"></t-progress>
					<!-- 价格 人数 -->
					<div class="box-price">
						<div class="box-price-left">
							￥<span>{{item.unit_price}}</span>/{{item.measure_unit}}
						</div>
						<div>{{item.buyCount}}人</div>
					</div>
					<!-- 店铺名称 与 进店 -->
					<div class="box-store" @click.stop="goToShop(item.ru_id, item.shop_name)">
						<span>{{item.shop_name}}</span>
						<a href="javascript:;">进店<img src="../../assets/img/jiantou.png" alt=""></a>
					</div>
				</div>
			</div>

	        <div v-if="lock===2"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
	        <div class="end-msg">{{endMsg}}</div>
		</div>
		<div v-else-if="show == 1">
			<search-none :item="'walletAccount'" t-type="true"></search-none>
		</div>
		<div v-else class="vantLoading">
			<vant-loading :vertical="false" text="努力加载中..."></vant-loading>
		</div>
	</div>

</template>

<script>
export default {
	props:{
		//分类id
		categoryId: {
			type: String,
			default: ''
		},
		//市场id
		marketId:{
			type: String,
			default: ''
		},
		//排序值 1拼团量2低价3开团时间4推荐
		order:{
			type: Number,
			default: 4
		}
	},
	components:{
		tProgress:() => import('../component/tProgress/tProgress.vue'), //进度条
		vantLoading: () => import('../vantLoading.vue'),  //加载中样式
		searchNone: () =>import('../component/searchNone/searchNone.vue')  //缺省图
	},
	data(){
		return {
			lock: 1,  //是否在请求加载中 1-否 2-是
			show: 0,  //0-进入页面默认显示 1-缺省图 2-有数据
			endMsg: '',  //分页加载内容无更多内容时的提示

			page: 1, //页码数
			limit: 10,  //每页最大数据条数

			dataList: [],  //列表数据
		}
	},
	created(){
		this.getList()
	},
	methods:{
        //请求列表数据  . 由父组件调用方法
        getList(isStart){
        	//是否是父组件调用， 是， 则将数据重置为初始状态。不是，则是分页加载
        	if(isStart) {
        		this.page = 1;
        		this.show = 0;
        		this.dataList = [];
        		window.removeEventListener('scroll', this.handleScroll)
        	}

            this.clock = 2;
            this.$post("/?c=GroupBuying&a=activityGoodsList", {
            	category_id: this.categoryId, 
            	market_id: this.marketId,
            	order: this.order,
              	page:this.page,
              	pageSize:this.limit
            }).then((res) => {
                switch (res.code){
                    case 0:
                      
                      this.clock = 1;

                      if(this.page ==1 && res.data.length > 0){
                      	//有内容，显示内容
                      	this.show = 2;
                      }else if(this.page ==1 && !res.data.length){
                      	//无内容，显示缺省图
                      	this.show = 1;
                      	return
                      }

                      this.dataList = [...this.dataList,...res.data];
                      console.log(this.dataList, '==this.dataList')
                      //第一页请求，且得到数据条数等于 每页最大数据条数， 则还可能有数据， 允许分页加载
                      if(this.page ==1 && res.data.length == this.limit) {
                        window.addEventListener('scroll', this.handleScroll)
                      }

                      //非第一页（已分页监听），数据不满最大条数， 则无更多数据， 取消分页加载更多
                      if(this.page>1 && res.data.length < this.limit) {
                      	this.endMsg = '已经没有更多内容啦~';
                        window.removeEventListener('scroll', this.handleScroll)
                      }
                    break;
                    default:
                      this.$toast(res.msg);
                    break;
                }
                
            });
        },
        //瀑布流加载
        handleScroll () {
            let _this=this
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= (scrollHeight - 50)) {
                //写后台加载数据的函数
                if(_this.clock == 1){
                  //在此处增加页码， 保证页码数为当前请求页
                  this.page++;
                  this.getList()
                }
            }
        },
        //进入商品详情页
        goToGoods(wId){
        	this.$router.push({path: '/groupBuyingGoods', query:{goods: wId}})
        },
        //进入店铺
        goToShop(seller_id, shop_name){
	        this.$router.push({
	            path: '/shop',
	            query: {
	                businessHeadTitle: shop_name,
	                index: seller_id
	            }
	        })
        }
	},
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style scoped>
	.list {
		margin-top: 10px;
	}
	.box {
		background-color: #ffffff;
	    display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
		padding: 15px 12px 5px;
	}
	.box .box-img {
	    -webkit-box-flex: 1;
    	-ms-flex: 1;
		flex: 1;
		width: 100%;
		height: 0;
		padding-bottom: 33%;
		position: relative;
	}
	.box .box-img img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.box .box-container {
	    -webkit-box-flex: 2;
    	-ms-flex: 2;
		flex: 2;
		padding-left: 10px;
	}

	.box-container h2 {
		font-size: 16px;
		color: #424242;
		font-weight: normal;
		margin: 0;
		padding: 0;
	    display: -webkit-box;
	    /*! autoprefixer: off */
	    -webkit-box-orient: vertical;
	    /*! autoprefixer: on */
	    -webkit-line-clamp: 2;
	    overflow: hidden;
	}


	.box-container .box-tags span {
		display: inline-block;
		height: 16px;
		text-align: center;
		line-height: 16px;
		font-size: 12px;
		color: #999999;
		border: 1px solid #999999;
		border-radius: 4px;
	    padding: 0 5px;
	    margin-right: 5px;
	}
	.box-container .box-tags span.yellow {
		color: #ffffff;
		background-color: #ffb912;
		border-color: #ffb912;
	}

	.box-container .box-describe {
		font-size: 12px;
		color: #808080;
		margin: 5px 0 8px;
	    line-height: 15px;
	}

	.box-container .box-price {
	    display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
    	-ms-flex-pack: justify;
	    justify-content: space-between;

	    font-size: 12px;
	    color: #808080;
        padding: 10px 0 0;
	}
	.box-container .box-price-left {
		color: #ee2d2d;
	}
	.box-container .box-price-left span {
		font-size: 16px;
	}
	
	.box-container .box-store {
		line-height: 1.2em;
		display: inline-block;
	}
	.box-container .box-store span {
		float: left;
	    max-width: 7rem;
		font-size: 12px;
		color: #808080;
		padding-right: 10px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    /*! autoprefixer: off */
	    -webkit-box-orient: vertical;
	    /*! autoprefixer: on */
	}
	.box-container .box-store a {
		float: left;
		font-size: 12px;
		color: #424242;
	}
	.box-container .box-store img {
	    height: 12px;
	    padding-left: 3px;
	    vertical-align: middle;
	    padding-bottom: 2px;
	}
</style>