<template>
    <div class="receiving">
        <!-- 收货地址标题 -->
        <van-nav-bar
            title="收货地址管理"
            class="receiving-goods-bar"
            @click-left="goPreviousPage"
            @click-right="getReceiving"
            right-text="添加地址"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
        </van-nav-bar>

        <!-- 收货地址列表 -->
        <div v-if="receivingInfo.length>0">
            <div class="receiving-goods-li " v-for="(item,index) in receivingInfo" :key="index" ><!-- valid 判断地址是否在配送范围内 -->
                <van-swipe-cell :right-width="65" :class="{'disabled':item.valid == 0}">
                    <van-row class="dflex">
                        <div class="receiving-goods-box">
                            <div @click="goRelease(item)">
                                <div class="receiving-goods-title fz_14 dflex">
                                    <span >{{item.consignee}}</span>&emsp;&emsp;&emsp;
                                    <span>{{item.mobile}}</span>
                                </div>
                                <div class="receiving-goods-add fz_12">{{item.full_address}}</div>
                            </div>
                        </div>
                        <div class="icon-style-box">
                            <div class="icon-style" @click="revise(item)">
                                <van-icon name="edit"/>
                            </div>
                        </div>
                    </van-row>
                    <van-button slot="right" type='danger' @click="onClose(item)">删除</van-button>
                </van-swipe-cell>

            </div>
        </div>
        <!--  -->
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Dialog} from 'vant';
    import $ from 'jquery';
    import 'font-awesome/css/font-awesome.css';
    import {post} from '../../assets/js/commonAPI.js';
    Vue.prototype.$post = post;
    Vue.use(Dialog)
    export default {
        data() {
            return {
                receivingInfo:[],
                page:1,
                show:false,
                dataInfo:'',
                clock:1,
                lpage:2,           //当前页码
            }
        },
        created(){
            const _this = this;
            this.index = this.$route.query.index

            this.$post('/?c=user&a=myAddress',{
                page: this.page,
            }).then((res)=>{
                switch(res.code){
                    case 0:
                        this.receivingInfo = res.data.list;
                        this.page += 1;
                        break;
                    
                    default:
                        break;
                }
            });
            
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll)
        },
        methods:{
            goPreviousPage(){
                this.$emit('onClickClose')
            },
            getReceiving(){
                this.$router.push({name:'getReceiving'});
            },
            goRelease(value){
                if(this.index != 1){
                    if(value.valid == 1){
                        this.$emit('onClickClose',JSON.stringify(value))
                    }else{
                        this.$toast('该地区不在配送范围内，请选择其他地址!');
                    }
                }
            },
            revise(item){
                localStorage.setItem('wapItem',JSON.stringify(item));
                this.dataInfo = item;
                this.$router.push({
                    name:'getReceiving',
                    query:{
                        type:'edit'
                    }
                })
            },
            onClose(item) {
                let eve = event.srcElement?event.srcElement:event.target;
                let parentsDom = $(eve).parents('div.receiving-goods-li');
                Dialog.confirm({
                    title: '删除',
                    message: '确定要删除吗？'
                }).then(() => {
                // on confirm
                    this.$post('/?c=user&a=delAddress',{
                        address_id:item.address_id
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                $(parentsDom).remove();
                                this.$toast('删除成功!');
                                break;
                            default:
                                this.$toast('删除失败!');
                                break;
                        }
                    })
                }).catch(() => {
                // on cancel
                });
            },
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
                    if(_this.clock == 1){
                        _this.clock = 2;
                        _this.$post("/?c=user&a=myAddress", {
                            page:_this.lpage,
                            }).then((res) => {
                            switch (res.code){
                                case 0:
                                
                                if(res.data.list.length>0){
                                    _this.receivingInfo=[..._this.receivingInfo,...res.data.list];
                                }
                                if(res.data.list.length<10){
                                    window.removeEventListener('scroll', this.handleScroll)
                                }
                                _this.clock = 1;
                                _this.lpage+=1
                                break;
                                default:
                                break;
                            }
                        });
                    }
                }
            },
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>
<style>
    .receiving .van-nav-bar__text{
        color: #333;
    }
</style>

<style scoped>
    .fz_12{font-size: 12px;}
    .fz_14{font-size: 14px;}
    .dflex{display: flex;}
    /* 标题栏 */
    .receiving-goods-bar{
        border-bottom: 1px solid #eee;
    }
    .icon-style{
        font-size: 22px;
        text-align: right;
        color: #333;
    }
    .icon-title-style{
        font-size: 14px;
    }
    /* 收货地址列表 */
    .receiving-goods-li{ 
        padding: 15px 12px;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        color: #424242;
    }
    .receiving-goods-li .disabled{
        color: #999;
    }
    .receiving-goods-add{
        padding: 10px 0;
    }
    .van-popup{
        width: 100%;
        height: 80%;
    }
    .receiving-goods-li .van-row{
        justify-content: space-between;
    }
    .receiving-goods-box{
        margin: auto;
        margin-left: 0;
    }
    .icon-style-box{
        margin: auto;
        margin-right: 0;
    }
</style>