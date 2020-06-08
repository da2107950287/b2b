<template>
    <div>
       <van-nav-bar
        title="追加评价"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 顶部图片 -->
        <evaluationTop></evaluationTop>
        <!-- 分享体验 -->
        <div class="share">
            <div class="fz_12 comment_box">
                <div class="commentTop after">
                    <div class="commentLabelTitle">追加一下你的使用体验吧</div>
                </div>
                <div class="comContentBox">
                    <div class="textIcon" :class="{'show':textIcon}">
                        <img src="../../assets/img/tianxie.png" alt="">
                    </div>
                    <textarea maxlength="100" v-model="items.text" placeholder="对评价进行补充，更客观，更全面" class="content" :class="{'show':textIcon}">
                    </textarea>
                    <div class="fz_12 text_count"><span>{{remake_num}}</span>/100</div>
                </div>
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
import evaluationTop from '../../components/component/evaluationTop'
Vue.prototype.$post = post;
import $ from 'jquery'
export default {
    data(){
        return{
            textIcon:true,   //评价 
             items:{
                text:'',
            },
            remake_num:0, 
            is_weixin:is_wexin(),                         //经营类型id
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
        // 追加回复
        onClickLeft(){
            this.$router.push({
                path:'evaluate',
                query:{
                    index:1
                }
            })
        },
        // 点击确认，提交后台
        postSumbit(){
            this.$parent.$refs.loading.style.display = 'flex'
            this.$post("/?c=order&a=evaluate", {
                content:this.items.text,
                order_id:this.addList.order_id
            }).then((res) => {
                this.$parent.$refs.loading.style.display = 'none'
                switch (res.code){
                    case 0:
                    this.$toast('评价成功!');
                    this.$router.push({
                        path:'evaluate',
                        query:{
                            index:1
                        }
                    })
                    break;
                    default:
                    this.$toast('评价失败!');
                    break;
                }
            });
        },
    },
    components:{
      evaluationTop,
    }
}
</script>
<style lang="less" scoped>
// 评价
.comment_box{
    padding: 7px 12px;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom:20px;
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

</style>


