<template>
    <div class="_appealDetails">
        <!-- 头部导航 -->
        <van-nav-bar
            title="申诉详情"
            class="after-info-bar"
            @click-left="goPreviousPage"
            @click-right="contactService"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
            <van-icon name="arrow-right" slot="right" class="icon-right-style fz_12">
                <img src="../../assets/img/dianhua.png" alt="">
                <span v-if="appealType == 1">招商专员</span>
                <span v-else-if="appealType == 2">推广专员</span>
            </van-icon>
        </van-nav-bar>

        <div>
            <div class="appeal-detailds-box">
                <div class="appeal-detailds-reason fz_14 mb_10">
                    <div class="dflex appeal-detailds-reason-li">
                        <div class="appeal-detailds-reason-label">申诉状态：</div>
                        <div class="appeal-detailds-reason-text ">{{getApplyStatus(after_status)}}</div>
                    </div>
                    <div class="dflex appeal-detailds-reason-li" v-if="after_status == 13">
                        <div class="appeal-detailds-reason-label">驳回原因：</div>
                        <div class="appeal-detailds-reason-text ">{{apply_remark}}</div>
                    </div>
                </div>
                <div class="appeal-detailds-reason fz_14 dflex">
                    <div class="appeal-detailds-reason-label">申诉理由：</div>
                    <div class="appeal-detailds-reason-text ">{{reason}}</div>
                </div>
                <div class="appeal-detailds-reason fz_14 dflex">
                    <div class="appeal-detailds-reason-label">服务单号：</div>
                    <div class="appeal-detailds-reason-text ">{{after_sn}}</div>
                </div>
                <div class="appeal-detailds-goods goods_box">
                    <div div class="dflex fz_12 goods-li" v-for="(goodsItem,goodsKey) in list" :key="goodsKey">
                        <div class="goods-img-box">
                            <img :src="goodsItem.goods_img" alt="" class="">
                        </div>
                        <div class="goods-attr-box">
                            <div class="goods-title-box color_424242">{{cutString(goodsItem.goods_name,20)}}</div>
                            <div class="goods-number-box dflex color_808080">
                                <div class="goods-label">退货数量</div>
                                <div class="goods-number">x{{goodsItem.goods_number}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="appeal-detaild-attr-box fz_14 color_808080">
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">订单号：</div>
                        <div class="appeal-detailds-text ">{{order_sn}}</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">售后状态：</div>
                        <div class="appeal-detailds-text ">{{type_zh}}</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">退款金额：</div>
                        <div class="appeal-detailds-text ">{{price}}元</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">售后说明：</div>
                        <div class="appeal-detailds-text ">{{remark}}</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">退货人：</div>
                        <div class="appeal-detailds-text ">{{nick_name}}</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">联系方式：</div>
                        <div class="appeal-detailds-text ">{{mobile}}</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">退货地址：</div>
                        <div class="appeal-detailds-text ">{{order_address}}</div>
                    </div>
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">售后凭证：</div>
                        <div class="appeal-detailds-img dflex">
                            <img :src="imgItem" alt="" v-for="(imgItem,imgKey) in img" :key="imgKey" @click="changeSwiper(imgKey)">
                        </div>
                    </div>
                </div>
                <div class="appeal-detaild-attr-box fz_14 color_808080">
                    <div class="sales-detaild-attr-li dflex ">
                        <div class="appeal-detailds-label">商家名称：</div>
                        <div class="appeal-detailds-text ">{{shop_name}}</div>
                    </div>
                    <template v-if="appealType == 2">
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">商家电话：</div>
                            <div class="appeal-detailds-text ">{{shop_mobile}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">商家地址：</div>
                            <div class="appeal-detailds-text ">{{shop_address}}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <swiper-alert ref="swiperAlert" class="swiper-alert-box swiperHide animated" :class="[swiperShowStatus()]" :swiperImg="img" @swiperClose="swiperClose"></swiper-alert>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Dialog} from 'vant'
    import '../../assets/css/animate.css'
    import {post,appFunc} from '../../assets/js/commonAPI.js'
    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    import swiperAlert from "../swiper/swiper.vue"
    export default {
        data() {
            return{
                remark:'',
                order_sn:'',
                after_sn:'',
                add_time:'',
                apply_remark:'',
                type_zh:'',
                shop_name:'',
                shop_mobile:'',
                shop_address:'',
                nick_name:'',
                address:'',
                mobile:'',
                after_status:'',

                list:[],
                img: [],
                //swiper 弹窗状态
                swiperShow:0,
                //swiper 弹窗图片选择状态
                imgActive:0,

                appealType:0,
                appealId:0,
            }
        },
        created(){
            let _this = this;
            let after_sn = this.$route.query.id;

            
            this.appealType = sessionStorage.getItem('appealType');
            this.appealId = sessionStorage.getItem('appealId');

            this.$post('/?c=afterAdmin&a=info',{
                after_sn: after_sn,
                id:this.appealId,
                type:this.appealType,
            }).then((res)=>{
                switch(res.code){
                    case 0:
                        this.list = res.data.goods;                        
                        this.remark = res.data.remark;//售后备注
                        this.add_time = res.data.add_time;
                        this.apply_remark = res.data.apply_remark;//驳回
                        this.seller_remark = res.data.seller_remark;//申诉审核备注
                        this.order_sn = res.data.order_sn;
                        this.after_sn = res.data.after_sn;
                        this.type_zh = res.data.type_zh;
                        this.img     = res.data.img;
                        this.shop_name     = res.data.shop_name;
                        this.shop_mobile     = res.data.shop_mobile;//招商电话
                        this.shop_address     = res.data.shop_address;//商家地址
                        this.nick_name     = res.data.nick_name;
                        this.order_address     = res.data.order_address;//订单地址
                        this.user_mobile     = res.data.user_mobile;//推广电话
                        this.mobile     = res.data.mobile;//商家电话
                        this.reason     = res.data.reason;//申诉理由

                        this.after_status     = res.data.after_status;
                        this.price     = Number(res.data.money);

                        break;
                    default:
                        break;
                }
            })
        },
        mounted(){
            let _this = this;
        },
        methods:{
            goPreviousPage(){
                this.$router.push({
                    path:'/appealLists',
                    query:{active:1}
                });
            },
            //截取字符串
            cutString(str,num){
                let val = this.$appFunc.prototype.cutString(str,num);
                return val;
            },
            getType(type){
                if(type == 1){
                    return "退款"
                }else if(type == 2){
                    return "退货"
                }else if(type == 3){
                    return "换货"
                }else{
                    return "状态错误"
                }
            },
            getApplyStatus(status){
                //9用户申述 10用户申述后拓展介入  11拓展确认并修改售后重新提交  12平台申述确认（售后完成） 13拓展驳回（售后完成）
                if(status == 9 || status == 10){
                    return '申述处理中'
                }else if(status == 11){
                    return '申述成功'
                }else if(status == 12){
                    return '申述完成'
                }else if(status == 13){
                    return '申述驳回'
                }else{
                    return
                }
            },
            contactService() {
                let _this = this;
                if(_this.appealType == 1 && _this.shop_mobile != null){
                    window.location.href = 'tel:' + _this.shop_mobile;
                }else if(_this.appealType == 2 && _this.user_mobile != null){
                    window.location.href = 'tel:' + _this.user_mobile;
                }
            },
            cancel(){
                Dialog.confirm({
                    message: '您将撤销本次申请，如果问题未解决，您还可以再次发起。确认继续'
                }).then(() => {
                    this.$post('/?c=afterSale&a=cancel',{
                        after_sn: this.after_sn,
                        id:this.appealId,
                        type:this.appealType,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                this.$router.go(0);
                                break;
                            default:
                                break;
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            }, 
            
            /* swiper 组件 */
            //图片查看
            changeSwiper(index){
                this.swiperShow = 1;
                this.imgActive = index;
                let swiperChild = this.$refs.swiperAlert.swiper;
                swiperChild.slideTo(index,0,false);
            },
            //关闭图片浏览
            swiperClose(){
                this.swiperShow = 2;
                setTimeout(()=>{
                    this.swiperShow = 0;
                },600)
            },
            swiperShowStatus(){
                if(this.swiperShow==0){
                    return ''
                }else if(this.swiperShow==1){
                    //打开弹窗 过度动画
                    return 'swiperShow fadeIn'
                }else{
                    //关闭弹窗 过度动画
                    return 'swiperShow fadeOut'
                }
            },
        },
        components:{
            swiperAlert
        }
    }
</script>

<style>
    html, body{background-color: #f2f2f2;}
    ._appealDetails .van-nav-bar{border-bottom: 1px solid #d8d8d8;}
</style>
<style lang="less" scoped>
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .mb_10{margin-bottom: 10px;}
    .fz_12{font-size: 12px;line-height: 12px;}
    .fz_14{font-size: 14px;line-height: 14px;}
    .fz_16{font-size: 16px;line-height: 16px;}
    .dflex{display: flex;}
    ._appealDetails{
        margin-bottom: 50px;
    }
    
    /* 查看图片的弹窗 默认隐藏 */
    .swiper-alert-box{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: opacity .8s;
        -webkit-animation-duration: .6s;
        animation-duration: .6s;
    }
    /* 查看图片的弹窗*/
    .swiperHide{
        opacity: 0;
        z-index: -1;
    }
    /* 查看图片的弹窗*/
    .swiperShow{
        opacity: 1;
        z-index: 1;
    }
    
    .after-info-bar{
        .van-nav-bar__right{
            display: flex;
            height: 100%;
        }
        .van-icon-arrow-left{
            font-size: 15px;
            color: #424242;
        }
        .icon-right-style{
            display: flex;
            color: #424242;
            img{
                width: 15px;
                height: 15px;
                display: block;
                margin: auto;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
    }
    .appeal-detailds-box{
        .appeal-detailds-label{
            min-width: 75px;
            line-height: 18px;
        }
        .appeal-detailds-text{
            line-height: 18px;
        }
        .appeal-detailds-reason{
            line-height: 18px;
            padding: 12px 12px;
            border-bottom: 1px solid #f2f2f2;
            background-color: #fff;
            .appeal-detailds-reason-label{
                min-width: 75px;
            }
            .appeal-detailds-reason-li{
                margin-bottom: 10px;
            }
            .appeal-detailds-reason-li:last-child{
                margin: 0;
            }
        }
        .goods_box{
            background-color: #f2f2f2;
            padding: 10px 12px;
            border-radius: 5px;
            .goods-li{
                margin-bottom: 10px;
            }
            .goods-li:last-child{
                margin-bottom: 0;
            }
            .goods-img-box{
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
            .goods-attr-box{
                position: relative;
                flex: 1;
                .goods-number-box{
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    .goods-label{
                        margin-right: auto;
                    }
                    .goods-number{
                        margin-left: auto;
                    }
                }
            }
        }
        .appeal-detaild-attr-box{
            padding: 13px 12px;
            border-bottom: 1px solid #f2f2f2;
            background-color: #fff;
            .sales-detaild-attr-li{
                margin-bottom: 13px;
                word-break: break-word;
                .appeal-detailds-img img{
                    width: 62px;
                    height: 62px;
                    display: block;
                    margin-right: 10px;
                }
            }
            .sales-detaild-attr-li:last-child{
                margin-bottom: 0;
            }
        }
        .appeal-detaild-attr-box:last-child{
            border-bottom: none;
        }
    }

    .appeal-details-btn-box{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        width: 100%;
        .appeal-details-btn{
            margin: auto;
            margin-right: 0;
            justify-content: flex-end;
            width: 100%;
            height: 100%;
            .van-button{
                width: 100%;
                height: 100%;
                line-height: 1;
                border:none;
            }
            .cancel-btn{
                color: #fff;
                background-color: #FDA341;
            }
            .pass-btn{
                color: #fff;
                background-color: #EE2D2D;
            }
        }
        
    }
</style>