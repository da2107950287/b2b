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

      <div v-for="(item, index) in lists" :key="index" class="box">
        <!-- 单个最小子订单 -->
        <div class="box-list">
          <div class="box-con">
            <div class="box-header" @click.stop="toStop(item.seller_id)">
              <img class="left-img" src="../../assets/img/dianshang.png" />
              <span>{{item.shop_name}}</span>
              <img class="right-img" src="../../assets/img/jiantou.png" />
            </div>
          </div>
          <div>
            <div :class="['box-status', {'red_color': item.status!='无效'}]">{{item.status}}</div>
            <div class="box-wrap">
              <div class="box-wrap-good">
                <div class="goods-left">
                  <img
                    class="goods_img"
                    src="http://inews.gtimg.com/newsapp_ls/0/10793114720_294195/0.jpg"
                  />
                  <img class="goods_tag" src="../../assets/img/tag/groupBuying.png" />
                </div>
                <div class="goods-content">
                  <div
                    class="goods-content-title"
                  >商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称称商品名称称商品名称称商品名称</div>
                  <p class="clearfixed">
                    整箱
                    <span>&yen;28.00</span>
                  </p>
                  <p class="clearfixed">
                    <span>x2</span>
                  </p>
                </div>
              </div>
              <!-- 每个子订单的取消或确认收货等按钮 -->
              <div class="box-wrap-button">
                <div class="btn">确认收货</div>
              </div>
            </div>
          </div>
          <!-- 每个子订单的再来一单按钮部分样式 -->
          <div class="box-btns">
            <p>共1款商品&nbsp;合计:&yen;28.00</p>
            <div class="btn" @click="anotherOrder('')">再来一单</div>
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

      configId: "",
      dialogShow: false,
      item: "",
      orderSn: "",
      price: "",
      clock: 1,
      lpage: 1, //当前页码
      limit: 10 //每页加载10条数据
    };
  },
  created() {
    this.loadInit(true);
  },
  mounted() {
    console.log("----11--");
  },
  methods: {
    //初始加载数据
    loadInit(isStart) {
      if (isStart) {
        this.lpage = 1;
        this.lists = [];
        this.show = 0;
        this.endMsg = "";
        this.dialogShow = false;
      }
      this.clock = 2;

      this.$post("/?c=order&a=list", {
        status: this.status,
        page: this.lpage,
        page_size: this.limit
      }).then(res => {
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
    cutString(str, num) {
      let val = this.$appFunc.prototype.cutString(str, num);
      return val;
    },
    orderPary(item) {
      this.$router.push({
        path: "/Cashier",
        query: {
          id: item.order_sn
        }
      });
    },
    // 评价
    commentInfo(item) {
      sessionStorage.setItem("wapGoodsInfo", JSON.stringify(item));
      this.$router.push({
        path: "/commentInfo",
        query: {
          id: item.is_evaluate
        }
      });
    },
    //代收货
    logistics(item) {
      this.$router.push({
        path: "/logistics",
        query: {
          id: item.order_sn
        }
      });
    },
    //查看物流
    logistics(item) {
      this.$router.push({
        path: "/logistics",
        query: {
          id: item.order_sn
        }
      });
    },
    //确认收货
    recipient(item) {
      Dialog.confirm({
        title: "收货",
        message: "确认收货吗？"
      })
        .then(() => {
          this.$emit("loadingBoxShow", true); //请求loading
          // on confirm
          this.$post("/?c=order&a=receive", {
            id: item.order_sn
          }).then(res => {
            this.$emit("loadingBoxShow", false); //请求loading
            switch (res.code) {
              case 0:
                location.reload();
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
    //客服
    service(item) {
      this.item = item;
      this.orderSn = item.order_sn;
      this.price = item.total_fee;
      this.dialogShow = true;
    },
    cancel() {
      this.dialogShow = false;
    },
    // 打电话给商家
    getPhone() {
      //平台客服电话
      window.location.href = "tel:4001288566";
    },
    // 联系平台客服
    contactService() {
      let _this = this;
      this.dialogShow = false;
      easemobim.bind({ configId: _this.configId });
    },
    // 商品详情
    goGoods(item) {
      this.$router.push({
        path: "/goods",
        query: {
          sn: item.wId
        }
      });
    },
    // 跳转订单详情
    goOrder(item) {
      this.$router.push({
        path: "/seeDetails",
        query: {
          sn: item.order_sn
        }
      });
    },
    // 再来一单
    anotherOrder(item) {
      this.$router.push({
        path: "/shoppingCart",
        query: {
          sn: item.order_sn
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