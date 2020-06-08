<template>
    <div class="goodsList">
        <!-- 标题 -->
        <van-nav-bar
          title="优惠商品"
          left-text="返回"
          fixed
          :z-index="12"
          @click-left="goPreviousPage"
		>
			<van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
			<van-icon slot="right" class="right-icon" @click="toShoppingCart()"><img src="../../assets/img/gwc1.png" alt=""></van-icon>
		
      
		</van-nav-bar>

        <div style="height: 46px; width: 100%;"></div>
		
        <!-- 筛选部分 -->
        <!-- 模板样式 
        <van-tabs v-model="active" title-active-color="#ee2d2d" @click="handleClickTab">
            <van-tab title=""></van-tab>
            <van-tab title="主营项目">
                <div slot="title">
                    主营项目<van-icon v-if="active == 0" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                 主营项目部分内容 
                <div class="drop-down">
                    <div class="drop-down-box">
                        <ul class="drop-down-nav" @click="handleProjType($event)">
                            <li class="active" data-index="0">全部</li>
                            <li data-index="1">适量水果</li>
                            <li data-index="2">aaaaa</li>
                            <li data-index="3">适量水果</li>
                        </ul>
                        <ul class="drop-down-content">
                            <li>苹果</li>
                            <li class="active">梨子</li>
                            <li>山西凤梨</li>
                            <li>山西凤梨</li>
                        </ul>
                    </div>
                </div>
            </van-tab>
            <van-tab title="所属市场">
                <div slot="title">
                    所属市场<van-icon v-if="active == 1" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                222222
            </van-tab>
            <van-tab title="智能排序">
                <div slot="title">
                    智能排序<van-icon v-if="active == 2" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                33333
            </van-tab>
        </van-tabs>-->

		<van-tabs v-model="active" title-active-color="#ee2d2d" :line-height="0" :offset-top="46" @click="handleClickTab">
	  		<van-tab title="" class="tabs-one-none"></van-tab>
            <van-tab title="主营项目">
                <div slot="title">
                    主营项目<van-icon v-if="active == 1" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                <!-- 主营项目部分内容 -->
			    <div class="drop-down" @click="changeShow($event)">
                    <div class="drop-down-box">
                        <ul class="drop-down-nav" @click="handleSelect($event, '主营项目1')">
                            <li v-for="(item,index) in category" :class="{'active': pIndex == index}" :key="index" :index="index">{{item.cat_name}}</li>
                        </ul>
                        <ul class="drop-down-content" @click="handleSelect($event, '主营项目2')">
                            <li v-for="(item,index) in category[pIndex].son" :class="{'active': pIndex2 == index}" :key="index" :index="index">{{item.cat_name}}</li>
                        </ul>
                    </div>
                </div>
            </van-tab>
            <van-tab title="所属市场">
                <div slot="title">
                    所属市场<van-icon v-if="active == 2" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                <!-- 所属市场部分内容 -->
			    <div class="drop-down" @click="changeShow($event)">
                    <div class="drop-down-box">
                        <ul class="drop-down-nav" @click="handleSelect($event, '所属市场')">
                            <li v-for="(item, index) in marketList" :key="index" :index="index" :class="{'active': mIndex == index}">{{item.market_name}}</li>
                        </ul>
                        <ul class="drop-down-content drop-down-content2">
                        </ul>
                    </div>
                </div>
            </van-tab>
            <van-tab title="智能排序">
                <div slot="title">
			      	{{activitySort[oIndex].title}}<van-icon v-if="active == 3" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                <!-- 智能排序部分内容 -->
			    <div class="drop-down" @click="changeShow($event)">
                    <div class="drop-down-box">
                        <ul class="drop-down-nav" @click="handleSelect($event, '智能排序')">
                            <li v-for="(item, index) in activitySort" :key="index" :index="index" :class="{'active': oIndex == index}">{{item.title}}</li>
                        </ul>
                        <ul class="drop-down-content drop-down-content2">
                        </ul>
                    </div>
                </div>
            </van-tab>
        </van-tabs>

        <!--  列表内容 -->
		<div class="list">
            <!-- 商品列表子组件 -->
            <div v-if="show === 2">
                <div v-for="(item,index) in dataList" :key="index">
                    <new-goods-lists 
                        :item="item"
                        :market-name="item.market_name" 
                        :tag="item.tag" 
                        :name="item.goods_name" 
                        :wid="item.wId" 
                        :img-thumb="item.goods_thumb" 
                        :img="item.goods_img" 
                        :unit="item.measure_unit || ''" 
                        :goodsUnit="item.goods_unit || ''" 
                        :price="item.price" 
                        :goods_price="item.goods_price" 
                        :sid="item.seller_id" 
                        :moq="item.moq"
                        :shop-name="item.shop_name" 
                        :remark="item.remark" 
                        :price-type="item.price_model" 
                        :spec="item.spec?item.spec:[]"
                        :i="index"
                        parent-path="couponAssign"

                        :is-activity="item.activity"
                        :is-promote="Number(item.is_promote)"
                        
                        @showCart="shoppingInCart($event,item.res)"
                        @toggleBtn="toggleBtn"
                        :toggleShow="toggleShow"
                    ></new-goods-lists>
                </div>
                <div v-if="lock===2"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
                <div class="end-msg">{{endMsg}}</div>
            </div>
            <div v-else-if="show === 1" style="height:100%;background-color:#f2f2f2;">
                <search-none :item="'newGoodsList'"></search-none>
                <special-dom></special-dom>
            </div>
            <div v-else class="vantLoading">
                <vloading :vertical="false" text=""></vloading>
            </div>            
        </div>
        
        <!-- 购物车 -->
        <!-- <shoppingInCar ref="shoppingInCar"></shoppingInCar>
        <levitateCar :num="dropCount"></levitateCar> -->
    </div>
</template>

<script>
export default {
    components:{
        navbar: () => import('../navbar/nav.vue'),
        vloading: () => import("../vloading.vue"),
        vantLoading: ()=>import("../vantLoading.vue"),
        // shoppingInCar: () => import('../shoppingInCar/shoppingInCar.vue'),
        newGoodsLists: () => import('../component/newGoodsLists/newGoodsLists.vue'),
        specialDom: () => import('../component/recommendComponent/special.vue'),
        // levitateCar: () => import('../component/levitateCar.vue'),
        searchNone: () => import('../component/searchNone/searchNone.vue')
    },
    data(){
        return {
            //当前 选项卡 索引 --可选值： 0 1 2
            active: 0, 
            //前一个被选中的 选项卡 索引
            preActive: 0,
            //id- 用户查找 所有商品分类 、所属市场- 
            regionID: '',

            //分类id
            cat_id: '',
            //市场id
            market_id: '',
            //智能选择 排序值 1低价优先 2高价优先 3好评优先 4销量优先
            order: 0, 

            indexID: "", //====>身份id
            //主营项目下数据类型  期望类型模板类型 [{typeName: '时令水果', children: []}, {typeName: 'aaa', children: []}]
            category: [],
            //所属市场
            marketList: [],
            //智能排序数据
            activitySort: [
                {title: '智能排序', order: 0},
                {title: '低价优先', order: 1},
                {title: '高价优先', order: 2},
                {title: '好评优先', order: 3},
                {title: '销量优先', order: 4}
            ], 

            //主营项目 左侧当前被选中数据的 index
            pIndex: 0,
            //主营项目 右侧当前被选中数据的 index
            pIndex2: 0,
            //所属市场，当前被选中的数据索引index
            mIndex: 0,
            //智能选择，当前被选中的数据索引 index
            oIndex: 0,          

            //是否商品内容 0-加载中 1-缺省图 2-显示内容
            show: 0,

            toggleShow:false,//规格选择切换显示开关

            lock: 1,  //是否在请求加载中 1-否 2-是
            show: 0,  //0-进入页面默认显示 1-缺省图 2-有数据
            endMsg: '',  //分页加载内容无更多内容时的提示

            page: 1, //页码数
            limit: 10,  //每页最大数据条数

            dataList: [],  //列表数据

            // dropCount:0,//购物车数量
        }
    },
    created(){
        //初始化筛选相关数据
        this.initData();
        //获得默认商品列表数据
        this.getList(true);

        // this.getShoppingCar();
    },
    methods:{
        //####=>返回上一页
        goPreviousPage(){
            if(this.fromHerf == null){
                this.$router.push({
                    path:'/index'
                });
            }else{
                this.$router.go(-1);
            }
        },
		toShoppingCart(){
            this.$router.push({path:'/shoppingCart'})
        },
        //初始加载
        initData(){
            let data = sessionStorage.getItem("data");
            if(data != null){
              data = JSON.parse(data)
              this.regionID = data.region;
            }else{
              let wapres = localStorage.getItem("wapres");
              this.regionID = wapres;
              this.indexID = 0;
            }

            // 全部分类 - 主营项目
            this.$cacheStorage(
                'allCategory',
                '/?a=allCategory',
                'session',
                {
                    region_id: this.regionID,
                },
                ((res)=>{
                    this.category = res.data;
                    //增加全部选项
                    this.category.unshift({cat_name: "全部", son:[{cat_name: '', cat_id: ''}]});
                }),
            )

            // 获取市场信息
            this.$cacheStorage(
                'marketList',
                '/?a=marketList',
                'session',
                {
                    region_id: this.regionID,
                    type: this.indexID,
                },
                ((res)=>{
                    this.marketList = res.data.list;
                    //增加全部选项
                    this.marketList.unshift({market_name: "全部", market_id: ''});
                    console.log(this.marketList,'==this.marketList')
                }),
            )
        },
        //点击遮罩层， 隐藏刷选下拉菜单
        changeShow(ev){
            let target = ev.target || window.event.srcElement;
            if(target.className != 'drop-down') return;
            //点击当前选项卡，切换其内容打开收起状态
            this.active = 0;   
            this.preActive = 0;   
        },
        //筛选选项卡切换
        handleClickTab(index, title){
            console.log(this.preActive)
            if(index == this.preActive) {
                //点击当前选项卡，切换其内容打开收起状态
                this.active = 0;   
                this.preActive = 0;             
            }else {
                this.preActive = this.active;
            }
            console.log(index, title, this.active)
        },
        //主营项目左右侧选中， 所属市场、智能排序左侧选中方法
        handleSelect(ev, title){
            let target = ev.target || window.event.srcElement;
            console.log(target.tagName)

            if(target.tagName != 'LI') return;

            // 当前选中li标签，进行后续右侧联动操作
            //获取数据的index
            let index = target.getAttribute('index');
            //当前选项卡项值
            let active;

            switch(title) {
                case '主营项目1':
                    //左侧选择
                    active = 1;
                    title = '主营项目';
                    //左侧索引更新    
                    this.pIndex = index;
                    //右侧索引重置为0
                    this.pIndex2 = 0;
                    //则，右侧数据为 this.datas[pIndex].children
                    //当选择“全部”类型时，关闭此区域，重新排列列表           
                    if(target.innerHTML != '全部') {
                        return;
		        	}else {
                        //分类id置为空
                        this.cat_id = '';
                    }
                    break;
                case '主营项目2':
                    //右侧选择
                    active = 1;
                    title = '主营项目';
                    //右侧索引重置为0
                    this.pIndex2 = index;
                    //当前分类id为
                    //列表数据更新 ,如y要获取相应值：id = this.datas[this.pIndex].children[this.pIndex2].id
                    this.cat_id = this.category[this.pIndex].son[this.pIndex2].cat_id;
                    break;
                case '所属市场':
                    active = 2;
                    title = '所属市场';
                    //左侧索引更新    
                    this.mIndex = index;
                    //当前的市场id为
                    this.market_id = this.marketList[index].market_id;
                    break;
                case '智能排序':
                    active = 3;
                    title = '智能排序';
                    //左侧索引更新    
                    this.oIndex = index;
                    this.order = this.activitySort[index].order;
                    console.log(index, this.activitySort, this.order)
                    break;
            }
            //关闭选项卡
            this.handleClickTab(active, title);

            //请求相关接口, 调用子组件请求数据方法
        	setTimeout(()=>{
                this.getList(true);
            },100)
        },
        //请求列表数据
        getList(isStart){
            //是否是初始状态,是，则清空已有数据。不是，则是分页加载
            if(isStart) {
                this.page = 1;
                this.show = 0;
                this.dataList = [];
                window.removeEventListener('scroll', this.handleScroll)
            }

            this.lock = 2;
            this.$post("/?c=goods&a=wholesale", {
                full_list_id: this.$route.query.coupon_id,
                region_id:this.regionID,
                cat_id: this.cat_id,
                sort_num: this.order === 4 ? 1 : 0,
                sort_price: this.order === 1 ? 1 : this.order === 2 ? 2 : 0,
                sort_evaluate: this.order === 3 ? 1 : 0,
                market_id:this.market_id,
                page:this.page,
                limit: this.limit
            }).then((res) => {
                this.lock = 1;
                switch (res.code){
                    case 0:
                        if (this.page == 1) {
                            if (res.data.length > 0) {
                                //有内容，显示内容
                                this.show = 2;
                            } else if (!res.data.length) {
                                //无内容，显示缺省图
                                this.show = 1;
                                return;
                            }

                            if (res.data.length == this.limit) {
                                this.page++;
                                //第一页请求，且得到数据条数等于 每页最大数据条数， 则还可能有数据， 允许分页加载
                                window.addEventListener("scroll", this.handleScroll);
                            }
                        } else if (res.data.length < this.limit) {
                            //非第一页（已分页监听），数据不满最大条数， 则无更多数据， 取消分页加载更多
                            this.endMsg = "已经没有更多内容啦~";
                            window.removeEventListener("scroll", this.handleScroll);
                        } else {
                            this.page++;
                        }

                        this.dataList = [...this.dataList, ...res.data];
                    break;
                    default:
                      this.$toast(res.msg);
                    break;
                }
                
            });
        },
        //瀑布流加载
        handleScroll () {
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
                if(this.lock == 1){
                  //在此处增加页码， 保证页码数为当前请求页
                  this.page++;
                  this.getList()
                }
            }
        },        
        //添加商品到购物车
        shoppingInCart(item){
            let data = {
                attribute: [
                    {
                        number: item.moq, 
                        spec: item.spec,
                    }
                ],
                wholesale_id: item.wid
            };

            this.$post("/?c=cart&a=addToCart", data).then(res => {
                switch (res.code) {
                case 0:
                    //添加成功
                    this.$toast(item.res.goods_name+' 成功加入购物车');
                    break;
                default:
                    this.$toast(res.msg);
                    break;
                }
            });
        },
        //添加商品到购物车
        /*shoppingInCart(item){
            console.log(item)
            let data = {
                event: item.event,
                item: item.res,
                key:item.key,
                spec:item.spec,
                wid:item.wid,
                moq:item.moq
            }
            // this.$refs.shoppingInCar.shoppingInCart(data);
        },
        //德到购物车的数据
        getShoppingCar(){
            localStorage.removeItem('shoppingCarCount')
            this.$cacheStorage(
                'shoppingCarCount',
                '/?c=cart&a=num',
                'local',
                {},
                ((res)=>{
                    this.dropCount = res.data.num;
                }),
            )
        },*/
        //规则显示与隐藏
        toggleBtn(){
            this.toggleShow = !this.toggleShow;
        }
    },
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style scoped>

    /*重置导航左侧颜色*/
    .van-nav-bar .van-icon,
    .van-nav-bar__text {
        color: #323233;
    }
    .left-icon,.right-icon{
        margin: auto;
        font-size: 22px;
        line-height: 22px;
        color: #333;
        display: flex;

    }
    .van-nav-bar__left, .van-nav-bar__right {
        height: 100%;
        display: -ms-flexbox;
        display: flex;
    }
     .left-icon img{
        height: 15px;
        display: block;
        margin: auto;
        transform:rotate(180deg);
        margin-right: 5px;
    }
    .right-icon img{
        height: 17px;
        display: block;
        margin: auto;
        margin-right: 5px;
    }
    .left-icon span,.right-icon span{
        font-size: 14px;
        color: #333;
        display: block;
        margin: auto;
    }
	/*团购活动重置部分 vant 样式，专用样式*/
	.goodsList .van-tabs {
		width: 133.34%;
	    margin-left: -33.34%;
	    position: fixed;
	    top: 46px;
	    left: 0;
	    z-index: 8;	
	}
	.goodsList .van-tabs .van-tab .van-icon,
	.goodsList .van-tabs .van-tab .van-icon::before {
		font-size: 14px;
	}

    .drop-down {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .drop-down-box {
		margin-top: 89px;
        background-color: #ffffff;
        position: relative;

        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .drop-down-box .drop-down-nav {
        max-height: 215px;
        overflow: auto;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .drop-down-box .drop-down-content {
        max-height: 215px;
        overflow: auto;
        -webkit-box-flex: 2;
        -ms-flex: 2;
        flex: 2;
        background-color: #f2f2f2;

        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .drop-down-box .drop-down-content2 {
        background-color: #ffffff;
    }
    .drop-down-box ul li {
        font-size: 14px;
        color: #424242;
	    line-height: 43px;
        text-align: center;
    }
    .drop-down-box ul.drop-down-content li {
        color: #7d7e80;
        text-align: left;
        padding-left: 30px;
    }

    .drop-down-box ul li.active {
        color: rgb(238, 45, 45);
    }


    /*规则说明弹出层*/
    .box {
        width: 100%;
        height: 100%;
        padding: 0 25px;
        background-color: rgba(0,0,0,0.4);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;

        display: -webkit-box;
        display: -ms-flexbox;   
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .box-wrap {
        width: 100%;
        max-width: 320px;
        background-color: #ffffff;
        padding: 0 20px 25px;
        border-radius: 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .box-wrap .box-title {
        font-size: 16px;
        color: #ee2d2d;
        text-align: center;
        padding: 10px 0;
    }
    .box-wrap .box-title span {
        padding: 0 10px;
    }
    .box-wrap .box-title img {
        width: 40px
    }
    .box-content {
        word-break: break-all;
        white-space: normal;
        font-size: 14px;
        color: #424242;
    }
    .box-content p {
        margin: 0;
        padding-top: 10px;
    }
    .box-content p:frist-child {
        padding-top: 0;
    }

	.list {
		margin-top: 54px;
	}
    .list>div>div {
        background-color: #ffffff;
    }

.list .vantLoading{
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