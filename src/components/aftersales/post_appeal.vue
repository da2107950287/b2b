<template>
    <div class="post-sale">
        <!-- 头部导航 -->
        <van-nav-bar
            left-arrow
            title='申诉'
            @click-left="goPreviousPage"
            class="comment-info-bar"
        />
        <div class="comment_box fz_12">
            <div class="commentTop after">
                <div class="commentLabelTitle">申诉原因</div>
            </div>
            <div class="comContentBox">
                <div class="textIcon" :class="{'show':textIcon}">
                    <img src="../../assets/img/tianxie.png" alt="">
                </div>
                <textarea maxlength="100" v-model="remake" placeholder="请填写您的申述理由" class="content" :class="{'show':textIcon}" @focus="remakeOn" @blur="remakeOff">
                </textarea>
            </div>
        </div>
        
        <div class="postSaleBtn">
            <van-button class="postSumbit fz_16" @click="postSumbit">确定</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import $ from 'jquery'
    import {is_wexin,copy} from '../../assets/js/commonAPI.js'
    const vloading = () => import('../vloading.vue');

    export default {
        data() {
            return{
                active:0,
                saledenyList:[],           //拒绝页面数据
                saledenyMoney:'',          //金额
                after_sn:'',               //服务单号
                price:0,
                maxPrice:0,
                message:'',
                
                imgList:[{
                    id:0,
                },{
                    id:1,
                }],
                is_weixin:is_wexin(),
                textIcon:true,
                remake:'',
                remake_num:0,
            }
        },
        created(){
            this.price = this.maxPrice;
            // 获取服务单号
            let afterSn=this.$route.query.id
            if(afterSn){
                this.after_sn=afterSn
            }
            // 获取商品详情数据
            let  denylist = JSON.parse(localStorage.getItem('deny'));
            let  denymoney = JSON.parse(localStorage.getItem('denymoney'));
            if(denylist){
                this.saledenyList=denylist
                this.saledenyMoney=denymoney;
                this.maxPrice=denymoney;
            }
        },
        watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
            remake:{
                handler:function(){
                    let num = this.remake.length;
                    if(num<100){
                        this.remake_num = num;
                    }else{
                        this.remake_num = 100;
                    }
                    if(num == 0){
                        this.textIcon = true;
                    }else{
                        this.textIcon = false;
                    }
                },
                deep:true
            }
        },
        methods:{
            goPreviousPage(){
                if(this.fromHerf == null){
                    this.$router.push({
                        path:'/index'
                    });
                }else{
                    this.$router.go(-1);
                }
            },
            remakeOn(){
                this.textIcon = false;
            },
            remakeOff(){
                this.textIcon = true;
            },
            postSumbit(){
                // 申诉请求
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post("/?c=afterSale&a=apply", {
                    after_sn: this.after_sn,
                    reason:this.remake
                }).then((res) => {
                    this.$parent.$refs.loading.style.display = 'none'
                    if(res.code === 0){
                        this.$toast('提交成功!');
                        this.$router.go(-1); 
                    }else if(res.code === 1){
                        this.$toast(res.msg)
                        this.$router.go(-1); 
                    }else {
                        this.$router.go(-1); 
                    }
                });
                
            }
        },
        components:{
            vloading,
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

    .comment_box{
        border-top: 1px solid #f2f2f2;
        padding: 15px 12px;
        background-color: #fff;
        margin-bottom: 10px;
        .commentTop{
            margin-bottom: 10px;
            .commentLabelTitle{
                border-left: 2px solid #EE2D2D;
                padding-left: 5px;
            }
        }
        .commentLabel{
            width: 40px;
            height: 20px;
            border: 1px solid #F3AF0D;
            color: #F3AF0D;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            float: left;
            border-radius: 5px;
        }
        .comContentBox{
            position: relative;
            .textIcon{
                width: 18px;
                margin-bottom: 15px;
                position: absolute;
                display: none;
                img{
                    display: block;
                    width: 100%;
                }
            }
            .content{
                width: 100%;
                resize:none;
                border: none;
                line-height: 18px;
                height: 80px;
                font-size: 14px;
            }
            .textIcon.show{
                display: block;
            }
            .content.show{
                text-indent: 20px;
            }
            .text_count{
                position: absolute;
                right: 0;
                bottom: 0;
                color: #ccc;
                font-size: 12px;
                span{
                    color: #999;
                }
            }
        }
    }
    .postSumbit{
        width: 331px;
        height: 44px;
        background-color: #EE2D2D;
        color: #fff;
        margin: auto;
        display: block;
        border-radius: 5px;
        overflow: hidden;
    }
    .vantLoading{
        margin-top: -20px;
        width: 100%;
        display: flex;
        position: fixed;
        z-index: 9999;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>
