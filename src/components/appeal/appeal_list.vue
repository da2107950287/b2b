<template>
    <div class="salesList sales_list_box">
        <template v-if="show == 2">
            <div v-for="(item,index) in lists" :key="index" class="sales_list_li">
                <div class="sales_list_cont">
                    <div class="sales_list_order_no fz_14 color_424242 dflex" @click.stop="toAppealDetails(item.after_sn)">
                        <div class="list_order_no">服务单号：{{item.after_sn}}</div>
                        <div class="list_order_status color_EE2D2D">{{getStatus(item.status)}}</div>
                    </div>
                    <div class="goods_box" v-for="(items,index) in item.goods" :key="index" @click.stop="toAppealDetails(item.after_sn)">
                        <div div class="dflex fz_12 goods_li" >
                            <div class="goods_img_box">
                                <img :src="items.goods_img" alt="" class="">
                            </div>
                            <div class="goods_attr_box">
                                <div class="goods_title_box color_424242">{{cutString(items.goods_name,20)}}</div>
                                <div class="goods_number_box dflex color_808080">
                                    <div class="goods_label">退货数量</div>
                                    <div class="goods_number">x{{items.num}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="refund_status_box">
                        <div class="refund_status_box dflex">
                            <div class="refund_status_ul dflex" >
                                <div class="refund_status_li color_808080 fz_14 dflex" v-if="item.type == 1">
                                    <div class="refund_status_icon">
                                        <img src="../../assets/img/tuikuan.png" alt="">
                                    </div>
                                    <div class="refund_status_text">仅退款</div>
                                </div>
                                <div class="refund_status_li color_808080 fz_14 dflex" v-else-if="item.type == 2">
                                    <div class="refund_status_icon">
                                        <img src="../../assets/img/tuihuo.png" alt="">
                                    </div>
                                    <div class="refund_status_text">退货退款</div>
                                </div>
                                <div class="refund_status_li color_808080 fz_14 dflex" v-else-if="item.type == 3">
                                    <div class="refund_status_icon">
                                        <img src="../../assets/img/huanhuo.png" alt="">
                                    </div>
                                    <div class="refund_status_text">换货</div>
                                </div>
                            </div>
                            <div class="fz_12 refund_price">
                                <span>退款金额:&yen;{{item.money}} </span>
                            </div>
                        </div>
                    </div>
                    <div class="button_box fz_14">
                        <div class="dflex" v-if="appealType == 1">
                            <van-button @click.stop="toAppealDetails(item.after_sn)" v-if="item.after_status != 9 && item.after_status != 10">查看详情</van-button>
                            <van-button class="active" @click.stop="toHandle(item.after_sn)" v-if="item.after_status == 9 || item.after_status == 10">处理</van-button>
                        </div>
                        <div class="dflex" v-else-if="appealType == 2">
                            <van-button @click.stop="toAppealDetails(item.after_sn)" v-if="item.after_status != 9 && item.after_status != 10">查看详情</van-button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-if="lock===1" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
            <p class="end-msg">{{endMsg}}</p>
        </template>
        <template v-else-if="show == 1">
            <div>
                <searchNone :item="'walletAccount'"></searchNone>
            </div>
        </template>
        <template v-else>
            <div class="vantLoading">
                <vloading :vertical="false" text=""></vloading>
            </div>
        </template>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {post,appFunc} from '../../assets/js/commonAPI.js'
    import searchNone from "../component/searchNone/searchNone.vue";
    import vantLoading from '../vantLoading.vue'
    import vloading from '../vloading.vue'
    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    export default {
        props:['lists','show','status'],
        data() {
            return{
                active:0,
                appealType:0,
                appealId:0,
                
                lock:0,
                page:2,           //当前页码
                endMsg:'',
            }
        },
        created(){
            this.appealType = sessionStorage.getItem('appealType');
            this.appealId = sessionStorage.getItem('appealId');
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
        },
        methods:{
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
                    if(_this.lock == 0){
                        _this.lock = 1;
                        _this.$post("/?c=afterAdmin&a=list", {
                            status:_this.status,
                            page:_this.page,
                            limit:10
                        }).then((res) => {
                            if(res.code === 0){
                                if(res.data.length>0){
                                    _this.lists=[..._this.lists,...res.data];
                                }
                                if(res.data.length<10){
                                    _this.endMsg = '已经没有更多内容啦~';
                                    window.removeEventListener('scroll', this.handleScroll)
                                }
                                _this.lock = 0;
                                _this.page+=1
                            }              
                        });
                    }
                }
            },
            cutString(str,num){
                let val = this.$appFunc.prototype.cutString(str,num);
                return val;
            },
            toAppealDetails(id){
                this.$router.push({
                    path:'/appealDetails',
                    query:{id:id}
                });
            },
            toHandle(id){
                this.$router.push({
                    path:'/appealPost',
                    query:{id:id}
                });
            },
            getStatus(status){
                switch(status){//售后状态  0待确定 1商家已确定  2平台已确定 3用户取消 4商家已驳回 5用户申诉 6拓展介入 7拓展驳回 8拓展确认并修改售后重新提交 9平台申述确认
                    case 0:
                        return '待确认'
                        break;
                    case 1:
                        return '商家已确定'
                        break;
                    case 2:
                        return '平台已确定'
                        break;
                    case 3:
                        return '用户取消'
                        break;
                    case 4:
                        return '商家已驳回'
                        break;
                    case 5:
                        return '用户申诉'
                        break;
                    case 6:
                        return '拓展介入'
                        break;
                    case 7:
                        return '拓展驳回 '
                        break;
                    default:
                        break;
                }
            }
        },
        components:{
            searchNone,
            vantLoading,
            vloading
        },
        destroyed () {
            this.page=2;
            this.endMsg="";
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>
<style>
    html, body{background-color: #f2f2f2;}
</style>
<style lang="less" scoped>

    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;}
    .fz_14{font-size: 14px;}
    .fz_16{font-size: 16px;}
    .dflex{display: flex;}

    .sales_list_li{
        background-color: #fff;
        margin: 10px 12px;
        border-radius: 15px;
        .sales_list_cont{
            padding: 0 10px;
            .sales_list_order_no{
                padding: 15px 0;
                .list_order_no{
                    margin-right: auto;
                }
                .list_order_status{
                    margin-left: auto;
                }
            }
            .goods_box{
                background-color: #f2f2f2;
                padding: 10px 8px;
                border-radius: 5px;
                margin-bottom: 15px;
                .goods_li{
                    margin-bottom: 10px;
                }
                .goods_li:last-child{
                    margin-bottom: 0;
                }
                .goods_img_box{
                    max-width: 70px;
                    height: 70px;
                    border-radius: 5px;
                    overflow: hidden;
                    margin-right: 10px;
                    background: #fff;
                    flex: 1;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        border-radius: 5px;
                    }
                }
                .goods_attr_box{
                    position: relative;
                    flex: 1;
                    .goods_number_box{
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        .goods_label{
                            margin-right: auto;
                        }
                        .goods_number{
                            margin-left: auto;
                        }
                    }
                }
            }
            .refund_status_box{
                .refund_status_ul{
                    flex: 1;
                    .refund_status_li{
                        flex: 1;
                        .refund_status_icon{
                            img{
                                display: block;
                                height: 20px;
                                border-radius: 3px;
                                overflow: hidden;
                            }
                        }
                        .refund_status_text{
                            flex: 1;
                            line-height: 20px;
                            height: 20px;
                            margin-left: 7px;
                        }
                    }
                    .refund_status_li.refund_status_active{
                        color:#EE2D2D;
                    }
                }
                .refund_price{
                    line-height: 20px;
                }
            }
            .button_box{
                padding-bottom: 15px;
                div{
                    margin-top: 15px;
                    justify-content: flex-end;
                    button.van-button{
                        min-width: 80px;
                        height: 30px;
                        display: block;
                        line-height: 1;
                        color: #424242;
                        border-radius: 5px;
                        border: 1px solid #808080;
                        align-self:flex-end;
                        margin-left: auto;
                    }
                    button.van-button.active{
                        border:1px solid #EE2D2D;
                        color: #EE2D2D;
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