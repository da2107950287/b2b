<template>
    <div>
        <navbar type="left" title="账户明细" @clickleft="goPreviousPage"></navbar>
        
        <!-- 筛选部分 -->
         <!-- 模板样式  -->
        <van-tabs v-model="active" title-inactive-color="#424242" title-active-color="#ee2d2d" :line-height="0" @click="handleClickTab">
            <van-tab class="tabs-one-none"></van-tab>
            <van-tab title="交易类型">
                <div slot="title">
                    交易类型<van-icon v-if="active == 1" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                <div class="drop-down" @click="changeShow($event)">
                    <div class="drop-down-box">
                        <ul class="drop-down-content clearfixed" @click="handleSelect($event)">
                            <li v-for="(item, index) in dealTypes" :key="index" :class="{'active': dealType == item.type}" :data-type="item.type">{{item.title}}</li>
                        </ul>
                    </div>
                </div>
            </van-tab>
            <van-tab title="全部时间">
                <div slot="title">
                    {{dealTimes[dealTimeIndex].title}}<van-icon v-if="active == 2" name="arrow-up" /><van-icon v-else name="arrow-down" />
                </div>
                <div class="drop-down" @click="changeShow($event)">
                    <div class="drop-down-box">
                        <div class="drop-down-content" @click="handleTime($event)">
                            <p v-for="(item, index) in dealTimes" :key="index" :class="{'active': dealTimeIndex == index}" :data-index="index">{{item.title}}</p>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>

        <div class="wallet-list-box">
            <!-- 列表模板 渲染优化修改 -->
            <div v-if="show === 2" class="wallet-list">
                <div class="wallet-list-ul" v-for="(ite,ind) in data" :key="ind">
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
                <div v-if="clock===2" class="vantLoading business-loading"><vloading :vertical="false" text="努力加载中..."></vloading></div>    
                <div class="end-msg">{{endMsg}}</div>
            </div>
            <div v-else-if="show === 1">
                <searchNone :item="'walletAccount'" t-type="true"></searchNone>
            </div>
            <div v-else class="vantLoading">
                <vloading :vertical="false" text=""></vloading>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import $ from 'jquery';
    import {post,appFunc} from '../../assets/js/commonAPI.js';
    import "../../assets/css/commonstyle.css"
    import navbar from './../navbar/nav.vue'

    import searchNone from "../component/searchNone/searchNone.vue";
    import vantLoading from '../vantLoading.vue';
    import vloading from '../vloading.vue';

    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    export default {
        data() {
            return {
                show: 0,
                endMsg: '',  //分页加载内容无更多内容时的提示

                page:2,
                limit: 10,
                data:[],
                clock:1,

                //前一个被选中的 选项卡 索引
                preActive: 0,
                active: 0,   //筛选选项卡选中项
                //交易类型选中项- 默认全部   //0全部 1提现 3分成 4结算 5退款 6消费 99其他
                dealType: 0,
                //交易类型
                dealTypes: [
                    {title: '全部', type: 0},
                    {title: '消费', type: 6},
                    {title: '分成', type: 3},
                    {title: '结算', type: 4},
                    {title: '提现', type: 1},
                    {title: '退款', type: 5},
                    {title: '其他', type: 99},
                ],
                //被选中的日期索引
                dealTimeIndex: 0,
                //所有筛选时间
                dealTimes: [
                    {title: '全部时间', time: 0}
                ]
            }
        },
        created(){
            //计算最近六个月
            let date = new Date();
            let year = date.getFullYear();
            let dMonth = date.getMonth();
            let month = dMonth > 8 ? dMonth + 1 : '0' + (dMonth + 1);
            for(let n = 0; n < 6; n++) {
                this.dealTimes.push({title: year + '年' + month + '月', time: year + '-' + month})
                dMonth--;
                if(dMonth < 0) {
                    //这一年的月份已减完， 从上一年开始重新计算月份
                    year--;
                    dMonth = 11;
                }
                month = dMonth > 8 ? dMonth + 1 : '0' + (dMonth + 1);
            }

            this.getInit();
        }, 
        methods:{
            //数据最终模板 data = [{titleTime: '2019.10', list:[{}]}]
            //处理列表内容
            preListData(list){
                let pList = []; //暂存列表
                let everyMonth = '';  //每一条数据的年月日期， 用作下方判断
                let currIndex = this.data.length === 0 ? -1 : this.data.length - 1;
                let currMonth = this.data.length === 0 ? '' : this.data[currIndex].titleTime; // 当前数据最新日期

                for(let n in list) {
                    everyMonth = list[n].month;

                    //获得的日期不等于当前数据最新日期，则新加一个对象{titleTime: '2019.10', list: []}
                    if(everyMonth !== currMonth) {
                        this.data.push({titleTime: everyMonth, list: [list[n]]});
                        currIndex++;
                        currMonth = everyMonth;
                    }else {
                        //日期不变， 则直接加入当前列表 最新list中
                        this.data[currIndex].list.push(list[n])
                    }
                }
            },
            getInit(){
                this.clock = 2;
                this.$post('/?c=user&a=accountList240',{
                    month: this.dealTimes[this.dealTimeIndex].time,
                    page:1,
                    limit: this.limit,
                    type: this.dealType,
                })
                .then((res)=>{
                    //点击当前选项卡，切换其内容打开收起状态
                    this.active = 0;
                    this.preActive = 0;
                    switch(res.code){
                        case 0:   
                            if(res.data.length == this.limit){
                                window.addEventListener('scroll', this.handleScroll)
                            }

                            if(res.data.length) {
                                this.show = 2;
                                this.clock = 1;
                                this.preListData(res.data)
                            }else {
                                this.show = 1
                            }
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break; 
                        default:
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
                if (scrollTop + windowHeight >= (scrollHeight-50)) {
                //写后台加载数据的函数
                    if(_this.clock == 1){
                        _this.clock = 2;
                        _this.$post('/?c=user&a=accountList240',{
                            month: this.dealTimes[this.dealTimeIndex].time,
                            page:_this.page,
                            limit: this.limit,
                            type:this.dealType,
                            }).then((res) => {
                            switch (res.code){
                                case 0:
                                    if(res.data.length){
                                        this.preListData(res.data)
                                    }
                                    if(res.data.length<this.limit){
                                        this.endMsg = '已经没有更多内容啦~';
                                        window.removeEventListener('scroll', this.handleScroll)
                                    }
                                    _this.clock = 1;
                                    _this.page+=1
                                    break;
                                case 1:
                                    _this.$toast(res.msg);
                                    break; 
                                default:
                                    break;
                            }
                        })
                    }
                }
            },
            goPreviousPage(){
                if(this.fromHerf == null){
                    this.$router.push({
                        path:'/index'
                    });
                }else{
                    this.$router.go(-1);
                }
            },
            //筛选选项卡切换
            handleClickTab(index, title){
                console.log('===preActive===',this.preActive,index, title,'===',this.active)

                if(index == this.preActive) {
                    this.active = 0;
                    this.preActive = 0;
                }else {
                    this.preActive = index;
                }
            },
            //点击遮罩层， 隐藏刷选下拉菜单
            changeShow(ev){
                let target = ev.target || window.event.srcElement;
                if(target.className != 'drop-down') return;
                //点击当前选项卡，切换其内容打开收起状态
                this.active = 0;
                this.preActive = 0;   
            },
            //交易类型-具体内容，选择
            handleSelect(ev){
                let target = ev.target || window.event.srcElement;

                if(target.tagName != 'LI') {return}

                //当前被选中项
                let type = target.getAttribute('data-type');
                this.dealType = type;

                //请求接口数据
                //数据初始化
                this.show = 0;
                this.endMsg = '';
                this.page = 2;
                this.data = [];
                this.clock = 1;

                this.getInit();               
            },
            //全部时间 选择日期
            handleTime(ev){
                let target = ev.target || window.event.srcElement;

                if(target.tagName != 'P') {return}

                //当前被选中项
                let index = target.getAttribute('data-index');
                this.dealTimeIndex = index;

                //请求接口数据
                //数据初始化
                this.show = 0;
                this.endMsg = '';
                this.page = 2;
                this.data = [];
                this.clock = 1;

                this.getInit();    
            },

        },
        components:{
            navbar,
            searchNone,
            vloading
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>
<style scoped>
    /*筛选重置部分 vant 样式，专用样式*/
    .van-tabs {
        width: 150%;
        margin-left: -50%;
        position: fixed;
        top: 46px;
        left: 0;
        z-index: 8; 
    }
    .van-tabs .van-tab .van-icon,
    .van-tabs .van-tab .van-icon::before {
        font-size: 14px;
    }
    .tabs-one-none {
        display: none;
    }
    .van-tabs .drop-down {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 1px;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .van-tabs .drop-down-box {
        margin-top: 89px;
        max-height: 215px;
        background-color: #ffffff;
        overflow: auto;
        position: relative;

        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .drop-down-content {
        width: 100%;
        padding-left: 15px;
        padding-bottom: 10px;
    }
    ul.drop-down-content {
        padding-top: 20px;
    }
    .drop-down-content.clearfixed {
        *zoom: 1;
    }
    .drop-down-content.clearfixed:after {
        content: '';
        width: 100%;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        clear: both;
    }
    .drop-down-content li {
        float: left;
        width: 3.8rem;
        font-size: 12px;
        color: #808080;
        text-align: center;
        border: 1px solid #808080;
        border-radius: 5px;
        margin-right: 15px;
        margin-bottom: 10px;
        padding: 0.267rem 0;
    }
    .drop-down-content li.active {
        color: #ee2d2d;
        border-color: #ee2d2d;
    }

    .drop-down-content p {
        width: 100%;
        font-size: 14px;
        color: #808080;
        padding: 10px 15px 15px 0;
        margin: 0;
    }
    .drop-down-content p.active {
        color: #ee2d2d;
    }
</style>

<style scoped lang="less">
.wallet-list-box{
    font-size: 14px;
    padding-top: 10px;
    margin-top: 48px;
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