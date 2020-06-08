<template>
    <div class="anctionBox">
        <!-- 标题 -->
        <navbar type="both" title="采购竞标" rightTxt="发布" @clickleft="goPreviousPage" @clickRight="releaseInfo"></navbar>

        <!-- 切换标签栏 -->
        <div class="auction-tab">
            <van-tabs v-model="active" @change="changeWhole">
                <van-tab title="进行中">
                    <whole :status='2' :auctionList="auctionList" :specialShow="specialShow" :piteraShow="piteraShow" @auction="auctionDom" @special="specialDom" :show="show" :clock="clock" :endMsg="endMsg"></whole>
                </van-tab>
                <van-tab title="未审核">
                    <whole :status='0' :auctionList="auctionList" :specialShow="specialShow" :piteraShow="piteraShow" @auction="auctionDom" @special="specialDom" :show="show" :clock="clock" :endMsg="endMsg"></whole>
                </van-tab>
                <van-tab title="已成交">
                    <whole :status='3' :auctionList="auctionList" :specialShow="specialShow" :piteraShow="piteraShow" @auction="auctionDom" @special="specialDom" :show="show" :clock="clock" :endMsg="endMsg"></whole>
                </van-tab>
                <van-tab title="全部">
                    <whole :status='-1' :auctionList="auctionList" :specialShow="specialShow" :piteraShow="piteraShow" @auction="auctionDom" @special="specialDom" :show="show" :clock="clock" :endMsg="endMsg"></whole>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import Vue from "vue";
    import "../assets/css/animate.css";
    import "font-awesome/css/font-awesome.css";
    import { post } from "../assets/js/commonAPI.js";
    import whole from './component/whole.vue';
    import runSingle from './component/runSingle';
    import endSingle from './component/endSingle';

    import navbar from '../components/navbar/nav.vue'

    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                active: 0,
                masck: 0,
                elastic: 0,
                auctionList:[],
                specialShow:false,
                piteraShow:false,
                show:0,

                page:2,
                endMsg:"",
                clock:1,
            }
        },
        components:{
            navbar,
            whole,
            runSingle,
            endSingle
        },
        created(){
            let val = this.$route.query.val;
            this.active=val
            this.changeWhole(val);

            this.specialShow = false;
            this.piteraShow = false;
            this.auctionList = [];
        },
        methods:{
            //####=>返回上一页
            goPreviousPage(){
                this.$router.push({
                    path:'/auction'
                });
            },
            //####=>发布求购单
            releaseInfo(){
                this.$router.push({
                    path:"/purchaseOrder"
                })
            },
            changeWhole(key){
                this.$router.push({
                    query:{
                        val : key
                    }
                })
                window.removeEventListener('scroll', this.handleScroll)
                this.show = 0;
                this.specialShow = false;
                this.piteraShow = false;
                this.auctionList = [];

                this.page = 2;
                this.endMsg = "";
                this.clock = 1;
                
                if(key == 0){
                    this.$post('/?c=sourcing&a=purchaseList',{
                        status: '2',
                        page:1,
                        type:2,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                this.auctionList = res.data;
                                if(this.auctionList.length < 3){
                                    this.specialShow = true;
                                }
                                if(this.auctionList.length < 1){
                                    this.piteraShow = true;
                                }
                                
                                if(this.auctionList.length>0){
                                    this.show = 2;
                                    if(this.auctionList.length>=10){
                                        console.log(this.auctionList)
                                        window.addEventListener('scroll', this.handleScroll)
                                    }
                                }else{
                                    this.show = 1;
                                }
                                break;
                            default:
                                this.specialShow = true;
                                break;
                        }
                    });
                }else if(key == 1){
                    this.$post('/?c=sourcing&a=purchaseList',{
                        status: '0',
                        page:1,
                        type:2,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                this.auctionList = res.data;
                                if(this.auctionList.length < 3){
                                    this.specialShow = true;
                                }
                                if(this.auctionList.length < 1){
                                    this.piteraShow = true;
                                }
                                
                                if(this.auctionList.length>0){
                                    this.show = 2;
                                    if(this.auctionList.length>=10){
                                        console.log(this.auctionList)
                                        window.addEventListener('scroll', this.handleScroll)
                                    }
                                }else{
                                    this.show = 1;
                                }
                                break;
                            default:
                                this.specialShow = true;
                                break;
                        }
                    });
                }else if(key == 2){
                    this.$post('/?c=sourcing&a=purchaseList',{
                        status: '3',
                        page:1,
                        type:2,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                this.auctionList = res.data;
                                if(this.auctionList.length < 3){
                                    this.specialShow = true;
                                }
                                if(this.auctionList.length < 1){
                                    this.piteraShow = true;
                                }
                                
                                if(this.auctionList.length>0){
                                    this.show = 2;
                                    if(this.auctionList.length>=10){
                                        console.log(this.auctionList)
                                        window.addEventListener('scroll', this.handleScroll)
                                    }
                                }else{
                                    this.show = 1;
                                }
                                break;
                            default:
                                this.specialShow = true;
                                break;
                        }
                    });
                }else if(key == 3){
                    this.$post('/?c=sourcing&a=purchaseList',{
                        status: '-1',
                        page:1,
                        type:2,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                this.auctionList = res.data;
                                if(this.auctionList.length < 3){
                                    this.specialShow = true;
                                }
                                if(this.auctionList.length < 1){
                                    this.piteraShow = true;
                                }
                                
                                if(this.auctionList.length>0){
                                    this.show = 2;
                                    if(this.auctionList.length>=10){
                                        console.log(this.auctionList)
                                        window.addEventListener('scroll', this.handleScroll)
                                    }
                                }else{
                                    this.show = 1;
                                }
                                break;
                            default:
                                this.specialShow = true;
                                break;
                        }
                    });
                }else{
                    this.$post('/?c=sourcing&a=purchaseList',{
                        status: '2',
                        page:1,
                        type:2,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                this.auctionList = res.data;
                                if(this.auctionList.length < 3){
                                    this.specialShow = true;
                                }
                                if(this.auctionList.length < 1){
                                    this.piteraShow = true;
                                }
                                
                                if(this.auctionList.length>0){
                                    this.show = 2;
                                    if(this.auctionList.length>=10){
                                        console.log(this.auctionList)
                                        window.addEventListener('scroll', this.handleScroll)
                                    }
                                }else{
                                    this.show = 1;
                                }
                                break;
                            default:
                                this.specialShow = true;
                                break;
                        }
                    });
                }
            },
            auctionDom(data){
                this.auctionList = data;
            },
            specialDom(data){
                console.log(data);
                this.specialShow = data;
            },
            
            //瀑布流加载
            handleScroll () {
                let _this=this
                console.log(1);
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //滚动条到底部的条件
                if ((scrollTop + windowHeight) >= (scrollHeight-50)) {
                //写后台加载数据的函数
                    if(_this.clock == 1){
                        _this.clock = 2;
                        _this.$post('/?c=sourcing&a=purchaseList',{
                            status: _this.status,
                            page:_this.page,
                            type:2,
                            }).then((res) => {
                            switch (res.code){
                                case 0:
                                    if(res.data.length>0){
                                        _this.auctionList= [..._this.auctionList,...res.data];
                                    }
                                    if(res.data.length<10){
                                        this.endMsg="没有更多内容啦~"
                                        window.removeEventListener('scroll', this.handleScroll)

                                    }
                                    _this.clock = 1;
                                    _this.page+=1
                                    break;
                                case 1:
                                    _this.$toast(res.msg);
                                    break; 
                                default:
                                    break;
                            }
                        })
                    }
                }
            }
        },
        watch: {
            'auctionList'(val, oldVal) {
                this.auctionList = this.auctionList
            },
            'specialShow'(val,oldVal){
                this.specialShow = this.specialShow;
            }
        },
        destroyed () {
            this.endMsg = "";
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style>
    html,body{background-color: #f2f2f2;}
    .anctionBox .right-icon{color: #333;}
    .anctionBox .van-nav-bar__right .van-nav-bar__text{color: #EE2D2D;}
    .anctionBox .van-tab{color: #424242;font-size: 12px;}
    .anctionBox .van-tab--active{color: #EE2D2D;font-size: 14px;}
    
</style>

<style scoped>
    .right-icon{
        font-size: 22px;
    }
</style>