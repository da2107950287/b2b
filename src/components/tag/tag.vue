<template>
    <div>
        <!-- 尾货 -->
        <van-nav-bar
            left-arrow
            title='尾货'
            @click-left='goPreviousPage'
        />
        <!-- tag content -->
        <div class="tag-content-box">
            <!-- 订单列表 -->
            <div class="screen">
                <div @click="sort">
                    筛选
                    <div class="screen-img">
                        <img src="../../assets/img/sort.png" width="100%" />
                    </div>
                </div>
            </div>

            <div class="recommend-bar">
                <div class="recommend-box" v-for="(item,index) in hotGoods" :key="index">
                    <div @click="goShopping(item)">
                        <div class="recommend-img">
                            <img :src="item.thumb" width="100%">
                        </div>
                        <div class="recommend-title">
                            {{item.goods_name}}
                        </div>
                        <div class="label">
                            <van-tag color="#d1442b" size="medium" v-for="(tags,index) in item.tag" :key="index">{{tags}}</van-tag>
                        </div>
                        <div class="recommend-sum">
                            <span>¥{{item.goods_price}}</span>
                        </div>
                        <div class="recommend-trade">
                            <span><em>{{item.moq}}</em>{{item.goods_unit}}起批</span>
                            <span>成交量:{{item.volume_number}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 弹出层 -->
            <van-popup v-model="show" class="overlay80vh" position="right">
                <div class="popup-info-box">
                    <!-- 区间价格 -->
                    <div class="section">
                        <div class="section-title">价格区间</div>
                        <div class="section-titil-info">
                            <van-row>
                                <van-col span='11'>
                                    <input type="text" v-model="min" placeholder="最低价">
                                </van-col>
                                <van-col span='2'>－</van-col>
                                <van-col span='11'>
                                    <input type="text" v-model="max" placeholder="最高价">
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="tag">
                        <div class="tag-title">标签</div>
                        <div class="tag-title-info">
                            <div class="tag-title-info-box " v-for="(item,index) in tagTitleInfo" :key="index" @click="tagTitleClick(item)">{{item.label_name}}</div>
                        </div>
                    </div>
                </div>
                <div style="height:50px;"></div>
                <div class="poup-button">
                    <van-row>
                        <van-col span='12'>
                            <van-button size="large" @click="cancel">取消</van-button>
                        </van-col>
                        <van-col span='12'>
                            <van-button size="large" @click="submitButton">确定</van-button>
                        </van-col>
                    </van-row>
                </div>
            </van-popup>
        </div>

        <div class="cart-background" v-if="noGoods == 1">
            <img src="../../assets/img/not-wait-icon.png" width="100%" />
            <p>未查找到您需要的商品</p>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/commonstyle.css'
    import 'font-awesome/css/font-awesome.css'
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    import $ from 'jquery'
    Vue.prototype.$post = post;
    export default {
        data(){
            return{
                value:'',
                hotGoods:[],
                sum:'2520',
                obregionID:'',
                show:false,
                tagTitleInfo:[],
                label_id:0,
                min:'',
                max:'',
                id:0,
                noGoods:0,
            }
        },
        created(){
            this.getParams();   
            this.$post('/?a=labelGoods',{
                //传值
                region_id:this.obregionID,
                label_id:this.id,
                min:this.min,
                max:this.max,
                page:1,
            }).then((res)=> {
                switch(res.code){
                    case 0:
                        this.noGoods = 0
                        this.hotGoods = res.data.list
                        break;
                    case 1:
                        this.noGoods = 1;
                        break;
                    
                    default:
                        break;
                }
            });
            this.$post('/?a=getLabel',{
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.tagTitleInfo = res.data.list
                        break;
                   
                    default:
                        break;
                }
            })
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            getParams(){
                // 接收路由带过来的参数
                this.value = this.$route.query.name,
                this.obregionID = localStorage.getItem('wapres')
                this.id = this.$route.query.id;
            },
            goShopping(item){
                this.$router.push({
                    path:'/goods',
                    query:{
                        'goods':item.wId
                    }
                })
            },
            // 筛选
            sort(){
                this.show = true;
            },
            tagTitleClick(item){
                this.label_id = item.label_id;
                const even = event.srcElement?event.srcElement:event.target;
                $(even).hasClass('tag-title-info-box-selection');
                if(!$(even).hasClass('tag-title-info-box-selection')){
                    $(even).addClass('tag-title-info-box-selection').siblings().removeClass('tag-title-info-box-selection')
                }
            },
            // 取消
            cancel(){
                this.show = false;
            },
            // 确定
            submitButton(){
                this.$post('/?a=searchGoods',{
                    //传值
                    region_id : this.obregionID,
                    title : this.value,
                    min : this.min,
                    max : this.max,
                    label_id : this.label_id,
                    page:1,
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            this.noGoods = 0
                            this.hotGoods = res.data.list
                            break;
                        case 1:
                            this.noGoods = 1;
                            this.show = false;
                            break;
                        
                        default:
                            break;
                    }

                })
            }
        }
    }
</script>

<style scoped>
.goods-nav-bar{
    width: 100%;
    height: 3rem;
    position: fixed;
    line-height: 3rem;
    background-color: #fff;
    border-bottom: 1px solid #dadada;
}
.goods-left-button,
.goods-right-search{
    text-align: center;
    font-size: 16px;
}
.goods-left-button i{
    font-size: 24px;
}
.goods-right-search{
    position: relative;
}
.goods-right-search input{
    width: 80%;
    height: .6rem;
    border-radius: .6rem;
    padding: .6rem;
    border: none;
    text-indent: 1rem;
    font-size: 14px;
    background-color: #eee;
}
.goods-right-search i{
    color: #777;
    top: 1rem;
    left: 1rem;
    position: absolute;
}
.recommend-bar{
    display: flex;
    flex-wrap: wrap;
}
.recommend-box{
    width: 50%;
    background-color: #fff;
    border-bottom: 1px solid #dadada;
}
.recommend-box:nth-child(odd){
    width: 49%;
    border-right: 1px solid #dadada;
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
.recommend-trade em{
    font-style: normal;
    color: #ec5151;
}
.recommend-sum{
    text-indent: .4rem;
}
.recommend-sum span{
    color: #ec5151;
}
.recommend-title{
    font-size: 14px;
    padding: .4rem;
}
/* 标签属性 */
.label{
    padding: 0 .4rem
}
.label span {
    margin-left: 1px;
}
/* 筛选 */
.screen{
    font-size: 14px;
    font-weight: bold;
    line-height: 2rem;
    padding: 0 .6rem;
    text-align: right;
    border: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
}
.screen div{
    display: inline-block;
}
.screen-img{
    width:  1.2rem;
    position: relative;
    top: 4px;
    right: 6px;
    line-height: 2rem;
}
/* 弹出层盒子 */
.overlay80vh{
    width: 40vh;
    height:100vh;
}
.popup-info-box{
    margin-top: .5rem;
    padding: 0 .6rem;
}
.section-title{
    font-size: 14px;
    font-weight: bold;
}
.section-titil-info{
    text-align: center;
    margin: 1rem 0;
}
.section-titil-info input{
    display: inline-block;
    width: 100%;
    border: none;
    text-align: center;
    background-color: #eee;
    border-radius: 1rem;
    text-indent: .5rem;
    font-size: 12px;
    padding: .4rem 0;
}
.tag-title{
    font-size: 14px;
    font-weight: bold;
}

.tag-title-info{
display: flex;
flex-wrap: wrap;
    justify-content: inherit;
}

.tag-title-info-box{
    width: 4rem;
    line-height: 1.5rem;
    margin: .5rem;
    padding: .4rem .6rem;
    border-radius: 1rem;
    text-align: center;
    background-color: #eee;
    border: 1px solid #eee;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.tag-title-info-box-selection{
    background-color: #fff;
    border: 1px solid #d1442b;
}

.poup-button{
    width: 100%;
    position: absolute;
    bottom: 0;
}
.cart-background{
    padding: 5rem 4rem;
    color: #777;
    text-align: center;
}
</style>