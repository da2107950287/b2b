<template>
    <div>
      <div class="shop-nav-bar">
           <van-nav-bar
                :title="shopHeaderTitle"
                left-arrow
                class="shop-nav-bar"
                @click-left="onClickLeft"
               
            />
        </div>
        <recommend></recommend>
    </div>
</template>

<script>
 import Vue from 'vue'
 import recommend from '../component/recommend.vue'
    export default {
        data(){
            return{
                shopHeaderTitle:"商品分类详情",
                
            }
        },
        components:{
           recommend
        },
        methods:{
            onClickLeft(){
                history.back();
            },
        },
        created(){
      
        }
    }
</script>

<style scoped>

</style>
