<template>
    <div>
        <!-- 头部导航 -->
        <van-nav-bar
            left-arrow
            title='售后订单'
            @click-left="goPreviousPage"
            class="comment-info-bar"
        />

        <div class="sale_box">
            <div class="">
                <van-tabs v-model="active" @change="changeTab(active)"  :line-width="50" :line-height="3">
                    <van-tab title="处理中">
                        <salesList :lists="cllist" :active="active" @goToPages = "goToPages" :show="show" :status="status"></salesList>
                    </van-tab>
                    <van-tab title="申请记录">
                        <salesList :lists="jllist" :active="active" @goToPages = "goToPages" :show="show" :status="status"></salesList>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    import salesList from './salesList'
    Vue.prototype.$post = post;
    export default {
        data() {
            return{
                active:0,
                cllist:[],
                jllist:[],
                show:0,
                status:2,
            }
        },
        created(){
            let orderact=this.$route.query.active;
            this.active=orderact;

            if(orderact==0){
                this.status = 2;
                this.$post("/?c=afterSale&a=list", {
                    status:2,
                    page:1,
                    limit:10
                }).then((res) => {
                    if(res.code === 0){
                        this.cllist=res.data;
                        if(res.data.length > 0){
                            this.show = 2;
                        }else{
                            this.show = 1;
                        }
                    }              
                });
            }else if(orderact==1){
                this.status = 4;
                this.$post("/?c=afterSale&a=list", {
                    status:4,
                    page:1,
                    limit:10
                }).then((res) => {
                    if(res.code === 0){
                        this.jllist=res.data;
                        if(res.data.length > 0){
                            this.show = 2;
                        }else{
                            this.show = 1;
                        }
                    }              
                });
            }
        },
        methods:{
            
            goPreviousPage(){
                this.$router.push({
                    path:'/personal',
                });
            },
            goToPages(active){
                this.active = active;
            },
            changeTab(index){
                this.show = 0;
                if(index==0){
                    this.status = 2;
                    this.$post("/?c=afterSale&a=list", {
                        status:2,
                        page:1,
                        limit:10
                    }).then((res) => {
                        if(res.code === 0){
                            this.cllist=res.data;
                            if(res.data.length > 0){
                                this.show = 2;
                            }else{
                                this.show = 1;
                            }
                            this.$router.push({
                                path:'/salesLists',
                                query:{active:index}
                            });
                        }              
                    });
                }else if(index==1){
                    this.status = 4;
                    this.$post("/?c=afterSale&a=list", {
                        status:4,
                        page:1,
                        limit:10
                    }).then((res) => {
                        if(res.code === 0){
                            this.jllist=res.data;
                            if(res.data.length > 0){
                                this.show = 2;
                            }else{
                                this.show = 1;
                            }
                            this.$router.push({
                                path:'/salesLists',
                                query:{active:index}
                            });
                        }              
                    });
                }
            }
        },
        components:{
            salesList
        }
    }
</script>
<style>
    html, body{background-color: #f2f2f2;}
    .sale_box .van-tab{
        font-size: 12px;
    }
    .sale_box .van-tab--active{
        color: #dc322b;
        font-size: 14px;
    }
</style>
<style scoped>
    .van-nav-bar .van-icon{color: #333;}
</style>