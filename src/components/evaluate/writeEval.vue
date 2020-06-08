<template>
    <div>
        <van-nav-bar
        title="评价"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 顶部图片 -->
        <evaluationTop></evaluationTop>
        <!-- 评价 -->
        <div class="start_div">
            <div class="dflex startmr">
                <span>商品描述：</span><van-rate v-model="description" void-icon="star" void-color="#eee"/>
            </div>
            <div class="dflex startmr">
                <span>服务态度：</span><van-rate v-model="service" void-icon="star" void-color="#eee"/>
            </div>
            <div class="dflex startmr">
                <span>发货速度：</span><van-rate v-model="shipping" void-icon="star" void-color="#eee"/>
            </div>
        </div>
        <!-- 分享体验 -->
        <div class="share">
            <div class="fz_14 comment_box">
                <div class="commentTop after">
                    <div class="commentLabelTitle">分享您的使用体验吧</div>
                </div>
                <div class="comContentBox">
                    <div class="textIcon" :class="{'show':textIcon}">
                        <img src="../../assets/img/tianxie.png" alt="">
                    </div>
                    <textarea maxlength="100" v-model="items.text" placeholder="商品质量如何？大小合适么？快写下你的评价吧!" class="content" :class="{'show':textIcon}">
                    </textarea>
                    <div class="fz_12 text_count"><span>{{remake_num}}</span>/100</div>
                </div>
            </div>
        </div>
        <!-- 上传图片 -->
        <div class="up_img">
            <div class="img_upload_box sale_box">
                <div class="refund_status_label color_424242 fz_14">上传图片</div>
                <uploadBox :imgList="imgList" :imgName="imgName" :count="5"></uploadBox>
            </div>
        </div>
        <!-- 提交按钮 -->
        <div class="postSaleBtn">
            <van-button class="postSumbit fz_16" @click="postSumbit">确定</van-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {post,is_wexin} from '../../assets/js/commonAPI'
import '../../assets/css/commonstyle.css'
import answer from '../answer/answer'
import evaluationTop from '../../components/component/evaluationTop'
import uploadBox from '../upload/uploadBox.vue'
Vue.prototype.$post = post;
import $ from 'jquery'
export default {
    data(){
        return{
             description:5,     //商品评价
             shipping:5,        //发货评价
             service:5,         //服务评分
             textIcon:true,   //评价 
             items:{
                text:'',
            },
            remake_num:0, 
            imgList:[],           //上传图片 
            addList:{},           //获取数据
            imgName:'commnetImg',
            is_weixin:is_wexin(),                         //经营类型id

            clock: 0               //请求开关
        }
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
    created(){
        let addSaleItem=localStorage.getItem('addSaleItem')
        if(addSaleItem){
            this.addList=JSON.parse(addSaleItem)
        }
    },
    methods:{
        // 回复
        onClickLeft(){
            this.$router.push({
                path:'/evaluate',
                query:{
                    index:0
                }
            })
        },
        // 点击确认，提交后台
        postSumbit(){
            if(this.clock == 0){
                this.$parent.$refs.loading.style.display = 'flex'

                this.clock = 1;
                this.$post("/?c=order&a=evaluate", {
                    img:this.imgList,
                    description_score:this.description,
                    shipping_score:this.shipping,
                    service_score:this.service,
                    content:this.items.text,
                    order_id:this.addList.order_id
                }).then((res) => {
                    this.$parent.$refs.loading.style.display = 'none'
                    switch (res.code){
                        case 0:
                            this.clock = 0;
                            this.$toast('评价成功!');
                            this.$router.push({
                                path:'evaluate',
                                query:{
                                    index:0
                                }
                            })
                        break;
                        case 1:
                            this.clock = 0;
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
      answer,
      evaluationTop,
      uploadBox
    }
}
</script>
<style lang="less" scoped>
.startmr{
    margin: 10px 12px;
    font-size: 14px;
}
.start_div{
    padding: 5px 0 6px;
    background-color: #fff;
}
// 评价
.comment_box{
    padding: 7px 12px;
    background-color: #fff;
    margin-top: 10px;
}
.comment_box .commentLabelTitle{
    margin-bottom: 14px;
}
.comment_box .textIcon{
    width: 18px;
    margin-bottom: 15px;
    position: absolute;
    display: none;
}
.comment_box .textIcon img{
    display: block;
    width: 100%;
}
.comment_box .comContentBox{
    position: relative;
}
.comment_box .content{
    width: 100%;
    resize:none;
    border: none;
    line-height: 18px;
    height: 80px;
    font-size: 14px;
}
.comment_box .textIcon.show{
    display: block;
}
.comment_box .content.show{
    text-indent: 20px;
}
.comment_box .text_count{
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ccc;
    font-size: 12px;
}
.comment_box .text_count span{
    color: #999;
}
.confirm{
    width: 330px;
    height: 44px;
    line-height: 44px;
    border:none;
    background-color: #EE2D2D;
    text-align: center;
    display: block;
    margin: 20px auto 0;
    border-radius: 5px;
}

//上传图片

.sale_box{
    border-top: 1px solid #f2f2f2;
    background-color: #fff;
    padding: 10px 12px;
    margin-bottom: 10px;
    .refund_status_label{
        margin-right: 20px;
        span{
            margin-left: 10px;
        }
    }
    .upload_box{
        margin-top: 15px;
        margin-bottom: 5px;
        .img_box{
            .img_li{
                width: 60px;
                height: 60px;
                position: relative;
                margin-right: 10px;
                .img_li_img{
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .img_remove{
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 50%;
                    width: 50%;
                    right: -6px;
                    top: -6px;
                    span{
                        display: block;
                        width: 12px;
                        height: 12px;
                        background-color: rgba(33, 33, 33, 0.65);
                        font-size: 12px;
                        border-radius: 100%;
                        line-height: 10px;
                        text-align: center;
                        color: #fff;
                        float: right;
                    }
                }
            }
        }
        .uploadForm{
            position: relative;
            width: 60px;
            #uploadForm{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0;
                width: 100%;
                height: 100%;
                margin: auto;
                input{
                    display: block;
                    height: 100%;
                    width: 100%;
                }
            }
            .personal-img{
                width: 60px;
                height: 60px;
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
    }
}
.write_top .goods_nam{
    font-size: 14px;
}
.postSumbit{
    width: 331px;
    height: 44px;
    background-color: #EE2D2D;
    color: #fff;
    margin: auto;
    display: block;
    border-radius: 5px;
    overflow: hidden;
}
.up_img{
    margin: 10px 0 20px;
}
</style>


