<template>
    <div class="post-sale">
        <!-- 头部导航 -->
        <van-nav-bar
            left-arrow
            title='申请售后'
            @click-left="goPreviousPage"
            class="comment-info-bar"
        />
        <div class="refund_status_box sale_box dflex">
            <div class="refund_status_label color_424242 fz_14">退款状态：</div>
            <div class="refund_status_ul dflex" >
                <div class="refund_status_li color_808080 fz_12 dflex" 
                    v-for="(iconItem,iconKey) in icon" 
                    :key="iconKey" 
                    :class="{'refund_status_active':iconKey==active}" 
                    @click="statusChange(iconKey)">
                    <div class="refund_status_icon">
                        <img :src="iconItem.iconActive" alt="" v-if="iconKey==active">
                        <img :src="iconItem.icon" alt="" v-else>
                    </div>
                    <div class="refund_status_text">{{iconItem.text}}</div>
                </div>
            </div>
        </div>
        <div class="goods_details_box sale_box dflex">
            <div class="goods_details_ul">
                <div class="goods_details_li dflex" v-for="(listItem,listKey) in list" :key="listKey">
                    <div class="goods_details_img"><img :src="listItem.goods_thumb" alt=""></div>
                    <div class="goods_details_attr">
                        <div class="goods_details_title fz_12 color_424242">{{listItem.goods_name}}</div>
                        <div class="goods_details_number_box fz_12 dflex">
                            <div class="goods_details_number color_808080" >x{{newList[listKey].goods_number}}</div>
                            <div v-if="is_group != 2" class="goods_details_stepper" >
                                <van-stepper 
                                    v-model="listItem.goods_number" 
                                    @plus='plus(listItem.rec_id,list)'
                                    @blur='lose(listItem.goods_number,listItem.rec_id,list)'
                                    @minus='reduce(listItem.rec_id,list)' ref='stepper'
                                    @input="inputNum(listItem.goods_number,listItem.rec_id,list,newList[listKey].goods_number)"
                                    :max="newList[listKey].goods_number" :min='0'/>
                            </div>
                            <div v-else class="goods_details_stepper" >
                                <van-stepper 
                                    v-model="listItem.goods_number"
                                    disabled 
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="after_price_box sale_box">
            <div class="dflex after_price_li" v-if="active!=2">
                <div class="refund_status_label color_424242 fz_14">退款金额：</div>
                <div class="yen fz_14 color_EE2D2D">&yen;&nbsp;</div>
                <van-cell-group class="after_price_input color_EE2D2D">
                    <van-field v-model="price" placeholder="请输入退款金额" @input="handleInput" @blur="handleBlur"/>
                </van-cell-group>
            </div>
            <div class="dflex after_price_li">
                <div class="refund_status_label color_424242 fz_14">{{active!=2?'退款说明：':'换货说明：'}}</div>
                <van-cell-group class="after_price_input color_424242">
                    <van-field
                        v-model="message"
                        type="textarea"
                        placeholder="选填"
                        rows="1"
                        maxlength="50"
                        autosize
                    />
                </van-cell-group>
            </div>
        </div>
            
        <div class="img_upload_box sale_box">
            <div class="refund_status_label color_424242 fz_14">上传凭证<span class="color_808080 fz_12">(最多上传3张)</span></div>
            <uploadBox :imgList="imgList" :imgName="imgName" :count="3"></uploadBox>
        </div>
        <div class="postSaleBtn">
            <van-button class="postSumbit fz_16" @click="postSumbit">确定</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import $ from 'jquery'
    import {post,is_wexin,appFunc} from '../../assets/js/commonAPI.js'

    import tkIcon from '../../assets/img/tuikuan1.png'
    import tkIconActive from '../../assets/img/tuikuan.png'
    import thIcon from '../../assets/img/tuihuo1.png'
    import thIconActive from '../../assets/img/tuihuo.png'
    import hhIcon from '../../assets/img/huanhuo1.png'
    import hhIconActive from '../../assets/img/huanhuo.png'

    import shop from '../../assets/img/shop.png'

    import uploadBox from '../upload/uploadBox'

    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    export default {
        data() {
            return{
                active:0,
                icon:[
                    {icon:tkIcon,iconActive:tkIconActive,text:'退款'},
                    {icon:thIcon,iconActive:thIconActive,text:'退货'},
                    {icon:hhIcon,iconActive:hhIconActive,text:'换货'},
                ],
                snid:'',
                list:[],
                newList:[],
                price: 0,
                maxMoney: 0,   //最大可退款商品
                maxMoneyForRefund:0,   //商品金额+运费
                maxMoneyForNotRefund:0,
                message:'',
                localIdsLength:0,               //图片偏移值
                imgList:[],                     //图片
                imgName:"postSale",             //图片
                is_weixin:is_wexin(),           //经营类型id
                shipping_fee:0,                 //售后金额

                off:true,

                inputShow:false,
                showType:"one",

                //是否是团购活动商品 2-是
                is_group: 0,
            }
        },
        created(){
            let _this = this;
            let itemList = localStorage.getItem('saleItemList');
            this.showType = this.$route.query.radio;
            if(this.showType == "all"){
                this.inputShow = false;
            }else if(this.showType == "one"){
                this.inputShow = true;
            }
            let list;
            if(!this.$appFunc.prototype.isEmpty(itemList)){
                list = JSON.parse(itemList);
                this.list = list.list;
                this.snId = list.snid;
                this.is_group = list.is_group;
                this.shipping_fee = Number(list.shipping_fee);

                if(this.$appFunc.prototype.isEmpty(list.newList)) {
                    let newList = [];
                    for(let key in this.list){
                        newList = this.$appFunc.prototype.copy(this.list[key]);
                        this.newList.push(newList);
                        this.maxMoney += Number(this.list[key].goods_number) * parseFloat(this.list[key].after_price);
                        this.price += Number(this.list[key].goods_number) * parseFloat(this.list[key].after_price);
                    } 
                    this.maxMoneyForNotRefund = this.maxMoney;
                    //不退运费
                    // this.maxMoneyForRefund = (Number(this.maxMoney) + Number(this.shipping_fee)).toFixed(2);
                    this.maxMoneyForRefund = this.maxMoney;
                    this.maxMoney = this.maxMoneyForRefund;
                    this.price = this.maxMoneyForRefund;           
                }else {
                    //XXX 可能是修改售后时进入的判断
                    this.newList = list.newList;
                    this.imgList = list.img;
                    this.message = list.message;
                    this.maxMoneyForNotRefund = list.maxMoney;
                    //不退运费
                    // this.maxMoneyForRefund = (Number(this.maxMoney) + Number(this.shipping_fee)).toFixed(2);
                    this.maxMoneyForRefund = list.maxMoney;
                    this.maxMoney = this.maxMoneyForRefund;
                    this.price = this.maxMoneyForRefund;
                    this.active = Number(list.type) - 1;
                    if(this.active == 1){
                        this.inputShow = true;
                    }
                }
                // console.log('list==',list)
            }
            
            window.easemobim = window.easemobim || {};
            this.$post('/?c=user&a=info',).then(res => {
                switch (res.code) {
                    case 0:
                        this.userInfo = res.data;
                        this.head = res.data.head;
                        this.tag = res.data.tag;
                        this.userName = res.data.name;
                        this.upgrade = res.data.upgrade === 1;
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
                                                "title": "订单咨询",
                                                "desc": "农联商城",
                                                "order_title":"订单号："+_this.orderSn,
                                                "price": "总价:"+"¥"+_this.price,

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

        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            statusChange(key){
                if(this.off){
                    this.active = key;
                }
                if(key == 2){
                    this.inputShow = true;
                }else if(key == 1){
                    this.inputShow = true;
                }else if(key == 0){
                    this.inputShow = false;
                }
            },
            //进步器加减操作
            change(val, item, n) {
                for(let key in item){
                    let numb = 0;
                    if(val == item[key].rec_id){
                        numb = Number(item[key].goods_number) + Number(n)
                    }else{
                        numb = Number(item[key].goods_number)
                    }
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
            inputNum(val, wId, item,maxNumber){
                for(let key in item){
                    if(wId == item[key].rec_id){
                        if(val > maxNumber){
                            item[key].goods_number = maxNumber;
                        }
                    }
                }
            },
            //键入
            lose(val, wId, item) {
                for(let key in item){
                    let numb = 0;
                    if(wId == item[key].wId){
                        numb = Number(val)
                    }else{
                        numb = Number(item[key].goods_number)
                    }
                }
            },
            //控制输入金额最多只有两位小数
            handleInput(){
                /*if(this.price > this.maxMoney){
                    this.price = this.maxMoney;
                    return this.$toast('最大退款金额不能超过' + this.maxMoney + '元');
                }*/
                if(this.price < 0){
                    this.price = 0;
                }
                //去除首尾空白字符
                // this.price.replace(/(^\s+)|(\s+$)/g,'');
                //去除开头的非数字字符
                /*this.price = this.price.toString();
                let num = this.price.replace(/(^\D+)/g,'');

                if(!num) return this.price = '';

                this.price = '';

                num = num.split('.');
                //去除整数部分非数字字符
                num[0] = num[0].replace(/(\D+)/g,'');

                num[0] = Number(num[0]);

                if(num.length>2) {
                    num = num.slice(0,2);
                }
                if(num.length == 2 && num[1].length>2) {
                    num[1] = num[1].slice(0,2);
                }
                //去除小数部分非数字字符
                if(num[1]) {
                    num[1] = num[1].replace(/(\D+)/g,'');
                }
                this.price = num.join('.');*/
            },
            //失去焦点时，若输入金额结尾有小数点，则去掉小数点
            handleBlur(){
                this.price = this.price.toString();
                //去除对结尾非数字字符
                this.price = this.price.replace(/(\D+$)/g,'');
            },
            postSumbit(){
                let imgLists = this.imgList.join(',');

                if(this.imgList.length<1){
                    this.$toast('请上传图片')
                    return;
                }
                if(this.active == 2) {
                    this.price = 0;
                }

                let url = '/?c=afterSale&a=do';
                let data = {
                    type : this.active+1,
                    goods : this.list,
                    img : imgLists,
                    money : this.price,
                    order_sn : this.snId,
                    remark : this.message
                }

                this.$parent.$refs.loading.style.display = 'flex'
                
                this.$post(url,data).then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    if(res.code == 0){
                        let dd = {
                            snid : this.snId,
                            list : this.list,
                            newList : this.newList,
                            img  : this.imgList,
                            remark : this.message,
                            money : this.price,
                            maxMoney : this.maxMoney,
                            shipping_fee: this.shipping_fee,
                            type : this.active,
                        }
                        localStorage.setItem('saleItemList',JSON.stringify(dd))
                        
                        this.$router.push({
                            path:'/salesLists',
                            query:{active:0}
                        });
                    }else if(res.code == 1){
                        this.$toast(res.msg);
                    }
                });

            }
        },
        components:{
            uploadBox,
        }
    }
</script>

<style>
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
    .post-sale .van-hairline--top-bottom::after{
        border:none;
    }
    .post-sale .color_EE2D2D .van-field__control{
        color: #EE2D2D;
    }
    .post-sale .color_424242 .van-field__control{
        color: #424242;
    }
    .post-sale .color_808080 .van-field__control{
        color: #808080;
    }
</style>
<style lang="less" scoped>

    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;}
    .fz_14{font-size: 14px;}
    .fz_16{font-size: 16px;}
    .dflex{display: flex;}

    .sale_box{
        border-top: 1px solid #f2f2f2;
        background-color: #fff;
        padding: 10px 12px;
        margin-bottom: 10px;
        .refund_status_label{
            margin-right: 20px;
            span{
                margin-left: 10px;
            }
        }
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
        .goods_details_ul{
            width:100%;
            .goods_details_li{
                width:100%;
                margin-bottom: 10px;
                .goods_details_img{
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
                .goods_details_attr{
                    flex:1;
                    position: relative;
                    .goods_details_number_box{
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        .goods_details_number{
                            align-self: flex-end;
                            margin-right: auto;
                        }
                        .goods_details_stepper{
                            margin-left: auto;
                        }
                    }
                }
            }
            .goods_details_li:last-child{
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
        .upload_box{
            margin-top: 15px;
            margin-bottom: 5px;
            .img_box{
                .img_li{
                    width: 60px;
                    height: 60px;
                    position: relative;
                    margin-right: 10px;
                    .img_li_img{
                        width: 60px;
                        height: 60px;
                        border-radius: 5px;
                        overflow: hidden;
                        position: relative;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .img_remove{
                        position: absolute;
                        right: 0;
                        top: 0;
                        height: 50%;
                        width: 50%;
                        right: -6px;
                        top: -6px;
                        span{
                            display: block;
                            width: 12px;
                            height: 12px;
                            background-color: rgba(33, 33, 33, 0.65);
                            font-size: 12px;
                            border-radius: 100%;
                            line-height: 10px;
                            text-align: center;
                            color: #fff;
                            float: right;
                        }
                    }
                }
            }
            .uploadForm{
                position: relative;
                width: 60px;
                #uploadForm{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    margin: auto;
                    input{
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
                .personal-img{
                    width: 60px;
                    height: 60px;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
    .postSumbit{
        width: 100%;
        height: 44px;
        background-color: #EE2D2D;
        color: #fff;
        margin: auto;
        display: block;
        border-radius: 5px;
        overflow: hidden;
        margin-top: 20px;
    }
    .loading-img{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        top: 0;
        left:0;
    }
    .van-loading{
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
