<template>
    <div>
        <!-- 评价列表 -->
        <navbar type="left" title="评价" @clickleft="goPreviousPage"></navbar>
        <!-- 评价按钮 -->
        <div class="tag-box dflex">
            <span class="van-tag van-tag--plain van-tag--round van-hairline--surround" :class="{'van-tag-selected' : score == index}" data-id='0' @click="tag(item.active)" v-for="(item,index) in scoreList" :key="index">{{item.val}}</span>
        </div>

        <!-- 评价列表 -->
        <div class="evaluate-box" v-if="show == 2">
            <div>
                <div class="evaluate-lis" v-for="(item,index) in dataInfo" :key="index">
                    <div class="dflex">
                        <div class="evaluate-head">
                            <img v-if="item.user_picture" :src="item.user_picture" alt="">
                            <img v-else src="../../assets/img/touxiang.gif" alt="">
                        </div>
                        <div>
                            <div class="evaluate-title fz_14 color_424242">{{item.nick_name}}</div>
                            <div class="dflex fz_12 color_808080">
                                <div class="evaluate-time">{{item.add_time}}</div>
                                <!-- <div class="evaluate-time">规格：5斤/袋</div> -->
                            </div>
                        </div>
                    </div>
                    <div class="evaluate-content color_424242 fz_14" v-if="item.content != ''">{{item.content}}</div>
                    <div class="evaluate-content color_808080 fz_14" v-else>什么也没说~</div>
                    <div class="evaluate-img-box dflex" v-if="item.imgs != null"> 
                        <div class="evaluate-img" v-for="(imgsItem,imgsKey) in item.imgs" :key="imgsKey" @click="changeSwiper(item.imgs,imgsKey)">
                            <img :src="imgsItem" alt="">
                        </div>
                    </div>
                    <div class="evaluate-lis-review storeBox" v-if="item.son.length>0">
                        <div class="evaluate-lis-review-content">
                            <div class="dflex evaluate-review-lis-content fz_12 color_808080" v-for="(val,index) in item.son" :key="index">
                                <div class="evaluate-review-lis-title">
                                    {{val.nick_name}}:
                                </div>
                                <div class="evaluate-review-content">{{val.content}}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-if="lock===1" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
            </div>
            <p class="end-msg">{{endMsg}}</p>
        </div>

        <div class="evaluate-info" v-else-if="show == 1">
            <searchNone :item="'goodsEvaluate'" t-type="true"></searchNone>
        </div>

        <div class="evaluate-load vantLoading" v-else>
            <vloading :vertical="false" text=""></vloading>
        </div>


        <swiper-alert ref="swiperAlert" class="swiper-alert-box swiperHide animated" :class="[swiperShowStatus()]" :swiperImg="img" @swiperClose="swiperClose"></swiper-alert>
    </div>
</template>

<script>
    import Vue  from 'vue'
    import '../../assets/css/commonstyle.css'
    import '../../assets/css/animate.css'
    import {post} from '../../assets/js/commonAPI.js'
    import $ from 'jquery'
    import navbar from "../navbar/nav.vue"
    import swiperAlert from "../swiper/swiper.vue"
    import vantLoading from '../vantLoading.vue'
    import vloading from '../vloading.vue'
    import searchNone from "../component/searchNone/searchNone.vue";
    Vue.prototype.$post = post
    export default {
        data() {
            return {
                goods_id:0,
                dataInfo:[],
                score:0,
                scoreList:[{
                    val:"全部",
                    active:0,
                },{
                    val:"好评",
                    active:1,
                },{
                    val:"中评",
                    active:2,
                },{
                    val:"差评",
                    active:3,
                }],
                show:0,
                lock:0,

                page:2,
                endMsg:'',

                //弹窗图片
                img: [],
                //swiper 弹窗状态
                swiperShow:0,
                //swiper 弹窗图片选择状态
                imgActive:0,
            }
        },
        created(){
            const _this = this;
            // 获取地址栏中的值
            // order
            this.goods_id = this.$route.query.index;

            this.tag(0);
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            tag(key){
                window.removeEventListener('scroll', this.handleScroll)
                this.page = 2;
                this.score = key;
                this.endMsg = "";
                this.show = 0;

                this.$post('/?c=goods&a=evaluationList',{
                    goods_id:this.goods_id,
                    score:key,
                    page:1
                })
                .then((res)=>{
                    switch (res.code) {
                        case 0:
                            this.dataInfo = res.data.list;
                            if(res.data.list.length > 0){
                                this.show = 2;
                                if(res.data.list.length>9){
                                    window.addEventListener('scroll', this.handleScroll)
                                }
                            }else{
                                this.dataInfo = [];
                                this.show = 1;
                            }
                            break;
                        case 1:
                            this.dataInfo = [];
                            this.show = 1;
                            break;
                        default:
                            break;
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

            
            //瀑布流加载
            handleScroll () {
                let _this=this;
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //滚动条到底部的条件
                if (scrollTop + windowHeight >= (scrollHeight-50)) {
                //写后台加载数据的函数
                    if(_this.lock == 0){
                        _this.lock = 1;
                        _this.$post('/?c=goods&a=evaluationList',{
                            goods_id:this.goods_id,
                            score:this.score,
                            page:this.page
                        }).then((res) => {
                            switch (res.code){
                                case 0:
                                    if(res.data.list.length>0){
                                        _this.dataInfo=[..._this.dataInfo,...res.data.list];
                                    }
                                    if(res.data.list.length<10){
                                        _this.endMsg = '已经没有更多内容啦~';
                                        window.removeEventListener('scroll', this.handleScroll)
                                    }
                                    _this.lock = 0
                                    _this.page+=1
                                    break;
                                case 1:
                                    break;
                                default:
                                    break;
                            }
                        })
                    }
                }
            }
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
        components:{
            swiperAlert,
            navbar,
            vantLoading,
            vloading,
            searchNone,
        }
    }
</script>

<style lang="less" scoped>
    .tag-box{
        padding: .533rem .64rem;
        background-color: #fff;
        justify-content: flex-start;
        .van-tag{
            color: #969799;
            display: block;
            margin-right: 10px;
            padding: .2rem .533rem;
        }
        .van-tag-selected{
            color: #d1442b;
        }
    }
    
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
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
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

    /* 评价盒子 */
    .evaluate-box{
        margin-top: 10px;
        background-color: #fff;
        padding: .8rem .64rem;
        .evaluate-lis{
            margin-bottom: 30px;
            .evaluate-head{
                max-width: 1.6rem;
                max-height: 1.6rem;
                border-radius: 50px;
                overflow: hidden;
                margin: auto;
                margin-left: 0;
                margin-right: 5px;
                height: 1.6rem;
                width: 1.6rem;
                img{
                    display: block;
                    max-width: 100%;
                    width: 100%;
                    height: 100%;
                }
            }
            .evaluate-time{
                margin-right: 5px;
            }
            .evaluate-content{
                margin: 10px 0;
                word-wrap:break-word
            }
            .evaluate-img-box{
                justify-content: flex-start;
                .evaluate-img{
                    margin-right: 4px;
                    max-width: 67px;
                    max-height: 67px;
                    min-width: 67px;
                    min-height: 67px;
                    border-radius: 5px;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .evaluate-img:last-child{
                    margin-right: 0;
                }
            }
                    
            /* 追评 */
            .evaluate-lis-review{
                margin-top: 5px;
                .evaluate-lis-review-content{
                    background-color: #f2f2f2;
                    border-radius: 5px;
                    overflow: hidden;
                    padding: 10px 12px;
                    .evaluate-review-lis-content{
                        word-wrap:break-word;
                        margin-bottom: 15px;
                    }
                    .evaluate-review-lis-content:last-child{
                        word-wrap:break-word;
                        margin-bottom: 0;
                    }
                }
            }
            .evaluate-lis-review.storeBox{
                margin-bottom: 10px;
                padding-top: 10px;
                background-image: url("../../assets/img/sanjiao.png");
                background-repeat: no-repeat;
                background-position: 15px top;
                background-size: 19px auto;
            }
        }
        .evaluate-lis:last-child{
            margin-bottom: 0;
        }
    }

    
.business-loading {
    padding: 10px;       
}
.end-msg {
  font-size: 14px;
  text-align: center;
  color: #c9c9c9;
  line-height: 3em;
  margin: 0;
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
</style>