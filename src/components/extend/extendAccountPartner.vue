<template>
	<div>
		<!-- 头部导航 -->
        <van-nav-bar
          title="下级合伙人"
          left-text="返回"
          fixed
          :z-index="12"
          @click-left="onClickLeft"
          @click-right="ruleShow = true"
		>
			<van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
	        <van-icon name="arrow-right" slot="right" class="right-icon"><span>规则说明</span></van-icon>
		</van-nav-bar>
		<div style="height: 46px; width: 100%;"></div>

		<!-- 列表内容部分 -->
		<div v-if="show == 2">
			<div class="list">
				<!-- <div class="list-item">
					<div class="list-left">
						<img :src="0 || defPhoto" alt="">
						<p>哈哈哈哈哈</p>
					</div>
					<div class="list-y"></div>
					<div class="list-right">
						<div @click="goToPage(1)">本月推广分成:20元 <van-icon name="arrow" /></div>
					</div>
				</div> -->
				<div class="list-item" v-for="(item, index) in dataList" :key="index">
					<div class="list-left">
						<img :src="item.user_picture || defPhoto" alt="">
						<p>{{item.nick_name}}</p>
					</div>
					<div class="list-y"></div>
					<div class="list-right">
						<div @click="goToPage(item.user_id)">本月推广分成:{{item.all_amount}}元 <van-icon name="arrow" /></div>
					</div>
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

        <!-- 规则说明层 -->
        <div class="rules" v-if="ruleShow">
			<div class="rules-box">
				<div class="rules-content">
					<h6>规则说明</h6>
					<p><span>1.</span>当月解除绑定的下级采购商不会在列表显示。</p>
					<p><span>2.</span>推广分成记录冻结账户转至推广账户的分成记录。</p>
				</div>
				<div class="rules-close">
					<div @click="ruleShow = false">&#10005;</div>
				</div>
			</div>
        </div>
	</div>
</template>

<script>
export default {
	components: {
		vloading: ()=>import("../vloading.vue"),
		vantLoading: ()=>import("../vantLoading.vue"),
		searchNone: ()=>import("../component/searchNone/searchNone.vue")
	},
	data(){
		return {
			lock: 1,  //是否在请求加载中 1-否 2-是
			show: 0,  //0-进入页面默认显示 1-缺省图 2-有数据
			endMsg: '',  //分页加载内容无更多内容时的提示

			page: 1, //页码数
			limit: 10,  //每页最大数据条数

			//规则说明层是否显示
			ruleShow: false,

			//列表数据
			dataList: [],
			//用户头像不存在时的默认头像
			defPhoto: require('../../assets/img/touxiang.png')
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
		//进入收益明细页
		goToPage(userId){
			this.$router.push({path: '/extendProfitRecord', query:{userId: userId}})
		},
		//获取下级合伙人列表
		getList(){
			this.lock = 2;
            this.$post('/?c=wholesaleCommission&a=partner',{
            	page: this.page,
            	limit: this.limit
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                      
                      this.lock = 1;

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
                    case 1:
                        this.$toast(res.msg);
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

	}
	.list-item {
		display: -webkit-box;
    	display: -ms-flexbox;
		display: flex;
		position: relative;
		background-color: #ffffff;
	    padding: 10px 0;
	    border-top: 1px solid #f2f2f2;
	}
	.list-left {
		width: 7.467rem;
		padding: 0 8px 0 12px;

	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.list-left img {
		width: 1.6rem;
		height: 1.6rem;
	    border: 1px solid #f3f2f2;
		border-radius: 0.8rem;
	    float: left;
	}
	.list-left p {
		font-size: 16px;
		color: #424242;
		margin: 0;
		padding: 4px 0 4px 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list-y {
		width: 1px;
		height: 1.07rem;
		background-color: #cecece;
		margin-top: 6px;
	}
	.list-right {
		-webkit-box-flex: 1;
    	-ms-flex: 1;
		flex: 1;

		padding: 0 12px 0 25px;

	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.list-right div {
		font-size: 14px;
		color: #424242;
		line-height: 1.6rem;
	}
	.list-right div .van-icon {
		float: right;
		font-size: 16px;
		color: #999999;
		line-height: 1.6rem;
	}

	.rules {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;
	}
	.rules-box {
		width: 256px;
		height: 225px;
	    position: fixed;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    margin: auto;
	}
	.rules-content {
		color: #424242;
		background-color: #ffffff;
		border-radius: 5px;
		position: relative;
	}
	.rules-content h6 {
		margin: 0;
		padding: 10px 0;
		font-size: 15px;
		text-align: center;
		font-weight: normal;
	}
	.rules-content p {
		margin: 0;
		font-size: 14px;
		line-height: 1.3em;
		padding: 0 15px 0 30px;
		position: relative;
	}
	.rules-content p:nth-child(2) {
		padding-top: 15px;
	}
	.rules-content p:nth-child(3) {
		padding-bottom: 35px;
	}
	.rules-content p span {
		position: absolute;
		left: 15px;
	}
	.rules-close {
		text-align: center;
		padding-top: 31px;
	}
	.rules-close div {
	    display: inline-block;
		width: 28px;
		height: 28px;
		font-size: 16px;
		color: #ffffff;
		text-align: center;
		line-height: 1.5em;
		border: 1px solid #ffffff;
		border-radius: 15px;
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