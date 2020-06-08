<template>
    <div>
        <van-nav-bar
            title="商家入驻"
            left-arrow
            @click-left="onClickLeft"
        />
       
       <div class="fea">
            <img src="../../assets/img/chengweishangjia.png" alt="" class="secimg">
            <div class="fea-success">恭喜您成为商家</div>
            <div @click="deabtn">进入供应商</div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { post } from "../../assets/js/commonAPI";
import '../../assets/css/resetiu.css'
Vue.prototype.$post = post;
export default {
    data(){
        return{
            checkedone:false,
            checkedtwo:false,
            checkedthree:false,
        }
    },
    methods:{
        deabtn(){
            window.location = '/sw';
        },
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.fea{
    margin-bottom: 65px;
}
.secimg{
    margin-bottom: 17px;
    width: 140px;
}
</style>


