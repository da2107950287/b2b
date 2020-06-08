<template>
    <div>
        求购单
    </div>
</template>

<script>
    import Vue from 'vue';
    import {post} from '../../assets/js/commonAPI.js';
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                
            }
        },
        created(){
            this.$post('/?c=sourcing&a=purchaseList',{
                status: 2,
                page: 1
            })
            .then((res)=>{
                console.log(res);
            });
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>