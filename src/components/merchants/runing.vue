<template>
    <div>
        <van-nav-bar
            title="《代运营流程条款》"
            left-arrow
            @click-left="onClickLeft"
        />
        
       <div class="fea" v-for="(item,index) in content" :key="index">
            {{item.content}}
        </div>
         <p @click="deabtn">确认提交</p>
    </div>
</template>
<script>
import Vue from "vue";
import { post } from "../../assets/js/commonAPI";
Vue.prototype.$post = post;
export default {
    data(){
        return{
            content:[] 
        }
    },
    created(){
        this.$post('/?c=user&a=rule', {
            }).then((res) => {
                if(res.code===0){
                   if(type==2){
                        this.content=res.data
                   }
                }else if(res.code == 1){
                    this.$toast(res.msg);
                }
            });
    },
    methods:{
        deabtn(){
            window.localStorage.setItem( 'runimg', "1" ),
            this.$router.push({
                path:'/check'
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.fea{
    margin:12px 10px;
    text-align: center
}
.secimg{
    width:160px;
    height:115px;
}
</style>


