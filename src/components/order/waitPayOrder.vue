<template>
    <div>
        <div v-if="show === 2">
            <!-- 主订单样式 最小模板- -->
            <!--             <div class="box">
    <div class="box-list">
        <div class="box-con">
            <div class="box-header" @click.stop="toStop('12')">
                <img class="left-img" src="../../assets/img/dianshang.png">
                <span>商家名称商家名称商家名称商家名称商</span>
                <img class="right-img" src="../../assets/img/jiantou.png">
            </div>
        </div>
        <div>
            <div class="box-status red_color">未付款</div>
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
            </div>
        </div>
    </div>

    <div class="box-btns box-btns-wait">
        <p>共1款商品&nbsp;合计:&yen;28.00</p>
        <div class="btn" @click="anotherOrder('')">再来一单</div>
        <div class="btn btn-red" @click="orderPary('')">付款</div>
    </div>
    
</div> -->
            <div v-for="(item, index) in lists" :key="'all-' + index" class="box">
                <div v-for="(sellerItem, sellerIndex) in item.son" :key="'seller-' + index + '-' + sellerIndex" class="box-list">
                    <div class="box-con">
                        <div class="box-header" @click.stop="toStop(sellerItem.seller_id)">
                            <img class="left-img" src="../../assets/img/dianshang.png">
                            <span>{{sellerItem.shop_name}}</span>
                            <img class="right-img" src="../../assets/img/jiantou.png">
                        </div>
                    </div>
                    <div v-for="(childItem, childIndex) in sellerItem.order" :key="'child-' + index + '-' + sellerIndex + '-' + childIndex">
                        <div class="box-status red_color">未付款</div>
                        <div class="box-wrap">
                            <div v-for="(goodsItem, goodsIndex) in childItem.goods" :key="'goods-' + index + '-' + sellerIndex + '-' + childIndex + '-' + goodsIndex" class="box-wrap-good" @click.stop="goOrder(childItem.order_sn)">
                                <div class="goods-left">
                                    <img class="goods_img" :src="goodsItem.goods_img" />
                                </div>
                                <div class="goods-content">
                                    <div class="goods-content-title">{{goodsItem.goods_name}}</div>
                                    <p class="clearfixed">{{goodsItem.goods_attr}}<span>&yen;{{goodsItem.goods_price}}</span></p>
                                    <p class="clearfixed"><span>x{{goodsItem.goods_number}}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-btns box-btns-wait">
                    <p>共{{orderNums(item.son)}}款商品&nbsp;合计:&yen;{{orderFee(item.son)}}</p>
                    <div class="btn" v-if="item.type == 0" @click="anotherOrder(item.order_sn)">再来一单</div>
                    <div class="btn btn-red" @click="orderPary(item)">付款</div>
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
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>
<script>
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
        }
    },
    created() {
        this.loadInit(true)
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

            this.$post("/?c=order&a=waitPay", {
                status: this.status,
                page: this.lpage,
                page_size: this.limit
            }).then((res) => {
                this.clock = 1;
                switch (res.code) {
                    case 0:
                        if (this.lpage == 1) {
                            if (res.data.list.length > 0) {
                                //有内容，显示内容
                                this.show = 2;
                            } else if (!res.data.list.length) {
                                //无内容，显示缺省图
                                this.show = 1;
                                return;
                            }

                            if (res.data.list.length == this.limit) {
                                this.lpage++;
                                //第一页请求，且得到数据条数等于 每页最大数据条数， 则还可能有数据， 允许分页加载
                                window.addEventListener("scroll", this.handleScroll);
                            }
                        } else if (res.data.list.length < this.limit) {
                            //非第一页（已分页监听），数据不满最大条数， 则无更多数据， 取消分页加载更多
                            this.endMsg = "已经没有更多内容啦~";
                            window.removeEventListener("scroll", this.handleScroll);
                        } else {
                            this.lpage++;
                        }

                        this.lists = [...this.lists, ...res.data.list];
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
        //支付
        orderPary(item) {
            this.$emit('loadingBoxShow', true); //请求loading
            sessionStorage.setItem('wapPrice', item.order_amount);
            this.goToPayPage(item.order_sn)
        },
        //判断是跳转到一般支付页还是线下支付页
        goToPayPage(order_id) {
            this.$post('/?c=order&a=payStatus', {
                    order_sn: order_id //订单号
                })
                .then((res) => {
                    console.log('/?c=order&a=payStatus===', res)
                    this.$emit('loadingBoxShow', false); //请求loading
                    switch (res.code) {
                        case 0:
                            let Path = ''
                            if (res.data.online_pay === 1) {
                                //线上支付
                                Path = '/Cashier'
                            } else {
                                //线下支付
                                Path = '/Payoff'
                            }
                            this.$router.push({
                                path: Path,
                                query: {
                                    id: order_id,
                                    endtime: res.data.end_time,
                                    offline_img: res.data.offline_img,
                                    offline_msg: res.data.offline_msg,
                                }
                            });
                            break;
                        case 1:
                            this.$toast(res.msg);
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                })
        },
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
        //计算获得每个小订单的 商品款数
        orderNums(orders) {
            let n = 0;
            for (let k in orders) {
                for (let y in orders[k].order) {
                    n += orders[k].order[y].goods.length;
                }
            }
            return n;
        },
        //获得每个小订单的 订单钱数
        orderFee(orders) {
            let n = 0;
            for (let k in orders) {
                for (let y in orders[k].order) {
                    n = this.toCalculation(n, orders[k].order[y].total_fee, 'add');
                }
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
        //瀑布流加载
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= (scrollHeight - 50)) {
                //写后台加载数据的函数
                if (this.clock == 1) {
                    this.loadInit();
                }
            }
        },
    },
    destroyed() {
        this.endMsg = '';
        window.removeEventListener('scroll', this.handleScroll)
    },
}

</script>
<style scoped>
@import url("../../assets/css/comment_new.css");

</style>
<style lang="css" scoped>
.box-btns-wait {
    padding-right: 10px;
}
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
