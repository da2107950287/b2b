<template>
    <div class="invoiceInfo">
        <!-- 收货地址标题 -->
        <navbar type="both" title="发票信息管理" rightTxt="添加发票" @clickleft="goPreviousPage" @clickRight="getReceiving"></navbar>
        <!-- 发票列表 -->
        <div v-if="show === 2" class="receiving-goods-li">
            <van-swipe-cell :right-width="130" v-for="(item,index) in receivingInfo" :key="index" class="swipe-cell">
                <van-cell-group>
                    <div @click="clcikInfo(item)">
                        <div class="receiving-goods-title">
                            <div class="dflex company-name-box">
                                <div class="company-name fz_14">{{item.company_name}}</div>
                                <span v-if="item.invoice_type == 1" class='receivingContent fz_12'>{{receivingContentOne}}</span>
                                <span v-else class='receivingContent fz_12'>{{receivingContentTow}}</span>
                            </div>
                        </div>
                        <div class="bank-of-deposit fz_12" v-show="item.bank_of_deposit != ''">{{item.bank_of_deposit}}</div>
                        <div class="receiving-goods-add fz_12">税号：{{item.tax_id}}</div>
                    </div>
                </van-cell-group>
                <van-button slot="right" class="info" @click="searchResuit(item)">详情</van-button>
                <van-button slot="right" type='danger' @click="onClose(item)">删除</van-button>
            </van-swipe-cell>
            <div v-if="clock===2" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>
        </div>    
        <div v-else-if="show === 1">
            <searchNone :item="'invoiceInfo'" t-type="true"></searchNone>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Dialog} from 'vant'
    import $ from 'jquery';
    import {post} from '../assets/js/commonAPI.js';

    import searchNone from "./component/searchNone/searchNone.vue";
    import vloading from './vloading.vue'
    import vantLoading from './vantLoading.vue'
    import navbar from './navbar/nav.vue'
    Vue.prototype.$post = post;
    Vue.use(Dialog);

    export default {
        components: {
            searchNone,
            vantLoading,
            vloading,
            navbar
        },
        data() {
            return {
                show: 0,

                receivingInfo:[],
                index:0,
                getIf:0,
                getid:'',                  //订单过来的选择发票
                receivingContentOne:'普票',//发票类型
                receivingContentTow:'专票',
                clock:1,
                lpage:2,           //当前页码
            }
        },
        created(){
            let _this = this;
            this.getIf = Number(this.$route.query.index);
            this.getid = Number(this.$route.query.id);

            this.$post('/?c=user&a=myInvoice',{
                page:1,
                type:this.index,
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.receivingInfo = res.data.list;
                        if(this.receivingInfo.length > 0) {
                            this.show = 2
                        }else{
                            this.show = 1
                        }
                        if(this.receivingInfo.length>9) {
                            window.addEventListener('scroll', this.handleScroll)
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
        mounted () {
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            getReceiving(){
                if(this.getid==1){
                    this.$router.push({
                        path:'/getinvoiceInfo',
                        query:{
                            id:1
                        }
                    });
                }else if(this.getid==2){
                    this.$router.push({
                        path:'/getinvoiceInfo',
                        query:{
                            id:2
                        }
                    });
                }else{
                    this.$router.push({
                        path:'/getinvoiceInfo',
                    });
                }
            },
            clcikInfo(item){
                //getid :  1 返回确认订单页面  2 返回求购单页面 3-返回团购活动确认订单页
                sessionStorage.setItem('wap-val',JSON.stringify({checked:true,radio:1}))
                if(this.getid==1){
                    localStorage.setItem('Payment',JSON.stringify(item));
                    this.$router.push({
                        path:'/ConfirmAnOrder'
                    })
                }else if(this.getid==2){
                    localStorage.setItem('Payment',JSON.stringify(item));
                    this.$router.push({
                        path:'/purchaseOrder'
                    })
                }else if(this.getid==3){
                    localStorage.setItem('Payment',JSON.stringify(item));
                    this.$router.push({
                        path:'/GrouyBuyingConfirmAnOrder'
                    })
                }else{
                    localStorage.setItem('wapshowInfo',JSON.stringify(item));
                    this.$router.push({
                        path:'/showInfo'
                    })
                }
               
            },
            // 点击查看详情
            searchResuit(item){
                localStorage.setItem('wapshowInfo',JSON.stringify(item));
                this.$router.push({
                    path:'/showInfo'
                })
            },
            onClose(item) {
                let eve = event.srcElement?event.srcElement:event.target;
                let parentsDom = $(eve).parents('div.receiving-goods-li');

                let payment = localStorage.getItem('Payment');
                Dialog.confirm({
                    title: '删除',
                    message: '确定要删除吗？'
                }).then(() => {
                    // on confirm
                    this.$parent.$refs.loading.style.display = 'flex'
                    this.$parent.$refs.loading.style.display = 'flex'
                    this.$post('/?c=user&a=delInvoice',{
                        invoice_id:item.id
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch(res.code){
                            case 0:
                                let n = 0;
                                for(n in this.receivingInfo) {
                                    if(this.receivingInfo[n].id === item.id) {
                                        this.receivingInfo.splice(n, 1)
                                    }
                                }
                                if(!this.receivingInfo.length) this.show = 1
                                break;
                            default:
                                this.$toast('删除失败!');
                                break;
                        }
                    })
                }).catch(() => {
                // on cancel
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
                            _this.$post("/?c=user&a=myInvoice", {
                                    page:_this.lpage,
                                    type:_this.index,
                                    }).then((res) => {
                                    switch (res.code){
                                        case 0:
                                        if(res.data.list.length>0){
                                            _this.receivingInfo=[..._this.receivingInfo,...res.data.list];
                                        }
                                        if(res.data.list.length<10){
                                            window.removeEventListener('scroll', this.handleScroll)
                                        }
                                        _this.clock = 1;
                                        _this.lpage+=1
                                        break;
                                        default:
                                        _this.$toast(res.msg);
                                        break;
                                    }
                                });
                            }
                        }
            },
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style scoped lang="less">
    .dflex{
        display: flex;
        justify-content: flex-start;
    }
    .fz_12{font-size: 12px;}
    .fz_14{font-size: 14px;}


    /* 标题栏 */
    .receiving-goods-bar{
        border-bottom: 1px solid #eee;
    }
    .icon-style{
        font-size: 22px;
        color: #333;
    }
    /* 发票列表 */
    .invoiceInfo{
        .receiving-goods-li{
            background-color: #fff;
            .swipe-cell{
                padding: 15px 12px;
                border-bottom: 1px solid #f2f2f2;
            }
            .swipe-cell:last-child{
                border-bottom: 0;
            }
            .company-name-box{
                margin-bottom: 10px;
                .company-name{
                    margin-right: 10px;
                }
                .receivingContent{
                    color: #fff;
                    background-color: #ffb912;
                    padding: 2px 5px;
                    border-radius: 5px;
                }
            }
            .bank-of-deposit{
                margin-bottom: 5px;
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
<style lang="less">
    /* 发票列表 */
    .invoiceInfo{
        .van-nav-bar .van-icon{
            color: #333;
        }
        .van-nav-bar__text{
            color: #333;
        }
        .receiving-goods-li{
            .swipe-cell{
                .info{
                    background-color: #ffb912;
                    color:#fff;
                    border:1px solid #ffb912;
                }
                .van-hairline--top-bottom::after{
                    border:0;
                }
                .van-swipe-cell__right{
                    right: -12px;
                }
            }
        }
    }
    
</style>