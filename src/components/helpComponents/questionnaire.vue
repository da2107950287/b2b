<template>
    <div class="helpQuestionDom">
        <navbar title="帮助中心" type="left" @clickleft="onClickLeft"></navbar>
        <div class="help-question">
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import "../../assets/css/commonstyle.css";

import navbar from "../navbar/nav.vue"
export default {
    data(){
        return{
            
        }
    },
    created(){

    },
    mounted(){

    },
    computed:{
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
    },
    components:{
        navbar
    }
}
</script>
<style scoped lang="less">

</style>

