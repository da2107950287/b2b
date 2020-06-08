<template>
    <div>
        <!-- nav -->
        <van-tabs v-model="active">
            <van-tab v-for="(item,index) in navArr" :key="index" :title="item.cat_name">内容 1</van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                active:0,
                navArr:[]
            }
        },
        created(){
            this.$post('/?a=category',{
                parent_id:0
            })
            .then((res)=>{
                console.log(res);
                switch(res.code){
                    case 0:
                        console.log(res);
                        this.navArr = res.data;
                        break;
                    
                    default:
                        break;
                }
            });
            // 判断urlde 
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>