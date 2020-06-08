<template>
    <div>
        待支付
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                
            }
        },
        created(){
            this.$post('/?c=order&a=list',{
                status:100,
                page:1,
                page_size:5
            })
            .then((res)=>{
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>