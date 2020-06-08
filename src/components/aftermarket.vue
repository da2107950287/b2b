<template>
    <div>
        <navbar type="clear" title="退换货政策"></navbar>
        <div class="afterHtml" v-html="afterHtml"></div>
    </div>
</template>
<script>
import $ from 'jquery'
import Vue from 'vue'
import {post} from '../assets/js/commonAPI.js'

import navbar from "../components/navbar/nav.vue"

Vue.prototype.$post = post;
export default {
    data() {
        return{
            afterHtml:'',
        }
    },
    mounted(){
        this.$parent.$refs.loading.style.display = 'flex'
        this.$post('/?a=afterArticle',{}).then((res)=>{
            this.$parent.$refs.loading.style.display = 'none'
            if(res.code == 0){
                this.afterHtml = res.data;
            }
        })
    },
    components:{
        navbar,
    }
}
</script>
<style lang="less" scoped>
.afterHtml{
    font-size: 14px;
    padding: 10px 12px;
    color: #333;
}
</style>


