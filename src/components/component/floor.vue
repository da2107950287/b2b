<template>
    <div>
        <div class="recommend">
            <div class="recommend-title pad6 border-left" @click="more">
                <van-row type="flex" justify="space-between">
                    <van-col>
                        <span class="recommend-head">{{floorTitle}}</span>
                    </van-col>
                    <van-col class="recommend-right">
                        更多推荐
                        <i class="fa fa-angle-double-right"></i>
                    </van-col>
                </van-row>
            </div>
            <div class="recommend-bar">
                <div class="recommend-box" v-for="(item,index) in hotGoods" :key="index">
                    <div @click="goShpping(item)">
                        <div class="recommend-img">
                            <img :src="item.thumb" width="100%">
                        </div>
                        <div class="recommend-name">
                            <div class="wrap">
                                <div class="text">
                                    {{item.goods_name}}
                                </div>
                            </div>
                        </div>
                        <div class="tags">
                            <van-tag color="#d1442b" size="medium" v-for="(tags,index) in item.tag" :key="index">{{tags}}</van-tag>
                        </div>
                        <van-row type="flex" justify="space-between">
                            <van-col>
                                <div class="recommend-sum">
                                    <span>¥{{item.goods_price}}</span>
                                </div>
                            </van-col>
                            <van-col>
                                <div class="recommend-trade">
                                    <span>{{item.moq}}</span><span>{{item.goods_unit}}</span>起批
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data(){
            return{
                hotGoods:''
            }
        },
        watch:{
            floorData:function(data){
                this.hotGoods = data;
            }
        },
        methods:{
            goShpping(item){
                this.$router.push({
                    path:'/goods',
                    query:{
                        'goods':item.wId
                    }
                })
            },
            //更多推荐
            more(){
                this.$router.push({
                    path:'/Recommend'
                })
            }
        }
    }
</script>

<style scoped>
.recommend{
    background-color: #fff;
    margin-bottom: 6px;
}
.recommend-title{
    height: 2rem;
    line-height: 2rem;
    font-size: 14px;
    border-bottom: 1px solid #eee;
}
.recommend-bar{
    display: flex;
    flex-wrap: wrap;
}
.recommend-box{
    width: 50%;
    border-bottom: 1px solid #eee;
}
.recommend-box:nth-child(odd){
    width: 49%;
    border-right: 1px solid #eee;
}
.recommend-img{
    height: 10rem;
    overflow: hidden;
}
.recommend-trade{
    display: flex;
    padding: .3rem .4rem;
    justify-content: space-between;
    font-size: 12px;
}
.recommend-sum{
    text-indent: .4rem;
}
.border-left{
    border-left: 3px solid #d1442b;
}
.recommend-head{
    font-weight: bold;
    color: #d1442b;
}
.recommend-right{
    color: #777;
    font-size: 12px;
}
.recommend-name p{
    font-size: 14px;
    padding: 0 .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
}
.tags span{
    margin-left: .1rem;
}
.wrap {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
    padding: 0 .4rem;
}

.wrap .text {
    float: right;
    margin-left: -5px;
    width: 100%;
    word-break: break-all;
}

.wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: 40px;
}

.wrap::after {
    float: right;
    content: "...";
    height: 20px;
    line-height: 20px;
    /* 为三个省略号的宽度 */
    width: 3em;
    /* 使盒子不占位置 */
    margin-left: -3em;
    /* 移动省略号位置 */
    position: relative;
    left: 100%;
    top: -20px;
    padding-right: 5px;
    background-color: #FFF;
}
</style>
