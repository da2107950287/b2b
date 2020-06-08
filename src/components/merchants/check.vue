<template>
    <div>
        <van-nav-bar
            title="审核确认"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="fea">
            <img src="../../assets/img/shenghechenggong.png" alt="" class="secimg">
            <div class="secTitle">申请成功</div>
            <div class="secText">请您与招商人员沟通后确认资料是否有误，如信息无误，请你仔细阅读下面条款并提交</div>
            <!-- <div class="secText">商家在入驻平台前，应仔细阅读以下协议或合同文件。请商家在决定登录或使用服务前再次确认已知悉并完全理解本合同的所有内容。</div> -->
            <van-checkbox @change="changeCheack" v-model="checkedtwo" class="feaCheckbox"><div @click.stop="runing"><span>同意</span>《优惠流程条款》</div></van-checkbox>
            <!-- <van-checkbox @change="changeCheack" v-model="checkedthree" class="feaCheckbox"><div @click.stop="privacy"><span>同意</span>《隐私条约》</div></van-checkbox> -->
            <div class="secBtnBox">
                <button @click="deabtn" :disabled="disable" class="secBtn">确认提交</button>
            </div>
        </div>

        <loading v-if="loading"></loading>
    </div>
</template>
<script>
import Vue from "vue";
import { post } from "../../assets/js/commonAPI";
import '../../assets/css/resetiu.css'
import loading from "../loading.vue"

Vue.prototype.$post = post;
export default {
    data(){
        return{
            checkedone:false,
            checkedtwo:false,
            checkedthree:false,
            codeone:'',
            codetwo:'',
            codethree:'',
            flag:'',
            disable:true,

            loading:true,
        }
    },
    created(){
        let discounts=localStorage.getItem("discounts")
        let privacy=localStorage.getItem("privacy")
        let runimg=localStorage.getItem("runimg")
        if(discounts==1){
            this.checkedone=true
        }
        if(privacy==2){
            this.checkedtwo=true
        }
        
        this.$post('/?c=user&a=favorable',)
        .then((res) => {
            if(res.code==0){
                if(res.data==2){
                    this.loading = false;
                }else {
                    this.$router.push({
                        path: '/personal'
                    })
                }
            }else if(res.code == 1){
                this.$toast(res.msg);
            }
        })
        /* if(runimg==3){
            this.checkedthree=true
        } */
        if(this.checkedtwo==true/*  && this.checkedthree==true */){
            this.disable = false;
        }else{
            this.disable = true;
        }
    },
    methods:{
        changeCheack(){
            //TODO need to check which is required item by server api
            if(this.checkedtwo==true/*  && this.checkedthree==true */){
                this.disable = false;
            }else{
                this.disable = true;
            }
        },
        deabtn(){
            /* if(this.checkedone==true){
                this.codeone=1+","
            } */
            if(this.checkedtwo==true){
                this.codetwo=3+","
            }
            /* if(this.checkedthree==true){
                this.codethree=2+","
            } */
             // 发送确认 请求
            this.$post('/?c=user&a=acceptRule', {
                    type:this.codeone+this.codetwo+this.codethree
                }).then((res) => {
                    if(res.code===0){
                        // 如果提交成功跳转审核
                        this.$router.push({
                            path:'/index'
                        }) 
                    }else if(res.code == 1){
                        this.$toast(res.msg);
                    }
            });
        },
        // 跳转《待运营流程条款》
        discounts(){
             this.$router.push({
                path:'/discounts',
                query:{id:'1'},
            })
        },
        // 跳转《《隐私条约》
        privacy(){
             this.$router.push({
                path:'/discounts',
                query:{id:'2'},
            })
        },
        // 跳转《优惠流程条款》
        runing(){
             this.$router.push({
                path:'/discounts',
                query:{id:'3'},
            })
        },
        onClickLeft(){
            this.$router.push({
                path:'/personal',
            })
        }
    },
    components:{
        loading,
    }
}
</script>
<style scoped>

.van-nav-bar{
    border-bottom: 1px solid #f2f2f2;
}
.van-nav-bar .van-icon{
    color: #232323;
}
</style>


