<template>
    <div>
        <van-nav-bar
                left-arrow
                :title="goods_name"
                @click-left="goPreviousPage"
        />
        <van-row>
            <van-col span="8">
               <van-badge-group :active-key="activeKey" @change="onChange" >
                    <van-badge  v-for="(item,index) in oneMenu" :key="index" :title="item.label_name" @click="everyItem(item)"/>
               </van-badge-group>
            </van-col>
            <van-col span="16">
                 <div  v-for="(item,index) in twoMenu" :key="index">
                    <van-radio-group v-model="radio">
                        <van-cell-group>
                            <van-cell :title="item.label_name" @click="checkRadio(item,index)">
                                
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </div>
            </van-col>
        </van-row>
  
        
   </div>
</template>

<script>
   import $ from "jquery";
   import {post} from '../assets/js/commonAPI.js';
   import Vue from 'vue';
   import {  Badge, BadgeGroup,RadioGroup, Radio} from 'vant';
   Vue.prototype.$post = post
    export default {
        data() {
            return {
              goods_name: '行业类别',             //商品名称 
               activeKey: 0      ,                //默认第一个激活
                radio:''     ,                  //单选的状态
                oneMenu:[]     ,                   //一级菜单
                twoMenu:[]     ,                   //二级菜单
                FirstId:0      ,                   //首次二级菜单的请求
             };
            
        },
        created() {
          // 获取一级菜单
           this.$post('/?c=user&a=getLabel',{
                parent_id:0
            }).then((res)=>{
                this.oneMenu=res.data
                this.FirstId=res.data[0].label_id
                console.log('获取参数')
                console.log(this.FirstId)
                // 获取二级菜单
                this.$post('/?c=user&a=getLabel',{
                      parent_id:this.FirstId
                    }).then((res)=>{
                        this.twoMenu=res.data
                    }); 
            }); 
          
            
        },
        methods: {
            //返回上一页
            goPreviousPage() {
                this.$router.go(-1);
            },
            // 点击事件
            onChange(key) {
                console.log(key)
                this.activeKey = Number(key);
            },
            // 点击二级菜单触发
            checkRadio(item,index){
                // console.log(item)
                //this.radio=index
                localStorage.setItem('twoItem',JSON.stringify(item));
                this.$router.go(-1);
            },
            // 点击一级菜单的每一个子项
            everyItem(item){
            // 发送请求请求二级
                this.$post('/?c=user&a=getLabel',{
                    parent_id:item.label_id
                }).then((res)=>{
                    this.twoMenu=res.data
                    
                }); 
            },
            
          
        },
        
    }
</script>

<style scoped>
   
</style>