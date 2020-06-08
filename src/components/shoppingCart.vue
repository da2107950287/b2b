<template>
    <div>
        <!-- 购物车数据 -->
        <div v-if="showImg == 1">
            <div class="cart-list" ref="viewBox">
                <div class="pang-row" v-for="(item,index) in carLis" :key="index" :gid='item.seller_id'
                    :sid='item.seller_id'>
                    <div class="everyone">
                        <div class="pan-corporate-name">
                            <div span='3' class="left-radio">
                                <div class="van-checkbox__icon van-checkbox__icon--round" @click="allClick(item,$event)">
                                    <i class="van-icon van-icon-success"></i>
                                </div>
                            </div>
                            <div class="dflex right-shop-name" @click.stop="toStop(item.seller_id)">
                                <img class="stop_img" src="../assets/img/dianshang.png" alt="">
                                <span class="shop_name">{{item.shop_name}}</span>
                                <img class="stop_right_img" src="../assets/img/jiantou.png" alt="">
                            </div>
                        </div>
                        
                        <div class="shoppingCart-goods-title-box" v-for="(goods,index) in item.goods" :key="index"
                             :wid='goods.wId' :data-id='goods.goods_id'>
                            <div class="shoppingCart-goods-title-li">
                                <van-row>
                                    <van-col span='6' class="shoppingCart-goods-title-img">
                                        <div v-if="isClose" class="mongolia">休息时间</div>
                                        <div v-else-if="goods.on_sale == 2" class="mongolia">店铺打烊</div>
                                        <div v-else-if="goods.on_sale == 3" class="mongolia">店铺关闭</div>
                                        <div v-else-if="goods.on_sale != 1" class="mongolia">商品失效</div>
                                        <img v-if="goods.goods_thumb" :src="goods.goods_thumb" @click="skipDetails(goods)"/>
                                        <img v-else src="../assets/img/no_picture.gif" @click="skipDetails(goods)"/>
                                    </van-col>
                                    <van-col span='18'>
                                        <div class="shoppingCart-goods-title-title" @click="skipDetails(goods)">
                                            {{goods.goods_name}}
                                        </div>
                                    </van-col>
                                </van-row>
                            </div>
                            
                            <van-swipe-cell :right-width="60" class="shoppingCart-goods-title-info" v-for="(val,index) in goods.list" :key="index"
                                            :data-id='val.rec_id'>
                                <van-cell-group class="shoppingCart-goods-title-info-box dflex">
                                    <div span='2' class="row2">
                                        <div class="van-checkbox__icon van-checkbox__icon--round" :class="{'disabled':goods.on_sale != 1 || isClose || val.is_invalid == 1}"
                                             @click="oddClick($event,val,item,goods)">
                                            <i class="van-icon van-icon-success"></i>
                                            <input type="checkbox" :id="index" :data-id='val.rec_id' :class="{'disabled':goods.on_sale != 1 || isClose || val.is_invalid == 1}">
                                        </div>
                                    </div>
                                    <div class="shoppingCart-goods-title-info-attr dflex">
                                        <div span='9' class="row9">
                                            <div class="evenPrice">{{val.goods_attr ? val.goods_attr:'单品'}}</div>
                                            <div class="shoppingCart-goods-title-label">
                                                &yen;<span>{{val.unit_price}}</span>
                                                <i v-show="val.price_differences">比加入时降{{val.price_differences}}元</i>
                                            </div>
                                        </div>
                                        <div span='10' class="row10">
                                            <div class="is_invalid" v-show="val.is_invalid == 1">
                                                失效
                                            </div>
                                            <div class="stepper" v-show="val.is_invalid != 1">
                                                <van-stepper v-model="val.goods_number" @plus='plus(val.goods_number,item,$event)'
                                                @blur='lose(val.goods_number,item,$event)'
                                                @minus='reduce(val.goods_number,item,$event)' ref='stepper'
                                                :min='val.moq'
                                                :disabled="goods.on_sale != 1 || isClose"/>
                                            </div>
                                        </div>
                                    </div>
                                </van-cell-group>
                                <van-button slot="right" type='danger' @click="deleteGoods(val,$event)">
                                        <div class="delete-goods-box">
                                        <span class="delete-goods">
                                            删除
                                            </span>
                                        </div>
                                </van-button>
                            </van-swipe-cell>
                            </div>
                        </div>
                    </div>
                </div>
            <div style="height:104px"></div>

            <!-- 底部按钮-->
            <div class="submit-bar van-submit-bar">
                <div class="submit-bar van-submit-bar">
                    <div class="van-submit-bar__bar">
                        <div class="van-checkbox button-cleckbox">
                            <div class="van-checkbox__icon van-checkbox__icon--round" @click="allCheckbox($event)">
                                <i class="van-icon van-icon-success"></i>
                            </div>
                            <span class="van-checkbox__label">全选</span>
                        </div>
                        <div class="van-submit-bar__text">
                            <div class="heji">合计：
                                <span>&yen;</span>
                                <span class="van-submit-bar__price">{{totalMoney}}</span>
                            </div>
                            <div class="mianjian" v-if="wholesale_shipping != 0 && goodsSum < freeMoney">
                                <span class="fz_12">还差{{(freeMoney - goodsSum).toFixed(2)}}元免运费</span>
                            </div>
                        </div>
                        <button class="van-button van-button--danger van-button--large van-button--square" @click="cartSubmit" :class="{'disable': is_true == false}">
                            <span class="van-button__text">提交订单</span>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="loadLock" class="vantLoading">
                <vloading :vertical="false" text=""></vloading>
            </div>
        </div>
        <div class="" v-else-if="showImg == 2">
            <div class="cart-background">
                <img src="../assets/img/gouwuchekong.png" width="100%">
            </div>
            <div class="cart-text">
                <div>购物车是空的哦</div>
                <div>快去挑选喜欢的商品</div>
            </div>
            <div class="cart-btn" @click="toIndex">去看看</div>
            <div>
                <special></special>
            </div>
            <div style="height:50px"></div>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import '../assets/css/commonstyle.css'
    import {post, HandleCart, getPrice,appFunc} from '../assets/js/commonAPI.js'
    import special from "./component/recommendComponent/special.vue";
    import vloading from './vloading.vue'

    export default {
        data() {
            return {
                /* */checked: false,              //====>复选框
                tips: false,                //====>提示
                isEmpty: false,              //====>判断购物车是否为空
                priceis: 0,                  //====>价格
                setCart: [],

                //剥离数据

                dataOne: '',                 //数据
                dataTwo: '',
                dataInfo: '',
                order_sn: '',
                box: '',
                isScroll: '',

                is_true:false,              //是否可以点击提交订单


                order_sn: '',

                allData: '',
                totalMoney: 0.00,
                freeMoney: 0,               //免运费订单总额
                goodsSum: 0,               //免运费订单总额
                wholesale_shipping: 0,      //运费

                /* 锁 */
                lock: false,
                loadLock: false,
                showImg: 0,                 //显示方式

                carLis: [],
                // cartInfo: [],                //====>购物车数据
                page: 1,                     //####=>默认页码
                carLisLength : 0,
                isClose: false,  //平台是否关闭， 关闭后，有提示，所有商品不可以提交订单
            }
        },
        created() {
            const _this = this;
            //请求购物车内 的数据
            //取出购物车内的数据
            let params = {};
            if (this.$route.query.sn != undefined || this.$route.query.order_sn != undefined) {
                params.page = this.page
                this.order_sn = this.$route.query.sn || this.$route.query.order_sn;
                params.order_sn = this.order_sn;
            }
            
            //是否存在 状态值， 存在，则请求传递，无则不传
            if (this.$route.query.status != undefined ||this.$route.query.state != undefined) {
                params.state = this.$route.query.status || this.$route.query.state;
            }
            if(params){
                this.$emit('toPage',{index:3,path:'/shoppingCart',query:params})
            }
            

            localStorage.removeItem('shoppingCarCount')
            this.$emit('getShoppingCar')

            this.$post('/?c=cart&a=cartList', params).then((res) => {
                    if(res.code == 0) {
                        for (let name in res.data.list) {
                            this.carLis.push(res.data.list[name]);
                        }
                        this.carLisLength = this.carLis.length;
                        if(res.data.list != ''){
                            _this.showImg = 1;
                        }else{
                            _this.showImg = 2;
                        }
                        _this.page += 1;
                }else if(res.code == 1){
                    this.$toast(res.msg);
                    _this.showImg = 2;
                    // if(this.order_sn)_this.$toast(res.msg);
                }else{

                }
            });


            this.$post('/?c=order&a=setting',{})
                .then((res) => {
                    if(res.code == 0) {
                        this.freeMoney = res.data.wholesale_free;
                        this.wholesale_shipping = res.data.wholesale_shipping;
                    }else{
                        if(this.order_sn)_this.$toast(res.msg);
                    }
                });

            //调用方法，判断平台是否开启
            this.platformIsClose()
        },
        methods: {
            // 跳转商品详情
            skipDetails(item) {
                this.$router.push({
                    path: '/goods',
                    query: {
                        'goods': item.wId
                    }
                })
            },
            cutString(str,num) {
                let val = this.$appFunc.prototype.cutString(str,num)
                return val;
            },

            toStop(sid){
                this.$router.push({
                    path: '/shop',
                    query: {
                        "index":sid,
                    }
                })
            },
            //获取平台是否关闭
            platformIsClose(){
                this.$post('/?a=isClose',{
                }).then((res)=>{
                    switch(res.code){
                        case 0:
                            //true, 关闭
                            //false， 未关闭
                            this.isClose = res.data.is_close;
                            break;
                        default:
                            break;
                    }
                })
            },
            getCartInfo() {
                if (localStorage.cartInfo) {
                    this.cartInfo = JSON.parse(localStorage.cartInfo);
                }
                this.isEmpty = this.cartInfo.length > 0;
            },
            /* 单选规格 */
            oddClick(event,val, item,goods) {
                if(goods.on_sale == 1 && !this.isClose){
                    const eve = event.srcElement ? event.srcElement : event.target;
                    const elementSellerRow = $(eve).parents('.pang-row'); //当前商家范围
                    // const priceSpan = $(eve).parents('.main-div').find('.van-submit-bar__price');
                    const inputSum = elementSellerRow.find('input[type="checkbox"]').length;
                    // const inputCheckbox = $(eve).parents('.main-div').find('input[type="checkbox"]');

                    if (!$(eve).parents('.van-checkbox__icon').hasClass('van-checkbox__icon--checked')) {
                        $(eve).parents('.van-checkbox__icon').addClass('van-checkbox__icon--checked');
                        $(eve).parents('.van-checkbox__icon').find('input[type="checkbox"]').attr('checked', true);
                    } else {
                        $(eve).parents('.van-checkbox__icon').removeClass('van-checkbox__icon--checked');
                        $(eve).parents('.van-checkbox__icon').find('input[type="checkbox"]').attr('checked', false);
                    }


                    // 计算价格
                    // this.computedValue();

                    //查找页面中被选中的个数
                    const inputAllSum = elementSellerRow.find('input[type="checkbox"]:checked').length;
                    if (inputAllSum == inputSum) {
                        elementSellerRow.find('.pan-corporate-name').find('.van-checkbox__icon').addClass('van-checkbox__icon--checked');
                    } else {
                        elementSellerRow.find('.pan-corporate-name').find('.van-checkbox__icon').removeClass('van-checkbox__icon--checked');
                    }

                    const elementGoodsRow = $(eve).parents('.shoppingCart-goods-title-box'); //当前商品范围
                    let sid = elementSellerRow.attr('sid');
                    this.doPriceCheck(elementGoodsRow, sid, true,event);
                }else if(this.isClose){
                    this.$toast('平台休息了');
                }else if(goods.on_sale == 3){
                    this.$toast('店铺关闭了');
                }else if(goods.on_sale == 2){
                    this.$toast('店铺打烊了');
                }else if(goods.on_sale == 0){
                    this.$toast('该商品已失效');
                }else{
                    this.$toast('该商品无法购买');
                }
            },
            selectSeller(elementSellerRow, isChecked,refreshAmount = false,event) {
                let inputSum = elementSellerRow.find('input[type="checkbox"]').length; //所有多选框
                let inputAllSum = elementSellerRow.find('input[type="checkbox"]:checked').length; //选中多选框
                let liDome = elementSellerRow.find('.shoppingCart-goods-title-info');//所有规格
                if (isChecked) { //要求全选
                    if (inputSum != inputAllSum) { //却又没有全选的时候

                        for (let i = 0; i < liDome.length; i++) {
                            let elementRow = $(liDome[i]);
                            if(elementRow.find('.van-checkbox__icon').hasClass('disabled')){
                                // console.log(elementRow);
                            }else{
                                elementSellerRow.find('.van-checkbox__icon').addClass('van-checkbox__icon--checked');
                                let checkbox__icon = elementSellerRow.find('.van-checkbox__icon');
                                checkbox__icon.each((key,item)=>{
                                    if($(item).hasClass('disabled')){
                                        $(item).removeClass('van-checkbox__icon--checked');
                                    }
                                })
                                //查找页面中所有的复选框
                                let checkboxDom = elementSellerRow.find('input[type="checkbox"]');
                                //勾选被选中状态
                                for (let i = 0; i < checkboxDom.length; i++) {
                                    if(!$(checkboxDom[i]).hasClass('disabled')){
                                        $(checkboxDom[i]).attr('checked', 'true');
                                    }
                                }
                            }
                        }

                        
                        }
                } else {
                    elementSellerRow.find('.van-checkbox__icon').removeClass('van-checkbox__icon--checked');
                    // const inputDom = elementSellerRow.find('input[type="text"]');
                    // const Price = elementSellerRow.find('.shoppingCart-goods-title-label span').text();
                    let checkboxDom = elementSellerRow.find('input[type="checkbox"]');
                    for (let i = 0; i < checkboxDom.length; i++) {
                        $(checkboxDom[i]).removeAttr('checked');
                    }
                }
                let sid = elementSellerRow.attr('sid');
                let elementGoodsRows = elementSellerRow.find('.shoppingCart-goods-title-box'); //该商家下所有商品

                let length = elementGoodsRows.length;
                console.log(event);
                for (let j = 0; j < length; j++) {
                    let refresh = refreshAmount?(j == length-1):false;
                    let elementGoodsRow = $(elementGoodsRows[j]);
                    this.doPriceCheck(elementGoodsRow, sid,refresh,event);
                }
            },
            /* 商家选择 */
            allClick(item,event) {
                const eve = event.srcElement ? event.srcElement : event.target;
                const elementSellerRow = $(eve).parents('.pang-row'); //商家
                let isChecked = (!$(eve).parents('.van-checkbox__icon').hasClass('van-checkbox__icon--checked'));
                this.selectSeller(elementSellerRow,isChecked,true,eve);
                //this.computedValue();
            },
            allCheckbox(event) {
                const eve = event.srcElement ? event.srcElement : event.target;
                let checkBoxElement = $(eve).parent('.van-checkbox__icon');
                let isChecked = (!checkBoxElement.hasClass('van-checkbox__icon--checked'));
                if(isChecked){
                    checkBoxElement.addClass('van-checkbox__icon--checked');
                }else{
                    checkBoxElement.removeClass('van-checkbox__icon--checked');
                }
                // console.log(isChecked?'checked':'not checked');
                const elementCartList = $(eve).parents('.main-div').find('.cart-list'); //购物车列表
                const elementSellerRows = elementCartList.find('.pang-row');   //所有商家

                let length = elementSellerRows.length;
                for (let i = 0; i < length; i++) {
                    let refresh = (i == length-1);
                    let elementSellerRow = $(elementSellerRows[i]); //商家
                    this.selectSeller(elementSellerRow,isChecked,refresh,eve);
                }

                // 计算价格
                // this.computedValue();
            },
            /**
             * 价格检查处理
             */
            doPriceCheck(elementGoodsRow, sid,refreshAmount = true,event) {
                let eve = event.srcElement ? event.srcElement : event.target;
                let liDome = elementGoodsRow.find('.shoppingCart-goods-title-info');//所有规格
                let arr = [];
                let wid = elementGoodsRow.attr('wid');
                /* 拼装数据 */
                for (let i = 0; i < liDome.length; i++) {
                    let elementRow = $(liDome[i]);
                    if(elementRow.find('input[type="checkbox"]:checked').hasClass('disabled')){
                        elementRow.find('input[type="checkbox"]').removeAttr('checked');
                        elementRow.find('.van-checkbox__icon').removeClass('van-checkbox__icon--checked');
                        elementRow.parents('.everyone').find('.pan-corporate-name .van-checkbox__icon').removeClass('van-checkbox__icon--checked')
                        this.$toast('该规格已失效');
                        return false;
                    }
                    if (elementRow.find('input[type="checkbox"]:checked').length != 0) {
                        let objData = {};
                        objData.c = elementRow.find('input[type="checkbox"]').attr('data-id');
                        objData.n = Number(elementRow.find('input[type="number"]').val());
                        arr.push(objData);
                    }
                }
                eve = eve?eve:event;
                
                let mainHtml = $(eve).parents('.main-div');
                let rowHtml = mainHtml.find('.pang-row');
                let cart_id = [];
                let infoObj = {};
                let setCart = [];
                for (let i = 0; i < rowHtml.length; i++) {
                    const selectInput = $(rowHtml[i]).find('input[type="checkbox"]:checked');
                    const seller_id = $(rowHtml[i]).attr('gid');
                    if (selectInput.length != 0) {
                        for (let i = 0; i < selectInput.length; i++) {
                            cart_id.push($(selectInput[i]).attr('data-id'));
                            //TODO 购物车提交方式改进方案
                            // let objData = {};
                            // objData.c=$(selectInput[i]).attr('data-id');
                            // let goodsElement = $(selectInput[i]).parents('.shoppingCart-goods-title-info-box');
                            // objData.n = Number(goodsElement.find('input[type="number"]').val());
                            // cart_id.push(objData);
                        }
                        let exist = false;
                        setCart.forEach((res) => {
                            if (res.seller_id == seller_id) {
                                res.cart_ids = res.cart_ids.concat(cart_id);
                                exist = true;
                                return false;
                            }
                        });
                        if (!exist) {
                            infoObj.seller_id = seller_id;
                            infoObj.cart_ids = cart_id;
                            setCart.push(infoObj);
                        }
                    }
                    cart_id = [];
                    infoObj = {};
                }
                if(setCart.length>0){
                    this.is_true = true;
                }else{
                    this.is_true = false;
                }

                
                this.loadLock = true;
                if (arr.length != 0) {
                    this.$post('/?c=cart&a=cartGoodsPrice&wid='+wid, {
                        cart_value: arr,
                        wholesale_id: wid,
                        seller_id: sid
                    }).then((res) => {
                        if (res.code == 1) {
                            this.$toast(res.msg);
                        } else if (res.code == 0) {
                            this.loadLock = false;
                            this.resetUnitPrice(liDome, res.data.unit_price);//修改商品价格
                            if(refreshAmount)this.computedValue(event);// 计算价格
                        }
                    })
                }else{
                    this.loadLock = false;
                    if(refreshAmount)this.computedValue(event);// 计算价格
                }
            },
            //删除商品规格
            deleteGoods(val,event) {
                const eve = event.srcElement ? event.srcElement : event.target;
                const pangDom = $(eve).parents('.shoppingCart-goods-title-box');//当前商品
                const eveDom = $(eve).parents('.shoppingCart-goods-title-info');  //当前规格
                const sellerBox = $(eve).parents('.pang-row');                      //当前商家
                // 删除图标
                // const goodsBox = $(pangDom).find('.delete-goods-box');

                // let titleInfo = $(pangDom).find('div.shoppingCart-goods-title-info');
                let currentPrice = $(eveDom).find('div.shoppingCart-goods-title-label span').text();
                let currentCheckbox = $(eveDom).find('input[type="checkbox"]');
                let currentNumber = $(eveDom).find('input[type="number"]').val();

                let goodsLength = sellerBox.find('.shoppingCart-goods-title-box');//当前商家下所有商品
                let sku = pangDom.find('.shoppingCart-goods-title-info');           //当前商品下所有规格

                if ($(currentCheckbox).is(':checked')) {
                    this.totalMoney = (Number(this.totalMoney) - Number(currentNumber) * Number(currentPrice)).toFixed(2);
                }



                this.$post('/?c=cart&a=delete', {
                    cart_id: val.rec_id
                })
                    .then((res) => {
                        switch (res.code) {
                            case 0:
                                if ($(sku).length == 1 && $(goodsLength).length == 1) {  //商品
                                    res.data.state == 0 ? sellerBox.remove() : this.$toast('删除失败!');
                                } else if ($(sku).length == 1) { //商品
                                    res.data.state == 0 ? pangDom.remove() : this.$toast('删除失败!');
                                } else {//规格
                                    res.data.state == 0 ? eveDom.remove() : this.$toast('删除失败!');
                                }

                                localStorage.removeItem('shoppingCarCount')
                                this.$cacheStorage(
                                    'shoppingCarCount',
                                    '/?c=cart&a=num',
                                    'local',
                                    {},
                                    ((res)=>{
                                        if(res.data.num == 0){
                                            this.$emit('removeShoppingCar')
                                        }else{
                                            this.$emit('getShoppingCar')
                                        }
                                    }),
                                )
                                // 遍历购物车店铺
                                for (let index = 0; index < this.carLis.length; index++) {
                                    let element = this.carLis[index].goods;
                                    // 遍历购物车店铺下商品
                                    for(let index1 in element){
                                        let element1 = element[index1].list;
                                        // 遍历购物车店铺下商品的规格
                                        for(let index2 in element1){
                                            let rec_id = element1[index2].rec_id;
                                            // 删除当前规格
                                            if(rec_id == val.rec_id){
                                                delete element1[index2];
                                                // 判断是否有规格 没有就删除商品
                                                if(this.$appFunc.prototype.isEmptyObject(element1)){
                                                    // this.carLis.splice(index,1);
                                                    delete element[index1];
                                                    // 判断是否有商品 没有商品 店铺 length 减一
                                                    if(this.$appFunc.prototype.isEmptyObject(element)){
                                                        this.carLisLength--;
                                                        console.log(this.carLisLength);


                                                        if(this.carLisLength<1){
                                                            this.showImg = 2;
                                                        }
                                                    }

                                                }
                                                this.computedValue(eve);// 计算价格
                                            }
                                        }
                                    }
                                }

                                break;
                            default:
                                this.$toast('删除失败!');
                                break;
                        }
                    })
            },
            //改变当前显示价格（阶梯）
            resetUnitPrice(doms, price) {
                if (price >= 0.0) {
                    for (let i = 0; i < doms.length; i++) {
                        $(doms[i]).find('div.shoppingCart-goods-title-label span').text(price);
                    }
                }
            },
            //进步器加减操作
            change(val, item, n) {
                const eve = event.srcElement ? event.srcElement : event.target;
                const inputCheckBox = $(eve).parents('.shoppingCart-goods-title-info').find('input[type="checkbox"]');
                // 被选中才做计算
                if ($(inputCheckBox).is(':checked')) {
                    this.computedValue(eve); // 计算价格
                }
                const elementSellerRow = $(eve).parents('.pang-row'); //当前商家范围
                const elementGoodsRow = $(eve).parents('.shoppingCart-goods-title-box'); //当前商品范围
                const liDome = elementGoodsRow.find('.shoppingCart-goods-title-info');   //当前商品的所有规格
                // const list = item.list;
                let arr = [];
                let wid = elementGoodsRow.attr('wid');
                let sid = elementSellerRow.attr('sid');
                let getID = $(eve).parents('div.shoppingCart-goods-title-info').find('input[type="checkbox"]').attr('data-id');//当前规格
                /* 拼装数据 */
                for (let i = 0; i < liDome.length; i++) {
                    if ($(liDome[i]).find('input[type="checkbox"]:checked').length != 0) {
                        let objData = {};
                        objData.c = $(liDome[i]).find('input[type="checkbox"]').attr('data-id');
                        if (getID == objData.c) {
                            objData.n = Number($(liDome[i]).find('input[type="number"]').val()) + n;
                        } else {
                            objData.n = Number($(liDome[i]).find('input[type="number"]').val());
                        }
                        arr.push(objData);
                    }
                }
                if (arr.length > 0) {
                    this.$post('/?c=cart&a=cartGoodsPrice', {
                        cart_value: arr,
                        wholesale_id: wid,
                        seller_id: sid
                    })
                        .then((res) => {
                            switch (res.code) {
                                case 0:
                                    //把更新的价格赋值给当前 (变更所有的）
                                    this.resetUnitPrice(liDome, res.data.unit_price);
                                    // 计算价格
                                    this.computedValue(eve);
                                    break;
                            }
                        })
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
            //失去焦点
            lose(val, item) {
                // 获取当前元素event
                const eve = event.srcElement ? event.srcElement : event.target;
                // 查询当前元素父级
                const parentDom = $(eve).parents('.shoppingCart-goods-title-info');
                // 查询当前元素父级
                const titleBox = $(eve).parents('.shoppingCart-goods-title-box');

                // 查询当前盒子
                const eventsParents = $(eve).parents('.pang-row');
                // 查询当前是否选中
                const isChecked = $(parentDom).find('input[type="checkbox"]').is(':checked');
                let arr = [];
                let wid = 0;
                let sid = 0;

                if (isChecked) {
                    let objData = {};
                    objData.c = $(parentDom).find('input[type="checkbox"]').attr('data-id');
                    objData.n = $(eve).val();
                    arr.push(objData);
                    wid = $(titleBox).attr('wid');
                    sid = $(eventsParents).attr('sid');

                    this.$post('/?c=cart&a=cartGoodsPrice', {
                        cart_value: arr,
                        wholesale_id: wid,
                        seller_id: sid
                    })
                        .then((res) => {
                            switch (res.code) {
                                case 0:
                                    //把更新的价格赋值给当前
                                    const liDome = titleBox.find('.shoppingCart-goods-title-info');//所有规格
                                    this.resetUnitPrice(liDome, res.data.unit_price);
                                    // 计算价格
                                    this.computedValue(eve);
                                    break;
                            }
                        });
                    // 失去焦点时计算价格
                    if (this.totalMoney != 0.0) {
                        // 计算价格
                        this.computedValue(eve);
                    }
                }
            },
            //提交购物车
            cartSubmit(event) {
                let _this = this;
                const eve = event.srcElement ? event.srcElement : event.target;
                const mainHtml = $(eve).parents('.main-div');
                const rowHtml = mainHtml.find('.pang-row');
                sessionStorage.setItem('wapPrice', this.totalMoney);

                let cart_id = [];
                let infoObj = {};

                for (let i = 0; i < rowHtml.length; i++) {
                    const selectInput = $(rowHtml[i]).find('input[type="checkbox"]:checked');
                    const seller_id = $(rowHtml[i]).attr('gid');

                    if (selectInput.length != 0) {
                        for (let i = 0; i < selectInput.length; i++) {
                            cart_id.push($(selectInput[i]).attr('data-id'));
                            //TODO 购物车提交方式改进方案
                            // let objData = {};
                            // objData.c=$(selectInput[i]).attr('data-id');
                            // let goodsElement = $(selectInput[i]).parents('.shoppingCart-goods-title-info-box');
                            // objData.n = Number(goodsElement.find('input[type="number"]').val());
                            // cart_id.push(objData);
                        }
                        let exist = false;
                        this.setCart.forEach((res) => {
                            if (res.seller_id == seller_id) {
                                res.cart_ids = res.cart_ids.concat(cart_id);
                                exist = true;
                                return false;
                            }
                        });
                        if (!exist) {
                            infoObj.seller_id = seller_id;
                            infoObj.cart_ids = cart_id;
                            this.setCart.push(infoObj);
                        }
                    }
                    cart_id = [];
                    infoObj = {};
                }

                if (this.lock) {
                    this.$toast('您的操作过于频繁，请稍后再试!');
                    return;
                }
                //提交购物车
                if (this.setCart.length != 0) {
                    this.lock = true;
                    this.$post('/?c=cart&a=submit', {
                        cart_value: this.setCart
                    })
                        .then((res) => {
                            this.setCart = [];
                            this.lock = false;
                            switch (res.code) {
                                case 0:

                                    let data = res.data, n = 0, item, item2

                                    for(;n<this.carLis.length;n++) {
                                        item = 's'+this.carLis[n].seller_id
                                        if(data[item]) {
                                            for(item2 in data[item]) {
                                                data[item][item2].shop_name = this.carLis[n].shop_name
                                                break
                                            }
                                        }
                                    }

                                    localStorage.setItem('data', JSON.stringify(data));
                                    if(this.freeMoney <= this.goodsSum){
                                        sessionStorage.setItem('wholesale_shipping',0);
                                    }else{
                                        sessionStorage.setItem('wholesale_shipping',_this.wholesale_shipping);
                                    }
                                    sessionStorage.setItem('freight',_this.wholesale_shipping);
                                    sessionStorage.setItem('freeMoney', _this.freeMoney);
                                    this.$router.push({
                                        path: '/ConfirmAnOrder'
                                    });
                                    break;
                                case 1:
                                    this.$toast(res.msg);
                                    break;
                                default:
                                    break;
                            }
                        })
                } else {
                    this.$toast('请选择您需要购买的商品!');
                }
            },
            computedValue(event) {
                let _this = this;
                // 查找购物车中被选中的商品
                let evel = event;
                // 购物车盒子
                let evelDom = $(evel).parents('div.cart-list').length != 0 ? $(evel).parents('div.cart-list') : $('body').find('div.cart-list');
                // 查找被选中选项
                let shoppingGoods = $(evelDom).find('div.shoppingCart-goods-title-box');

                let goodsSum = 0;
                for (let i = 0; i < shoppingGoods.length; i++) {
                    // 查找被选中的标签
                    let inputChecked = $(shoppingGoods[i]).find('input[type="checkbox"]:checked');
                    setTimeout(function () {
                        if (inputChecked.length != 0) {
                            for (let i = 0; i < inputChecked.length; i++) {
                                // 查找选中标签父级盒子
                                let checkedElement = $(inputChecked[i]).parents('div.shoppingCart-goods-title-info');
                                // 获取价格
                                let goodsPrice = checkedElement.find('div.shoppingCart-goods-title-label span').text();
                                let inputNumber = checkedElement.find('input[type="number"]').val();
                                goodsSum += Number(inputNumber) * Number(goodsPrice);
                            }
                        } else {
                            _this.totalMoney = 0
                            _this.goodsSum = 0;
                        }

                        if (goodsSum != 0.0) {
                            _this.goodsSum = goodsSum;
                            _this.totalMoney = goodsSum.toFixed(2);
                            if(_this.totalMoney < _this.freeMoney){//总价，免运费价格对比

                            }
                        } else {
                            _this.totalMoney = 0
                            _this.goodsSum = 0;
                        }
                    }, 1)
                }
            },
            toIndex(){
                this.$emit('toPage',{index:0,path:'/index',});
            }
        },
        components:{
            special,
            vloading,
        }
    }
</script>

<style scoped>
    .fz_12{
        font-size: 12px;
    }
    .van-submit-bar__text{
        text-align: left;
        position: relative;
    }
    .heji{
        line-height: 28px;
    }
    .heji span{
        color: #EE2D2D;
    }
    .mianjian{
        margin-top: -5px;
    }
    /* 购物车信息 */
    .pang-row {
        background-color: #fff;
        margin-bottom: .6rem;
    }

    .shoppingCart-goods-title-box {
        padding-bottom: .533rem;
    }
    .shoppingCart-goods-title-li{
        padding: 0 .64rem;
    }



    .shoppingCart-goods-title-info {
        margin: .3rem 0;
        padding: .3rem 0;
        font-size: 14px;
    }

    .shoppingCart-goods-title-info .evenPrice {
        font-size: .64rem;
        color: #424242;
    }

    .shoppingCart-goods-title-label {
        font-size: .75rem;
        color: #EE2D2D;
    }
    .shoppingCart-goods-title-label i{
        font-style:normal;
        font-size: .533rem;
    }


    /* 按钮 */
    .submit-bar {
        bottom: 51px;
        border-top: 1px solid #E4E7ED;
    }

    /* 价格 */
    .pang-sum {
        text-align: right;
        padding: .5rem 1rem;
        font-size: 12px;
        border-bottom: 1px solid #eee;
    }

    .pang-sum span {
        border-right: 1px solid #777;
        padding-right: 4px;
        margin-right: 4px;
    }

    /* 进步步器 */
    .stepper {
        font-size: 0px;
        text-align: right;
        /* float: right; */
        display: inline-block;
    }

    .stepper button {
        width: 40px;
        height: 30px;
        line-height: 18px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ebedf0;
        position: relative;
        padding: 5px;
        vertical-align: middle;
    }

    .stepper input {
        width: 33px;
        height: 26px;
        padding: 1px;
        border: 1px solid #ebedf0;
        border-width: 1px 0;
        border-radius: 0;
        box-sizing: content-box;
        color: #7d7e80;
        font-size: 14px;
        vertical-align: middle;
        text-align: center;
        -webkit-appearance: none;
    }
    .reduce::before {
        width: 9px;
        height: 1px;
        content: '';
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #7d7e80;
    }

    .plus::before {
        width: 9px;
        height: 1px;
        content: '';
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #7d7e80;
    }

    .plus::after {
        width: 1px;
        height: 9px;
        content: '';
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #7d7e80;
    }
    .reduce,
    .plus {
        font-size: 18px;
    }

    .shopping-cart-bottom {
        height: 2rem;
        line-height: 2rem;
        margin: .3rem 0;
        padding: .3rem 0;
        border: 1px solid #eee;
        border-left: none;
        border-right: none;
    }

    .shopping-all-sum {
        text-align: right;
        padding-right: 1rem;
        font-size: 12px;
        color: #777;
        border-right: 1px solid #eee;
    }

    .shopping-all-Price {
        font-size: 12px;
        color: #777;
        padding-left: .2rem;
    }

    .product {
        font-size: 12px;
        text-align: right;
        height: 2rem;
        line-height: 2rem;
        color: #eee;
    }

    .submit-bar .van-submit-bar__price {
        display: inline;
    }

    input[type="checkbox"] {
        display: none;
    }



    /* 删除按钮 */
    .delete-goods-box {
        line-height: 2rem;
        text-align: right;
    }

    .delete-goods {
        display: inline-block;
        font-size: 18px;
        color: #777;
    }

    .button-cleckbox {
        padding: 0 .4rem;
    }

    .button-cleckbox .van-checkbox__icon,
    .pang-row .van-checkbox__icon {
        height:21px;
    }


    .button-cleckbox .van-checkbox__icon .van-checkbox__label,
    .pang-row .van-checkbox__icon .van-checkbox__label {
        line-height: 30px;
    }

    .button-cleckbox .van-checkbox__icon .van-icon,
    .pang-row .van-checkbox__icon .van-icon {
        width: 20px;
        height: 20px;
        line-height: 20px;

    }

    .button-cleckbox .van-checkbox__icon, .van-checkbox__label,
    .pang-row .van-checkbox__icon, .van-checkbox__label {
        line-height: 28px;
    }

</style>

<style lang="less">
    .stepper input::-webkit-outer-spin-button,
    .stepper input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .stepper input[type="number"]{
        -moz-appearance: textfield;
    }
    
    .shoppingCart-goods-title-info-attr{
        .van-stepper__minus{
            border:1px solid #ccc;
            margin: 0;
            min-height: 30px;
            border-radius: 5px 0 0 5px;
            background-color:#fff;
        }
        .van-stepper__minus::before{
            background-color: #666;
        }
        .van-stepper__minus--disabled{
            background-color: #f7f8fa;
        }
        .van-stepper__minus--disabled::before{
            background-color: #c8c9cc;
        }
        .van-stepper__input{
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
            margin: 0;
            width: 34px;
            background-color:#fff;
        }

        .van-stepper__plus{
            background-color:#fff;
            border:1px solid #ccc;
            margin: 0;
            min-height: 30px;
            border-radius: 0 5px 5px 0;
        }
        .van-stepper__plus::before{
            background-color: #666;
        }
        .van-stepper__plus--disabled{
            background-color: #f7f8fa;
        }
        .van-stepper__plus--disabled::before{
            background-color: #c8c9cc;
        }

    }
</style>

<style lang="less" scoped>
    .van-submit-bar__bar{
        padding: 0 0 0 .64rem;
        .button-cleckbox{
            padding: 0;
            margin: auto;
            margin-left: 0;
            margin-right: 12px;
            .van-checkbox__label{
                margin-left: 0;
                color: #808080;
            }
        }
        .van-submit-bar__text{
            margin: auto;
            margin-left: 0;
            margin-right: 0;
            padding: 0;
        }
        .van-button{
            margin: auto 0;
            // height: 40px;
            line-height: normal;
            // border-radius: 20px;
            width: 100px;
            font-size: .85rem;
            background-color: #EE2D2D;
            border-color: #EE2D2D;
        }
        .van-button.disable{
            background-color: #ccc;
            border-color: #ccc;
            color:#fff;
    }
    }
    .van-checkbox__icon--checked .van-icon.van-icon-success{
        border-color: #EE2D2D;
        background-color: #EE2D2D;
    }
    .pan-corporate-name {
        font-size: 14px;
        padding: .64rem;
        margin-bottom: .533rem;
        border: 1px solid #E4E7ED;
        border-left: 0;
        border-right: 0;
        display: flex;
    .left-radio{
        width: 20px;
        margin-right: 10px;
        display: flex;
        float: none;
    .van-checkbox__icon{
        margin: auto;
    }
    }
    .right-shop-name{
        margin: auto;
        margin-left: 0;
            .stop_img{
                width: 18px;
                margin-right: 9px;
                height: 17px;
            }
            .shop_name{
                overflow: hidden;
                line-height: 14px;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 14px;
                margin: auto;
                max-width: 200px;

                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            .stop_right_img{
                width: 7px;
                height: 12px;
                margin: auto;
                margin-left: 5px;
            }
        }
    }

    .shoppingCart-goods-title-img {
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        width: 70px;
        height: 70px;
    /* 蒙层 */
    .mongolia {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2;
        color: #fff;
        text-align: center;
        background: rgba(21, 21, 21, 0.7);
        width: 50px;
        height: 50px;
        line-height: 50px;
            font-size: 10px;
        border-radius: 50px;
        margin: auto;
    }
    img{
        display: block;
        width: 100%;
    }
    }
    .shoppingCart-goods-title-info{
        .van-swipe-cell__right{
            .van-button{
                height: 100%;
                line-height: normal;
                .delete-goods{
                    color: #fff;
                    font-size: .75rem;
                }
            }
        }
    }
    .shoppingCart-goods-title-title {
        font-size: 12px;
        color: #424242;
        line-height: .8rem;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-left: 10px;
    }
    
    .shoppingCart-goods-title-info-box{
        padding: 0 0 0 .64rem;
        background-color: unset;
        .row2{
            margin: auto;
            margin-left: 0;
            margin-right: 10px;
            width: 1.72rem;
        }
        .disabled .van-icon{
            background-color: #f2f2f2;
        }
        .shoppingCart-goods-title-info-attr{
            background-color: #f2f2f2;
            border-radius: 5px;
            padding: .64rem;
            margin: auto;
            margin-right: 10px;
            margin-left: 0;
            width: calc(100% - 1.72rem);
            .row9{
                margin: auto;
                margin-left: 0px;
            }
            .row10{
                margin: auto;
                margin-right: 0;
            }
            .is_invalid{
                color: #424242;
            }
        }
    }
    .shoppingCart-goods-title-info-box::after{border:none;}
    .shoppingCart-goods-title-info-box::before{border:none;}
    /* 背景图 */
    .cart-background {
        color: #777;
        text-align: center;
        width: 85px;
        margin: 50px auto 0;
    img{
        display: block;
        width: 100%;
    }
    }
    .cart-text{
        text-align: center;
    div:nth-child(1){
        margin: 13px 0 8px;
        font-size: 14px;
        line-height: 14px;
        color: #212121;
    }
    div:nth-child(2){
        font-size: 12px;
        line-height: 12px;
        color: #808080;
    }
    }
    .cart-btn{
        margin: 15px auto 45px;
        width: 83px;
        height: 32px;
        border-radius: 5px;
        background-color: #EE2D2D;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
    }
.vantLoading{
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 9999;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
