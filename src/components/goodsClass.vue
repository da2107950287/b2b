<template>
    <div>
        <!-- 商品分类 -->
        <van-nav-bar
            left-arrow
            title="商品分类"
            class="goods-class-bar"
            @click-left="goPreviousPage"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
        </van-nav-bar>
        <div style='height:48px'></div>
        <!-- 商品分类类别 -->
        <div class="goods-class-li">
            <div v-show="show === 0" v-for="(item,index) in goodsClassList" :key="index">
                <van-radio-group v-model="fatherRadio">
                    <van-cell-group>
                        <van-cell :title="item.cat_name" clickable @click="fatherRadio = setRadio(index,item,'parent')">
                            <!-- <van-radio :name="index" /> -->
                            选择下级
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
            <div v-show="show === 1"  v-for="(item,index) in goodsClassInfo" :key="index">
                <van-radio-group v-model="childRadio">
                    <van-cell-group>
                        <van-cell :title="item.cat_name" clickable @click="childRadio = setRadioo(index,item,'child')">
                            <van-radio  v-show="choicBox" :name="index" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </div>
        <!-- 提交按钮 -->
        <div style="height:50px"></div>
        <div class="goods-class-button">
            <van-row>
                <van-col span='12'>
                    <van-button size="large" @click="closePage">取消</van-button>
                </van-col>
                <van-col span='12'>
                    <van-button size="large" type="danger" @click="submitButton">提交</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {post} from '../assets/js/commonAPI.js';
    export default {
        data() {
            return {
                goodsClassList:[],     //一级页面渲染的分类列表
                goodsClassInfo:[],     //下级页面渲染的分类列表
                fatherRadio: '0',            //
                childRadio: '0',            //
                goodClass:[],          //当前选中的分类
                show:0,                //当前显示页面
                choicBox:true,        //
                clock : 1,             //返回开关
                type : '',
            }
        },
        created(){
            this.$post('/?a=category',{
                parent_id:'',
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.goodsClassList = res.data;
                        break;
                    default:
                        break;
                }
            })
        },
        mounted(){
          if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.fun, false);//false阻止默认事件
          }
        },
        methods:{
            fun(){
                console.log(this.clock);
                if(this.clock == 1){
                    if(this.show === 0){
                        this.$router.go(-1);
                    }else{
                        this.choicBox=false;
                        this.show = 0;
                    }
                }else{
                    this.$router.go(-1);
                }
            },
            goPreviousPage(){
                if(this.show === 0){
                    this.$router.go(-1);
                }else{
                    this.show = 0;
                }
            },
            closePage(){
                this.clock = 0;
                this.$router.go(-1);
            },
            setRadio(index,item,type){
                this.goodClass = item;
                this.show = 1;
                this.$post('/?a=category',{
                    parent_id:item.cat_id,
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            this.goodsClassInfo = res.data;
                            break;
                        default:
                            break;
                    }
                })
                this.type = type;
                return index;
            },
            setRadioo(index,item,type){
                this.goodClass = item;
                this.show = 1;
                this.choicBox=true;
                this.type = type;
                return index;
            },
            submitButton(){
                if(this.type == 'parent'){
                    this.$toast('请选择二级分类');
                    return false;
                }
                localStorage.setItem('goodclass',JSON.stringify(this.goodClass));
                this.clock = 0;
                this.$router.go(-1);
            },
        },
        destroyed(){
            window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
        },
        
    }
</script>

<style scoped>
    .icon-style{
        font-size: 22px;
        color: #333;
    }
    .goods-class-bar{
        width: 100%;
        position: fixed;
    }
    .goods-class-button{
        width: 100%;
        position: fixed;
        bottom: 0;
    }
    .goods-class-bar{
        border-bottom: 1px solid #eee;
    }
</style>