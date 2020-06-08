<template>
	<div>
		<!-- 头部导航 -->
		<navbar title="收益明细" type="left" @clickleft="onClickLeft"></navbar>
		
		<!-- 列表内容部分 -->
		<div v-if="show == 2" class="wallet-list-box">
	        <!-- <div class="wallet-list-box"> -->
	            <!-- 列表模板 渲染优化修改 -->
                <!-- <div class="wallet-list-ul">
                    <div class="wallet-list-time-month fz_12 color_424242">2019.10</div>
                    <div class="wallet-list-li" >
                        <div class="wallet-list-li-top dflex fz_14 color_424242">
                            <div class="wallet-li-order">dddfffrrrrttttt</div>
                            <div class="wallet-li-price">
                                <span>50.10</span>
                            </div>
                        </div>
                        <div class="wallet-li-time-box dflex">
                            <div class="wallet-li-time fz_12 color_808080">12.44 24:22</div>
                        </div>
                    </div>
                </div> -->
                <div class="wallet-list-ul" v-for="(ite,ind) in dataList" :key="ind">
                    <div class="wallet-list-time-month fz_12 color_424242">{{ite.titleTime}}</div>
                    <div class="wallet-list-li" v-for="(item,index) in ite.list" :key="index">
                        <div class="wallet-list-li-top fz_14 color_424242">
                            <div class="wallet-li-order">{{item.change_desc}}</div>
                            <div class="wallet-li-price">
                                <span :class="{'color_EE2D2D': item.unit == '-'}">{{item.unit}}{{item.money}}</span>
                            </div>
                        </div>
                        <div class="wallet-li-time-box dflex">
                            <div class="wallet-li-time fz_12 color_808080">{{item.time}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="lock===2" class="vantLoading business-loading"><vloading :vertical="false" text="努力加载中..."></vloading></div>    
                <div class="end-msg">{{endMsg}}</div>
	        <!-- </div> -->
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

			page: 1, //页码数
			limit: 10,  //每页最大数据条数

            type: 3, //0全部 1提现 3分成 4结算 5退款 6消费 99其他
            month: '',  //本月

            //收益数据
            dataList: []
		}
	},
    created(){
        //得到本月月份
        let date = new Date();
        let year = date.getFullYear();
        let dMonth = date.getMonth();
        let month = dMonth > 8 ? dMonth + 1 : '0' + (dMonth + 1);
        this.month = year + '-' + month;

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
        //数据最终模板 data = [{titleTime: '2019.10', list:[{}]}]
        //处理列表内容
        preListData(list){
            let pList = []; //暂存列表
            let everyMonth = '';  //每一条数据的年月日期， 用作下方判断
            let currIndex = this.dataList.length === 0 ? -1 : this.dataList.length - 1;
            let currMonth = this.dataList.length === 0 ? '' : this.dataList[currIndex].titleTime; // 当前数据最新日期

            for(let n in list) {
                everyMonth = list[n].month;
                // everyMonth = list[n].month.replace(/-/g,'.');

                //获得的日期不等于当前数据最新日期，则新加一个对象{titleTime: '2019.10', list: []}
                if(everyMonth !== currMonth) {
                    this.dataList.push({titleTime: everyMonth, list: [list[n]]});
                    currIndex++;
                    currMonth = everyMonth;
                }else {
                    //日期不变， 则直接加入当前列表 最新list中
                    this.dataList[currIndex].list.push(list[n])
                }
            }
        },
        //获取收益明细
        getList(){
            this.lock = 2;
            this.$post('/?c=user&a=accountList240',{
                month: this.month,
                type: this.type,
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

                      // this.dataList = [...this.dataList,...res.data];
                      this.preListData(res.data);
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
        }
	},
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style lang="less" scoped>
.wallet-list-box{
    font-size: 14px;
    padding-top: 10px;
    .wallet-list-ul{
        margin-bottom: 10px;
        .wallet-list-time-month{
            margin-bottom: 10px;
            padding: 0 12px;
        }
        .wallet-list-li{
            padding: 0 12px;
            background-color: #fff;
            
            .wallet-list-li-top{
                line-height: 1.5em;
                padding: 12px 0 4px;
                overflow:hidden;
                .wallet-li-order{
                    float: left;
                    word-break: break-all;
                    white-space: normal;
                }
                .wallet-li-price{
                    float: right;
                }
            }
            .wallet-li-time-box{
                border-bottom: 1px solid #d8d8d8;
            }
            .wallet-li-time{
                padding-bottom: 15px;
            }
            .wallet-li-status{
                color: #FFB912;
                margin: 0 auto;
                margin-right: 0;
            }
        }
        .wallet-list-li:last-child{
            margin-bottom: 10px;
            .wallet-li-time-box{
                border-bottom: 0;
            }
        }
    }
}
</style>
<style scoped>
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