<template>
    <div class="_appealDetails">
        <!-- 头部导航 -->
        <van-nav-bar
            title="申诉处理"
            class="after-info-bar"
            @click-left="goPreviousPage"
            @click-right="contactService"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
            <van-icon name="arrow-right" slot="right" class="icon-right-style fz_12">
                <img src="../../assets/img/dianhua.png" alt="">
                <span>招商专员</span>
            </van-icon>
        </van-nav-bar>

        <div>
            <div class="appeal-detailds-box">
                <div class="appeal-detailds-reason fz_14 dflex color_424242">
                    <div class="appeal-detailds-reason-label">申诉原因：</div>
                    <div class="appeal-detailds-reason-text ">{{reason}}</div>
                </div>
                <div class="appeal-detailds-reason fz_14 dflex color_424242">
                    <div class="dflex">
                        <div class="appeal-detailds-reason-label">服务单号：</div>
                        <div class="appeal-detailds-reason-text ">{{after_sn}}</div>
                    </div>
                    <div class="check-more dflex fz_12 color_808080" @click="checkMore">
                        <div class="check-more-label">更多信息</div>
                        <div class="check-more-img" :class="{'active':moreActive == 1}"><img src="../../assets/img/jiantou.png" alt=""></div>
                    </div>
                </div>

                <div v-show="moreActive == 0">
                    <div class="goods_details_box sale_box dflex">
                        <div class="appeal-details-ul">
                            <div class="appeal-details-li dflex" v-for="(listItem,listKey) in list" :key="listKey">
                                <div class="appeal-details-img"><img :src="listItem.goods_img" alt=""></div>
                                <div class="appeal-details-attr">
                                    <div class="goods_details_title fz_12 color_424242">{{listItem.goods_name}}</div>
                                    <div class="appeal-details-number-box fz_12 dflex">
                                        <div class="appeal-details-number color_808080">x{{listItem.goods_number}}</div>
                                        <div class="appeal-details-stepper">
                                            <van-stepper 
                                                v-model="listItem.goods_number" 
                                                @plus='plus(listItem.wId,list)'
                                                @blur='lose(listItem.goods_number,listItem.wId,list)'
                                                @minus='reduce(listItem.wId,list)' ref='stepper'
                                                :max="newList[listKey].goods_number" :min='0'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="after_price_box appeal-detailds-reason">
                        <div class="dflex after_price_li">
                            <div class="refund_status_label color_424242 fz_14">退款金额：</div>
                            <div class="yen fz_14 color_EE2D2D">&yen;&nbsp;</div>
                            <van-cell-group class="after_price_input color_EE2D2D">
                                <van-field v-model="price" placeholder="" @input="checkPrice" class=""/>
                            </van-cell-group>
                        </div>
                        <div class="dflex after_price_li">
                            <div class="refund_status_label color_424242 fz_14">审核备注：</div>
                            <van-cell-group class="after_price_input color_424242">
                                <van-field
                                    v-model="message"
                                    type="textarea"
                                    placeholder="选填"
                                    rows="1"
                                    maxlength="100"
                                    autosize
                                />
                            </van-cell-group>
                        </div>
                    </div>
                </div>
                <div class="more-item-bg" v-show="moreActive == 1" @click="checkMore"></div>
                <div class="more-item-box" v-show="moreActive == 1">
                    <div class="appeal-detaild-attr-box fz_14 color_808080">
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">订单号：</div>
                            <div class="appeal-detailds-text ">{{order_sn}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">申请时间：</div>
                            <div class="appeal-detailds-text ">{{add_time}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">售后状态：</div>
                            <div class="appeal-detailds-text ">{{type_zh}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">退款说明：</div>
                            <div class="appeal-detailds-text ">{{remark}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">退货人：</div>
                            <div class="appeal-detailds-text ">{{nick_name}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">联系方式：</div>
                            <div class="appeal-detailds-text color_EE2D2D">{{mobile}}</div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">退货地址：</div>
                            <div class="appeal-detailds-text ">{{address}} </div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">售后凭证：</div>
                            <div class="appeal-detailds-img dflex">
                                <img :src="imgItem" alt="" v-for="(imgItem,imgKey) in img" :key="imgKey" @click="changeSwiper(imgKey)">
                            </div>
                        </div>
                        <div class="sales-detaild-attr-li dflex ">
                            <div class="appeal-detailds-label">商家名称：</div>
                            <div class="appeal-detailds-text ">{{shop_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:50px;"></div>
            <div class="appeal-details-btn-box dflex">
                <div class="dflex appeal-details-btn">
                    <van-button class="cancel-btn" @click="cancel">申诉驳回</van-button>
                    <van-button class="pass-btn" @click="pass">申诉通过</van-button>
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
                nick_name:'',
                address:'',
                mobile:'',
                user_mobile:'',
                shop_mobile:'',
                after_status:'',

                list:[],
                img: [],
                //swiper 弹窗状态
                swiperShow:0,
                //swiper 弹窗图片选择状态
                imgActive:0,
                message:'',
                price:'',
                maxMoney:'',
                newList:[],
                moreActive:0,
                
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
                        this.maxNumber(res.data.goods);
                        
                        this.remark = res.data.remark;
                        this.add_time = res.data.add_time;
                        this.apply_remark = res.data.apply_remark;
                        this.order_sn = res.data.order_sn;
                        this.after_sn = res.data.after_sn;
                        this.type_zh = res.data.type_zh;
                        this.img     = res.data.img;
                        this.shop_name     = res.data.shop_name;
                        this.nick_name     = res.data.nick_name;
                        this.after_status     = res.data.after_status;
                        this.mobile     = res.data.mobile;//商家电话
                        this.user_mobile     = res.data.user_mobile;//推广电话
                        this.shop_mobile     = res.data.shop_mobile;//招商电话
                        this.reason     = res.data.reason;//招商电话
                        this.address     = res.data.order_address;//招商电话
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
                this.$router.go(-1);
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
            contactService() {
                let _this = this;
                window.location.href = 'tel:' + this.shop_mobile;
            },
            cancel(){
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=afterAdmin&a=applyHandle',{
                    after_sn: this.after_sn,
                    goods : this.list,
                    money : this.price,
                    apply_remark : this.message,
                    status : 13,
                    id:this.appealId,
                    type:this.appealType,
                }).then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            this.$router.push({
                                path:'appealDetails',
                                query:{
                                    id:this.after_sn
                                },
                            })
                            break;
                        default:
                            break;
                    }
                })
                /* Dialog.confirm({
                    
                }).then(() => {
                    
                }).catch(() => {
                    // on cancel
                }); */
            }, 
            pass(){
                this.$parent.$refs.loading.style.display = 'flex'

                this.$post('/?c=afterAdmin&a=applyHandle',{
                    after_sn: this.after_sn,
                    goods : this.list,
                    money : this.price,
                    remark : this.message,
                    status : 11,
                    id:this.appealId,
                    type:this.appealType,
                }).then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            this.$router.push({
                                path:'appealDetails',
                                query:{
                                    id:this.after_sn
                                },
                            })
                            break;
                        default:
                            break;
                    }
                })
                /* Dialog.confirm({
                    
                }).then(() => {
                    
                }).catch(() => {
                    // on cancel
                }); */
            },
            
            //进步器加减操作
            change(val, item, n) {
                let money = 0;
                for(let key in item){
                    let numb = 0
                    // let numb = (Number(val) + Number(n)) * 1;
                    if(val == item[key].wId){
                        numb = Number(item[key].goods_number) + Number(n)
                    }else{
                        numb = Number(item[key].goods_number)
                    }
                    money += numb * parseFloat(item[key].goods_price)
                }
                this.maxMoney = money;
                if(this.price > this.maxMoney){
                    this.price = this.maxMoney;
                }
            },
            //增加
            plus(val, item) {
                this.change(val, item, 1);
            },
            //减少
            reduce(val, item) {
                this.change(val, item, -1);
            },
            //键入
            lose(val, wId, item) {
                let money = 0;
                for(let key in item){
                    let numb = 0
                    // let numb = (Number(val) + Number(n)) * 1;
                    if(wId == item[key].wId){
                        numb = Number(val)
                    }else{
                        numb = Number(item[key].goods_number)
                    }
                
                    money += numb * parseFloat(item[key].goods_price)
                }
                this.maxMoney = money;
                if(this.price > this.maxMoney){
                    this.price = this.maxMoney;
                }
            },
            maxNumber(item){//拷贝list
                this.newList = [];
                this.maxMoney = 0;
                for(let key in item){
                    let newList = this.$appFunc.prototype.copy(item[key]);
                    this.newList.push(newList);
                    this.maxMoney += Number(this.list[key].goods_number) * parseFloat(this.list[key].goods_price);
                    this.price += Number(this.list[key].goods_number) * parseFloat(this.list[key].goods_price);
                }
            },
            checkPrice(){//输入检测价格是否超过最大价格
                if(this.price > this.maxMoney){
                    this.price = this.maxMoney;
                }
                if(this.price < 0){
                    this.price = 0;
                }
            },
            checkMore(){
                
                if(this.moreActive == 1){
                    this.moreActive = 0;
                }else{
                    this.moreActive = 1;
                }
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
    
    html,body{background-color: #f2f2f2;}
    .van-nav-bar .van-icon{color: #333;}
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #ccc;
    }
    ._appealDetails .van-hairline--top-bottom::after{
        border:none;
    }
    ._appealDetails .color_EE2D2D .van-field__control{
        color: #EE2D2D;
    }
    ._appealDetails .color_424242 .van-field__control{
        color: #424242;
    }
    ._appealDetails .color_808080 .van-field__control{
        color: #808080;
    }
    ._appealDetails .van-stepper::after{
        display: block;
        clear: both;
        content:' ';
    }
    ._appealDetails .van-stepper__input{
        color: #ccc;
        background-color: #fff;
        border:1px solid #ccc;
        float: left;
        margin: 0;
        display: block;
        border-width:1px 0px 1px 0px;
    }
    ._appealDetails .van-stepper__plus,._appealDetails .van-stepper__minus{
        color: #ccc;
        background-color: #fff;
        border:1px solid #ccc;
        width: 28px;
        height: 30px;
        float: left;
        margin: 0;
        display: block;
    }
    ._appealDetails .van-stepper__plus--disabled,._appealDetails .van-stepper__minus--disabled{
        color: #ccc;
        background-color: #f2f2f2;
        border:1px solid #ccc;
    }
</style>
<style lang="less" scoped>
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
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
        background-color: #fff;
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
            .appeal-detailds-reason-label{
                min-width: 75px;
            }
            .check-more{
                margin: auto;
                margin-right: 0;
                .check-more-label{
                    margin: auto;
                    margin-right: 5px;
                }
                .check-more-img{
                    width: 7px;
                    margin: auto 0;
                    transform: rotate(90deg);
                    img{
                        width: 100%;
                        display: block;
                    }
                }
                .check-more-img.active{
                    transform: rotate(-90deg);
                }
            }
        }
        .appeal-details-ul{
            width:100%;
            padding: 12px 12px;
            background-color: #f2f2f2;
            .appeal-details-li{
                width:100%;
                margin-bottom: 10px;
                .appeal-details-img{
                    flex:1;
                    margin-right: 10px;
                    max-width: 70px;
                    img{
                        display: block;
                        width: 70px;
                        height: 70px;
                        border-radius: 5px;
                        overflow: hidden;
                    }
                }
                .appeal-details-attr{
                    flex:1;
                    position: relative;
                    .appeal-details-number-box{
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        .appeal-details-number{
                            align-self: flex-end;
                            margin-right: auto;
                        }
                        .appeal-details-stepper{
                            margin-left: auto;
                        }
                    }
                }
            }
            .appeal-details-li:last-child{
                margin-bottom: 0;
            }
        }
        
        .after_price_li{
            margin-bottom: 10px;
            .refund_status_label{
                line-height: 24px;
            }
            .yen{
                line-height: 24px;
            }
            .after_price_input{
                border:none;
                flex: 1;   
                .van-cell{
                    border:none;
                    padding: 0;
                    
                }
            }
        }
        .after_price_li:last-child{
            margin-bottom: 0;
        }

        .more-item-bg{
            position: fixed;
            z-index: 5;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.3);
        }
        .more-item-box{
            position: relative;
            z-index: 6;
            background-color: #fff;
        }

        
        .appeal-detaild-attr-box{
            padding: 13px 12px;
            border-bottom: 1px solid #f2f2f2;
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