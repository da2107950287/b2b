<template>
    <div>
        <!-- 评论头部导航 -->
        <van-nav-bar
            left-arrow
            title='商品评论'
            @click-left="goPreviousPage"
            class="comment-info-bar"
        />
        <!-- 商品 -->
        <div class="goods-info">
            <div class="goods-imge">
                <img :src="goodsimageUrl" width="100%"/>
            </div>
            <div class="goods-title">
                <p>{{goodsTitle}}</p>
                <p>¥{{goodsPrice}}</p>
            </div>
        </div>
        <!-- 评价 -->
        <div class="goods-evaluate-conent" v-if="isEvaluate != 1">
            <div class="goods-evaluate-title">
                <van-row>
                    <van-col span='24'>
                        <span>货&emsp;描:&emsp;</span><van-rate class="goods-score" v-model="description_score" />
                    </van-col>
                    <van-col span='24'>
                        <span>发&emsp;货:&emsp;</span><van-rate class="goods-score" v-model="shipping_score" />
                    </van-col>
                    <van-col span='24'>
                        <span>响&emsp;应:&emsp;</span><van-rate class="goods-score" v-model="service_score" />
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="goods-evaluate-info">
            <van-cell-group>
                <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="商品质量如何？大小合适么？快写下你的评价，分享给大家吧！(0-100字)"
                    rows="1"
                    maxlength="100"
                    autosize='setTextarea'
                />
            </van-cell-group>
        </div>
        <!-- 图片信息 -->
        <div class="goods-imag-info">
            <p>图片信息</p>
            <div class="goods-imag-upload">
                <div @click="upload" class="uploadStyle">
                    <span v-show="val == 0" class="uploadIcon"><i class="fa fa-cloud-upload" aria-hidden="true"></i>点击上传</span>
                    <span v-show="val == 1" class="uploadSuccess"><i class="fa fa-check-circle" aria-hidden="true"></i>上传成功</span>
                    <span v-show="val == 2" class="uploadError"><i class="fa fa-close" aria-hidden="true"></i>上传错误</span>
                </div>
                <form id="uploadForm" enctype="multipart/form-data">
                    <input id="file" type="file" name="file" class="file"/>
                </form>
            </div>
        </div>
        <!-- 提交按钮 -->
        <div class="comment-button">
            <van-button type='danger' size="large" @click="commentButton">提交</van-button>
        </div>
    </div>
</template>

<script>
    import 'font-awesome/css/font-awesome.css';
    import $ from 'jquery'
    import Vue from 'vue'
    export default {
        data() {
            return {
                goodsTitle:'',
                goodsPrice:'',
                description_score:5,
                shipping_score:5,
                service_score:5,
                val:0,
                message:'',
                goodsimageUrl:'',
                imageUrl:[],
                isEvaluate:'',
            }
        },
        created(){
            const wapGoodsInfo = JSON.parse(sessionStorage.getItem('wapGoodsInfo'));
            this.goodsTitle = wapGoodsInfo.goods_name;
            this.goodsPrice = wapGoodsInfo.total_fee;
            this.goodsimageUrl = wapGoodsInfo.goods_img;
            this.order_id = wapGoodsInfo.order_id;
            console.log(this.$route.query.id);
            this.isEvaluate = this.$route.query.id == undefined || this.$route.query.id == 0 ? 0 : this.$route.query.id;
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            upload(){
                let _this = this;
                $('#file').click();
                $('#file').on('change',function(){
                    let file = this.files[0];
                    let formData = new FormData($('#uploadImg')[0]);
                        formData.append('file', file);
                        _this.$post('/?c=user&a=upload',formData).then((res)=>{
                            switch(res.code){
                                case 0:
                                    _this.val = 1;
                                    _this.imageUrl.push(res.data.img);
                                    break;
                                case 10:
                                    this.$toast('账号未登录，请登录!');
                                    this.$router.push({
                                        path:'/login'
                                    })
                                default:
                                    _this.val = 2;
                                    break;
                            }
                        });
                });
            },
            commentButton(){
                this.$parent.$refs.loading.style.display = "flex";
                this.$post('/?c=order&a=evaluate',{
                    img : this.imageUrl,
                    description_score : this.description_score,
                    shipping_score: this.shipping_score,
                    service_score: this.service_score,
                    content: this.message,
                    order_id: this.order_id,
                })
                .then((res)=>{
                    console.log(res);
                    this.$parent.$refs.loading.style.display = "none";
                    switch(res.code){
                        case 0:
                            this.$toast('评论成功!');
                            this.$router.go(-1);
                            break;
                        case 1:
                            this.$toast('请等待商家回复!')
                            this.$router.go(-1);
                            break;
                        default:
                            break;
                    }
                })
            }
        },
        
    }
</script>

<style scoped>
    .comment-info-bar{
        border-bottom: 1px solid #eee;
    }
    .goods-info{
        height: 6rem;
        padding: .6rem;
        display: flex;
        flex-wrap: nowrap;
        border-bottom: 1px solid #eee;
    }
    .goods-imge{
        width: 30%;
        height: 6rem;
        border: 1px solid #eee;
    }
    .goods-title{
        width: 70%;
        font-size: 14px;
    }
    .goods-title p{
        margin: 0;
        padding: .2rem;
    }
    .goods-title p:nth-child(1){
        max-height: 4rem;
        overflow: hidden;
    }
    .goods-title p:nth-child(2){
        font-size: 16px;
        color: #ec5151;
    }
    /* 评价内容 */
    .goods-evaluate-title{
        padding: .4rem .6rem;
        color: #777;
        border-bottom: 1px solid #eee;
    }
    /* 图片信息 */
    .goods-imag-info p:nth-child(1){
        color: #777;
        padding: .6rem;
        border: 1px solid #eee;
    }
    /* 图片按钮 */
    .file{
        display: none;
    }
    .uploadStyle{
        width: 6rem;
        height: 6;
        font-size: 12px;
        line-height: 6rem;
        text-align: center;
        border: 1px dashed #ccc;
        color: #777;
        margin: 0 .6rem;
    }
    .uploadSuccess{
        color: #44bb00;
    }
    .uploadError{
        color: #d83636;
    }
    .comment-button{
        padding: .6rem
    }

    .goods-score{
        display: inline-block;
    }
</style>