<template>
    <div class="groupBuyingList">
        <!-- 标题 -->
        <van-nav-bar
          title="团购活动"
          left-text="返回"
          fixed
          :z-index="12"
          @click-left="goPreviousPage"
          @click-right="onClickRight"
		>
			<van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
	        <van-icon name="arrow-right" slot="right" class="right-icon"><span>规则说明</span></van-icon>
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
            <!-- 活动商品列表子组件 -->
            <group-buying-list ref="groupBuying" :category-id="cat_id" :marketId="market_id" :order="order"></group-buying-list>
        </div>

                <!-- 规则说明弹出部份 -->
        <div v-if="isShowRule" class="box" @click="hiddenBox($event)">
            <div class="box-wrap">
                <div class="box-title">
                    <img src="../../assets/img/zuo.png" alt=""><span>团购活动</span><img src="../../assets/img/you.png" alt="">
                </div>
                <div class="box-content">
                    <p>1.加入活动时请您详看开团/拼团的商品，确定团购要求人数、商品品牌、型号及商品团购的价格等。</p>
                    <p>2.为保障买卖双方的合法权益，同时也便于后期平台客服监督双方公平性，请您在平台内进行交易。如因场外交易发生的一切问题，本平台将不承担及协调任何造成的问题。</p>
                    <p>3.平台的活动内容可通过微信、朋友圈及微博等渠道进行亲戚和朋友的发布，能更快速有效的达成您的交易期望；</p>
                    <p>4.如您在本平台收到的商品与活动发布的内容不符（质量、数量、品牌、重量等情况），请与平台客服400-128-8566联系寻求帮。</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    components:{
        navbar:() => import('../navbar/nav.vue'),
        vloading:()=>import("../vloading.vue"),
        groupBuyingList: ()=>import('./groupBuyingList.vue')   //活动商品列表
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
            //智能选择 排序值 1拼团量2低价3开团时间4推荐
            order: 4, 

            indexID: "", //====>身份id
            //主营项目下数据类型  期望类型模板类型 [{typeName: '时令水果', children: []}, {typeName: 'aaa', children: []}]
            category: [],
            //所属市场
            marketList: [],
            //智能排序数据
            activitySort: [
                {title: '智能排序', order: 4},
                {title: '参团量优先', order: 1},
                {title: '低价优先', order: 2},
                {title: '开团时间优先', order: 3}
            ], 

            //主营项目 左侧当前被选中数据的 index
            pIndex: 0,
            //主营项目 右侧当前被选中数据的 index
            pIndex2: 0,
            //所属市场，当前被选中的数据索引index
            mIndex: 0,
            //智能选择，当前被选中的数据索引 index
            oIndex: 0,          

            //是否显示规则说明
            isShowRule: false
        }
    },
    created(){
        this.initData()
    },
    mounted(){
        //请求相关接口, 调用子组件请求数据方法
        // this.$refs.groupBuying.getList(true);
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
        //点击导航右侧
        onClickRight(){
            this.isShowRule = true;
        },
        //点击遮罩层，隐藏规则说明
        hiddenBox(ev){
            let target = ev.target || window.event.srcElement;
            if(target.className == 'box') {
                this.isShowRule = false;
            }
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
                    break;
            }
            //关闭选项卡
            this.handleClickTab(active, title);
            //请求相关接口, 调用子组件请求数据方法
        	setTimeout(()=>{
            this.$refs.groupBuying.getList(true);
            },100)
        }
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
     .left-icon img,.right-icon img{
        height: 15px;
        display: block;
        margin: auto;
        transform:rotate(180deg);
        margin-right: 5px;
    }
    .left-icon span,.right-icon span{
        font-size: 14px;
        color: #333;
        display: block;
        margin: auto;
    }
	/*团购活动重置部分 vant 样式，专用样式*/
	.groupBuyingList .van-tabs {
		width: 133.34%;
	    margin-left: -33.34%;
	    position: fixed;
	    top: 46px;
	    left: 0;
	    z-index: 8;	
	}
	.groupBuyingList .van-tabs .van-tab .van-icon,
	.groupBuyingList .van-tabs .van-tab .van-icon::before {
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
</style>