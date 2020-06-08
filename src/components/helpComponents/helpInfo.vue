<template>
    <div class="helpInfoDom">
        <navbar title="查看解决方案" type="left" @clickleft="onClickLeft"></navbar>
        <div class="help-info fz_14 color_424242">
            <div class="help-info-title">{{title}}</div>
            <div class="help-info-content " v-html="content"></div>
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
            id:'',
            content:'',
            title:'',
        }
    },
    created(){
        this.id = this.$route.query.id
        this.$parent.$refs.loading.style.display = 'flex'
        this.$post('/?c=feedback&a=helpInfo',{
            id:this.id
        }).then((res)=>{
            this.$parent.$refs.loading.style.display = 'none'
            if(res.code == 0){
                this.content = res.data.content;
                this.title = res.data.title;
            }else if(res.code ==1){
                this.$toast(res.msg)
            }else{
                // this.$toast(res.msg)
            }
        })
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
<style lang="less">
    .help-info-content{
        padding: 17px 12px;
        p{
            display: block;
            margin: auto;
        }
        img{
            display: block;
            max-width: 100%;
        }
    }
</style>
<style scoped lang="less">
    .helpInfoDom{
        .help-info{
            background-color: #fff;
            .help-info-title{
                padding: 17px 12px;
                border-bottom: 1px solid #f2f2f2;
            }
        }
    }
    
</style>

