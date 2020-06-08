<template>
    <div>
        <div class="main" v-if="show === 2">
            <!-- 主订单样式 最小模板-
            <div class="box">
                <!- 单个最小子订单 
                <div class="box-list">
                    <div class="box-con">
                        <div class="box-header" @click.stop="toStop('12')">
                            <img class="left-img" src="../../assets/img/dianshang.png">
                            <span>商家名称商家名称商家名称商家名称商</span>
                            <img class="right-img" src="../../assets/img/jiantou.png">
                        </div>
                    </div>
                    <div>
                        <div class="box-status">未付款</div>
                        <div class="box-wrap">
                            <div class="box-wrap-good">
                                <div class="goods-left">
                                    <img class="goods_img" src="http://inews.gtimg.com/newsapp_ls/0/10793114720_294195/0.jpg">
                                    <img class="goods_tag" src="../../assets/img/tag/groupBuying.png">
                                </div>
                                <div class="goods-content">
                                    <div class="goods-content-title">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称称商品名称称商品名称称商品名称</div>
                                    <p class="clearfixed">整箱<span>&yen;28.00</span></p>
                                    <p class="clearfixed"><span>x2</span></p>
                                </div>
                            </div>
                            <!- 每个子订单的取消或确认收货等按钮 
                            <div class="box-wrap-button">
                                <div class="btn">确认收货</div>
                            </div>
                        </div>
                    </div>
                    <!- 每个子订单的再来一单按钮部分样式 
                    <div class="box-btns">
                        <p>共1款商品&nbsp;合计:&yen;28.00</p>
                        <div class="btn" @click="anotherOrder('')">再来一单</div>
                    </div>
                </div>
      </div>-->
            <div v-for="(item, index) in lists" :key="'all-' + index" class="box">
                <!-- 单个最小子订单 -->
                <div class="box-list">
                    <div class="box-con">
                        <div class="box-header" @click.stop="toStop(item.seller_id)">
                            <img class="left-img" src="../../assets/img/dianshang.png" />
                            <span>{{item.shop_name}}</span>
                            <img class="right-img" src="../../assets/img/jiantou.png" />
                        </div>
                    </div>
                    <div v-for="(childItem, childIndex) in item.son" :key="'child-' + index + '-' + childIndex">
                        <div :class="['box-status', {'red_color': childItem.status!='无效'}]">{{childItem.status}}</div>
                        <div class="box-wrap">
                            <div v-for="(goodsItem, goodsIndex) in childItem.goods" :key="'goods-' + index + '-' + childIndex + '-' + goodsIndex" class="box-wrap-good" @click.stop="goOrder(childItem.order_sn)">
                                <div class="goods-left">
                                    <img class="goods_img" :src="goodsItem.goods_img" />
                                    <!-- <img v-if="childItem.activity[0] == 1" class="goods_tag" src="../../assets/img/tag/rushBuy.png" />
                                    <img v-else-if="childItem.activity[0] == 2" class="goods_tag" src="../../assets/img/tag/groupBuying.png" /> -->
                                </div>
                                <div class="goods-content">
                                    <div class="goods-content-title">{{goodsItem.goods_name}}</div>
                                    <p class="clearfixed">
                                        {{goodsItem.goods_attr}}
                                        <span>&yen;{{goodsItem.goods_price}}</span>
                                    </p>
                                    <p class="clearfixed">
                                        <span>x{{goodsItem.goods_number}}</span>
                                    </p>
                                </div>
                            </div>
                            <!-- 每个子订单的取消或确认收货等按钮 -->
                            <div class="box-wrap-button">
                                <div v-if="childItem.can_cancel == 1" class="btn" @click.stop="cancelOrder(childItem.order_sn)">取消订单</div>
                                <div v-else-if="childItem.pay_status == 2 && childItem.shipping_status == 1" class="btn" @click.stop="recipient(childItem.order_sn)">确认收货</div>
                                <!-- <div v-else-if="childItem.status === '已签收'" class="btn" @click.stop="postSale(childItem.order_sn,childItem,'all')">申请售后</div> -->
                            </div>
                        </div>
                    </div>
                    <!-- 每个子订单的再来一单按钮部分样式 -->
                    <div class="box-btns">
                        <p>共{{orderNums(item.son)}}款商品&nbsp;合计:&yen;{{orderFee(item.son)}}</p>
                        <div class="btn" v-if="item.son[0].activity[0] != 2 && item.type == 0" @click.stop="anotherOrder(item.order_sn)">再来一单</div>
                    </div>
                </div>
            </div>
            <div v-if="clock===2" class="business-loading">
                <vant-loading :vertical="false" text="努力加载中..."></vant-loading>
            </div>
            <div class="end-msg">{{endMsg}}</div>
        </div>
        <div v-else-if="show === 1">
            <searchNone item="salesList"></searchNone>
        </div>
        <div v-else class="vantLoading">
            <vloading :vertical="false" text></vloading>
        </div>
    </div>
</template>
<script>
import { Dialog } from "vant";

const searchNone = () => import("../component/searchNone/searchNone.vue");
const vantLoading = () => import("../vantLoading.vue");
const vloading = () => import("../vloading.vue");

export default {
    props: ["status"],
    components: {
        searchNone,
        vantLoading,
        vloading
    },
    data() {
        return {
            show: 0,
            endMsg: "",

            // data:[],
            lists: [],
            clock: 1,
            lpage: 1, //当前页码
            limit: 10 //每页加载10条数据
        };
    },
    created() {
        this.loadInit(true);
    },
    methods: {
        //初始加载数据
        loadInit(isStart) {
            if (isStart) {
                this.lpage = 1;
                this.lists = [];
                this.show = 0;
                this.endMsg = "";
                window.removeEventListener('scroll', this.handleScroll);
            }
            this.clock = 2;

            this.$post("/?c=order&a=list260", {
                status: this.status,
                page: this.lpage,
                page_size: this.limit
            }).then(res => {
                this.clock = 1;
                switch (res.code) {
                    case 0:
                        if (this.lpage == 1) {
                            if (res.data.length > 0) {
                                //有内容，显示内容
                                this.show = 2;
                            } else if (!res.data.length) {
                                //无内容，显示缺省图
                                this.show = 1;
                                return;
                            }

                            if (res.data.length == this.limit) {
                                this.lpage++;
                                //第一页请求，且得到数据条数等于 每页最大数据条数， 则还可能有数据， 允许分页加载
                                window.addEventListener("scroll", this.handleScroll);
                            }
                        } else if (res.data.length < this.limit) {
                            //非第一页（已分页监听），数据不满最大条数， 则无更多数据， 取消分页加载更多
                            this.endMsg = "已经没有更多内容啦~";
                            window.removeEventListener("scroll", this.handleScroll);
                        } else {
                            this.lpage++;
                        }

                        this.lists = [...this.lists, ...res.data];
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                    default:
                        this.$toast(res.msg);
                        break;
                }
            });
        },
        //无货退款， 在父组件中执行
        cancelOrder(order_sn) {
            Dialog.confirm({
                    title: "提示",
                    message: "是否确认取消订单？"
                })
                .then(() => {
                    // on confirm
                    this.$emit("loadingBoxShow", true); //请求loading
                    this.doCancleOrder(order_sn);
                })
                .catch(() => {
                    // on cancel
                });
        },
        //无货退款， 成功后本页列表刷新
        doCancleOrder(order_sn) {
            this.$post("/?c=order&a=cancel", {
                order_sn: order_sn
            }).then(res => {
                if (res.code == 0) {
                    this.$toast("操作成功!");
                    //初始化值
                    this.$emit("loadingBoxShow", false); //请求loading
                    this.loadInit(true);
                } else {
                    this.$toast("操作失败！");
                }
            });
        },
        //计算获得每个小订单的 商品款数
        orderNums(orders) {
            let n = 0;
            for (let k in orders) {
                n += orders[k].goods.length;
            }
            return n;
        },
        //获得每个小订单的 订单钱数
        orderFee(orders) {
            let n = 0;
            for (let k in orders) {
                n = this.toCalculation(n, orders[k].total_fee, 'add');
            }
            return n;
        },
        //修正js两位小数加减法错误问题的方法  sign add-加法  sub-减法
        toCalculation(x, y, sign) {
            let a = x.toString().split('.');
            let b = y.toString().split('.');

            if (a[1] && a[1].length == 1) a[1] = a[1] + '0';
            if (b[1] && b[1].length == 1) b[1] = b[1] + '0';

            if (!a[1]) a.push('00');
            if (!b[1]) b.push('00');

            let as = Number(a.join(''));
            let bs = Number(b.join(''));

            // console.log(a, b, as, bs);
            let num = '0';
            if (sign == 'add') {
                num = (as + bs) / 100;
            } else if (sign == 'sub') {
                num = (as - bs) / 100;
            }
            num = num.toString();
            let re = num.split('.');

            if (re[1] && re[1].length == 1) re[1] = re[1] + '0';

            if (!re[1]) re.push('00');

            return re.join('.');
        },
        //代收货
        // logistics(order_sn) {
        //     this.$router.push({
        //         path: "/logistics",
        //         query: {
        //             id: order_sn
        //         }
        //     });
        // },
        // //查看物流
        // logistics(item) {
        //     this.$router.push({
        //         path: "/logistics",
        //         query: {
        //             id: item.order_sn
        //         }
        //     });
        // },
        //确认收货
        recipient(order_sn) {
            Dialog.confirm({
                    title: "提示",
                    message: "确认收货吗？"
                })
                .then(() => {
                    this.$emit("loadingBoxShow", true); //请求loading
                    // on confirm
                    this.$post("/?c=order&a=receive", {
                        id: order_sn
                    }).then(res => {
                        this.$emit("loadingBoxShow", false); //请求loading
                        switch (res.code) {
                            case 0:
                                this.loadInit(true);
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                    });
                })
                .catch(() => {
                    // on cancel
                });
        },
        // postSale(snId,item,type){//type one 一个 all 所有
        //     if(type=='one'){
        //         let data = {
        //             snid : snId,
        //             list : [item], 
        //             maxMoney: this.maxMoney,
        //             is_group: this.is_group
        //         }
        //         console.log('data==',data)
        //         localStorage.setItem('saleItemList',JSON.stringify(data))
        //         this.$router.push({
        //             path:'/postSale',
        //             query:{
        //                 snId:snId,
        //                 radio:"one"
        //             }
        //         })
        //     }else{
        //         let data = {
        //             snid : snId,
        //             list : item,
        //             maxMoney: this.maxMoney,
        //             is_group: this.is_group
        //         }
        //         console.log('data==',data)
        //         localStorage.setItem('saleItemList',JSON.stringify(data))
        //         this.$router.push({
        //             path:'/postSale',
        //             query:{
        //                 snId:snId,
        //                 radio:"all"
        //             }
        //         })
        //     }

        // },
        // 打电话给商家
        // getPhone() {
        //     //平台客服电话
        //     window.location.href = "tel:4001288566";
        // },
        // 跳转订单详情
        goOrder(order_sn) {
            this.$router.push({
                path: "/seeDetails",
                query: {
                    sn: order_sn
                }
            });
        },
        // 再来一单
        anotherOrder(order_sn) {
            this.$router.push({
                path: "/shoppingCart",
                query: {
                    sn: order_sn,
                    status: this.status
                }
            });
        },
        //进入店铺
        toStop(seller_id) {
            this.$router.push({
                path: "/shop",
                query: {
                    index: seller_id
                }
            });
        },
        //瀑布流加载
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= scrollHeight - 50) {
                //写后台加载数据的函数
                if (this.clock == 1) {
                    this.loadInit();
                }
            }
        }
    },
    destroyed() {
        this.endMsg = "";
        window.removeEventListener("scroll", this.handleScroll);
    }
};

</script>
<style scoped>
@import url("../../assets/css/comment_new.css");

</style>
<style lang="css" scoped>
.vantLoading {
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
