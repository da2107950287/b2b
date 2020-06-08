<template>
    <div class="helpDom">
        <navbar title="帮助中心" type="left" @clickleft="onClickLeft"></navbar>
        <div class="help-ul">
            <div class="help-li fz_14 color_424242 dflex" v-for="(item,index) in list" :key="index" @click="goHelpInfo(item.id)">
                <div class="help-link" >{{item.title}}</div>
            </div>
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
            list:[],
            showList : 0,
        }
    },
    created(){
        this.$parent.$refs.loading.style.display = 'flex'
        this.$cacheStorage(
            'helpList',
            '/?c=feedback&a=help',
            'session',
            {},
            ((res)=>{
                this.$parent.$refs.loading.style.display = 'none'
                this.list = res.data;
                if(res.data.length > 0){
                    this.showList = 1;
                }else{
                    this.showList = 2;
                }
            }),
        )
    },
    computed:{
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        goHelpInfo(url){
            this.$router.push({
                path:"/helpInfo",
                query:{
                    id:url
                }
            })
        }
    },
    components:{
        navbar
    }
}
</script>
<style scoped lang="less">
    .helpDom{
        .help-ul{
            background-color: #fff;
            .help-li{
                padding: 0 12px;
                border-bottom: 1px solid #f8f8f8;
                height: 44px;
                .help-link{
                    margin: auto 0;
                }
            }
            .help-li:last-child{
                border-bottom: 0;
            }
        }
    }
</style>

