<template>
    <div class="ansdetail">
        <van-nav-bar
            title="评价详情"
            left-arrow
            @click-left="onClickLeft"
        />
        <div>
            <div v-for="(item,index) in details" :key="index">
                <div class="fz_12  conmmentList userConmmentBox" v-if="item.type==1">
                    <div class="userConmmentList " >
                        <div class="commentTop after">
                            <div class="commentLabel" v-if="index==0"><img :src="item.user_picture" alt=""></div> 
                            <div class="commentName" v-if="index==0">{{item.nick_name}}</div>
                            <div class="commentName" v-else>用户追评</div>
                            <div class="commentTime">{{item.created_time}}</div>
                        </div>
                        <div class="commentContent">
                            {{item.content}}
                        </div>
                        <div class="ansimgBox after" v-if="item.img.length>0">
                            <img v-for="(itemimg,indeximg) in item.img" :key="indeximg" :src="itemimg" alt="" class="ansimg" @click="changeSwiper(item.img,indeximg)">
                        </div>
                        
                    </div>
                </div>
                <div class="fz_12  conmmentList storeBox" v-if="item.type==2">
                    <div class="store fz_12 " >
                        <div>
                            商家回复：{{item.content}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <swiper-alert ref="swiperAlert" class="swiper-alert-box swiperHide animated" :class="[swiperShowStatus()]" :swiperImg="img" @swiperClose="swiperClose"></swiper-alert>
    </div>
</template>
<script>
import Vue from 'vue';
import '../../assets/css/animate.css'
import '../../assets/css/commonstyle.css'
import {post} from '../../assets/js/commonAPI'
Vue.prototype.$post = post
import swiperAlert from "../swiper/swiper.vue"
export default {
    data(){
        return{
            details:[],            //回复详情列表  
            ordersn:'',            //订单编号   
            img: [],
            //swiper 弹窗状态
            swiperShow:0,
            //swiper 弹窗图片选择状态
            imgActive:0,
        }
    },
    created(){
        let sn=this.$route.query.id
        // 获取回复详情列表
        this.$post("/?c=order&a=evaluateInfo", {
           order_id:sn,
           }).then((res) => {
               if(res.code===0){
                  this.details=res.data 
               }else{
                    _this.$toast(res.msg);
               }
            
        });
    },
    components:{
      
    },
    methods:{
        // 回复
        onClickLeft(){
            this.$router.push({
                path:'evaluate',
                query:{
                    index:1
                }
            })
        },
        /* swiper 组件 */
        //图片查看
        changeSwiper(item,index){
            this.img = item;
            this.swiperShow = 1;
            this.imgActive = index;
            let swiperChild = this.$refs.swiperAlert.swiper;
            swiperChild.slideTo(index,0,false);
        },
        //关闭图片浏览
        swiperClose(){
            this.swiperShow = 2;
            setTimeout(()=>{
                this.swiperShow = 0;
            },600)
        },
        swiperShowStatus(){
            if(this.swiperShow==0){
                return ''
            }else if(this.swiperShow==1){
                //打开弹窗 过度动画
                return 'swiperShow fadeIn'
            }else{
                //关闭弹窗 过度动画
                return 'swiperShow fadeOut'
            }
        },
    },
    components:{
        swiperAlert
    }
}
</script>
<style scoped>

/* 查看图片的弹窗 默认隐藏 */
.swiper-alert-box{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: opacity .8s;
    -webkit-animation-duration: .6s;
    animation-duration: .6s;
}
/* 查看图片的弹窗*/
.swiperHide{
    opacity: 0;
    z-index: -1;
}
/* 查看图片的弹窗*/
.swiperShow{
    opacity: 1;
    z-index: 1;
}
.conmmentList{
    padding: 0 12px 10px;
    background-color: #fff;
}
.conmmentList.storeBox{
    margin-bottom: 10px;
    padding-top: 10px;
    background-image: url("../../assets/img/sanjiao.png");
    background-repeat: no-repeat;
    background-position: 30px top;
    background-size: 19px auto;
}
.userConmmentList{
    background-color: #fff;
    padding:10px 0 0; 
}
.commentTop{
    margin-bottom: 15px;
}
.commentLabel{
    width: 30px;
    height: 30px;
    border: 1px solid #F3AF0D;
    color: #F3AF0D;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    float: left;
    border-radius: 30px;
    overflow: hidden;

}
.commentLabel >img{
    width:100%;
    height: 100%;
    border-radius: 3px;
    display: block;
}
.commentName{
    margin-left: 5px;
    font-size: 14px;
    line-height: 30px;
    color: #424242;
    float: left;
}
.commentTime{
    font-size: 12px;
    line-height: 30px;
    color: #808080;
    float: right;
}
.commentContent{
    margin-bottom: 10px;
    font-size: 14px;
    color: #808080;
    text-align: justify;
    word-break: break-word;
}
.commentLabelTitle{
    border-left: 2px solid #ee2d2d;
    text-indent: .533rem;
    color:#424242;
    float: left;
    font-size: 14px;
    line-height: 15px;
}
.commentLabelTime{
    float: right;
    font-size: 12px;
    color: #808080;
}
.storecommentContent{
    font-size: 14px;
    color: #808080;
    margin-top: 15px;
}
.ansimgBox{
    display: flex;
    height:62px;
}
.ansimgBox .ansimg{
    width: 62px;
    height: 62px;
    margin-right: 10px;
    border-radius: 3px;
}
.ansimgBox .ansimg:last-child{
    margin-right: 0;
}

.after::after{
    display: table;
    content: " ";
    clear: both;
}
.store{
    padding:10px 12px;
    background: #f2f2f2;
    word-break: break-word;
    border-radius: 5px;
}
</style>


