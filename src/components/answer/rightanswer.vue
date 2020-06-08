<template>
    <div>
        <div v-if="show === 2">
            <div v-for="(item,index) in rightdata" :key="index" class="sales_list_li">
                <div class="sales_list_cont">
                    <div class="sales_list_order_no fz_14 color_424242 djust">
                        <span class="dflex" @click.stop="toSeller(item.seller_id)">
                            <img class="stop_img" src="../../assets/img/gostop.png" alt="">
                            <span>{{item.shop_name}}</span>
                            <img class="stop_right_img" src="../../assets/img/gostopright.png" alt="">
                        </span>
                        <span class="list_order_status color_EE2D2D">{{item.status}}</span>
                    </div>
                    <div>
                        <div class="goods_box_all" @click.stop="seeOrder(item.order_sn)">
                            <div class="goods_box" v-for="(items,indexs) in item.goods" :key="indexs">
                                <div div class="dflex fz_12 goods_li">
                                    <div class="goods_img_box">
                                        <img :src="items.goods_img"  width="100%"/>
                                    </div>
                                    <div class="goods_attr_box">
                                        <div class="goods_title_box color_424242">{{items.goods_name}}</div>
                                        <div class="goods_number_box dflex color_808080">
                                            <div class="goods_label">{{items.goods_attr}}</div>
                                            <div class="goods_number">&yen;{{items.goods_price}}</div>
                                        </div>
                                        <div class="good_num color_808080">
                                            x{{items.goods_number}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 按钮 -->
                    <div class="button_box fz_14" >
                        <div class="dflex">
                            <van-button class="read_order" @click.stop="readOrder(item.order_id)">查看评价</van-button>
                            <van-button v-if="item.evaluate_again==1" @click.stop="toAddSale(item.order_id,item.goods)" class="add_eval">追加评价</van-button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="clock===2" class="business-loading"><vant-loading :vertical="false" text="努力加载中..."></vant-loading></div>    
            <p class="end-msg">{{endMsg}}</p>
        </div>
        <div v-else-if="show === 1">
            <searchNone :item="'evaluate'"></searchNone>
            <special></special>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {post} from '../../assets/js/commonAPI'
import '../../assets/css/commonstyle.css'
import '../../assets/css/comment.less'

import special from "../component/recommendComponent/special.vue";
import searchNone from "../component/searchNone/searchNone.vue";
import vantLoading from '../vantLoading.vue'
import vloading from '../vloading.vue'

Vue.prototype.$post = post;
export default {
    props:["rightdata","show"],
    components:{
        special,
        searchNone,
        vantLoading,
        vloading
    },
    data(){
        return{
            // show: 0,

            flag:true,         //显示标识
            clock:1,
            rpage:2,           //当前页码
            endMsg:'',
            //   rightdata:''
        }
    },
    created(){
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods:{
        //瀑布流加载
        handleScroll () {
            let _this=this
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
                if(_this.clock == 1){
                    _this.clock = 2;
                    _this.$post("/?c=order&a=list", {
                            status:108,
                        page:_this.rpage,
                            limit:10,
                            }).then((res) => {
                            switch (res.code){
                                case 0:
                                if(res.data.list.length>0){
                                    _this.rightdata=[..._this.rightdata,...res.data.list];
                                }
                                if(res.data.list.length<10){
                                    _this.endMsg = '已经没有更多内容啦~';
                                    window.removeEventListener('scroll', this.handleScroll)
                                }
                                _this.clock = 1;
                                _this.rpage+=1
                                break;
								case 1:
									_this.$toast(res.msg);
								break;
                                default:
                                break;
                            }
                        });
                    }
                }
        },
        toAddSale(order_id,list){
            let lists = {};
            for(let key in list){
                if(key>=0 && key < 4){
                    lists[key] = {
                        goods_img : list[key].goods_img?list[key].goods_img:'',
                        goods_name : list[key].goods_name
                    };
                }
            }
            let data = {
                list:lists,
                len:list.length,
                order_id : order_id
            };
            localStorage.setItem('addSaleItem',JSON.stringify(data));
            
            this.$router.push({
                path:'/addWriteEval',
            })
        },
        // 查看评价详情
        readOrder(orderId){
            this.$router.push({
                path:'/evaluadetails',
                query:{
                    id:orderId
                }
            })
        },
        // 查看订单详情
        seeOrder(sn){
            this.$router.push({
                path:'/seeDetails',
                query:{
                    sn:sn
                }
            });
        },
        //进入店铺
        toSeller(sn){
            this.$router.push({
                path:'/shop',
                query:{
                    index:sn
                }
            });
        }
    },
    destroyed () {
        this.endMsg="";
        window.removeEventListener('scroll', this.handleScroll)
    },
    watch: {
        rightdata(val){
            if(val.length) {
                this.show = 2
            }else {
                this.show = 1
            }
        }
    }
}
</script>
<style scoped>

.sales_list_li .sales_list_cont .button_box div button.van-button.add_eval{
    border:1px solid #EE2D2D;
    color:#EE2D2D;
}
.sales_list_li .goods_box .goods_attr_box .goods_title_box{
    height: 30px;
    line-height: 15px;
    margin-bottom: 9px;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.vantLoading{
    margin-top: 20px;
    width: 100%;
    display: flex;
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
</style>


