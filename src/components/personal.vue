<template>
    <div>
        <!-- 头像 -->
        <div class="titleBar">
            <van-row type="flex" justify="start">
                <div class="personal-head">
                    <div class="personal-img" @click="setHead">
                        <img src='' width="100%" v-if="head == ''">
                        <img :src='head' width="100%" v-else>
                    </div>
                    <div class="dflex">
                        <div class="personal-name">
                            <div>{{userName}}</div>
                            <div class="label">{{tag}}</div>
                        </div>
                    </div>
                </div>
                <div class="dflex join-btn">
                    <div class="">
                        <div class="personal-news dflex"  @click="upgradeUser" v-if="upgrade">
                            <div class="personal-news-img"><img src="../assets/img/xingjia.png" alt=""></div>
                            <span>成为星级买家</span>
                        </div>
                    </div>
                </div> 
            </van-row>
        </div>
        <!-- 收藏 -->
        <div class="bannerLocaltion dflex">
            <div class="bannerLocaltion-left-box">
                <div class="dflex">
                    <div class="follow-box" @click="collection">
                        <div class="fz_14 follow-info">
                            {{collectionInfo}}
                        </div>
                        <div class="fz_12 follow-title">收藏商品</div>
                    </div>
                    <div class="follow-box" @click="supplier">
                        <div class="fz_14 follow-info">
                            {{followInfo}}
                        </div>
                        <div class="fz_12 follow-title">关注商家</div>
                    </div>
                    <div class="follow-box" @click="toCoupon">
                        <div class="fz_14 follow-info">
                            {{couponInfo}}
                        </div>
                        <div class="fz_12 follow-title">优惠券</div>
                    </div>
                </div>
            </div>
            <div class="bannerLocaltion-right-box dflex">
                <div class="dflex fz_14 bannerLocaltion-right-label"  @click="businessBar()">
                    <div class="bannerLocaltion-right-img"><img src="../assets/img/shangjia1.png" alt=""></div>
                    <div class="bannerLocaltion-right-tit">{{businessTitle}}</div>
                </div>
            </div>
        </div>

        <div class="order-all-box">
            <!-- 我的订单 -->
            <div class="orderBar">
                <div class="orderTitle fz_14" @click="orderAll">
                    <div class="myOrder dflex">
                        <div class="color_424242">我的订单</div>
                        <div class="orderBar-all color_CCC fz_12 dflex">
                            <span>查看全部订单</span>
                            <img class="stop_right_img" src="../assets/img/jiantou.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="orderIcon dflex">
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="payment">
                            <a href="javascript:;">
                                <div class="order-van-img-box">
                                    <div class="order-van-img"><img src="../assets/img/daifukuan.png" alt=""></div>
                                    <van-icon v-show="!firstinfo||0?false:true" :info="firstinfo" class="iconinfo"/>
                                </div>
                                <span>待付款</span>
                            </a>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="mailing">
                            <a href="javascript:;">
                                <div class="order-van-img-box">
                                    <div class="order-van-img"><img src="../assets/img/daifahuo.png" alt=""></div>
                                    <van-icon v-show="!secondinfo||0?false:true" :info="secondinfo" class="iconinfo"/>
                                </div>
                                <span>待发货</span>
                            </a>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="receipt">
                            <a href="javascript:;">
                                <div class="order-van-img-box">
                                    <div class="order-van-img"><img src="../assets/img/daishouhuo.png" alt=""></div>
                                    <van-icon v-show="!threeinfo||0?false:true" :info="threeinfo" class="iconinfo"/>
                                </div>
                                <span>待收货</span>
                            </a>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="evaluate">
                            <a href="javascript:;" >
                                <div class="order-van-img-box">
                                    <div class="order-van-img"><img src="../assets/img/daipingjia.png" alt=""></div>
                                    <van-icon v-show="!fourinfo||0?false:true" :info="fourinfo" class="iconinfo"/>
                                </div>
                                <span>待评价</span>
                            </a>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="aftersale">
                            <a href="javascript:;" >
                                <div class="order-van-img-box">
                                    <div class="order-van-img"><img src="../assets/img/sh.png" alt=""></div>
                                    <van-icon v-show="!saleinfo||0?false:true" :info="saleinfo" class="iconinfo"/>
                                </div>
                                <span>退换/售后</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的服务 -->
            <div class="orderBar myService">
                <div class="orderTitle fz_14">
                    <div class="myOrder dflex">
                        <div class="color_424242">我的服务</div>
                    </div>
                </div>
                <div class="orderIcon dflex">
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="walletBar">
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/qianbao.png" alt=""></div>
                            </div>
                            <span>我的钱包</span>
                        </div>
                    </div>
                    <div class="orderIcon-li" v-if="promotion1 === 1">
                        <div class="order-van-icon" @click="promotion()">
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/tuiguang.png" alt=""></div>
                            </div>
                            <span>我要推广</span>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="invoiceInfo">
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/fapiao.png" alt=""></div>
                            </div>
                            <span>发票管理</span>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="receivingGoods">
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/dizhi.png" alt=""></div>
                            </div>
                            <span>地址管理</span>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="phoneCall()">
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/kefu2.png" alt=""></div>
                            </div>
                            <span>联系客服</span>
                        </div>
                    </div>
                    <div class="orderIcon-li">
                        <div class="order-van-icon" @click="toHelp()">
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/bangzhu.png" alt=""></div>
                            </div>
                            <span>帮助中心</span>
                        </div>
                    </div>
                    <div class="orderIcon-li" @click="gofeedback">
                        <div class="order-van-icon" >
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/yijianfankui.png" alt=""></div>
                            </div>
                            <span>意见反馈</span>
                        </div>
                    </div>
                    <div class="orderIcon-li" @click="goSetFocus">
                        <div class="order-van-icon" >
                            <div class="order-van-img-box">
                                <div class="order-van-img"><img src="../assets/img/set.png" alt=""></div>
                            </div>
                            <span>账号设置</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="quit" @click="quitOut" v-if="show == 0">
            退出系统
        </div>
        
        <div style="height:50px;"></div>



        <van-dialog class="personal-dialog"
            v-model="dialogShow"
            confirmButtonText='取消'
            :before-close="beforeClose"
            >
            <van-row class="dialog-box">
                <van-col span='12'>
                    <div @click="getPhone" class="getPhone">
                        <img src="../assets/img/dianhua.png" alt="">
                        <span>致电平台</span>
                    </div>
                </van-col>
                <van-col span='12'>
                    <div @click="contactService" class="contactService">
                        <img src="../assets/img/kefu1-1.png" alt="">
                        <span>联系客服</span>
                    </div>
                </van-col>
            </van-row>
        </van-dialog>

        <congratulations v-if="showCongratulations" @close="closeCongratulations" :type="congratulationsType" :info="congratulationsInfo"></congratulations>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {post, is_wexin} from '../assets/js/commonAPI.js'
    import {Dialog} from 'vant';
    
    import '../assets/css/commonstyle.css'
    import '../assets/orderfont/iconfont.css'
    import '../assets/daifukuan/iconfont.css'
    
    import head from '../assets/img/get_avatar.png'
    import personalBG from '../assets/img/uer_header_bg.png'

    import congratulations from './component/congratulations.vue'

    Vue.use(Dialog);
    Vue.prototype.$post = post;
    export default {
        name: 'personal',
        components:{
            congratulations,
        },
        data() {
            return {
                userName: '',
                head:'',
                tag: '',
                personalBG: personalBG,
                shop_url:'',
                show: 0,
                dialogShow: false,
                email: '',
                hx_pwd: '',
                hx_username: '',
                mobile_phone: '',
                configId: '',
                userInfo: '',
                upgrade: false,
                firstinfo:'',       //第一个的图标
                secondinfo:'',      //第二个的图标
                threeinfo:'',       //第三个图标
                fourinfo:'',        //第四个图标
                saleinfo:'',        //第五个图标

                collectionInfo:"0", //获取收藏商品
                followInfo:"0",     //关注商家数
                couponInfo:"0",     //关注商家数
                businessTitle:'成为供应商',

                showCongratulations : false,
                congratulationsType: -1,
                congratulationsInfo:"",

                promotion1: 0,  //我要推广活动是否开启 0-关闭 1-开启
            }
        },
        created() {
            let _this = this;
            this.$emit('toPage',{index:4,path:'/personal'})
            if (is_wexin()) {
                this.show = 1;
            }
            window.easemobim = window.easemobim || {};
            this.$post('/?c=user&a=info',).then(res => {
                switch (res.code) {
                    case 0:

                        sessionStorage.setItem('userInfo',JSON.stringify(res.data));

                        this.userInfo = res.data;
                        this.tag = res.data.tag;
                        this.userName = res.data.name;
                        this.upgrade = res.data.upgrade === 1;

                        this.promotion1 = res.data.promotion || 0;
                        
                        this.shop_url = res.data.shop_url;
                        if(res.data.head){
                           this.head = res.data.head;
                        }else{
                            this.head = head;
                        }
                        easemobim.config = {
                            user: {
                                username: _this.userInfo.hx_username,
                                password: _this.userInfo.hx_pwd,
                            },
                            // 访客信息（可选）
                            visitor: {
                                phone: _this.userInfo.mobile_phone,
                                userNickname: _this.userInfo.name,
                                email: _this.userInfo.email,
                            },
                            onready: function () {
                                easemobim.sendExt({
                                    ext: {
                                        "type": "custom",
                                        "msgtype": {
                                            "order": {
                                                "title": "建议投诉",
                                            }
                                        }
                                    }
                                });
                            },
                        };
                        break;
                    default:
                        break;
                }
            });
            this.$post('/?c=user&a=getHx',).then((res) => {
                this.configId = res.data;
            })
            // 获取默认的数字提示
            this.$post('/?c=order&a=getOrderCount',).then((res) => {
                 if(res.code == 0){
                     this.firstinfo=Number(res.data[0]);
                    this.secondinfo=Number(res.data[1]);
                    this.threeinfo=Number(res.data[2]);
                    this.fourinfo=Number(res.data[3]);
                    this.saleinfo=Number(res.data[4]);
                 }
            })
            // 获取关注商家数字提示
            this.$post('/?c=user&a=SupplierNum',).then((res) => {
                 if(res.code == 0){
                    this.followInfo=Number(res.data);
                 }
            })
            // 获取收藏商品数字提示
            this.$post('/?c=user&a=collectNum',).then((res) => {
                 if(res.code == 0){
                    this.collectionInfo=Number(res.data);
                 }
            })

            this.$post('/?c=user&a=couponNum',).then((res) => {
                 if(res.code == 0){
                    this.couponInfo=Number(res.data);
                 }
            })
            // 判断用户能否领取平台优惠券
            let is_coupon = localStorage.getItem('is_coupon');
            if(!is_coupon){
                this.$post('/?c=wholesaleCoupon&a=receiveAdmin',).then((res) => {
                    if(res.code == 0){
                        if(res.data.length>0 || res.data){
                            this.showCongratulations = true;
                            this.congratulationsType = 1;
                            this.congratulationsInfo = res.data;
                            this.$post('/?c=wholesaleCoupon&a=receive',{
                                full_id:res.data.full_id
                            }).then((e) => {
                                if(e.code == 0){
                                    localStorage.setItem('is_coupon',true)
                                }
                            })
                        }else if(this.$route.query.type == 1){
                            this.showCongratulations = true;
                            this.congratulationsType = 0;
                        }
                    }else if(res.code == 1){
                        // this.$toast(res.msg);
                    }
                })
            }
            let seller = localStorage.getItem('isSeller')
            if(seller>=3 && seller <= 5){
                this.businessTitle = '我的店铺';
            }else{
                this.businessTitle = '成为供应商';
            }
        },
        methods: {
            //成为供应商
            businessBar() {
                // 判断跳转页面
                //0未提交基础资料 1基础资料审核中 2已审核基础资料，oa正常 3已审核基础资料，oa异常 4已确认条款，待审核 5已是商家 6拒绝入驻申请
                    
                this.$post('/?c=user&a=favorable',)
                .then((res) => {
                    if(res.code==0){
                        if(res.data==0){
                            this.$router.push({
                                path: '/merchants'
                            })
                        }else if(res.data==1){
                            this.$router.push({
                                path: '/contractsec'
                            })
                        }else if(res.data==2){
                            this.$router.push({
                                path: '/check'
                            })
                        }else if(res.data==3){
                            /* 去到我的店铺 seller.html */
                            if(is_wexin()){
                                /* 去到我的店铺 seller.html */
                                if(this.shop_url != ''){
                                    window.location.href = this.shop_url;
                                }
                            }else{
                                this.$toast('请在微信浏览器打开');
                            }
                        }else if(res.data==4){// 预生产没有生效
                            if(is_wexin()){
                                if(this.shop_url != ''){
                                    window.location.href = this.shop_url;
                                }
                            }else{
                                this.$toast('请在微信浏览器打开');
                            }
                        }else if(res.data==5){
                            if(is_wexin()){
                                /* 去到我的店铺 seller.html */
                                if(this.shop_url != ''){
                                    window.location.href = this.shop_url;
                                }
                            }else{
                                this.$toast('请在微信浏览器打开');
                            }
                        }else if(res.data==6){
                            this.$router.push({
                                path: '/contractdefeated'
                            })
                            localStorage.setItem('defeatedMsg',res.msg);
                        }
                    }else if(res.code == 1){
                        this.$toast(res.msg);
                    }
                })
                
                
            },
            //设置客服联系方式
            phoneCall() {
                this.dialogShow = true;
            },
            getPhone() {
                window.location.href='tel:4001288566';
                this.dialogShow = false;
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    done();
                } else {
                    done();
                }
            },
            walletBar() {
                this.$router.push({
                    path: '/wallet'
                })
            },
            goSetFocus(){
                this.$router.push({
                    path: '/setFocus'
                })
            },
            collection(){
                this.$router.push({
                    path:'/uselist'
                });
            },
            contactService() {
                let _this = this;
                this.dialogShow = false;
                easemobim.bind({configId: _this.configId});
            },
            //退出登录
            quitOut() {
                this.$post('/?c=user&a=logout', {})
                .then((res) => {
                    switch (res.code) {
                        case 0:
                            this.$toast('退出成功!');
                            this.$router.push({
                                path: '/login'
                            });
                            break;
                        
                        default:
                            break;
                    }
                })
            },
            promotion() {
                this.$router.push({
                    path: '/extendAgreement'
                })
            },
            //关注的供应商
            supplier() {
                this.$router.push({
                    path: '/supplier'
                })
            },
            //####=>评价
            // comment() {
            //     this.$router.push({
            //        name:'/comment'
            //     });
            // },
            //####=>收货地址管理
            receivingGoods() {
                this.$router.push({
                    path: '/receivingGoods',
                    query: {
                        index: '1'
                    }
                });
            },
            //####=>发票信息管理
            invoiceInfo() {
                this.$router.push({
                    path: '/invoiceInfo',
                    query: {
                        index: '1'
                    }
                });
            },
            //待付款
            payment() {
                this.$router.push({
                    path: '/comment',
                    query: {
                        id: 1
                    }
                })
            },
            //待发货
            mailing() {
                this.$router.push({
                    path: '/comment',
                    query: {
                        id: 2
                    }
                })
            },
            //待收货
            receipt() {
                this.$router.push({
                    path: '/comment',
                    query: {
                        id: 3
                    }
                })
            },
            //待评价
            evaluate() {
                this.$router.push({
                    path: '/evaluate',
                    
                })
            },
            //售后
            aftersale() {
                this.$router.push({
                    path: '/salesLists',
                    query: {
                        active: 0
                    }
                })
            },
            //订单全部
            orderAll() {
                this.$router.push({
                    path: '/comment',
                    query: {
                        id: 0
                    }
                })
            },
            //修改头像
            setHead() {
                this.$router.push({
                    path: '/SetUserImge'
                })
            },
            
            //升级为采购商
            upgradeUser(){
                this.$router.push({
                    path: '/wechatToUpdate'
                })
            },
            // 跳转意见反馈
            gofeedback(){
                this.$router.push({
                    path: '/feedBack'
                })
            },
            // 跳转意见反馈
            toHelp(){
                this.$router.push({
                    path: '/help'
                })
            },
            toCoupon(){
                this.$router.push({
                    path: '/coupon'
                })
            },
            closeCongratulations(){
                this.$router.push({
                    query:{
                        type:0
                    }
                })
                this.showCongratulations = false
            }
        }
    } 
</script>

<style lang="less">
    .personal-dialog .van-dialog__footer{
        .van-button{
            background-color: #f2f2f2;
            font-size: 14px;
            color: #999;
        }
    }
</style>
<style scoped lang="less">
    .van-info{
        background-color: #fff;
        color: #ee2d2d;
        border-color:#ee2d2d;
    }
    .van-dialog{
        border-radius: 10px;
    }
    .dialog-box{
        height: 3rem;
        line-height: 3rem;
        font-size: 20px;
        padding: 0;
        text-align: center;
        .getPhone{
            display: flex;
            font-size: 16px;
            color: #424242;
            img{
                margin: auto;
                display: block;
                height: 22px;
                margin-right: 0;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
        .contactService{
            display: flex;
            font-size: 16px;
            color: #424242;
            img{
                margin: auto;
                display: block;
                height: 22px;
                margin-right: 0;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
    }
/* titleBar */
    .titleBar {
        min-height: 4rem;
        position: relative;
        padding-top: 2rem;
        padding-bottom: 2rem;
        background-image:url(../assets/img/bg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .personal-news {
        position: absolute;
        right: 0;
        top: 3rem;
        color: #424242;
        font-size: 14px;
        padding: .4rem .8rem;
        border-radius: 1.5rem 0 0 1.5rem;
        background-color: #fff;
    }
    .personal-head {
        color: #fff;
        display: flex;
        flex-wrap: nowrap;
        margin: auto;
        padding: 0;
        margin-left: 12px;
    }
    .personal-img {
        min-width: 3.57rem;
        max-width: 3.57rem;
        height: 3.57rem;
        display: inline-block;
        line-height: 2rem;
        text-align: center;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #fff;
    }
    .personal-img img {
        height: 100%;
        width: 100%;
        display: block;
    }
    .personal-name {
        padding-left: 0;
        margin: auto;
    }
    .personal-name > div{
        padding-left: 10px;
        font-size: 14px;
    }
    .personal-name > div:last-child{
        margin-top: 15px;
        font-size: 12px;
    }
    .join-btn{
        margin: auto;
        margin-right: 0;
        >div{
            top: -18px;
            position: relative;
        }
    }
    
    .stop_right_img{
        width: 7px;
        height: 12px;
        margin: auto;
        margin-left: 5px;
    }
    .join-btn .personal-news{
        position: unset;
        font-size: 12px;
        padding: 0.3rem 0.4rem;
        margin-bottom: 5px;
    }
    .join-btn .personal-news:last-child{
        margin-bottom: 0;
    }
    .join-btn .personal-news .personal-news-img{
        min-width: 22px;
        margin-right: 5px;
    }
    .join-btn .personal-news .personal-news-img img{
        display: block;
        height: 18px;
        margin: auto;
    }
/* bannerLocaltion */
    .bannerLocaltion{
        position: relative;
        top: -1.4rem;
        min-height: 2.8rem;
        margin: 0 12px;
        justify-content: space-between;
        .bannerLocaltion-left-box{
            background: #fff;
            border-radius: 10px;
            flex: .66;
            margin-right: 10px;
            justify-content: space-between;
            >div{height: 100%;}
            .follow-box{
                margin: auto;
                text-align: center;
                .follow-info{
                    margin-bottom: 10px;
                    line-height: 14px;
                }
                .follow-title{
                    line-height: 12px;
                }
            }
        }
        .bannerLocaltion-right-box{
            background: #fff;
            border-radius: 10px;
            justify-content: space-between;
            flex: .34;
            .bannerLocaltion-right-label{
                height: 100%;
                margin: auto;
                .bannerLocaltion-right-img{
                    margin: auto 0;
                    width: 25px;
                    margin-right: 5px;
                }
                .bannerLocaltion-right-tit{
                    margin: auto 0;
                    line-height: 14px;
                }
            }
        }
        img{display: block;width: 100%;}
    }
    .order-all-box{
        position: relative;
        top: -.71rem
    }
/* orderBar */
    .orderBar {
        background-color: #fff;
        margin: 0 12px;
        border-radius: 12px;
        margin-bottom: 10px;
        .orderTitle {
            padding: .8rem .533rem;
            line-height: 14px;
            border-bottom: 1px solid #eee;
            .myOrder {
                color: #777;
                justify-content: space-between;
                .orderBar-all {
                    color: #777;
                    span{
                        display: block;
                        margin: auto;
                        margin-right: 10px;
                    }
                    img{
                        display: block;
                        margin: auto;
                    }
                }
            }
        }
        
        .orderIcon {
            border-bottom: 1px solid #eee;
            .orderIcon-li{
                flex: 1;
            }
            .order-van-icon {
                padding: .8rem 0;
                img{
                    height: 22px;
                    display: block;
                    margin: 0 auto 5px;
                }
                span {
                    display: block;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                    i {
                        font-size: 26px;
                    }
                }
            }
        }
    }
/* myService */
    .myService{
        .orderIcon{
            flex-wrap: wrap;
            justify-content: flex-start;
            .orderIcon-li{
                min-width: 25%;
                flex:0.25;
            }
        }
        
    }
/* 退出系统 */
    .quit {
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 14px;
        background-color: #EE2D2D;
        text-align: center;
        margin: 10px 22px;
        border-radius: 5px;
    }
/* 小图标 */
    .iconfont{
        position: relative;
    }
    .iconfont .iconinfo{
        position:absolute;
        top:0;
        right:0;
    }

    .order-van-img-box{
        position: relative;
    }
    .order-van-img-box .van-icon{
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        margin: auto;
        height: 100%;
        width: 20px;
    }
</style>
