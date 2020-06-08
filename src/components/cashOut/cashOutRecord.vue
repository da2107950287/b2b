<template>
	<div>
        <!-- 标题 -->
        <navbar type="left" title="提现记录" @clickleft="goPreviousPage"></navbar>
		
		<!-- 列表部分 -->

		<!-- 每一个月份的记录- 模板 -->
<!-- 	<div class="list" v-for="(item, index) in list">
			<p class="list-time">2019-08</p>
			<div class="box">
				<div class="content">
					<div>余额提现 <span>140.00</span></div>
					<p>08-09 10:11:12 <span class="yellow">处理中</span></p>
				</div>
				<div class="content">
					<div>余额提现 <span>140.00</span></div>
					<p>08-09 10:11:12 <span class="danger">已驳回</span></p>
				</div>
				<div class="content">
					<div>余额提现 <span>140.00</span></div>
					<p>08-09 10:11:12 <span class=""></span></p>
				</div>
			</div>
		</div> -->
		
		<div v-if="show == 2">
			<!-- 每一个月份的记录 -->
			<div class="list" v-for="(evlist, index1) in list" :key="index1">
				<!-- 月份 -->
				<p class="list-time">{{evlist.titleTime}}</p>
				<!-- 记录 -->
				<div class="box">
					<div class="content" v-for="(item, index) in evlist.list" :key="index1+'-'+index" @click="openPage(item)">
						<div>余额提现 <span>{{item.money}}</span></div>
						<p>{{item.add_time.slice(5)}} <span v-if="item.status == 0 " class="yellow">{{item.status_zh}}</span><span v-if="item.status == 2 " class="danger"><i v-if="item.is_right == 0">（账号信息异常）</i>{{item.status_zh}}</span></p>
					</div>
				</div>
			</div>
			<div v-if="clock===2" class="vantLoading business-loading"><vloading :vertical="false" text="努力加载中..."></vloading></div>    
            <div class="end-msg">{{endMsg}}</div>
		</div>
		<div v-else-if="show == 1">
			<searchNone :item="'walletAccount'" t-type="true"></searchNone>
		</div>
		<div v-else class="vantLoading">
			<vloading :vertical="false" text=""></vloading>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {post} from '../../assets/js/commonAPI'
	Vue.prototype.$post = post;
    import navbar from '../navbar/nav.vue'

    import vloading from '../vloading.vue'
    import searchNone from '../component/searchNone/searchNone.vue'
	export default {
        components:{
            navbar,
            vloading,
            searchNone
        },
		data(){
			return {
				clock: 1,  //1-能发起新的分页加载请求， 2-不能发起请求
				page: 1, //页码数
				limit: 10,  //每页最大数据条数
				status: -1,  //状态 0未审核 1审核通过 2审核驳回 -1 全部

				list: [], //列表数据
				is_right: '1',  // 1-正常情况 0-不正常，需要修改银行卡信息

				show: 0,  //显示内容  0-加载中 1-缺省图 2-内容
				endMsg: ''  //分页加载内容无更多内容时的提示
			}
		},
		created(){
			this.getList()
			this.getBankInfo()
		},
		methods:{
            //####=>返回上一页
            goPreviousPage(){
                this.$router.push('/wallet');
            },	
            //进入明细页
            openPage(data){
            	this.$router.push({path: '/cashOutDetails', query: {details: JSON.stringify(data), is_right: this.is_right}});
            },	
	        preListData(detailList){
	        	let pList = []; //暂存列表
	        	let everyMonth = '';  //每一条数据的年月日期， 用作下方判断
	        	let currIndex = this.list.length === 0 ? -1 : this.list.length - 1;
	        	let currMonth = this.list.length === 0 ? '' : this.list[currIndex].titleTime; // 当前数据最新日期

	        	for(let n in detailList) {
	        		everyMonth = detailList[n].add_time;
	        		everyMonth = everyMonth.slice(0, 7);

	        		//获得的日期不等于当前数据最新日期，则新加一个对象{titleTime: '2019-10', list: []}
	        		if(everyMonth !== currMonth) {
	        			this.list.push({titleTime: everyMonth, list: [detailList[n]]});
	        			currIndex++;
	        			currMonth = this.list[currIndex].titleTime;
	        		}else {
	        			//日期不变， 则直接加入当前列表 最新list中
	        			this.list[currIndex].list.push(detailList[n])
	        		}
	        	}
	        },
	        //获取账单列表
	        getList(){
	            this.clock = 2;
	            this.$post("/?c=user&a=withdrawalList", {
	              status:this.status,
	              page:this.page,
	              limit:this.limit
	            }).then((res) => {
	                switch (res.code){
	                    case 0:
	                      
	                      this.clock = 1;

                          if(this.page ==1 && res.data.list.length > 0){
                          	//有内容，显示内容
                          	this.show = 2;
                          }else if(this.page ==1 && !res.data.list.length){
                          	//无内容，显示缺省图
                          	this.show = 1;
                          }

	                      //第一页请求，且得到数据条数等于 每页最大数据条数， 则还可能有数据， 允许分页加载
	                      if(this.page ==1 && res.data.list.length == this.limit) {
	                        window.addEventListener('scroll', this.handleScroll)
	                      }

	                      //非第一页（已分页监听），数据不满最大条数， 则无更多数据， 取消分页加载更多
	                      if(this.page>1 && res.data.list.length < this.limit) {
	                      	this.endMsg = '已经没有更多内容啦~';
	                        window.removeEventListener('scroll', this.handleScroll)
	                      }

	                      //预处理列表数据
	                      this.preListData(res.data.list);
	                    break;
	                    default:
	                      this.$toast('获取列表失败');
	                    break;
	                }
	                
	            });
	        },
	        //获取银行卡信息, 以控制明细详情页，已驳回状态是否显示去修改按钮
	        getBankInfo(){
	            this.$post('/?c=user&a=bank',{})
	            .then((res)=>{
	                switch(res.code){
	                    case 0:
	                        this.is_right = res.data.is_right;
	                        break;
	                    case 1:
	                        this.$toast(res.msg);
	                        break;
	                    default:
	                        break;
	                }
	            }) 
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
	        }
		},
	    destroyed(){
	      window.removeEventListener('scroll', this.handleScroll)
	    }
	}
</script>

<style lang="less" scoped>
	p {
		margin: 0;
	}
	.list {
		position: relative;
		.list-time {
			font-size: 14px;
			color: #424242;
		    padding: 10px 12px 6px;
		}
		.box {
			padding:0 12px;
			background-color: #ffffff;
			.content {
				font-size: 14px;
				color: #424242;
				line-height: 1.5em;
			    padding: 10px 0;
				border-top: 1px solid #dbdbdb;
				&:first-child{
					border-top: none;
				}
				span {
					float: right;
				}
				p {
					font-size: 12px;
					color: #808080;
					.yellow {
						color: #ffb912;
					}
					.danger {
						color: #ee2d2d;
						i {
							font-style: normal;
						}
					}
				}
			}			
		}

	}

	.vantLoading{
	    margin-top: 20px;
	    width: 100%;
	    display: flex;
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