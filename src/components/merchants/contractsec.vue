<template>
    <div>
         <van-nav-bar
        title="商家入驻"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="sec">
            <img src="../../assets/img/shenqingchenggong.png" alt="" class="secimg">
            <div class="secTitle">申请成功</div>
            <div>您的申请，我们已经收到，</div>
            <div>正在审核中，请您耐心等待,</div>
            <div>我们会于一个工作日内与您联系，</div>
            <div>感谢您对我们工作的支持与理解！</div>
            <div class="secBtn" @click="tel('400-128-8566')">客服电话：400-128-8566</div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { post } from "../../assets/js/commonAPI";
Vue.prototype.$post = post;
export default {
    data(){
        return{

        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({
                path:'/personal'
            })
        },
        tel(phone){
            window.location.href='tel:'+ phone;
        }
    }
}
</script>
<style scoped>
.sec{
    margin:auto auto;
    text-align: center
}
.secimg{
    width:150px;
}

.van-nav-bar{
    border-bottom: 1px solid #f2f2f2;
}
.van-nav-bar .van-icon{
    color: #232323;
}
.sec{
    font-size: 14px;
    color: #808080;
    margin-top: 100px;
    line-height: 21px;
}
.secTitle{
    color: #212121;
    font-size: 16px;
    margin: 19px 0;
}
.secBtn{
    border:1px solid #ee2d2d;
    width: 217px;
    margin: auto;
    border-radius: 5px;
    height: 35px;
    line-height: 35px;
    color: #ee2d2d;
    margin-top: 30px;
}
</style>


