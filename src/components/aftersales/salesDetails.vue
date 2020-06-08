<template>
    <div>
        <!-- 头部导航 -->
        <van-nav-bar
            title="售后详情"
            class="after-info-bar"
            @click-left="goPreviousPage"
            @click-right="getPhone"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
            <van-icon name="arrow-right" slot="right" class="icon-right-style fz_12">
                <img src="../../assets/img/dianhua.png" alt="">
                <span>联系客服</span>
            </van-icon>
        </van-nav-bar>

        <div class="_salesDetails">
            <div class="top_status_box dflex fz_12" v-if="statusList.length>0">
                <div class="jd_box " v-for="(jdItem,jdKey) in statusList" :key="jdKey" :class="{'active':active >= jdKey}">
                    <div class="jd_title_box">
                        <div class="jd_title_img">
                            <img v-if="active >= jdKey" src="../../assets/img/success_1.png" alt="">
                            <img v-else src="../../assets/img/success.png" alt="">
                        </div>
                        <div class="jd_title">{{jdItem.title}}</div>
                    </div>
                    <div class="jd_img_box" v-if="jdKey < statusList.length-1">
                        <img class="jinduImg jinduImg_0" v-if="active <= jdKey-1" src="../../assets/img/jindu_2.png" alt="">
                        <img class="jinduImg jinduImg_2" v-if="active > jdKey" src="../../assets/img/jindu.png" alt="">
                        <img class="jinduImg jinduImg_1" v-if="active == jdKey" src="../../assets/img/jindu_1.png" alt="">
                    </div>
                </div>
            </div>
            <div class="toLogisticsDetails dflex label_right fz_14" @click="toLogisticsDetails(logList)" v-if="logList.length > 0">
                <div class="label_title color_424242">{{logList[0].add_time}} {{logList[0].content}}</div>
                <div class="label_right_img"><img src="../../assets/img/jiantou.png" alt=""></div>
            </div>

            <div class="order_detailds_box">
                <div class="dflex label_right fz_14" @click="goOrder(order_sn)">
                    <div class="label_title color_424242">订单号：{{order_sn}}</div>
                    <div class="label_right_img"><img src="../../assets/img/jiantou.png" alt=""></div>
                </div>
                <div class="goods_box">
                    <div div class="dflex fz_12 goods_li" v-for="(goodsItem,goodsKey) in goods" :key="goodsKey">
                        <div class="goods_img_box">
                            <img :src="goodsItem.goods_img" alt="" class="">
                        </div>
                        <div class="goods_attr_box">
                            <div class="goods_title_box color_424242">{{(goodsItem.goods_name)}}</div>
                            <div class="goods_number_box dflex color_808080">
                                <div class="goods_label">退货数量</div>
                                <div class="goods_number">x{{goodsItem.num}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sales_detaild_attr_box">
                    <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">服务单号：</div>
                        <div class="sales_detaild_attr_cont">{{after_sn}}</div>
                    </div>
                    <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">申请时间：</div>
                        <div class="sales_detaild_attr_cont">{{add_time}}</div>
                    </div>
                    <!-- <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">退货人：</div>
                        <div class="sales_detaild_attr_cont">退货人</div>
                    </div> -->
                    <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">售后状态：</div>
                        <div class="sales_detaild_attr_cont">{{getType(type)}}</div>
                    </div>
                    <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">退款金额：</div>
                        <div class="sales_detaild_attr_cont">&yen; {{money}}</div>
                    </div>
                    <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">退款说明：</div>
                        <div class="sales_detaild_attr_cont">{{remark}}</div>
                    </div>
                    <div class="dflex fz_14 color_808080 sales_detaild_attr_li">
                        <div class="sales_detaild_attr_label">凭证：</div>
                        <div class="sales_detaild_attr_cont dflex">
                            <img alt="" v-for="(imgItem,imgKey) in img" :key="imgKey" :src="imgItem" @click="changeSwiper(imgKey)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="sales_details_btn_box dflex"  v-if="after_status == 0">
                <div class="dflex sales_details_btn">
                    <van-button @click="cancel">撤销申请</van-button>
                    <van-button @click="edit">修改申请</van-button>
                </div>
            </div>
            <div class="sales_details_btn_box dflex"  v-if="after_status == 8">
                <div class="dflex sales_details_btn">
                    <van-button @click="appeal">申诉</van-button>
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
                active:0,
                statusList:[],

                logList:[],

                after_id: "",
                after_sn: "",
                order_id: "",
                order_sn: "",
                user_id: "",
                ru_id: "",
                type: "0",
                status: "0",
                after_status: "0",//售后综合状态（包括物流状态） 0提交申请  1商家确认 2用户已发货 3商家已收货 4商家已发货 5用户已收货 6平台确认（售后完成） 7取消申请（售后完成） 8商家驳回 9用户申诉 10用户申诉后拓展介入  11拓展确认并修改售后重新提交 13拓展驳回（售后完成）
                remark: "",
                img: [],
                //swiper 弹窗状态
                swiperShow:0,
                //swiper 弹窗图片选择状态
                imgActive:0,

                money: "",
                seller_remark: "",
                add_time: "",
                goods: [],
                newList:[],
                maxMoney:'',
                shipping_fee:0,

                mobile:'',//商家电话
                //虚拟电话 - 联系客服
                xuPhone: '4001288566'
            }
        },
        created(){
            let _this = this;
            let after_sn = this.$route.query.id;

            this.$post('/?c=afterSale&a=info',{
                after_sn: after_sn,
            }).then((res)=>{
                switch(res.code){
                    case 0:
                        this.after_id = res.data.after_id;
                        this.after_sn = res.data.after_sn;
                        this.order_id = res.data.order_id;
                        this.order_sn = res.data.order_sn;
                        this.user_id = res.data.user_id;
                        this.ru_id = res.data.ru_id;
                        this.type = res.data.type;
                        this.status = res.data.status;
                        this.after_status = res.data.after_status;
                        this.remark = res.data.remark;
                        this.img = res.data.img;
                        this.money = res.data.money;
                        this.goods = res.data.goods;
                        this.add_time = res.data.add_time;
                        this.seller_remark = res.data.seller_remark;

                        this.mobile = res.data.mobile;//商家电话

                        let statusList = this.getStatusList(res.data.after_status);
                        this.statusList = statusList;

                        this.$post('/?c=order&a=orderDetail',{
                            order_sn: res.data.order_sn
                        }).then((res)=>{
                            if(res.code === 0){
                                this.newList = res.data.goods_list;
                                this.maxNumber(res.data.goods_list);
                                this.shipping_fee = Number(res.data.shipping_fee);
                            }
                        });

                        this.$post('/?c=merchant&a=call',{
                            seller_id: this.ru_id
                        }).then((res)=>{
                            switch(res.code){
                                case 0:
                                    this.xuPhone = res.data.phone;
                                    break;
                                default:
                                    break;
                            }
                        })
                        break;
                    default:
                        break;
                }
            });

            this.$post('/?c=afterSale&a=log',{
                after_sn: after_sn,
            }).then((res)=>{
                switch(res.code){
                    case 0:
                        this.logList = res.data;
                        break;
                    default:
                        break;
                }
            });
        },
        mounted(){
            /* let statusList = this.getStatusList(this.after_status);
            this.statusList = statusList; */
        },
        methods:{
            maxNumber(item){
                this.maxMoney = 0;
                for(let key in item){
                    this.maxMoney += Number(item[key].goods_number) * Number(item[key].goods_price);
                }
            },
            goPreviousPage(){
                if(this.fromHerf == null || 
                    this.fromHerf == 'logisticsDetails' || 
                    this.fromHerf == 'seeDetails'){
                    this.$router.push({
                        path:'/index'
                    });
                }else{
                    this.$router.go(-1);
                }
            },
            // 跳转订单详情
            goOrder(item){
                this.$router.push({
                    path:'/seeDetails',
                    query:{
                        sn:item
                    }
                });
            },
            //截取字符串
            cutString(str,num){
                let val = this.$appFunc.prototype.cutString(str,num);
                return val;
            },
            //跳转进度跟踪
            toLogisticsDetails(log){
                localStorage.setItem('afterlogList',JSON.stringify(log))
                this.$router.push({
                    path:'/logisticsDetails',
                    query:{type:'after'}
                })
            },
            getStatusList(status){
                let list = [];
                switch(Number(this.type)){
                    case 1: //退款
                        list = [{
                            title:'提交申请',
                        },{
                            title:'商家确认',
                        },{
                            title:'已完成',
                        }];
                        break;
                    case 2: //退货
                        list = [{
                            title:'提交申请',
                        },{
                            title:'商家确认',
                        },{
                            title:'货物退回',
                        },{
                            title:'已完成',
                        }];
                        break;
                    default: //换货
                        list = [{
                            title:'提交申请',
                        },{
                            title:'商家确认',
                        },{
                            title:'货物退回',
                        },{
                            title:'收到货物',
                        },{
                            title:'已完成',
                        }];
                        break;
                }

                switch(Number(status)){
                    case 0:  //0提交申请
                        this.active = 0;
                        break;
                    case 11: //11拓展确认并修改售后重新提交
                        list[1].title = '平台确认';
                        this.active = 1;
                        break;
                    case 1:  //1 商家确认
                    case 2:  //2 用户已发货
                        this.active = 1;
                        break;
                    case 3:  //3商家已收货
                    case 4:  //4商家已发货
                        this.active = 2;
                        break;
                    case 5:  //5用户已收货
                        this.active = 3;
                        break;
                    case 6: //6平台确认（售后完成）
                        this.active = this.type == 1?2:(this.type == 2?3:4);
                        break;
                    case 7: //7 取消申请（售后完成）
                        list = [{
                            title:'提交申请',
                        },{
                            title:'申请已取消',
                        }];
                        this.active = 1;
                        break;
                    case 8: //8商家驳回
                        list = [{
                            title:'提交申请',
                        },{
                            title:'商家拒绝',
                        },{
                            title:'用户申诉',
                        },{
                            title:'平台处理',
                        }];
                        this.active = 1;
                        break;
                    case 9:  //9用户申诉
                    case 10://10用户申诉后拓展介入
                        list = [{
                            title:'提交申请',
                        },{
                            title:'商家拒绝',
                        },{
                            title:'用户申诉',
                        },{
                            title:'平台处理',
                        }];
                        this.active = 2;
                        break;
                    case 13://13拓展驳回（售后完成）
                        list = [{
                            title:'提交申请',
                        },{
                            title:'商家拒绝',
                        },{
                            title:'用户申诉',
                        },{
                            title:'平台处理',
                        }];
                        this.active = 3;
                        break;
                }
                return list;
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
            // 打电话
            getPhone() {
                //虚拟号码
                window.location.href = 'tel:' + this.xuPhone;
            },
            cancel(){
                Dialog.confirm({
                    message: '您将撤销本次申请，如果问题未解决，您还可以再次发起。确认继续'
                }).then(() => {
                    this.$parent.$refs.loading.style.display = 'flex'
                    this.$post('/?c=afterSale&a=cancel',{
                        after_sn: this.after_sn,
                    }).then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
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
            edit(){
                let goods = [];
                for(let key in this.goods){
                    this.goods[key] = {
                        goods_attr : this.goods[key].goods_attr,
                        goods_name : this.goods[key].goods_name,
                        goods_number : this.goods[key].num,
                        goods_price : this.goods[key].goods_price,
                        after_price : this.goods[key].after_price,
                        goods_thumb : this.goods[key].goods_img,
                        rec_id : this.goods[key].rec_id,
                        wId : this.goods[key].id,
                    }
                    goods = this.goods
                }
                let data = {
                    img : this.img,
                    message: this.remark,
                    type: this.type,
                    list:goods,
                    newList : this.newList,
                    snId:this.after_sn,
                    money:this.money,
                    maxMoney : this.maxMoney,
                    shipping_fee: this.shipping_fee
                }
                console.log(data);
                localStorage.setItem('saleItemList',JSON.stringify(data));
                this.$router.push({
                    path:'/editSale',
                    query:{type:'edit',}
                })
            },
            appeal(){
                this.$router.push({
                    path:'/postAppeal',
                    query:{id:this.after_sn}
                })
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
</style>
<style lang="less" scoped>
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;line-height: 12px;}
    .fz_14{font-size: 14px;line-height: 14px;}
    .fz_16{font-size: 16px;line-height: 16px;}
    .dflex{display: flex;}

    ._salesDetails{
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

    .top_status_box{
        background-image: url(../../assets/img/jindu_bg.png);
        height: 105px;
        .jd_box{
            position: relative;
            width: 20%;
            .jd_title_box{
                margin: auto;
                margin-top: 20px;
                .jd_title_img{
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: auto;
                    margin-bottom: 9px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .jd_title{
                    color: #FF8E8E;
                    text-align: center;
                }
            }
            .jd_img_box{
                width: 43px;
                height: 8px;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                .jinduImg{
                    width: 100%;
                    display: block;
                    position: absolute;
                    top: -20px;
                    right: -22px;
                }
            }
        }
        .jd_box.active{
            .jd_title{
                color: #fff;
            }
        }
    }
    .label_right{
        .label_right_img{
            margin: auto 0 auto auto;
            img{
                width: 7px;
                display: block;
            }
        }
    }
    .toLogisticsDetails{
        padding: 15px 10px;
        background-color: #fff;
        border-radius: 10px;
        margin: 0 12px;
        position: relative;
        top: -22px;
        .label_title{
            word-break: break-word;
            text-align: justify;
            white-space: nowrap;
            width: 95%;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .order_detailds_box{
        background-color: #fff;
        margin-bottom: 10px;
        .label_right{
            padding: 15px 12px;
        }
        .goods_box{
            background-color: #f2f2f2;
            padding: 10px 12px;
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
                .goods_title_box{
                    line-height: .8rem;
                    height: 1.6rem;
                    display: -webkit-box;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
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
        .sales_detaild_attr_box{
            padding: 15px 12px;
            .sales_detaild_attr_li{
                margin-bottom: 15px;
                .sales_detaild_attr_label{
                    min-width: 70px;
                    text-align: right;
                }
                .sales_detaild_attr_cont{
                    img{
                        display: block;
                        width: 62px;
                        height: 62px;
                        margin-right: 10px;
                    }
                }
            }
            .sales_detaild_attr_li:last-child{
                margin-bottom: 0;
            }

        }
    }
    .sales_details_btn_box{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        width: 100%;
        background-color: #fff;
        .sales_details_btn{
            margin: auto;
            margin-right: 0;
            justify-content: flex-end;
            .van-button{
                border-radius: 5px;
                height: 30px;
                margin: auto;
                margin-right: 10px;
                line-height: 1;
                color: #424242;
                border:1px solid #808080;
            }
        }

    }
</style>