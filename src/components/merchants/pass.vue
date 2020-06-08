<template>
    <div>
        <van-nav-bar
            title="审核中"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="fea">
            <img src="../../assets/img/shenghezhong.png" alt="" class="secimg">
            <div class="secTitle">平台正在审核中</div>
            <div class="secText">正在审核中，请您耐心等待</div>
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
          
        }
    },
    methods:{
        
        onClickLeft(){
           this.$router.push({
                path:'/personal'
            })
        }
    }
}
</script>
<style scoped>
.secText{
    text-align: center;
    color: #808080;
}
</style>


