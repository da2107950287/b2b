<template>
    <div class="answer">
        <van-nav-bar
            left-arrow
            :title="title"
            @click-left="goPreviousPage"
        />
    </div>
</template>
<script>
import Vue from 'vue';
import {post} from '../../assets/js/commonAPI'
Vue.prototype.$post = post;
export default {
    props:["title"],
    data(){
        return{
            //  title:''    //title
        }
    },
    methods:{
        // 点击返回
        goPreviousPage(){
            this.$router.go(-1);
        },
    }
}
</script>
<style scoped>
.van-nav-bar .van-icon{
    color: #333;
}
.van-nav-bar__title{
    color: #212121;
}
</style>

