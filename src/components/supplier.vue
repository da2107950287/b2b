<template>
    <div>
        <!-- 顶部导航栏 -->
        <navbar type="left" title="关注店铺" @clickleft="PreviousPage"></navbar>
        <!-- 供应商收藏内容 -->
        <div v-if="show === 2" class="supplier">
            <van-swipe-cell :right-width="88" class="supplierLis" v-for="(item,index) in supplierArr" :key="index">
                <div @click="jumpBusiness(item)">
                    <van-cell-group class="supplier-title clearStyle">
                        <div class="supplier-log">
                            <img v-if="item.logo_thumb" :src="item.logo_thumb" width="100%"/>
                            <img v-else src="../assets/img/touxiang.png" width="100%"/>
                        </div>
                        <div class="supplier-name">{{item.shop_name}}</div>
                    </van-cell-group>
                </div>
                <van-button slot="right" type='danger' @click="onClose(item)" >取消收藏</van-button>
            </van-swipe-cell>
            
            <div v-if="lock===1" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
            <p class="end-msg">{{endMsg}}</p>
            <div v-if="endMsg==''" style="height:100px;"></div>
        </div>
        <div v-else-if="show === 1">
            <searchNone item="supplier"></searchNone>
            <merchantDom></merchantDom>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import {post} from '../assets/js/commonAPI.js'
    import { Dialog } from 'vant';

    import merchantDom from "./component/recommendComponent/merchant.vue"
    import searchNone from "./component/searchNone/searchNone.vue"
    import vantLoading from "./vantLoading.vue";
    import vloading from "./vloading.vue";
    import navbar from "./navbar/nav.vue";

    Vue.use(Dialog);
    Vue.prototype.$post = post
    export default {
        components:{
            merchantDom,
            searchNone,
            vantLoading,
            vloading,
            navbar,
        },
        data() {
            return {
                show: 0,
                supplierArr:[],
                page:2,
                endMsg:'',
                lock:0,
            }
        },
        created(){
            this.$post('/?c=user&a=mySupplier',{})
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.supplierArr = res.data.list;
                        if(this.supplierArr.length) {
                            this.show = 2;
                            if(res.data.list.length>9){
                                window.addEventListener('scroll', this.handleScroll)
                            }
                        }else {
                            this.show = 1;
                        }
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                    default:
                        break;
                }
            });
        },
        methods:{
            PreviousPage(){
                this.$router.go(-1);
            },
            onClose(item) {
                const eve = event.srcElement?event.srcElement:event.target;
                const swipeDemo = $(eve).parents('.van-swipe-cell');

                Dialog.confirm({
                    title: '取消收藏',
                    message: '确定要取消收藏该商家吗？'
                }).then(() => {
                // on confirm
                    this.$parent.$refs.loading.style.display = 'flex'
                    this.$post('/?c=merchant&a=unFollow',{
                        id:item.seller_id
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch(res.code){
                            case 0:
                                let n = 0;
                                for(;n < this.supplierArr.length; n++) {
                                  if(this.supplierArr[n].seller_id === item.seller_id) {
                                    this.supplierArr.splice(n ,1)
                                    break
                                  }
                                }
                                if(!this.supplierArr.length) {this.show = 1}
                                this.$toast('取消成功');
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;                            
                            default:
                                break;
                        }
                    })
                }).catch(() => {
                // on cancel
                });
            },
            jumpBusiness(item){
                console.log(item)
                this.$router.push({
                    path:'/shop',
                    query:{
                        businessHeadTitle:item.shop_name,
                        index:item.seller_id,
                        region:localStorage.getItem('wapres')
                    }
                })
            },
            //商品瀑布流加载
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
                    if(_this.lock == 0){
                        _this.lock = 1;
                        _this.$post('/?c=user&a=mySupplier',{
                            page:_this.page,
                        }).then((res) => {
                            switch (res.code){
                                case 0:
                                    _this.lock = 0;
                                    _this.page+=1;
                                    if(res.data.list.length>0){
                                        _this.supplierArr=[..._this.supplierArr,...res.data.list];
                                    }
                                    if(res.data.list.length<10){
                                        _this.endMsg = '已经没有更多内容啦~';
                                        window.removeEventListener('scroll', this.handleScroll)
                                    }
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
            },
        },
        destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style scoped>
    .supplierBar{
        border-bottom: 1px solid #eee;
    }
    .supplierLis,
    .supplier-title{
        line-height: normal;
        background-color: #fff;
    }
    .supplierLis{
        border-bottom: 0;
        padding: .533rem 0;
    }
    .supplier-title{
        padding: 0 .6rem;
        display: flex;
    }
    .supplier-log{
        display: block;
        width: 2.67rem;
        height: 2.67rem;
        border-radius: 5px;
        overflow: hidden;
        margin: auto 0;
    }
    .supplier-log img{
        height: 100%;
        width: 100%;
        display: block;
    }
    .supplier-name{
        float: left;
        padding-left: .3rem;
        font-size: 16px;
        color:#212121;
        display: block;
        line-height: normal;
        margin: auto;
        margin-left: 0;
    }

    .clearStyle::after{
        clear: both;
        content: '';
        height: 0;
        display: block;
        visibility: hidden;
    }
    .van-button{
        height: 100%;
        line-height: normal;
    }
.vantLoading{
    margin-top: 20px;
    width: 100%;
    display: flex;
}
.business-loading {
    padding: 10px;       
}
    .end-msg {
    font-size: 14px;
    text-align: center;
    color: #c9c9c9;
    line-height: 3em;
    margin: 0;
    }
</style>