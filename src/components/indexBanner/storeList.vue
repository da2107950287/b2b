<template>
	<div class="zon">
        <!-- 筛选部分 -->
        <div :class="['tabs', {'isFixed': isFixed}]">
        	
			<div :class="['tabs-item', {'active': active == 0 || index0 > 0}]">
				<div class="tabs-title" @click.capture="active == 0 ? active = -1 : active = 0">
					{{index0 == 0 ? '品类' : category[index0].cat_name}} <van-icon v-if="active == 0" name="arrow-up" /><van-icon v-else name="arrow-down" />
				</div>
				<div :class="['drop-down', {'show': active == 0, 'drop-down-index': isIndex}]" @click.stop="active = -1">
					<ul @click.stop="handleSelect($event)">
						<li v-for="(item, index) in category" :key="item.cat_name" :class="{'active': active == 0 && index0 == index}" :data-index="index">{{item.cat_name}}</li>
					</ul>
				</div>
			</div>
			<div :class="['tabs-item', {'active': active == 1 || index1 > 0}]">
				<div class="tabs-title" @click.capture="active == 1 ? active = -1 : active = 1">
					{{index1 == 0 ? '市场' : marketList[index1].market_name}} <van-icon v-if="active == 1" name="arrow-up" /><van-icon v-else name="arrow-down" />
				</div>
				<div :class="['drop-down', {'show': active == 1, 'drop-down-index': isIndex}]" @click.stop="active = -1">
					<ul @click.stop="handleSelect($event)">
						<li v-for="(item, index) in marketList" :key="item.market_name" :class="{'active': active == 1 && index1 == index}" :data-index="index">{{item.market_name}}</li>
					</ul>
				</div>
			</div>
			<div :class="['tabs-item', {'active': active == 2 || index2 > 0}]">
				<div class="tabs-title" @click.capture="active == 2 ? active = -1 : active = 2">
					{{index2 == 0 ? '智能排序' : activitySort[index2].name}} <van-icon v-if="active == 2" name="arrow-up" /><van-icon v-else name="arrow-down" />
				</div>
				<div :class="['drop-down', {'show': active == 2, 'drop-down-index': isIndex}]" @click.stop="active = -1">
					<ul @click.stop="handleSelect($event)">
						<li v-for="(item, index) in activitySort" :key="item.name" :class="{'active': active == 2 && index2 == index}" :data-index="index">{{item.name}}</li>
					</ul>
				</div>
			</div>
        </div>
        <div class="mask"></div>
		<!-- <div :class="['mask', {'mask-drop': active != -1, 'isFixed': isFixed && active != -1}]"></div> -->

        <!--  列表内容 -->
		<div class="list" v-if="show == 2">
			<div v-for="(store, index) in list" :key="store.ru_id" :class="['store', {'disabled': store.shop_close != 1}]">
				<div class="box" @click.stop="goShops(store.seller_id)">
					<div class="box-img">
						<img :src="store.thumb || no_picture" :onerror="no_picture">
					</div>
					<div class="box-des">
						<h4 class="ellipsis-1">{{store.name}}</h4>
						<div class="box-des-stars">
							<star :star-value="Number(store.score)" :margin-right="1"></star> <span class="yellow">{{store.score}}</span><!--  <span>月销量</span> <span>300单</span> -->
						</div>
						<!-- <p class="ellipsis-1"><van-tag color="#da5c57">优惠</van-tag> 满10减5，满40减20</p> -->
					</div>
					<div class="box-loc">{{store.district}}</div>
					<img v-if="store.shop_close == 2" class="close-store" src="../../assets/img/closeStore.png" alt="打烊">
				</div>
				<div class="store-tui" v-if="store.goods && store.goods.length">
					<h4>{{isIndex?'推荐':'相关'}}商品</h4>
					<div>
						<div class="tuis">
							<div class="tui-tu" :style="{'--width': widthVar}" v-for="good in store.goods" :key="good.wId" @click.stop="toGood(good.wId)">
								<img :src="good.thumb" :alt="good.goods_name" :onerror="no_picture2">
								<p class="ellipsis-1">￥{{good.goods_price}}</p>
								<h6 class="ellipsis-1">{{good.goods_name}}</h6>
								<h6 class="tui-tu-price2 ellipsis-1"><small>￥{{good.display_price}}/{{good.display_unit}}</small></h6>
							</div>
						</div>
					</div>
				</div>	        	
			</div>
			<!-- <div class="store">
				<div class="box">
					<div class="box-img">
						<img src="" :onerror="no_picture">
					</div>
					<div class="box-des">
						<h4 class="ellipsis-1">宏碁连锁常识超市三生三世三生三世三生三世</h4>
						<div class="box-des-stars">
							<star :star-value="4.5" :margin-right="1"></star> <span class="yellow">4.5</span><span>月销量</span> <span>300单</span>
						</div>
						<p class="ellipsis-1"><van-tag color="#da5c57">优惠</van-tag> 满10减5，满40减20</p>
					</div>
					<div class="box-loc">武侯啊</div>
					<img class="close-store" src="../../assets/img/closeStore.png" alt="">
				</div>
				<div class="store-tui">
					<h4>推荐商品</h4>
					<div>
						<div class="tuis">
							<div class="tui-tu" @click.stop="toGood('11')">
								<img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
								<p class="ellipsis-1">￥10.00</p>
								<h6 class="ellipsis-1">新鲜大忙姑婆</h6>
								<h6 class="tui-tu-price2 ellipsis-1"><small>￥1202.00</small></h6>
							</div>
							<div class="tui-tu">
								<img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
								<p class="ellipsis-1">￥10.00</p>
								<h6 class="ellipsis-1">新鲜大忙姑婆</h6>
								<h6 class="tui-tu-price2 ellipsis-1"><small>￥1202.00</small></h6>
							</div>
							<div class="tui-tu">
								<img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
								<p class="ellipsis-1">￥10.00</p>
								<h6 class="ellipsis-1">新鲜大忙姑婆</h6>
								<h6 class="tui-tu-price2 ellipsis-1"><small>￥1202.00</small></h6>
							</div>
						</div>
					</div>
				</div>
			</div> -->
			<div v-if="lock==2"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
	        <div class="end-msg">{{endMsg}}</div>

	        <div :class="{'list-drop': active != -1, 'isFixed': isFixed}"></div>
		</div>
		<div v-else-if="show == 1">
			<search-none :item="'storeList'" t-type="true"></search-none>
		</div>
		<div v-else class="vantLoading">
			<vant-loading :vertical="false" text="努力加载中..."></vant-loading>
		</div>
	</div>
</template>

<script>
//设备宽度
const clientWidth = document.body.clientWidth;
//每个商品图的宽度
const goodsWidth = (clientWidth - 12*2 - 12*2 - 5*3)/4;
export default {
	props: {
		isFixed: {
			type: Boolean,
			default: false
		},
		isIndex: {
			type: Boolean,
			default: false
		},
		allCategory: {
			type: Array,
			default: ()=>{
				return []
			}
		},
		marketSortLists: {
			type: Array,
			default: ()=>{
				return []
			}
		}
	},
    components:{
		vantLoading: () => import('../vantLoading.vue'),  //加载中样式
		searchNone: () =>import('../component/searchNone/searchNone.vue'),  //缺省图
		star: () =>import("../goods/star.vue")  //星级
    },
	data(){
		return {
			//css变量
			widthVar: goodsWidth+'px',

			//店铺图加载失败图
			no_picture: 'this.src="'+require('../../assets/img/merchant_default.jpg')+'"',
			//商品图加载失败图
			no_picture2: 'this.src="'+require('../../assets/img/get_avatar.png')+'"',
			active: -1,
            //id- 用户查找 所有商品分类 、所属市场- 
            regionID: '',

            //分类id
            cat_id: '',
            //市场id
            market_id: '',

            //品类(即分类)下数据类型  期望类型模板类型 []
            category: [{cat_name: "全部", son:[{cat_name: '', cat_id: ''}], cat_id: ''}],
            //所属市场
            marketList: [{market_name: '全部', market_id: ''}],
            //智能排序数据
            activitySort: [
            	{
	                name:'智能排序', //0
	            },{
	                name:'推荐优先', //1
	            },{
	                name:'销量优先',//2
	            },{
	                name:'好评优先',//3
	            }
            ],
            searchInput: this.$route.query.name || '',

            lock: 1,  //1-未请求 2-请求中
            endMsg: '',
            page: 1,
            limit: 12,
			show: 0,  //0-进入页面默认显示 1-缺省图 2-有数据
			list: [],

			//品类筛选条件 index
			index0: 0,
			index1: 0,
			index2: 0
		}
	},
	created(){
		if(this.isIndex) {
			//首页
			// this.category = [...this.category, ...this.$parent.allCategory];
			// this.marketList = [...this.marketList, ...this.$parent.marketSortLists];
        	this.lock = 2;
            this.getListData();
		}else {
			this.initData();
		}
	},
	//解决因多次请求相关值，而引起的首页分类无值问题
	watch: {
		allCategory(val){
			if(this.category.length) {
				this.category.splice(0, this.category.length);
			}
			this.category = [{cat_name: "全部", son:[{cat_name: '', cat_id: ''}], cat_id: ''}];
			this.category = [...this.category, ...val];
		},
		marketSortLists(val){
			if(this.marketList.length) {
				this.marketList.splice(0, this.marketList.length);
			}
			this.marketList = [{market_name: '全部', market_id: ''}];
			this.marketList = [...this.marketList, ...val];
		}
	},
	methods: {
        //初始加载
        initData(){
            let data = sessionStorage.getItem("data");
            if(data != null){
              data = JSON.parse(data)
              this.regionID = data.region;
            }else{
              let wapres = localStorage.getItem("wapres");
              this.regionID = wapres;
            }

            // 品类 - 主营项目
            this.$cacheStorage(
                'allCategory',
                '/?a=allCategory',
                'session',
                {
                    region_id: this.regionID,
                },
                ((res)=>{
                	//增加全部选项
                    this.category = [...this.category, ...res.data];
                }),
            )

            // 获取市场信息
            this.$cacheStorage(
                'marketList',
                '/?a=marketList',
                'session',
                {
                    region_id: this.regionID,
                    type: 2,
                },
                ((res)=>{
                	//增加全部选项
                    this.marketList = [...this.marketList, ...res.data.list];
                }),
            )

            this.lock = 2;
            this.getListData();
        },
        //查看商品详情
        toGood(wId) {
            this.$router.push({
                path:'/goods',
                query:{
                    goods: wId,
                }
            })
        },
        //查看商家
        goShops(id) {
            this.$router.push({
                path: "/shop",
                query: {
                    index: id,
                }
            });
        },        
        //筛选
        handleSelect(even){
        	const target = even.target || window.event.srcElement;
        	if(target.tagName != 'LI') {return}

        	const index = target.getAttribute('data-index');
        	switch(this.active){
        		case 0:
        			//品类
        			this.index0 = index;
        			this.cat_id = this.category[index].cat_id || '';
        			break;
        		case 1:
        			//市场
        			this.index1 = index;
        			this.market_id = this.marketList[index].market_id || '';
        			break;
        		case 2:
        			//排序
        			this.index2 = index;
        			break;
        	}
			this.active = -1;
			this.page = 1;
			this.endMsg = '';
			if(this.list.length) {this.list.splice(0, this.list.length);}
			window.removeEventListener('scroll', this.handleScroll);
			//去请求新数据
			this.lock = 2;
			this.getListData()
        },
        //用于父组件搜索调用
        search(inputVal){
        	//处理重复enter
        	if(this.lock == 2) {return}

        	this.endMsg = '';
			this.active = -1;
			this.page = 1;
			if(this.list.length) {this.list.splice(0, this.list.length);}
			window.removeEventListener('scroll', this.handleScroll);
			//去请求新数据
			this.lock = 2;
			this.getListData(inputVal)
        },
        //请求列表数据
        getListData(inputVal){
        	if(inputVal !== undefined && inputVal !== null) {
        		this.searchInput = inputVal;
        		this.$router.push({
				    query:{name: inputVal, 'region':this.$route.query.region}
				})
        	}
        	let params = {
            	category_id: this.cat_id,
            	type: 0,  //全部 。未选择市场。尽量保证有值
            	region_id: this.regionID,
            	keywords: this.searchInput,
            	page: this.page,
            	limit: this.limit,
        	};
    		//选择了某市场
        	if(this.market_id) {
        		params.market_id = Number(this.market_id);
        		params.type = 2; //批发市场
        	}
        	if(this.isIndex) {
        		//首页
        		params.recommend = 2;
        		params.shop_close = 1;
        	}

        	if(this.index2 == 1) {
        		//按推荐
        		params.sort_recommend = 1;
        	}else if(this.index2 == 2) {
        		//按销量
        		params.sort_num = 1;      		
        	}else if(this.index2 == 3) {
        		//按好评
        		params.sort_evaluate = 1;
        	}
            this.$post('/?c=merchant&a=shopList3', params).then((res) => {
                if(res.code == 0){
                	this.lock = 1;
                    if(this.page ==1 && res.data.length > 0){
                      	//有内容，显示内容
                      	this.show = 2;
                    }else if(this.page ==1 && !res.data.length){
                      	//无内容，显示缺省图
                      	this.show = 1;
                    }

                  	//第一页请求，且得到数据条数等于 每页最大数据条数， 则还可能有数据， 允许分页加载
                  	if(this.page ==1 && res.data.length == this.limit) {
                    	window.addEventListener('scroll', this.handleScroll)
                  	}else if(this.page ==1 && res.data.length < this.limit){
                  		this.endMsg = '已经没有更多内容啦~';
                  	}

                    //非第一页（已分页监听），数据不满最大条数， 则无更多数据， 取消分页加载更多
                    if(this.page>1 && res.data.length < this.limit) {
                      	this.endMsg = '已经没有更多内容啦~';
                        window.removeEventListener('scroll', this.handleScroll)
                    }

                    if(res.data.length == this.limit) {
                    	this.page ++;
                    }
                    this.list = [...this.list, ...res.data];
                }else if(res.code == 1){
                    this.$toast(res.msg);
                }
            })
        },
        //滚动加载
        handleScroll(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= (scrollHeight)) {
                //写后台加载数据的函数
                if(this.lock == 1){
                    this.lock = 2;
                    this.getListData();
                }
            }        	
        }
	},
	beforeDestroy(){
		window.removeEventListener('scroll', this.handleScroll);
	}
}
</script>

<style scoped>
	.ellipsis-1 {		
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.zon {
		position: relative;
	}
	.mask {
    	width: 100%;
    	height: 36px;  	
	}
	.mask.isFixed {
		position: fixed;
	} 
    .tabs {
    	display: flex;
    	background-color: #ffffff;
    	border-bottom: 1px solid #e5e5e5;
    	position: absolute;
	    width: 100%;
	    z-index: 2;
    }
	.tabs.isFixed {
		position: fixed;
	}
    .tabs-item {
		flex: 1;
		font-size: 13px;
		text-align: center;
    }
    .tabs-title {
    	padding: 9px 0;
    }
    .drop-down {
    	display: none;
    	width: 100%;
    	position: absolute;
    	left: 0;
    	z-index: 1;
    }
    .drop-down-index {
    	padding-bottom: 60px;
    }
    .drop-down.show {
    	display: block;
    }
    .drop-down ul {
	    max-height: 193px;
	    padding: 10px 0;
	    background-color: #ffffff;
    	overflow: auto;
    }
    .drop-down ul li {
    	color: #000;
    	text-align: left;
		padding: 8px 12px 8px 30px;
    }

    .tabs-item.active,
    .drop-down ul li.active {
    	color: red;
    }

	/*商家列表*/
	.list {
		padding: 0 12px 10px;
		position: relative;
	}
	.list-drop {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		left: 0;
		top: 0;
	}
	.list-drop.isFixed {
		position: fixed;
	}
	.store {
		background-color: #ffffff;
		padding: 18px 12px;
		border-radius: 5px;
		margin-top: 10px;
		position: relative;
	}
	.box {
		display: flex;
	    word-break: break-all;
    	white-space: normal;
	}
	.box-img {
		width: 50px;
		padding-right: 12px;
		position: relative;
	}
	.box-img img {
		width: 50px;
		height: 50px;
		border-radius: 8px;			
	}
	/* .box-img div {
		width: 50px;
		height: 50px;
		background-image: url('../../assets/img/no_picture.gif');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius: 8px;	
		position: relative;	
	} */
	.box-loc {
    	text-align: right;
		font-size: 12px;
		color: #5a5a5a;
		margin: auto 0;
		padding-left: 10px;
	}
	.close-store {
		width: 70px;
		position: absolute;
		right: 12px;
		top: 35px;
	}
	.box-des {
		position: relative;
		overflow: hidden;
		flex: 1;
	}
	.box-des h4 {
		height: 21px;
		font-size: 16px;
		font-weight: normal;
		margin: 0;
		padding: 0;
	}
	.box-des-stars {
		overflow: hidden;
		padding: 12px 0;
	}
	.box-des-stars> div {
		float: left;
	}
	.box-des-stars> span {
		float: left;
		font-size: 12px;
		color: #5a5a5a;
		/*margin-right: 5px;*/
	}
	.box-des-stars> span.yellow {
		color: #ffb912;
		/*margin-right: 10px;*/
	}
	/*.box-des-stars> span:last-child {
		margin-right: 0;
	} */

	.box-des> p {
		margin: 0;
		font-size: 12px;
		color: #999999;
	}
	
	.store {
		position: relative;
	}
	.store-tui h4 {
		margin: 0;
		padding: 3px 0;
		font-size: 14px;
		color: #5a5a5a;
		font-weight: normal;
	}
	.store-tui> div {
		width: 100%;
		overflow-x: auto;
		position: relative;
	}
	.store-tui> div .tuis {
		width: max-content;
		overflow: hidden;
		position: relative;
	}
	.tuis .tui-tu {
		width: var(--width);
		position: relative;
		float: left;
		margin-left: 5px;
	}
	.tuis .tui-tu:first-child {
		margin-left: 0;
	}
	.tuis .tui-tu img {
		width: var(--width);
		height: var(--width);
		border-radius: 5px;
	}
	.tuis .tui-tu p {
		margin: 0;
		padding: 2px 0;
		width: 100%;
		font-size: 12px;
		color: #ffffff;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.3);
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		position: absolute;
		left: 0;
	    bottom: 38px;
	}
	.tuis .tui-tu h6 {
		margin: 0;
		font-size: 12px;
		font-weight: normal;
		color: #5a5a5a;
		text-align: center;
	}
	.tuis .tui-tu .tui-tu-price2 {
		color: #f04949;
	}
	
 	.store.disabled {
		-webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    	filter: grayscale(100%);
	}

	/* .disabled .box-des,
	.disabled .box-des-stars> span.yellow,
	.disabled .box-des-stars> span,
	.disabled .box-loc,
	.disabled .store-tui h4,
	.disabled .tuis .tui-tu h6 {
		color: #999999;
	}
	.disabled .tuis .tui-tu,
	.disabled .goods-star-box .goods-star .goodsStar_all img,
	.disabled .box-des> p .van-tag,
	.disabled .box-img div {
		-webkit-filter: grayscale(100%); Chrome, Safari, Opera
	    	filter: grayscale(100%);
	} */

	.end-msg {
		font-size: 14px;
		text-align: center;
		color: #c9c9c9;
		line-height: 3em;
		margin: 0;
	}
</style>