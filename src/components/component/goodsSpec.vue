<template>
    <div>
        <!-- 属性框 -->
        <div class="goods-oder-box">
            <!-- 商品图片 -->
            <div class="goods-oder-name">
                <van-row>
                    <van-col span='6'>
                        <div class="goods-order-img">
                            <img :src="goodsImage" />
                        </div>
                    </van-col>
                    <van-col span='18'>
                        <div class="goods-order-price-box">
                            <div class="goods-order-price-title">{{goodsName}}</div>
                            <div class="goods-order-price">¥{{goodsPrice}}</div>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <!-- 单属性 -->
            <div class="goods-order-one" v-show="show == 1">
                <div class="goods-order-one-title">
                    <div class="goods-order-one-title-box" :data-id='goodsOrderTwo.id'>{{goodsOrderTwo.name}}</div>
                    <div v-for="(item,index) in goodsOrderTwo.values" :key="index">
                        <van-row class="goods-order-ont-lis dflex">
                            <van-col span='14' class="dflex-left">
                                <span data-id='1' :id='item.id'>{{item.label}}</span>
                            </van-col>
                            <van-col span='10' class="dflex-right">
                                <div class="stepper">
                                    <button @click.stop="reduce" class="reduce"></button>
                                    <input type="text" value='0' @blur='lose'>
                                    <button @click="plus" class="plus"></button>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                     <!-- 单属性提交按钮 -->
                    <div class="button-sbmit" v-show="show == 1">
                        <van-button type="danger" size="large" @click="buttonSbmitOne">加入购物车</van-button>
                    </div>
                </div>
            </div>

            <!-- 多属性 -->
            <div class="goods-order-two" v-show="show == 2">
                <!-- 标题 -->
                <div v-for="(itemInfo,index) in goodsOrderOne.infoOne" :key="index" class="get-dom">
                    <div id="goods-order-lis-box" :data-id='itemInfo.id'>
                        <div class="goods-order-one-title" :data-id='itemInfo.id' info="8">{{itemInfo.name}}</div>
                    </div>
                    <div v-for="(val,key) in itemInfo.values" :key="key" :data-id='val.id' class="goods-order-one-select" @click="select">
                        <label :for="key+index">
                            <div>{{val.label}}</div>
                        </label>
                    </div>
                </div>
                <!-- 循环值 -->
                <div v-for="(item,index) in goodsOrderOne.infoTwo" :key="index" class="current">
                    <div id="goods-order-lis-box" :data-id='item.id'>
                        <div class="goods-order-one-title" :data-id='item.id' info="8">{{item.name}}</div>
                    </div>
                    <div class="goods-order-ont-lis-box" v-for="(val,index) in item.values" :key="index" :data-id='val.id'>
                        <van-row class="goods-order-ont-lis dflex">
                            <van-col span='14' class="dflex-left">
                                <span data-id='1' :id='val.id'>{{val.label}}<template v-if="val.unit != null">/{{val.unit}}</template></span>
                            </van-col>
                            <van-col span='10' class="dflex-right">
                                <div class="stepper dflex">
                                    <button @click="reduce" class="reduce"></button>
                                    <input type="text" value='0' @blur='lose'>
                                    <button @click="plus" class="plus"></button>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                        <!-- 多属性提交按钮 -->
                    <div class="button-sbmit" v-show="show == 2">
                        <van-button type="danger" size="large" @click="buttonSbmitTwo">加入购物车</van-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 按钮 -->
       
       
    </div>
</template>

<script>
    import'swiper/dist/css/swiper.css'
    import $ from "jquery";
    import 'font-awesome/css/font-awesome.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {post,HandleData} from '../../assets/js/commonAPI.js';
    import Vue from 'vue';
    Vue.prototype.$post = post
    export default {
        props:['goodsID','id','data','goodsName','goodsImage','goodsPrice','measure_unit'],
        data() {
            return {
                goodsOrderName:[],
                goodsOrderTwo:[],               //单属性
                goodsOrderOne:[],               //多属性
                titleName:'',
                // goodsName:'',                   //商品名称
                // goodsImage:'',                  //商品图片
                // goodsPrice:'',                  //商品价格
                show:1,                         //控制显示属性
                spec:'',
                // goodsID:'',
                // id:'',
                info:[],                        //缓存数据
                objSum:{},
                // data:'',
            }
        },
        created(){
            switch(this.data.code){
                case 0:
                    for(name in this.data.data.spe){
                        this.goodsOrderName.push(name);
                    }
                    if(this.goodsOrderName.length <= 1){
                        this.show = 1;
                        this.goodsOrderTwo = this.data.data.spe[this.goodsOrderName[0]];
                    }else{
                        this.show = 2;
                        this.goodsOrderOne = HandleData(this.data.data.spe);
                    }
                    break;
                default:
                    break;
            }
        },
        methods:{

            /* 属性选择 */
            /* 单属性提交 */
            buttonSbmitOne(){
                const getArr=[];
                const eve = event.srcElement?event.srcElement:event.target;
                const dom = $($(eve).parents('.van-actionsheet').find('input[type="text"]'));
                let totalNumber = 0;
                for(let i=0; i<dom.length; i++){
                    const goodsObj = {};
                    if($(dom[i]).val() != 0){
                        goodsObj.number = $(dom[i]).val();
                        goodsObj.spec = $(dom[i]).parents('.goods-order-ont-lis').find('span').attr('id');
                        getArr.push(goodsObj);
                        totalNumber+=goodsObj.number;
                    }
                }
                if(getArr.length == 0){
                    this.$toast('请选择需要购买商品');
                    return;
                }

                if(this.moq > totalNumber){
                    this.$toast('您所购买的商品总量尚未达到起批量!');
                    return;
                }

                this.$post("/?c=cart&a=addToCart",{
                    wholesale_id:this.id,
                    attribute:getArr
                })
                .then((res)=>{
                    switch (res.code) {
                        case 0:
                            // this.$router.push({
                            //     path: '/shoppingCart'
                            // });
                            this.$toast("添加购物车成功");

                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            break;
                    }
                })
            },
            /*  多属性提交 */
            buttonSbmitTwo(){
                const getArr = [];
                for(let i=0; i<this.info.length; i++){
                    let obj = {};
                    obj.spec = this.info[i].spec.sort().join(',');
                    obj.number = this.info[i].number;
                    getArr.push(obj);
                }
                if(getArr.length == 0){
                    this.$toast('请选择购买商品的规格');
                    return;
                }
                this.$post('/?c=cart&a=addToCart',{
                    wholesale_id:this.id,
                    attribute:getArr
                })
                .then((res)=>{
                    switch (res.code) {
                        case 0:
                            // this.$router.push({
                            //     path: '/shoppingCart'
                            // });
                            this.$toast("添加购物车成功");
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            break;
                    }
                })
            },
            //进步器减
            //增加
            plus(){
                //4、创建数组，保存数据
                let all = [];
                //5、创建对象，保存键，值
                let obj = {};
                let htmlDemo = event.srcElement?event.srcElement:event.target;
                let number = Number($(htmlDemo).prev().val());
                 $(htmlDemo).prev().val(number += 1);




                //1、选择HTML选中的标签
                let selectHtml = $(htmlDemo).parents('div.goods-order-two').find('div.goods-order-one-select.select');
                //2、选择input标签
                let inputHtml = $(htmlDemo).parents('div.goods-order-two').find('input[type="text"]');


                //6、查找选中的id，并赋值给数组
                for(let i=0; i<selectHtml.length; i++){
                    all.push($(selectHtml[i]).attr('data-id'));
                }

                //8、查找有值的inputID标签，并赋值给数组
                all.push($(htmlDemo).parents('.goods-order-ont-lis-box').attr('data-id'));
                obj.spec = all;
                //9、获取总数量赋值给数组
                obj.number = $(htmlDemo).parents('div.stepper').find('input[type="text"]').val();

                //10、判断当前数据是否存在缓存中
                if(this.info.length != 0){
                    //11、循环查找是否有存在的值
                    for(let i=0; i<this.info.length; i++){
                        if(this.info[i].spec.toString() == obj.spec.toString()){
                            this.info[i].number = obj.number;
                            return;
                        }
                    }
                    this.info.push(obj);
                }else{
                    //没有数据执行
                    this.info.push(obj);
                }
                //清空缓存对象；
                all = [];
                obj ={};
            },
            //减少
            reduce(){
                //4、创建数组，保存数据
                let all = [];
                //5、创建对象，保存键，值
                let obj = {};

                let htmlDemo = event.srcElement?event.srcElement:event.target;
                let number = Number($(htmlDemo).next().val());
                $(htmlDemo).next().val(number -= 1);


                //1、选择HTML选中的标签
                let selectHtml = $(htmlDemo).parents('div.goods-order-two').find('div.goods-order-one-select.select');
                //2、选择input标签
                let inputHtml = $(htmlDemo).parents('div.goods-order-two').find('input[type="text"]');


                //6、查找选中的id，并赋值给数组
                for(let i=0; i<selectHtml.length; i++){
                    all.push($(selectHtml[i]).attr('data-id'));
                }

                //8、查找有值的inputID标签，并赋值给数组
                all.push($(htmlDemo).parents('.goods-order-ont-lis-box').attr('data-id'));
                obj.spec = all;
                //9、获取总数量赋值给数组
                obj.number = $(htmlDemo).parents('div.stepper').find('input[type="text"]').val();

                //10、判断当前数据是否存在缓存中
                if(this.info.length != 0){
                    //11、循环查找是否有存在的值
                    for(let i=0; i<this.info.length; i++){
                        if(this.info[i].spec.toString() == obj.spec.toString()){
                            this.info[i].number = obj.number;
                            return;
                        }
                    }
                    this.info.push(obj);
                }else{
                    //没有数据执行
                    this.info.push(obj);
                }
                //清空缓存对象；
                all = [];
                obj ={};


            },
            //失去焦点
            lose(){
                //1、当前元素
                const eve = event.srcElement?event.srcElement:event.target;
                //2、选中属性标签
                const selectHtml = $(eve).parents('div.goods-order-two').find('div.goods-order-one-select.select');
                //3、当前元素父级
                const eveDom = $(eve).parents('.goods-order-ont-lis-box');
                //4、创建数组，保存数据
                let all = [];
                //5、创建对象，保存键，值
                let obj = {};
                    all.push($(selectHtml).attr('data-id'),$(eveDom).attr('data-id').toString());
                    obj.spec = all;
                    obj.number = $(eve).val();
                //6、判断当前数据是否存在缓存中
                if(this.info.length != 0){
                    //7、循环查找是否有存在的值
                    for(let i=0; i<this.info.length; i++){
                        if(this.info[i].spec.toString() == obj.spec.toString()){
                            this.info[i].number = obj.number;
                            return;
                        }
                    }
                }else{
                    this.info.push(obj);
                }

                if($(eve).val() == ''){
                   $(eve).val(0)
                }
            },
            //初始化选中
            getDom(){
                const getDom = $('.get-dom');
                for(let i=0; i<getDom.length; i++){
                    let seletDom = $(getDom[i]).find('.goods-order-one-select')[0];
                        $(seletDom).addClass('select');
                        $(seletDom).find('input[type="radio"]').attr('checked','checked');
                }
            },
            //选中
            select(){
                const _this = this;

                let sumAll = [];      //存储选中状态的ID
                let obj = {};         //组合状态ID
                let allInfo =[];      //存储对比ID

                const eve = event.srcElement?event.srcElement:event.target;             //event对象
                const sibLings = $(eve).parents('.goods-order-one-select').siblings();  //选中当前元素的兄弟级
                const current = $(eve).parents('.goods-order-one-select');              //选中的当前元素
                const currentBox = $(eve).parents('.goods-oder-box');                   //当前选中元素的盒子

                for(let i=0; i<sibLings.length; i++){
                    if(!$(sibLings[i]).hasClass('select')){
                        current.addClass('select');
                        sibLings.removeClass('select');
                    }
                }
                //1、获取选中的元素
                let selectHtml = $(eve).parents('div.goods-order-two').find('div.goods-order-one-select.select');
                //2、获取页面中的input元素
                let inputHtml = $(eve).parents('div.goods-order-two').find('input[type="text"]');

                //3、查找input不为0的元素
                for(let i=0; i<selectHtml.length; i++){
                    sumAll.push($(selectHtml[i]).attr('data-id'));
                }

                //4、获取input自定义值
                for(let i=0; i<inputHtml.length; i++){
                    var key = sumAll.toString()+','+$(inputHtml[i]).parents('div.goods-order-ont-lis-box').attr('data-id');
                    $(inputHtml[i]).attr('data-id',key);
                    $(inputHtml[i]).val(0);
                }

                for(let i=0; i<this.info.length; i++){
                    for(let j=0; j<inputHtml.length; j++){
                        if($(inputHtml[j]).attr('data-id') == this.info[i].spec.join()){
                            $(inputHtml[j]).val(this.info[i].number);
                        }
                    }
                }
            },
        },
        mounted(){
            //调用初始化值
            this.getDom();
            //
        },
        watch:{
            goodsID:function(){
                this.goodsID = this.goodsID;
            },
            id:function(){
                this.id = this.id;
            },
            data:function(){
                this.data = this.data;
            },
            goodsName:function(){
                this.goodsName = this.goodsName;
            },
            goodsImage:function(){
                this.goodsImage = this.goodsImage;
            },
            goodsPrice:function(){
                this.goodsPrice = this.goodsPrice;
            }
        }
    }
</script>

<style scoped>
    .dflex{display: flex;}
    .goods-oder-box{
        width: 100%;
        height: 30rem;
        background-color: #fff;
    }
    .goods-oder-name{
        width: 100%;
        font-size: 14px;
        position: fixed;
        z-index: 20001;
        background-color: #fff;
        border-bottom: 1px solid #eee;
    }
    .goods-order-img{
        width: 75px;
        height: 75px;
        padding: 0;
        overflow: hidden;
    }
    .goods-order-img img{
        width: 100%;
        display: block;
        height: auto;
    }
    .goods-order-price-box{
        margin-top: 2rem;
        font-size: 14px;
    }
    .goods-order-price{
        padding: .2rem 0;
        color: #e87442;
        font-size: 16px;
    }
    .goods-order-one,
    .goods-order-two{
        padding-top: 122px;
        padding-bottom: 50px;
        background-color: #fff;
    }

    /*单属性样式*/
    .goods-order-one{
        padding: 6rem .6rem;
        font-size: 14px;
        margin-top: .6rem;
    }
    .goods-order-one-title-box{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: .7rem;
        padding-bottom: .4rem;
        border-bottom: 1px solid #eee;
    }
    .goods-order-one-title-content span{
        padding: .4rem .6rem;
        border-radius: .3rem;
        margin: .4rem;
        display: inline-block;
        background-color: #eee;
    }
    .goods-order-ont-lis{
        height: 2rem;
        line-height: 2rem;
        margin-bottom: .2rem;
    }
    .goods-order-ont-lis div{
        display: block;
    }
    .goods-order-ont-lis .dflex-left{
        margin: auto;
        width: auto;
        margin-left: 0;
    }
    .goods-order-ont-lis .dflex-center{
        margin: auto;
        width: auto;
    }
    .goods-order-ont-lis .dflex-right{
        margin: auto;
        width: auto;
        margin-right: 0;
    }
    /*多属性样式*/
    .goods-order-two{
        margin: 0 .6rem;
    }
    .goods-order-one-title{
        height: 2rem;
        line-height: 2rem;
        font-weight: bold;

    }
    .goods-order-one-select{
        display: inline-block;
        padding: .2rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        border: 1px solid #eee;
        border-radius: .3rem;
    }
    .goods-order-one-select div{
        padding: .2rem .6rem;
        text-align: center;
    }

    /* 属性选中状态 */
    .select{
        border: 1px solid #d1442b !important;
        background-color: #fff !important;
    }

    /* 加入购物车按钮 */
    .button-sbmit{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        z-index: 20015;
    }
    /* 进步步器 */
    .stepper{
        font-size: 0px;
        text-align: right;
        display: inline-block;
    }
    .stepper button{
        width: 30px;
        height: 30px;
        line-height: 18px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ebedf0;
        position: relative;
        padding: 5px;
        vertical-align: middle;
    }
    .stepper input{
        width: 33px;
        height: 26px;
        padding: 1px;
        line-height: 1;
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
    .reduce::before{
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
    .plus::before{
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
    .plus::after{
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
    .plus{
        font-size: 18px;
    }
</style>

<style lang="less" scoped>

</style>
