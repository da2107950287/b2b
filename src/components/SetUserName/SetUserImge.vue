<template>
    <div>
      <div class="company-profile-bar van-nav-bar van-hairline--bottom" style="z-index: 1;">
            <div class="van-nav-bar__left" @click="goPreviousPage">
                <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
            </div>
            <div class="van-nav-bar__title van-ellipsis">用户名</div>
            <!-- <div class="van-nav-bar__right" @click="buttonImge" v-if="show == 0">
                <span class="van-nav-bar__text">确定</span>
            </div> -->
        </div>
        <!-- 内容 -->
        <div class="userName-title-box">
            <div class="userName-title"></div>
            <van-cell-group class="userNameImg">
                <div class="wxUploadForm" v-if="is_weixin">
                    <div class="personal-img" @click="wxSetUsenImge">
                        <img :src='head' width="100%">
                    </div>
                </div>
                <div class="uploadForm" v-else>
                    <form id="uploadForm" enctype="multipart/form-data">
                        <input id="file" type="file" name="file" class="file" @change="setUsenImge"/>
                    </form>
                    <div class="personal-img">
                        <img :src='head' width="100%">
                    </div>
                </div>
                <div  class="clickSetImge">点击修改头像</div>
            </van-cell-group>
        </div>
        <div class="mesDiv">
            <div v-if="seller==0">
                <van-field
                        v-model="nickname"
                        clearable
                        label= "昵称："
                        placeholder="请输入昵称"
                />
            </div>
            <div v-if="seller==1">
                <van-field
                        v-model="nickname"
                        clearable
                        label= "用户名称："
                        placeholder="请输入用户名称"
                />
                <van-cell-group>
                    <van-field
                        v-model="manageLabel"
                        clearable
                        label="行业类型："
                        placeholder="请输入行业类型"
                        @click="label"
                    />

                    <van-field
                        v-model="principal"
                        clearable
                        label="负责人："
                        placeholder="请输入负责人"
                    />
                    
                    <van-field
                        v-model="channelPhone"
                        clearable
                        label="所属采购顾问："
                        placeholder="请输入所属采购顾问手机号"
                        :disabled="isChannelPhone!=''"
                    />
                </van-cell-group>
            </div>
        </div>
        <div class="userButton">
            <van-button type="danger" class="userBut" @click="userBut">确认提交</van-button>
        </div>

        <industryLable class="goodsClass-alert" chose="radioDom" @onClickClose="onClickClose" v-if="goodsClassShow"  @listLoadingShow="listLoadingShow" @listLoadingHide="listLoadingHide"></industryLable>

        <div class="vantLoading" v-show="!vloadingShow">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import $ from 'jquery'
    import { Field } from 'vant';
    import {is_wexin} from '../../assets/js/commonAPI.js'
    import {wxUpload,wxStart} from '../../assets/js/wxjs.js'

    const vloading = () => import('../vloading.vue');
    const industryLable =  ()=>import("../goodsClass/industryLable.vue");

    export default {
        data() {
            return {
                userName:'',
                head:require('../../assets/img/get_avatar.png'),
            //    show:1,
                seller:0,                           //是否采购商
                nickname:'',                        //昵称
                nameLabel:'昵称',                   //昵称标签（可能叫用户名称）
                principal:'' ,                      //负责人
                channelPhone:'',                    //采购顾问手机号
                isChannelPhone:'',                    //采购顾问手机号
                manageLabel:'',                     // 经营类型
                label_id:'',                        //经营类型id
                is_weixin:is_wexin(),               //经营类型id

                imgLock:0,
                vloadingShow:true,                  //请求限制开关 true 可以请求 false 不可请求

                onetitle:'',
                goodsClassShow:false,
            }
        },
        components:{
            vloading,
            industryLable,
        },
        created(){
            if(is_wexin()){
                this.vloadingShow = false;
                wxStart(()=>{
                    this.vloadingShow = true
                })
            }
            // let twoItem=localStorage.getItem('twoItem'); //行业类型
            // let headImg=localStorage.getItem('userImge'); //用户头像
            // if(headImg){
            //     this.head=headImg;
            //     localStorage.removeItem('userImge');
            // }
            // const twoItems=JSON.parse(twoItem);
            // console.log(twoItems)
            // if(twoItems){
            //     this.manageLabel=twoItems.label_name;
            //     this.label_id=twoItems.label_id;
            //     // localStorage.removeItem('twoItem');
            // }
            this.$post('/?c=user&a=info',{
            })
            .then((res) => {
                if(res.code == 0){
                    // if(headImg!==null && twoItems!==''){
                    //     this.head=headImg
                    // }else{
                    //     this.head=res.data.head;
                    // }
                    if(res.data.head){
                        this.head=res.data.head;
                    }
                    this.nickname=res.data.name;
                    if(Number(res.data.user_group_type) == 1){
                        // 如果用户点击了切换行业标签则从浏览器上获取标签   
                        this.principal=res.data.legal_person;
                        this.manageLabel=res.data.label_name;
                        this.channelPhone=res.data.recommend_mobile || '';
                        this.isChannelPhone=res.data.recommend_mobile || '';
                        /* if(twoItems){
                            this.manageLabel=twoItems.label_name; 
                        }else{
                            this.manageLabel=res.data.label_name;
                        } */
                       
                        this.seller = 1;
                    }else{
                        this.seller = 0;
                        this.principal = '';
                        this.manageLabel = '';
                    }
                    // localStorage.setItem('userImge', this.head);
                }
            })
            // 设置完成以后去删除
            localStorage.removeItem('twoItem');
        },
        methods:{
            //返回上一页
            goPreviousPage(){
                this.$router.go(-1);
            },
            wxSetUsenImge(){
                let _this = this;
                if(_this.imgLock == 0){
                    _this.imgLock = 1;
                    // this.show = 0;
                    wxUpload({},_this,'userImge',100,(e)=>{
                        _this.head = e;
                        _this.imgLock = 0;
                    },(cancel)=>{
                        _this.imgLock = 0;
                    });
                }
            },
            setUsenImge(){
                let _this = this;
                if(_this.imgLock == 0){
                    _this.imgLock = 1;
                    let file = $('#file')[0].files[0];
                    let formData = new FormData();
                    formData.append('file', file);
                    _this.$post('/?c=user&a=upload',formData).then((res)=>{
                        if(res.code == 0){
                            _this.head = res.data.img;
                            localStorage.setItem('userImge', _this.head);
                        }
                        _this.imgLock = 0;
                    });
                }
            },
            // 点击跳转到标签选择
            label(){
                this.goodsClassShow = true;
                /* this.$router.push({
                    path:'/industryLable',
                }) */
            },
            
            onClickClose(data){
                //####=>获取商品分类
                if(!this.$appFunc.prototype.isEmpty(data)){
                    let oneitem=data.enterItem;
                    let twoitem=data.enterlable;
                    if(oneitem!==''&&oneitem!==null){
                        let oneitemObj=oneitem;
                        this.onetitle=oneitemObj.label_name
                    }
                    if(twoitem!==''&&twoitem!==null){
                        let names='';
                        let ids='';
                        let twoitemObj=twoitem;
                        for(var key in twoitemObj){
                            names+=('|'+twoitemObj[key]);
                            ids+=(key+',');
                        }
                        ids = ids.substring(0,ids.length-1);
                        this.label_id=ids;
                        this.manageLabel=this.onetitle+'\xa0'+names

                        localStorage.removeItem('twoItem');
                    }
                }
                this.goodsClassShow = false;
            },
            listLoadingShow(){
                this.$parent.$refs.loading.style.display = "flex"
            },
            listLoadingHide(){
                this.$parent.$refs.loading.style.display = "none"
            },

            // 点击提交用户的信息
            userBut(){
                this.$parent.$refs.loading.style.display = 'flex'
                let setheadImg=localStorage.getItem('userImge');
                
                let channelPhone = this.channelPhone;
                if(this.isChannelPhone != ''){
                    channelPhone = '';
                }
                this.$post('/?c=user&a=editInfo',{
                    nick_name:this.nickname,
                    legal_person:this.principal,
                    label_id:this.label_id,
                    user_picture:setheadImg,
                    channel_phone:channelPhone,
                })
                .then(res => {
                    this.$parent.$refs.loading.style.display = 'none'
                    if (res.code == 0){
                        this.$toast(res.msg);
                        this.$router.push({
                            path:'/personal'
                        });
                    }
                })
            }
        },
        
    }
</script>
<style lang="less">
.mesDiv{
    .van-field__label {
        max-width: 120px;
    }
}
</style>
<style scoped>
    .userName-title-box{
        padding-top: .5rem;
    }
    .userName-title{
        font-size: 14px;
        color: #777;
        line-height: 1.5rem;
        padding: 0 1rem;
    }
    .clickSetImge{
        font-size: .5rem;
        line-height: 1rem;
        padding: 0 1rem;
    }
    .file{
        display: none;
    }
    /* 头像样式 */
    .personal-img {
        width: 3rem;
        height: 3rem;
        display: inline-block;
        line-height: 2rem;
        text-align: center;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #fff;
        margin: auto;
    }
    .personal-img img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .userNameImg{
       text-align: center;
    }
    .mesDiv{
        margin-top:5px;
    }
    .userButton{
        width:100%;
        text-align:center;
        height: 2.5rem;
        margin-top: 13px;
    }
    .userButton .userBut{
         width: 92%;
    }
    .uploadForm{
        position: relative;
    }
    #uploadForm{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0;
        width: 3rem;
        height: 3rem;
        margin: auto;
    }
    #uploadForm input{
        display: block;
        height: 100%;
        width: 100%;
    }

    
.vantLoading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1000;
}

.goodsClass-alert{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 5;
    background-color: #f2f2f2;
}
</style>