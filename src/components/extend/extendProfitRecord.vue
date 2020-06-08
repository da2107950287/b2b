<template>
	<div>
		<!-- 头部导航 -->
        <van-nav-bar
          title="本月收益"
          left-text="返回"
          right-text="收益明细"
          fixed
          :z-index="12"
          @click-left="onClickLeft"
          @click-right="onClickRight"
		>
			<van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
		</van-nav-bar>
		<div style="height: 46px; width: 100%;"></div>
		
		<!-- 列表内容部分 -->
		<div v-if="show == 2">
            <!-- <div class="list">
                <div class="list-time">
                    2019-12-10
                </div>
                <div class="list-text">
                    当日收益： 12.36元
                </div>
            </div> -->
			<div class="list" v-for="(item, index) in dataList">
				<div class="list-time">
					{{item.day}}
				</div>
				<div class="list-text">
					{{item.amount ? item.amount + '元' : '--'}}
				</div>
			</div>
			<div v-if="lock===2"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
	        <div class="end-msg">{{endMsg}}</div>
		</div>
        <div v-else-if="show === 1">
            <searchNone :item="'walletAccount'" t-type="true"></searchNone>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
	</div>
</template>

<script>
export default {
	components: {
		navbar: ()=>import("../navbar/nav.vue"),
		vloading: ()=>import("../vloading.vue"),
		vantLoading: ()=>import("../vantLoading.vue"),
        searchNone: ()=>import("../component/searchNone/searchNone.vue")
	},
	data(){
		return {
			lock: 1,  //是否在请求加载中 1-否 2-是
			show: 0,  //0-进入页面默认显示 1-缺省图 2-有数据
			endMsg: '',  //分页加载内容无更多内容时的提示

            //收益数据
            dataList: []
		}
	},
    created(){
        this.getList()
    },
	methods: {
		//返回前一页
		onClickLeft(){
            if(this.fromHerf == null){
                this.$router.push({
                    path:'/index'
                });
            }else{
                this.$router.go(-1);
            }
		},
		//收益明细
		onClickRight(){
			this.$router.push('/extendProfitDetails')
		},
        //获取收益记录列表
        getList(){
            this.$post('/?c=wholesaleCommission&a=developDay',{
                user_id: this.$route.query.userId
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        if(res.data.length > 0){
                            //有内容，显示内容
                            this.show = 2;
                            this.dataList = res.data;
                        }else if(!res.data.length){
                            //无内容，显示缺省图
                            this.show = 1;
                            return
                        }
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break; 
                    default:
                        this.$toast(res.msg);
                        break;
                }
            });
        },
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

    .list {
		display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
		position: relative;
    	padding: 10px 12px;
    	background-color: #ffffff;
    	border-top: 1px solid #f2f2f2;
    }
    .list-time {
        width: 120px;
    	font-size: 14px;
    	color: #424242;
    }
    .list-text {
	    width: 100%;
	    text-align: right;

    	font-size: 12px;
    	color: #424242;
    }


.vantLoading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1000;
}
.business-loading {
    padding: 10px;       
}
.end-msg {
  font-size: 14px;
  text-align: center;
  color: #c9c9c9;
  line-height: 3em;
  margin: 0;
}
</style>