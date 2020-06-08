<template>
    <!-- contractdefeated -->
    <div>
        
        <van-nav-bar
        title="未通过"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="fea">
            <img src="../../assets/img/shenqingshibai.png" alt="" class="secimg">
            <div>申请失败</div>
            <div class="sec-text-box" v-html="defeatedMsg">
            </div>
            <div class="secBtnBox">
                <button class="secBtn" @click="deabtn">返回修改</button>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import '../../assets/css/resetiu.css'
import {appFunc} from '../../assets/js/commonAPI.js'
Vue.prototype.$appFunc = appFunc;
export default {
    data(){
        return{
            defeatedMsg:'您的申请填写有误，请您重新填写申请！'
        }
    },
    created(){
        if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('idcardFace'))){
            this.defeatedMsg = localStorage.getItem('defeatedMsg');
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({
                path:'/personal',
            })
        },
        deabtn(){
            this.$router.push({
                path:'/merchantsEdit',
            })
        }
    }
}
</script>
<style scoped>

.van-nav-bar{
    border-bottom: 1px solid #f2f2f2;
}
.van-nav-bar .van-icon{
    color: #232323;
}
.fea .sec-text-box{
    max-width: 217px;
    word-break: break-word;
    font-size: 14px;
    line-height: 18px;
    margin: 10px auto;
}
.fea .secBtn{
    max-width: 217px;
    margin: auto;
    margin-top: 20px;
}
</style>


