<template>
    <div class="answermsg">
        <van-nav-bar
            title="评价中心"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-tabs v-model="active" @change="onchange(active)">
            <van-tab :title="left">
                <leftanswer :leftdata="leftdata" :show="show"></leftanswer>
            </van-tab>
            <van-tab :title="right">
                <rightanswer :rightdata="rightdata" :show="show"></rightanswer>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import Vue from 'vue';
const leftanswer = ()=>import("../answer/leftaanswer.vue");
const rightanswer = ()=>import("../answer/rightanswer.vue");

export default {
    data(){
        return{
            active:0,
            left:'待评价',            //左侧标题
            right:'已评价' ,    //右侧标题
            leftdata:[],        //左侧内容
            rightdata:[],       //右侧内容
            show:0,
        }
    },
    created(){
        
        let index=this.$route.query.index
        if(index){
            this.active=index
        }
        if(this.active==0){
            
            this.$post("/?c=order&a=list", {
                status:104,
                page:this.page,
                limit:10,
                }).then((res) => {
                    switch (res.code){
                        case 0:
                            this.leftdata=res.data.list
                            if(res.data.list.length > 0){
                                this.show = 2;
                            }else{
                                this.show = 1;
                            }
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            
                            break;
                    }
            });
        }else if(this.active==1){
            // 获取待回复列表
                this.$post("/?c=order&a=list", {
                    status:108,
                    page:this.page,
                    limit:10,
                    }).then((res) => {
                        switch (res.code){
                            case 0:
                                this.rightdata=res.data.list
                                if(res.data.list.length > 0){
                                    this.show = 2;
                                }else{
                                    this.show = 1;
                                }
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                    });
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push({
                path:'/personal',
                query:{
                    index:1
                }
            })
        },
        // 请求数据
        onchange(index,title){
            this.show = 0;
            if(index===0){
                this.$post("/?c=order&a=list", {
                    status:104,
                    page:this.page,
                    limit:10,
                    }).then((res) => {
                        switch (res.code){
                            case 0:
                                this.leftdata=res.data.list
                                if(res.data.list.length > 0){
                                    this.show = 2;
                                }else{
                                    this.show = 1;
                                }
                                break;
                                
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                });
            }else if(index===1){
                // 获取待回复列表
                this.$post("/?c=order&a=list", {
                    status:108,
                    page:this.page,
                    limit:10,
                    }).then((res) => {
                        switch (res.code){
                            case 0:
                                this.rightdata=res.data.list
                                if(res.data.list.length > 0){
                                    this.show = 2;
                                }else{
                                    this.show = 1;
                                }
                                break;
                                
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                    });
            }
        },
    },
    components:{
      rightanswer,
      leftanswer
    },
}
</script>
<style>
    .answermsg .van-tab{
        font-size: 12px;
    }
    .answermsg .van-tab--active{
        color: #dc322b;
        font-size: 14px;
    }
</style>


