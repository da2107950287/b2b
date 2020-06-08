<template>
    <div>
        待收货
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
                status:103,
                page:1,
                page_size:5
            })
            .then((res)=>{
                console.log(res);
            })
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>