<template>
    <div>
        <!-- 头部导航 -->
        <van-nav-bar
            left-arrow
            title='申诉订单'
            @click-left="goPreviousPage"
            class="comment-info-bar"
        />

        <div class="appeal_box">
            <div class="">
                <van-tabs v-model="active" @change="changeTab(active)"  :line-width="50" :line-height="3">
                    <van-tab title="处理中">
                        <appealLists :lists="cllist" @goToPages = "goToPages" :show="show" :status="status"></appealLists>
                    </van-tab>
                    <van-tab title="申请记录">
                        <appealLists :lists="jllist" @goToPages = "goToPages" :show="show" :status="status"></appealLists>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post,appFunc} from '../../assets/js/commonAPI.js'
    import appealLists from '../appeal/appeal_list'
    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    export default {
        data() {
            return{
                active:0,
                cllist:[],
                jllist:[],
                appealType:0,
                appealId:0,
                show:0,
                status:9,
            }
        },
        created(){
            let orderact= 0;
            if(!this.$appFunc.prototype.isEmpty(this.$route.query.active)){
                orderact = this.$route.query.active;
            }
            if(!this.$appFunc.prototype.isEmpty(this.$route.query.type)){//存在的时候，为1为推广
                this.appealType = this.$route.query.type;
                sessionStorage.setItem('appealType',this.appealType);
            }else{
                this.appealType = sessionStorage.getItem('appealType');
                if(this.$appFunc.prototype.isEmpty(this.appealType))this.appealType = 0;
            }
            if(!this.$appFunc.prototype.isEmpty(this.$route.query.id)){
                this.appealId = this.$route.query.id;
                sessionStorage.setItem('appealId',this.appealId);
            }else{
                this.appealId = sessionStorage.getItem('appealId');
                if(this.$appFunc.prototype.isEmpty(this.appealId))this.appealId = 0;
            }
            this.active=orderact;

            if(orderact==0){
                this.status = 9;
                this.$post("/?c=afterAdmin&a=list", {
                    status:9,
                    page:1,
                    limit:10,
                    id:this.appealId,
                    type:this.appealType,
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
                this.status = 10;
                this.$post("/?c=afterAdmin&a=list", {
                    status:10,
                    page:1,
                    limit:10,
                    id:this.appealId,
                    type:this.appealType,
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
                this.$router.go(-1);
            },
            goToPages(active){
                this.active = active;
            },
            changeTab(index){
                this.show=0;
                if(index==0){
                    this.status = 9;
                    this.$post("/?c=afterAdmin&a=list", {
                        status:9,
                        page:1,
                        limit:10,
                        id:this.appealId,
                        type:this.appealType,
                    }).then((res) => {
                        if(res.code === 0){
                            this.cllist=res.data;
                            if(res.data.length > 0){
                                this.show = 2;
                            }else{
                                this.show = 1;
                            }
                            this.$router.push({
                                path:"/appealLists",
                                query:{active:index}
                            });
                        }              
                    });
                }else if(index==1){
                    this.status = 9;
                    this.$post("/?c=afterAdmin&a=list", {
                        status:10,
                        page:1,
                        limit:10,
                        id:this.appealId,
                        type:this.appealType,
                    }).then((res) => {
                        if(res.code === 0){
                            this.jllist=res.data;
                            if(res.data.length > 0){
                                this.show = 2;
                            }else{
                                this.show = 1;
                            }
                            this.$router.push({
                                path:"/appealLists",
                                query:{active:index}
                            });
                        }              
                    });
                }
            }
        },
        components:{
            appealLists
        }
    }
</script>

<style>
    .appeal_box .van-tab{
        font-size: 12px;
    }
    .appeal_box .van-tab--active{
        color: #dc322b;
        font-size: 14px;
    }
</style>
<style scoped>
.van-nav-bar .van-icon{color: #333;}
</style>