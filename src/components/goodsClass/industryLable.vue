<template>
    <div class="group-row-box enterLabelBox">
       <!-- 顶部 -->
        <van-nav-bar
            title="选择分类"
            right-text="确定"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
         <van-row class="group-row">
            <div class="dflex">
                <van-col span="8">
                    <div class="enterleft">
                        <van-badge-group :active-key="activeKey" @change="onChange" >
                                <van-badge  v-for="(item,index) in oneMenu" :key="index" :title="item.label_name" @click="everyItem(item)"/>
                        </van-badge-group>
                    </div>
                </van-col>
                <van-col class="group-row-col" span="16">
                    <div class="entertwodiv" id="box">
                        <van-checkbox-group>
                            <van-checkbox
                                v-for="(items, index) in twoMenu"
                                :key="index"
                                :name="items"
                                @click="checkRadio(items,index)"
                                :id="items.label_id"
                                :class="{'twoactive':items.active == 1}"
                            >
                                {{items.label_name}}
                            </van-checkbox>
                        </van-checkbox-group>
                        <template v-if="chose != 'radioDom'">
                            <div style="height:50px;"></div>
                            <div class="clickAllBtn " :class="{'active': checkAll == true}">
                                <div class="dflex clickAllBox" @click="onClickAll">
                                    <img src="../../assets/img/xuanzhong.png" alt="" v-if="checkAll == true">
                                    <img src="../../assets/img/weixuanzhong.png" alt="" v-else-if="checkAll == false">
                                    <span>全选</span>
                                </div> 
                            </div>
                        </template>
                    </div>
                </van-col>
            </div>
        </van-row>
    </div>
</template>
<script>
import $ from "jquery";
import {post,appFunc} from '../../assets/js/commonAPI.js';
import Vue from 'vue';
import {Badge, BadgeGroup,RadioGroup, Radio} from 'vant';
import '../../assets/css/resetiu.css'
Vue.prototype.$post = post;
Vue.prototype.$appFunc = appFunc;
export default {
    props:['chose'],
    data(){
        return {
            activeKey: 0      ,                //默认第一个激活
            radio:''     ,                     //单选的状态
            oneMenu:[]     ,                   //一级菜单
            twoMenu:[]     ,                   //二级菜单
            twoarry:[]     ,                   //二级数组
            flag:false,
            result: [],
            selectedCat: {},
            selectedCat1:[],

            checkAll:false,                     //全不选:false 全选:true
        };

    },
    created() {
        console.log(this.chose)
        // 获取一级菜单
        this.$emit('listLoadingShow')

        this.$post('/?c=user&a=getLabel',{
            parent_id:0
        }).then((res)=>{
            if(res.code == 0){
                    this.oneMenu=res.data;
                this.selectedCat1 = res.data[0];
                // 获取二级菜单
                this.$post('/?c=user&a=getLabel',{
                    parent_id:this.selectedCat1.label_id
                }).then((res)=>{
                    this.$emit('listLoadingHide')

                    let twoMenu=res.data
                    for(let key in twoMenu){
                        twoMenu[key] = {...twoMenu[key],active:0}
                    }
                    this.twoMenu = twoMenu;
                    this.checkAll = true;
                    // this.onClickAll();
                });
            }
        });
    },
    mounted(){
    },
    methods:{
       onClickLeft(){
           this.$emit('onClickClose')
        //    this.$router.go(-1)
       },
       onClickRight(){
            if(this.$appFunc.prototype.isEmptyObject(this.selectedCat)){
                this.$toast('请选择二级分类');
                return false;
            }else{
                // localStorage.setItem('enterItem',JSON.stringify(this.selectedCat1));
                // localStorage.setItem('enterlable',JSON.stringify(this.selectedCat));
                let data = {
                    enterItem:this.selectedCat1,
                    enterlable:this.selectedCat,
                }
                this.$emit('onClickClose' , data)
            }
        },
        // 点击事件
        onChange(key) {
            this.activeKey = Number(key);
        },
        onClickAll(){
            if(this.checkAll == true){
                for(let key in this.twoMenu){
                    this.checkAll = false;
                    this.twoMenu[key].active = 0;
                    delete this.selectedCat[this.twoMenu[key].label_id];
                }
            }else{
                for(let key in this.twoMenu){
                    this.checkAll = true;
                    this.twoMenu[key].active = 1;
                    this.selectedCat[this.twoMenu[key].label_id] = this.twoMenu[key].label_name;
                }
            }
        },
        // 点击二级菜单触发
        checkRadio(item,index){
            if(this.chose == 'radioDom'){
                for(let key in this.twoMenu){
                    this.checkAll = false;
                    this.twoMenu[key].active = 0;
                    delete this.selectedCat[this.twoMenu[key].label_id];
                }
            }
            if(item.active == 1){
                item.active = 0;
                console.log(item.active);
                delete this.selectedCat[item.label_id];
            }else{
                item.active = 1;
                console.log(item.active);
                this.selectedCat[item.label_id] = item.label_name;
            }
        },
        // 点击一级菜单的每一个子项
        everyItem(item){
            // 发送请求请求二级
            this.twoMenu = [];
            this.selectedCat = {};
            this.checkAll = false;
            this.$emit('listLoadingShow')
            this.$post('/?c=user&a=getLabel',{
                parent_id:item.label_id
            }).then((res)=>{
                this.$emit('listLoadingHide')
                if(res.code === 0){
                    let twoMenu=res.data;
                    for(let key in twoMenu){
                        twoMenu[key].active = 0;
                    }
                    this.twoMenu = twoMenu;
                    
                    // this.onClickAll();
                }else{
                    this.$toast("查询分类失败");
                }
            });
            let even =event.srcElement?event.srcElement:event.target;
            $(even).parents(".van-col--8").siblings(".van-col--16").find('.twoactive').removeClass('twoactive');
            // 保存数据
            this.selectedCat1 = item;
        },
    }
}
</script>
<style scoped lang="less">

    .goodsBox{background-color: #f2f2f2;}
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: 12px;line-height: 12px;}
    .fz_14{font-size: 14px;line-height: 14px;}
    .fz_16{font-size: 16px;line-height: 16px;}
    .dflex{display: flex;}
    .van-nav-bar{border-bottom: 1px solid #f2f2f2;}
    .van-nav-bar .van-icon{color: #232323;}
    .van-button{border: none;}

    .enterLabelBox{
        height: 100%;
        .group-row{
            height: 100%;
            border-top: none;
            .van-col--8{
                background: #f2f2f2;
                position: relative;
                z-index: 1;
            }
            .van-col--16{
                position: relative;
                background-color: #fafafa;
                .van-checkbox{
                    background-color: #fafafa;
                }
                .van-checkbox.twoactive{
                    background-color: #fff;
                }
                .clickAllBtn{
                    position: fixed;
                    background-color: #fff;
                }
            }
        }
        .group-row > div.dflex{
            height: 100%;
        }
    }
    .group-row-box .van-badge{
        background-color: #f2f2f2;
    }
    .group-row-box .enterleft .van-badge-group .van-badge--select{
        background-color: #fff;
    }
    .clickAllBtn{
        bottom: 0;
        height: 50px;
        border-top: 1px solid #d8d8d8;
        right: 0;
        width: 100%;
        text-align: right;
        z-index: 3;
        justify-content: flex-end;
        .clickAllBox{
            float: right;
            height: 100%;
        }
        span{
            margin: auto 0;
            display: block;
            font-size: 14px;
            margin-left: 5px;
            margin-right: 12px;
            line-height: 18px;
            height: 18px;
        }
        img{
            display: block;
            width: 18px;
            height: 18px;
            margin: auto 0;
        }
    }
    .clickAllBtn.active{
        i{
            border:1px solid #EE2D2D;
            position: relative;
        }
        span{
            color: #EE2D2D;
        }
        i::after{
            content:' ';
            background-color: #fff;
            border: 1px solid #EE2D2D;
            color: #EE2D2D;
            width: 5px;
            height: 5px;
            border-radius: 100%;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 0;
            bottom: 0;
        }
    }
</style>


