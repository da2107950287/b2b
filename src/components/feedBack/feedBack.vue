<template>
    <div class="feed">
        <navbar type="left" title="意见反馈" @clickleft="goPreviousPage"></navbar>

        <div class="feed-content">
            <div class="feed-question">问题类型</div>
            <div class="dis">
                <div v-for="(item,index) in feedbacklist" :key="index" class="feed-question-div" :class="{active:isactive == index}" @click="changeactive(index,item.cat_id)">
                    {{item.cat_name}}
                </div>
            </div>
            <!-- 问题和意见 -->
            <div class="share">
                <div class="fz_14 comment_box">
                    <div class="commentTop after">
                        <div class="commentLabelTitle">问题和意见</div>
                    </div>
                    <div class="comContentBox">
                        <div class="textIcon" :class="{'show':textIcon}">
                            <img src="../../assets/img/tianxie.png" alt="">
                        </div>
                        <textarea maxlength="100" v-model="items.text" placeholder="请补充详细问题和建议" class="content" :class="{'show':textIcon}">
                        </textarea>
                        <div class="fz_12 text_count"><span>{{remake_num}}</span>/100</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上传图片 -->
        <div class="upimg">
            <div class="upimg-title">图片（选填，提供问题图片）</div>
            <div class="upimg-img">
                <uploadBox :imgList="head" :imgName="imgName" :count="1"></uploadBox>
            </div>
        </div>
        <!-- 确认按钮 -->
        <div class="btnsure" @click="btnsure">确认</div>
    </div>
</template>
<script>
import Vue from 'vue';
import {post,is_wexin} from '../../assets/js/commonAPI.js';
import $ from 'jquery';
import navbar from '../navbar/nav.vue'
import uploadBox from '../upload/uploadBox.vue'
Vue.prototype.$post = post;
export default {
    data(){
        return{
            feedbacklist:[],    //意见反馈分类
            textIcon:true,   //评价 
            items:{
                text:'',
            },              //评价内容
            remake_num:0,
            is_weixin:is_wexin(),                         //经营类型id
            imgLock:0,
            head:[],
            imgName:'feedBackImg',
            isactive:0,
            catId:'',               //分类的id
            type:0,                 //判断是否有上传图片
        }
    },
    created(){
        //意见反馈分类
        this.$post("/?c=feedback&a=category",{
        }).then(res=>{
           if(res.code==0){
               this.feedbacklist=res.data;
               this.changeactive(0,res.data[0].cat_id)
           }else if(res.code ==1){
               this.$toast(res.msg);
           }
        })
    },
    watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
        items:{
            handler:function(){
                let num = this.items.text.length;
                if(num<100){
                    this.remake_num = num;
                }else{
                    this.remake_num = 100;
                }

                if(num == 0){
                    this.textIcon = true;
                }else{
                    this.textIcon = false;
                }
            },
            deep:true
        }
    },
    methods:{
        goPreviousPage(){
            this.$router.push({
                path:'/personal'
            })
        },
        changeactive(val,catId){
            this.isactive = val
            this.catId = catId
        },
        // 提交
        btnsure(){

            if(this.catId==''){
                this.$toast('请选择问题类型');
            }else if(this.items.text==''){
                this.$toast('请补充详细问题和建议');
            }else{
                let typeImg = '';
                if(this.head.length>0){
                    typeImg = this.head[0];
                }else{
                    typeImg = '';
                }
                
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post("/?c=feedback&a=add",{
                    cat_id:this.catId,
                    content:this.items.text,
                    img:typeImg
                    }).then(res=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        if(res.code==0){
                            this.$toast('提交成功');
                            this.$router.push({
                                path:'/personal'
                            })
                        }else if(res.code == 1){
                            this.$toast(res.msg);
                        }
                })
            }
           
        }
    },
    components:{
        navbar,
        uploadBox,
    }
}
</script>
<style lang="less" scoped>
#app .active{
    color:#EE2D2D;
    border-color: #EE2D2D;
}
.dis{
    display:flex;
    justify-content: space-between;
}
.feed{
    display: flex;
    flex-direction: column;
    color:#424242;
    .feed-top{
        border-bottom: 1px solid #D8D8D8;
    }
    .feed-content{
        flex-grow: 1;
        font-size: 14px;
        padding:0 12px;
        background: #fff;
        height:100%;
        .dis{
            flex-wrap: wrap;
            justify-content: flex-start;
        }
        .feed-question{
            margin:16px 0 10px 0;
        }
        .feed-question-div{
            padding:4px 12px;
            border:1px solid #808080;
            border-radius:5px;
            color:#808080;
            margin-bottom: 5px;
            margin-right: 5px;
        }
        // 评价
        .comment_box{
            padding: 7px 0;
            background-color: #fff;
            margin-top: 13px;
            .commentLabelTitle{
                margin-bottom: 14px;
            }
            .textIcon{
                width: 18px;
                margin-bottom: 15px;
                position: absolute;
                display: none;
                img{
                    display: block;
                    width: 100%;
                }
            }
            .textIcon.show{
                display: block;
            }
            .comContentBox{
                position: relative;
            }
            .content{
                width: 100%;
                resize:none;
                border: none;
                line-height: 18px;
                height: 90px;
                font-size: 14px;
                
            }
            .content.show{
                text-indent: 20px;
            }
            .text_count{
                position: absolute;
                right: 0;
                bottom: 0;
                color: #ccc;
                font-size: 12px;
                span{
                    color: #999;
                }
            }
        }
        // 上传图片
        
    }
    .upimg{
        font-size: 14px;
        padding:0 12px;
        background: #fff;
        margin-top:10px;
        .personal-img {
            width: 3rem;
            height: 3rem;
            display: inline-block;
            line-height: 2rem;
            text-align: center;
            overflow: hidden;
            border: 1px solid #fff;
            margin: auto;
        }
        .personal-img img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .upimg-title{
            margin:15px 0;
        }
        .upimg-img{
            width: 60px;
            height:60px;
            margin-bottom: 15px;
            >img{
                max-height:60px;
            }
        }
    }
    .btnsure{
        position: fixed;
        left: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
        background: #EE2D2D;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 16px;
    }
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
    input{
        display: block;
        height: 100%;
        width: 100%;
    }
}

</style>


