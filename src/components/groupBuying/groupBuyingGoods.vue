<template>
    <div>
        <div v-if="show">
            <!-- 标题 -->
            <navbar type="left" title="商品详情" @clickleft="goPreviousPage"></navbar>
            
            <!-- 商品标题展示部分 -->
            <div class="top">
                <van-swipe :autoplay="6000" :height="innerHtmlWidth" @change="bannerOnChange" :show-indicators="false">
                    <van-swipe-item v-for="(image, index) in goodsBanner" :key="index">
                        <img width="100%" height="100%" v-lazy="image.img_url" />
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        {{ current + 1 }}/{{goodsBanner.length}}
                    </div>
                </van-swipe>
                <!-- 文字部分 -->
                <div class="top-box">
                    <h2>{{goodsInfo.goods_name}}</h2>
                    <!-- 商品描述 -->
                    <p class="top-describe">{{activityInfo.remark}}</p>
                    <!-- 价格与截止时间 -->
                    <div class="top-price">
                        <div class="top-price-left"><span><small>￥</small>{{activityInfo.unit_price}}</span>/{{activityInfo.measure_unit}}</div>
                        <div>截止时间：{{activityInfo.end_time.slice(0,10)}}</div>
                    </div>
                    <!-- 进度条部分 -->
                    <div class="top-process">
                        <div class="top-process-left">
                            <t-progress :totalNum="Number(activityInfo.total_number)" :curNum="Number(activityInfo.buy_number)" :unit="goodsInfo.unit"></t-progress>
                        </div>
                        <div class="topprocess-right">{{activityInfo.buyCount}}人</div>
                    </div>
                    <!-- 标签部分 -->
                    <div class="top-tags">
                        实力保障：<span class="red">团购</span>
                        <span v-for="(item, index) in goodsInfo.tag" :key="index">{{item}}</span>
                    </div>
                </div>
            </div>

            <!-- 商品规格 -->
            <div class="spec">
                <div class="spec-left">商品规格</div>
                <div class="spec-con">
                    <p>{{specName}}</p>
                    <p><span>￥{{activityInfo.price}}</span>/{{activityInfo.unit}}</p>
                </div>
            </div>
        
            <!-- 进入店铺部分 -->
            <div class="store">
                <div class="store-one">
                    <div class="store-tu">
                        <img v-if="shopLogo == '/images/no_picture.gif' || shopLogo == ''" src="../../assets/img/merchant_default.jpg"/>
                        <img v-else :src="shopLogo"/>
                    </div>
                    <div class="store-title">
                        <h1>{{shopName}}</h1>
                        <!-- 评分 -->
                        <t-rate :rate="starValue"></t-rate>
                    </div>
                    <div class="store-btn" @click="goShop">进入店铺</div>
                </div>
                <div class="store-bot">
                    <div>货物描述<span> {{description}}</span></div>
                    <div>商家服务<span> {{service}}</span></div>
                    <div>物流服务<span> {{shipping}}</span></div>
                </div>
            </div>

            <!-- 商品详情介绍部分 -->
            <div class="zon">
                <div v-if='attrInfo.length > 0' class="zon-item">
                    <div class="zon-title"><span>商品属性</span></div>
                    <table>
                        <tr v-for="(cutItem,cutIndex) in attrInfo" :key="cutIndex">
                            <td>{{cutItem.attr_name}}</td>
                            <td>{{cutItem.attr_value}}</td>
                        </tr>
                    </table>
                </div>
                <div class="zon-item">
                    <div class="zon-title"><span>商品详情页</span></div>
                    <div v-if='getcutImg && getcutImg != ""' class="zon-content">
                        <p v-if="getcutImg.word_one != ''">{{getcutImg.word_one}}</p>
                        <img v-if="getcutImg.img_one != ''" :src="getcutImg.img_one">
                        <p v-if="getcutImg.word_two != ''">{{getcutImg.word_two}}</p>
                        <div v-if="getcutImg.img_two != ''">
                            <img v-for="(gImgTwoItem,gImgTwoKey) in getcutImg.img_two" :key="gImgTwoKey" :src="gImgTwoItem">
                        </div>
                        <!-- <p>吃了真会上瘾，一个绝对不够，区别普通超市西红柿，皮薄，沙瓤，没有硬心，可以直接吃，普罗旺斯就是纯粹的水果西红柿</p>
                            <img src="http://pic22.nipic.com/20120629/9363864_163739336188_2.jpg" alt="">
                            <p>吃了真会上瘾，一个绝对不够，区别普通超市西红柿，皮薄，沙瓤，没有硬心，可以直接吃，普罗旺斯就是纯粹的水果西红柿</p>
                            <img src="http://pic22.nipic.com/20120629/9363864_163739336188_2.jpg" alt=""> -->   
                    </div>
                    <div v-else class="zon-content zon-content-none">
                        <img src="../../assets/img/none/commodity_details.png">
                        <p>没有商品详情哟</p>
                    </div>
                </div>
                <div v-if="buyerTips != ''" class="zon-item">
                    <div class="zon-title"><span>买家须知</span></div>
                    <div class="zon-content">
                        <img :src="buyerTips">
                    </div>
                </div>
            </div>

            <!-- 防止最底部内容被遮挡 -->
            <div style="height: 60px"></div>
            <!-- 底部加入购物车部分 -->
            <div class="footer">
				<div class="footer-img" @click="getPhone">
					<img src="../../assets/img/shopkefu.png" alt="">
					<p>客服</p>
				</div>
				<div class="footer-img" @click="changeCollect">
					<img v-if="isCollect" src="../../assets/img/souchang1.png" alt="">
					<img v-else src="../../assets/img/soucang.png" alt="">
					<p>收藏</p>
				</div>
                <div class="footer-btn" @click="toOrder">加入团购</div>
            </div>
        </div>
        <div v-else class="vantLoading">
            <vant-loading :vertical="false" text="努力加载中..."></vant-loading>
        </div>
    </div>
</template>

<script>
import {wxStart, wxShare} from '../../assets/js/wxjs.js';
import {is_wexin} from '../../assets/js/commonAPI.js';
//可见屏幕宽度
const innerHtmlWidth = document.documentElement.clientWidth;
export default{
    components:{
        navbar:() => import('../navbar/nav.vue'),
        tProgress:() => import('../component/tProgress/tProgress.vue'), //进度条
        tRate:() =>import('../component/tRate/tRate.vue'),  //五星评分
        vantLoading: () => import('../vantLoading.vue'),  //加载中样式
    },
    data(){
        return{
            //是否显示内容 false-不显示 true-显示 。先判断商品是否为活动商品，是，则显示内容，不是，则跳转到普通商品详情页
            show: false,
            //可见屏幕宽度
            innerHtmlWidth: innerHtmlWidth,
            //轮播图目前索引
            current: 0,
            //轮播图
			goodsBanner: [],
            //是否被收藏
            isCollect: false,
            //使用id
            user_id: '',
            shopName: '',               //店铺名称
            region: 0,
            goods_id: '',                     //商品id
            //批发id 字段 wId
            wId: '',

            //团购活动专用相关信息
            activityInfo: {},
            //买家须知
            buyerTips:"",
            //商品信息
            goodsInfo: {},

            //货品描述
            description: '',
            //商家服务
            service: '',
            //物流服务
            shipping: '',
            //店铺LOGO
            shopLogo: '',
            //店铺星评
            starValue: 0,

            //商品详情
            getcutImg: {},
            //商品属性
            attrInfo: [],
            //规则名称
            specName: '',

            //商家id
            seller_id: ''
        }
    },
    created(){
        this.wId = this.$route.query.goods;
        this.region = localStorage.getItem('wapres');
        this.isActivityGoods()
    },
    methods:{
        //####=>返回上一页
        goPreviousPage(){
            if(this.fromHerf == null){
                this.$router.push({
                    path:'/index'
                });
            }else{
                this.$router.go(-1);
            }
        },
        //查询是否为活动商品
        isActivityGoods(){
            this.$post('/?c=groupBuying&a=isActivityGoods', {
                wId: this.wId
            })
            .then((res) => {
                switch (res.code) {
                    case 0:
                    console.log(res.data)
                        if(res.data.isActivity == 1) {
                            this.show = true;
                            this.activityInfo = res.data.info;
                            //是活动商品，则取商品相关信息
                            this.initData();
                            // this.fenxiang()
                        }else {
                            //不是，则跳转到普通商品详情页
                        	this.$router.replace({
                                path: "/goods",
                                query: {
				                    goods: this.wId,
                                }
                            });
                        }
                        break;
                    default:
                        this.$toast(res.msg);
                        break;
                }
            });
        },
        //其他初始数据
        initData(){
            this.$post('/?c=goods&a=detail', {
                id: this.wId
            }).then((res) => {
                console.log('/?c=goods&a=detail===',res.data)
                switch (res.code) {
                    case 0:
                        this.goodsInfo = res.data;
                        this.goodsBanner = res.data.goods_banner;
                        this.goods_id = res.data.goods_id;

                        this.user_id = res.data.user_id;
                        
                        //店铺信息
                        this.$post('/?c=merchant&a=shopInfo', {
                            seller_id: this.user_id
                        }).then((res) => {
                            switch (res.code) {
                                case 0:
                                    this.shopName = res.data.name;
                                    this.shopLogo = res.data.logo_thumb;

                                    this.description = res.data.rate.description.value;
                                    this.service = res.data.rate.service.value;
                                    this.shipping = res.data.rate.shipping.value;
                                    this.seller_id = res.data.seller_id;
                                    
                                    this.starValue = Number(res.data.rate.score.value);
                                    break;
                                default:
                                    break;
                            }
                        });
                        
                        // 获取商品详情的请求
                        this.$post('/?c=goods&a=info2',{
                            //接口传值
                            id: this.wId
                        }).then((res)=> {
                            this.getcutImg = res.data
                        });
                        
                        //获取规格数据
                        this.$post('/?c=goods&a=spec', {
                            id: this.goods_id
                        })
                        .then((res) => {
                            this.specName = res.data.spe.a0.values[0].label;
                        })
                        
                        //商品属性
                        this.$post('/?c=goods&a=attr', {
                            id: this.goods_id
                        })
                        .then((res) => {
                            if(this.$appFunc.prototype.isEmptyObject(res.data)){
                                
                            }else{
                                this.attrInfo = res.data.attr;
                            }
                        })

                        this.fenxiang();
                        break;
                    default:
                        break;
                }
            });  


            //买家须知
            this.$post('/?a=userKnown',{}).then(res => {
                switch(res.code){
                    case 0:
                        this.buyerTips = res.data
                        break;
                }
            });
        },
        //需要传递到订单页的数据
        dealData(){
            //商品, 相关判断
            localStorage.setItem('goods_about_status', JSON.stringify({
                activity_id: this.activityInfo.activity_id,
                minimumNumber: this.activityInfo.minimum_number,
                value: 1,
                goods_name: this.goodsInfo.goods_name,
                goods_attr: this.specName,
                price: this.activityInfo.price,
                sellerIds: this.seller_id,
                shop_name: this.shopName,
                goods_thumb: this.goodsBanner[0].thumb_url,
            }));
            this.$router.push({
                path: '/GrouyBuyingConfirmAnOrder'
            });
        },
        //分享相关数据设置
        fenxiang(){
            if(is_wexin()){
                let img_url = "";
                if(this.goodsBanner[0].img_url == ""){
                     img_url = window.location.origin + "/mobile/images/wxDefault.png";
                }else{
                    img_url = this.goodsBanner[0].img_url;
                }
                //微信分享
                let datas = {
                    urls : window.location.origin+"/mobile/?c=response&a=share&goods=" + this.wId,
                    imgurls : this.goodsBanner[0].img_url,
                    title : "【农联贡菜】"+this.goodsInfo.goods_name,
                    desc : "¥" + this.goodsInfo.goods_price + "/" +this.goodsInfo.goods_unit,
                }
                wxStart(()=>{
                    wxShare(datas)
                })
            }
        },
        //收藏状态切换
        changeCollect(){
            let coll = !this.isCollect;

            if(coll) {
                //收藏
                this.$post("/?c=goods&a=addCollect", {
                // 接口传值
                wholesale_id:this.wId
                }).then(res => {
                    if (res.code == 0) {
                        this.isCollect = coll;
                        this.$toast("收藏成功");
                    }
                });
            }else {
                //取消收藏
                this.$post("/?c=goods&a=delCollect", {
                    // 接口传值
                    wholesale_id: this.wId
                }).then(res => {
                    if (res.code == 0) {
                        this.isCollect = coll;
                        this.$toast("取消收藏");
                    }
                });             
            }
        },
        //轮播图切换
        bannerOnChange(index){
            this.current = index;
        },
        // 获取电话
        getPhone() {
            //平台客服电话
            window.location.href='tel:4001288566';
            /*this.$post('/?c=merchant&a=call', {
                seller_id: this.user_id
            })
            .then((res) => {
                switch (res.code) {
                    case 0:
                        window.location.href = 'tel:' + res.data.phone;
                        break;
                    default:
                        this.$toast(res.msg);
                        break;
                }
            });
            this.dialogShow = false;*/
        },
        //加入团购，进入订单页
        toOrder(){
            this.dealData()
            return
        },
        //进入店铺
        goShop() {
            localStorage.setItem('merchantsLogo', '');
            this.$router.push({
                path: '/shop',
                query: {
                    businessHeadTitle: this.shopName,
                    index: this.user_id,
                    region: this.region
                }
            })
        }
    },
    beforeDestory(){
        let data = {
            urls : window.location.origin,
            imgurls : "",
            title : "农联贡菜",
            desc : "",
        }
        wxShare(data)
    }
}
</script>

<style scoped>
    /*轮播*/
    .top .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
    }
    /*头部商品标题部分*/
    .top-box {
        background-color: #ffffff;
        padding: 15px 10px 12px;
    }
    .top-box h2 {
        font-size: 16px;
        line-height: 1.5em;
        color: #212121;
        font-weight: normal;
        margin: 0;
        padding: 0;     
    }
    .top-describe {
        font-size: 12px;
        color: #808080;
        margin: 0;
    }
    .top-price {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between; 
        font-size: 12px;    
    }
    .top-price .top-price-left {
        color: #808080;
    }
    .top-price .top-price-left span {
        color: #ee2d2d;
        font-size: 16px;
    }

    /*进度条*/
    .top-process {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;  
        padding: 12px 0;    
    }
    .top-process div.top-process-left {
        -webkit-box-flex: 3;
        -ms-flex: 3;
        flex: 3;
    }   
    .top-process .topprocess-right {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 12px;
        text-align: right;
        color: #808080;
    }

    /*实力保障*/
    .top-tags {
        font-size: 12px;
        color: #424242;
    }
    .top-tags span {
        display: inline-block;
        height: 16px;
        text-align: center;
        line-height: 15px;
        font-size: 12px;
        color: #808080;
        background-color: #f2f2f2;
        padding: 2px 6px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
    .top-tags span.red {
        color: #ffffff;
        background-color: #ee2d2d;
    }

    /*商品规格*/
    .spec {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;  
        background-color: #ffffff;  
        padding: 15px 12px;
        margin-top: 10px;
    }
    .spec-left {
        width: 32px;
        font-size: 14px;
        color: #424242;
        padding-right: 15px;
        padding-top: 4px;
    }
    .spec-con {
        padding: 8px 12px;
        background-color: #f2f2f2;
        border-radius: 5px;
    }
    .spec-con p {
        margin: 0;
        font-size: 14px;
    }
    .spec-con p span {
        color: #ee2d2d;
    }

    /*店铺信息部分*/
    .store {
        background-color: #ffffff;  
        padding: 15px 12px;
        margin-top: 10px;       
    }
    .store-one {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;    
    }
    .store-one .store-tu {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;    
        width: 100%;
        height: 0;
        padding-bottom: 20%;
        border-radius: 10px;
        overflow: hidden;
        position: relative; 
    }
    .store-one .store-tu img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .store-one .store-title {
        -webkit-box-flex: 3;
        -ms-flex: 3;
        flex: 3;
        padding: 0 10px;
    }
    .store-one .store-title h1 {
        margin: 0;
        font-size: 14px;
        color: #424242;
        font-weight: normal;
        padding-bottom: 5px;
    }
    .store-one .store-btn {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 14px;
        color: #ee2d2d;
        border: 1px solid #ee2d2d;
        border-radius: 5px;
        text-align: center;
        padding: 2px 4px;
    }
    .store-bot {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;      
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-top: 8px;
    }
    .store-bot div {
        font-size: 12px;
        color: #808080;
    }
    .store-bot div span {
        color: #ee2d2d;
    }

    /*商品详情介绍部分*/
    .zon {
        background-color: #ffffff;
        margin-top: 10px;
    }
    .zon-item {
        padding: 22px 12px 10px;
        position: relative;
    }
    .zon-title {
        padding-bottom: 15px;
    }
    .zon-title span {
        font-size: 16px;
        color: #ffffff;
        background: url('../../assets/img/button-bg.png') repeat left top;
        background-size: auto 100%;
        padding: 2px 9px;
    }
    .zon-item table {
        width: 100%;    
        color: #424242;
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 12px;
    }
    .zon-item table td {
        height: 40px;
        text-align: center;
        border: 1px solid #d8d8d8;
    }
    .zon-item table tr td:first-child {
        width: 100px;
        color: #808080;
    }
    .zon-item .zon-content img {
        max-width: 100%;
    }
    .zon-content-none {
        text-align: center;
    }
    .zon-content-none img{
        display: block;
        width: 50%;
        margin: auto;
    }
    .zon-content-none p{
        color: #808080;
        font-size: 14px;
    }

    /*页面底部加入购物车部分*/
    .footer {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #ffffff;
        text-align: center;
		border-top: 1px solid #dadada;
        display: -webkit-box;
        display: -ms-flexbox;
		display: flex;
    }
	.footer .footer-img {
	-webkit-box-flex: 1;
	    -ms-flex: 1;
		flex: 1;
		width: 25%;
        font-size: 12px;
	    -webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 9px 0 5px;
    }
	.footer .footer-img p {
        color: #666666;
        margin: -2px 0 0; 
    }
	.footer .footer-img img {
        height: 17px;
    }
	.footer .footer-img:first-child p,
	.footer .footer-img:first-child img {
		padding-left: 15px;
	}
	.footer .footer-img:nth-child(2) p,
	.footer .footer-img:nth-child(2) img {
		padding-right: 15px;
	}
	.footer .footer-img:nth-child(2) img {
		height: 16px;
		padding-top: 1px;
	}
    .footer .footer-btn {
	-webkit-box-flex: 2;
	    -ms-flex: 2;
		flex: 2;
        width: 50%;
        font-size: 16px;
        line-height: 32px;
        color: #ffffff;
        background-color: #ee2d2d;
        padding: 8px 0;
    }
</style>